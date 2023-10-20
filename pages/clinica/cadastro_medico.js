import React, { useState } from 'react';
import axios from 'axios';
import styles from '../../styles/CadastroMedico.module.scss';
import Sidebar from '../../components/SidebarClinica';


function Medicos() {

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
    id_clinica: '5',
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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dados do formulário
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

    // Fazer a solicitação POST para o servidor
    axios
      .post('http://localhost:3005/profissional', data)
      .then((response) => {
        // Lidar com a resposta do servidor
        console.log('Sucesso:', response.data);
      })
      .catch((error) => {
        // Lidar com erros
        console.error('Erro ao enviar o cadastro:', error);
      });
  };

  return (
    <div>
      < Sidebar/> 
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
                  type="text"
                  name="foto"
                  value={formData.foto}
                  onChange={handleChange}
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
