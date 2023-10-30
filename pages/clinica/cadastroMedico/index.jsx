import { initializeApp, getApps, getApp } from 'firebase/app';
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage';


import React, { useState } from 'react';
import axios from 'axios';
import styles from './CadastroMedico.module.scss';
import Sidebar from '../../../components/clinica/sideBar/SidebarClinica';
const IdClinica = typeof window !== 'undefined' ? localStorage.getItem('id') : null;


const firebaseConfig = {
  apiKey: "AIzaSyBW9WRNtFRcQ5twb_K18Fe0tGpxEZTsbsM",
  authDomain: "bebe-vindo.firebaseapp.com",
  projectId: "bebe-vindo",
  storageBucket: "bebe-vindo.appspot.com",
  messagingSenderId: "474360940540",
  appId: "1:474360940540:web:9f2e8703dcda35aa061479"
};

const initFirebase = () => {
  const app = initializeApp(firebaseConfig);
  return app;
};


function Medicos() {
  const app = initFirebase();

  const [formData, setFormData] = useState({
    nome: '',
    crm: '',
    email: '',
    senha: '',

    cpf: '',
    data_nascimento: '',
    foto: '',
    descricao: '',

    inicio_atendimento: '',
    fim_atendimento: '',
    id_sexo: '',
    id_clinica: `${IdClinica}`,
    telefone: '',
    tipo_telefone: '1',

    cep: '',
    numero: '',
    complemento: '',
    id_especialidade: '',
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
          setFormData({
            ...formData,
            estado: data.uf,
            cidade: data.localidade,
            rua: data.logradouro,
            bairro: data.bairro
          });
        })
        .catch((error) => {
          console.error('Erro ao buscar CEP:', error);
        });
    }
  };

  const handleImageUpload = async (e) => {
    const imageFile = e.target.files[0];
    const storage = getStorage(app);

    // Defina o nome do arquivo para upload (pode ser um nome único)
    const filename = `${Date.now()}_${imageFile.name}`;

    // Crie uma referência para o arquivo
    const storageRef = ref(storage, 'cadastro-medico-imagens/' + filename);

    // Use FileReader para ler o arquivo como uma string de dados
    const reader = new FileReader();
    reader.onload = async (event) => {
      const dataURL = event.target.result;

      // Realize o upload da imagem
      try {
        await uploadString(storageRef, dataURL, 'data_url');
        const downloadURL = await getDownloadURL(storageRef);

        setFormData({
          ...formData,
          foto: downloadURL, // armazene a URL da imagem no estado
        });
      } catch (error) {
        console.error('Erro no upload da imagem:', error);
      }
    };

    reader.readAsDataURL(imageFile);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // dados do formulário
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

    // fazer o POST para o servidor
    axios
      .post('http://localhost:3000/profissional', data)
      .then((response) => {
        // Lidar com a resposta do servidor
        alert('Sucesso:', response.data);
        console.log('Sucesso:', response.data);
      })
      .catch((error) => {
        // Lidar com erros
        console.error('Erro ao enviar o cadastro:', error);
        alert('Erro ao enviar o cadastro: veja no console');
        console.error('Response do servidor:', error.response);
        alert('Erro ao enviar o cadastro: veja no console a resposta do servidor');
      });
  };

  return (
    <div>
      < Sidebar />
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
                      handleChange(e); // Chama a função handleChange para atualizar o estado
                      handleImageUpload(e); // Chama a função handleImageUpload para fazer o upload da imagem
                    }}
                  />
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
                  <select name="id_sexo" value={formData.id_sexo} onChange={handleChange}>
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
                  <input
                    type="tel"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                  />
                </div>

                {/* crm */}
                <div>
                  <label>CRM:</label>
                  <input
                    type="text"
                    name="crm"
                    value={formData.crm}
                    onChange={handleChange}
                  />
                </div>

                {/* cpf */}
                <div>
                  <label>CPF:</label>
                  <input
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
                  <input
                    type="text"
                    name="id_especialidade"
                    value={formData.id_especialidade}
                    onChange={handleChange}
                  />
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
                  <input
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
              <button type="submit" className={styles.btn}>Enviar</button>
            </div>
          </form>
        </div>
      </div>
    </div>

  );
}

export default Medicos;
