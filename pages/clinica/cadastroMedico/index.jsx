import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";

import React, { useState } from "react";
import axios from "axios";
import styles from "./CadastroMedico.module.scss";
import Sidebar from "../../../components/clinica/sideBar/SidebarClinica";
const IdClinica =
  typeof window !== "undefined" ? localStorage.getItem("id") : null;
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactInputMask from "react-input-mask";
import PreviewImage from "../../../components/previewImage/previewImage";

const firebaseConfig = {
  apiKey: "AIzaSyBW9WRNtFRcQ5twb_K18Fe0tGpxEZTsbsM",
  authDomain: "bebe-vindo.firebaseapp.com",
  projectId: "bebe-vindo",
  storageBucket: "bebe-vindo.appspot.com",
  messagingSenderId: "474360940540",
  appId: "1:474360940540:web:9f2e8703dcda35aa061479",
};

const initFirebase = () => {
  const app = initializeApp(firebaseConfig);
  return app;
};

function Medicos() {
  const app = initFirebase();

  const [formData, setFormData] = useState({
    nome: "",
    crm: "",
    email: "",
    senha: "",

    cpf: "",
    data_nascimento: "",
    foto: "",
    descricao: "",

    inicio_atendimento: "",
    fim_atendimento: "",
    id_sexo: "",
    id_clinica: `${IdClinica}`,
    telefone: "",
    tipo_telefone: "1",

    cep: "",
    numero: "",
    complemento: "",
    id_especialidade: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "cep") {
      // Fazer a solicitação para o Via CEP aqui
      fetch(`https://viacep.com.br/ws/${value}/json/`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setFormData({
            ...formData,
            cep: data.cep,
            estado: data.uf,
            cidade: data.localidade,
            rua: data.logradouro,
            bairro: data.bairro,
          });
        })
        .catch((error) => {
          console.error("Erro ao buscar CEP:", error);
        });
    }
  };

  const handleImageUpload = async (e) => {
    const imageFile = e.target.files[0];
    const storage = getStorage(app);

    // Defina o nome do arquivo para upload (pode ser um nome único)
    const filename = `${Date.now()}_${imageFile.name}`;

    // Crie uma referência para o arquivo
    const storageRef = ref(storage, "cadastro-medico-imagens/" + filename);

    // Use FileReader para ler o arquivo como uma string de dados
    const reader = new FileReader();
    reader.onload = async (event) => {
      const dataURL = event.target.result;

      // Realize o upload da imagem
      try {
        await uploadString(storageRef, dataURL, "data_url");
        const downloadURL = await getDownloadURL(storageRef);

        setFormData({
          ...formData,
          foto: downloadURL, // armazene a URL da imagem no estado
        });
      } catch (error) {
        console.error("Erro no upload da imagem:", error);
      }
    };

    reader.readAsDataURL(imageFile);
  };

  const validarCPF = (cpf) => {
    cpf = cpf.replace(/\D/g, "");

    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
      return false;
    }

    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = 11 - (soma % 11);
    let digitoVerificador1 = resto === 10 || resto === 11 ? 0 : resto;

    if (digitoVerificador1 !== parseInt(cpf.charAt(9))) {
      return false;
    }

    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = 11 - (soma % 11);
    let digitoVerificador2 = resto === 10 || resto === 11 ? 0 : resto;

    if (digitoVerificador2 !== parseInt(cpf.charAt(10))) {
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validarCPF(formData.cpf)) {
      toast.error("CPF inválido. Por favor, verifique e tente novamente.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return; // Adiciona esse retorno para interromper a execução da função
    }
    if (formData.senha !== formData.confirmarSenha) {
      toast.error("As senhas não coincidem. Por favor, tente novamente.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    const data = {
      nome: formData.nome,
      crm: formData.crm,
      email: formData.email,
      senha: formData.senha,
      cpf: formData.cpf,
      data_nascimento: formData.data_nascimento,
      foto: formData.foto,
      descricao: formData.descricao,
      inicio_atendimento: formData.inicio_atendimento,
      fim_atendimento: formData.fim_atendimento,
      id_sexo: formData.id_sexo,
      id_clinica: formData.id_clinica,
      telefone: formData.telefone,
      tipo_telefone: formData.tipo_telefone,
      numero: formData.numero,
      complemento: formData.complemento,
      cep: formData.cep,
      id_especialidade: formData.id_especialidade,
    };
    console.log(data.cep);
    // fazer o POST para o servidor
    axios
      .post('https://api-bebevindo.azurewebsites.net/profissional', data)
      .then((response) => {
        console.log(response);
        // Lidar com a resposta do servidor
        toast.success("Profissional criado com sucesso!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        console.log("Sucesso:", response.data);
      })
      .catch((error) => {
        // Lidar com erros
        toast.error(
          "Não foi possível criar o usuário, porfavor verifique se os campos estão preenchidos corretamente.",
          {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
      });
  };

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
      />
      <Sidebar />
      <div className={styles.container_geral}>
        <div className={styles.formWrapper}>
          <h1>Formulário de Cadastro</h1>

          <form onSubmit={handleSubmit}>
            <div className={styles.campos}>
              <div className={styles.campo}>
                {/* foto */}
                <div>
                  <label>Foto:</label>
                  <input
                    type="file"
                    name="foto"
                    onChange={(e) => {
                      const imageFile = e.target.files[0];
                      handleChange(e);
                      handleImageUpload(e);
                    }}
                  />
                  {formData.foto && <PreviewImage imageUrl={formData.foto} />}
                </div>

                {/* nome */}
                <div>
                  <label>Nome Completo:</label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                  />
                </div>

                {/* sexo */}
                <div>
                  <label>Sexo:</label>
                  <select
                    name="id_sexo"
                    value={formData.id_sexo}
                    onChange={handleChange}
                  >
                    <option value="">Selecione</option>
                    <option value="1">Masculino</option>
                    <option value="2">Feminino</option>
                  </select>
                </div>

                {/* data de nascimento */}
                <div>
                  <label>Data de Nascimento:</label>
                  <input
                    type="date"
                    name="data_nascimento"
                    value={formData.data_nascimento}
                    onChange={handleChange}
                  />
                </div>

                {/* telefone */}
                <div>
                  <label>Telefone:</label>
                  <ReactInputMask
                    mask="(99) 99999-9999"
                    type="tel"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                  />
                </div>

                {/* crm */}
                <div>
                  <label>CRM:</label>
                  <ReactInputMask
                    mask="SP-999999"
                    maskChar=""
                    type="text"
                    name="crm"
                    value={formData.crm}
                    onChange={handleChange}
                  />
                </div>

                {/* cpf */}
                <div>
                  <label>CPF:</label>
                  <ReactInputMask
                    mask="999.999.999-99"
                    type="text"
                    name="cpf"
                    value={formData.cpf}
                    onChange={handleChange}
                  />
                </div>

                {/* inicio atendimento */}
                <div>
                  <label>Horário de Atendimento (Início):</label>
                  <input
                    type="time"
                    name="inicio_atendimento"
                    value={formData.inicio_atendimento}
                    onChange={handleChange}
                  />
                </div>

                {/* fim atendimento */}
                <div>
                  <label>Horário de Atendimento (Fim):</label>
                  <input
                    type="time"
                    name="fim_atendimento"
                    value={formData.fim_atendimento}
                    onChange={handleChange}
                  />
                </div>

                {/* especialidade */}
                <div>
                  <label>Especialidade:</label>
                  <select
                    name="id_especialidade"
                    value={formData.id_especialidade}
                    onChange={handleChange}
                  >
                    <option value="">Selecione</option>
                    <option value="1">Nutricionista</option>
                    <option value="2">Obstetra</option>
                    <option value="3">Psicólogo</option>
                    <option value="4">Fisioterapeuta</option>
                  </select>
                </div>

                {/* descricao */}
                <div>
                  <label>Descrição:</label>
                  <input
                    type="text"
                    name="descricao"
                    value={formData.descricao}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={styles.campo}>
                {/* cep */}
                <div>
                  <label>CEP:</label>
                  <ReactInputMask
                    mask="99999-999"
                    type="text"
                    name="cep"
                    value={formData.cep}
                    onChange={handleChange}
                  />
                </div>

                {/* rua */}
                <div>
                  <label>Rua:</label>
                  <input
                    type="text"
                    name="rua"
                    value={formData.rua}
                    onChange={handleChange}
                  />
                </div>

                {/* numero */}
                <div>
                  <label>Número:</label>
                  <input
                    type="text"
                    name="numero"
                    value={formData.numero}
                    onChange={handleChange}
                  />
                </div>

                {/* bairro */}
                <div>
                  <label>Bairro:</label>
                  <input
                    type="text"
                    name="bairro"
                    value={formData.bairro}
                    onChange={handleChange}
                  />
                </div>

                {/* complemento */}
                <div>
                  <label>Complemento:</label>
                  <input
                    type="text"
                    name="complemento"
                    value={formData.complemento}
                    onChange={handleChange}
                  />
                </div>

                {/* cidade */}
                <div>
                  <label>Cidade:</label>
                  <input
                    type="text"
                    name="cidade"
                    value={formData.cidade}
                    onChange={handleChange}
                  />
                </div>

                {/* estado */}
                <div>
                  <label>Estado:</label>
                  <input
                    type="text"
                    name="estado"
                    value={formData.estado}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={styles.campo}>
                {/* email */}
                <div>
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                {/* senha */}
                <div>
                  <label>Senha:</label>
                  <input
                    type="password"
                    name="senha"
                    value={formData.senha}
                    onChange={handleChange}
                  />
                </div>

                {/* confirmar senha */}
                <div>
                  <label>Confirmar Senha:</label>
                  <input
                    type="password"
                    name="confirmarSenha"
                    value={formData.confirmarSenha}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* BOTAO */}
            <div>
              <button type="submit" className={styles.btn}>
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Medicos;
