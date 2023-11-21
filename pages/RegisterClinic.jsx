import { initializeApp, getApps, getApp } from 'firebase/app';
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage';

import React, { useState, useEffect } from 'react';
import styles from './RegisterClinic.module.scss';
import stylesLogin from '../styles/ClinicLogin.module.css';
import InputMask from 'react-input-mask';
import Header from '../components/home/header/Header'

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

function RegisterClinic() {
  const app = initFirebase();

  const [formData, setFormData] = useState({
    razao_social: '',
    cnpj: '',
    telefone: '',
    cep: '',
    complemento: '',
    email: '',
    senha: '',
    foto: '',
    tipo_telefone: 1,
    numero: '',
    descricao: '',
    endereco: '',
    neighborhood: '',
    cidade: '',
  });

  // Função para buscar informações de endereço com base no CEP
  const fetchAddressInfo = async () => {
    const { cep } = formData;
    if (cep) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        if (response.ok) {
          const data = await response.json();
          setFormData({
            ...formData,
            endereco: data.logradouro || '',
            neighborhood: data.bairro || '',
            cidade: data.localidade || '',
          });
        } else {
          console.error('Erro ao buscar informações de endereço');
        }
      } catch (error) {
        console.error('Erro ao buscar informações de endereço:', error);
      }
    }
  };

  // Efeito para buscar informações de endereço quando o campo CEP muda
  useEffect(() => {
    fetchAddressInfo();
  }, [formData.cep]);

  const handleImageUpload = async (e) => {
    const imageFile = e.target.files[0];
    const storage = getStorage(app);

    // Defina o nome do arquivo para upload (pode ser um nome único)
    const filename = `${Date.now()}_${imageFile.name}`;

    // Crie uma referência para o arquivo
    const storageRef = ref(storage, 'cadastro-clinica-imagens/' + filename);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://api-bebevindo.azurewebsites.net/clinica', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        
        alert('Dados enviados com sucesso!');
      } else {
        const responseData = await response.json();
        console.error('Erro ao enviar os dados:', responseData);
        alert('Erro ao enviar os dados:', responseData);
      }
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
      alert('Erro ao enviar os dados:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <Header />

      <div className={styles.container_geral_register}>
        <h1>Cadastre sua Clínica</h1>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.box}>
            <div className={styles.container_inicial}>
              <span className={styles.title_section}>
                Informações Iniciais
              </span>

              <div className='div_img'>
                
                <input
                  type="file"
                  name="foto"
                  id="fileInput"
                  required
                  onChange={(e) => {
                    const imageFile = e.target.files[0];
                    handleChange(e); // Chama a função handleChange para atualizar o estado
                    handleImageUpload(e); // Chama a função handleImageUpload para fazer o upload da imagem
                  }}
                ></input>
              </div>

              <div>
                <p>Razão Social: *</p>
                <input
                  type="text"
                  name="razao_social"
                  placeholder='Digite sua razão social'
                  required
                  onChange={handleChange}
                />
              </div>

              <div>
                <p>CNPJ: *</p>
                <InputMask
                  mask="99.999.999/9999-99"
                  type="text"
                  name="cnpj"
                  placeholder="Digite seu CNPJ"
                  required
                  onChange={handleChange}
                />
              </div>

              <div>
                <p>Descrição: *</p>
                <input
                  type="text"
                  name="descricao"
                  placeholder='Descricao'
                  required
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className={styles.container_endereco}>
              <span className={styles.title_section}>
                Endereço
              </span>

              <div>
                <p>CEP: *</p>
                <InputMask
                  mask="99999-999"
                  type="text"
                  name="cep"
                  placeholder="Digite seu CEP"
                  required
                  onChange={handleChange}
                />
              </div>

              <div>
                <p>Rua:</p>
                <input
                  className={styles.rua_input}
                  type="text"
                  name="endereco"
                  placeholder="Rua"
                  readOnly
                  value={formData.endereco}
                />
              </div>

              <div>
                <p>Número:</p>
                <input
                  className='numero'
                  type="text"
                  name="numero"
                  placeholder='Nº'
                />
              </div>

              <div>
                <p>Bairro:</p>
                <input
                  type="text"
                  name="neighborhood"
                  placeholder="Bairro"
                  readOnly
                  value={formData.neighborhood}
                />
              </div>

              <div>
                <p>Complemento:</p>
                <input
                  type="text"
                  name="complemento"
                  placeholder='Complemento'
                  required
                  onChange={handleChange}
                />
              </div>

              <div>
                <p>Cidade:</p>
                <input
                  type="text"
                  name="cidade"
                  placeholder="Cidade"
                  readOnly
                  value={formData.cidade}
                />
              </div>
            </div>

            <div className={styles.container_final}>
              <span className={styles.title_section}>
                Login
              </span>

              <div>
                <p>Telefone: *</p>
                <InputMask
                  mask="(99) 9999-9999"
                  type="text"
                  name="telefone"
                  placeholder="Digite seu telefone"
                  required
                  onChange={handleChange}
                />
              </div>

              <div>
                <p>E-mail: *</p>
                <input
                  type="text"
                  name="email"
                  placeholder='Digite seu e-mail'
                  required
                  onChange={handleChange}
                />
              </div>

              <div>
                <p >Senha: *</p>
                <input
                  type="password"
                  name="senha"
                  placeholder='Digite sua senha'
                  required
                  onChange={handleChange}
                />
              </div>

              <div>
                <p>Confirmar Senha: *</p>
                <input
                  type="password"
                  name="confirmar_senha"
                  placeholder='Confirme sua senha'
                  required
                  readOnly
                />
              </div>
            </div>
          </div>

          <div>
            <button className={stylesLogin.button_login_clinic} type="submit" onClick={handleSubmit}>Cadastrar</button>
          </div>
        </form>

      </div>

    </div>
  );
}

export default RegisterClinic;