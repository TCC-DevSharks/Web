import styles from './PerfilClinica.module.scss';
import Sidebar from "../../../components/clinica/sideBar/SidebarClinica";
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export default function Perfil() {

  const [listClinicas, setClinicas] = useState();
  const [listEnderecoClinica, setEnderecoClinica] = useState();
  const IdClinica = localStorage.getItem('id');
  const [cep, setCep] = useState();
  const [editMode, setEditMode] = useState(false);


  // Estado dos Inputs //
  const [editTelefone, setEditedTelefone] = useState(listClinicas?.clinica[0].telefone);
  const [editEmail, setEditEmail] = useState(listClinicas?.clinica[0].email)
  const [editDescricao, setEditDescricao] = useState(listClinicas?.clinica[0].descricao)
  const [editCep, setEditCep] = useState(listClinicas?.clinica[0].cep)
  const [editNumero, setEditNumero] = useState(listClinicas?.clinica[0].numero)


  function PutPerfilClinica() {
    const url = `http://localhost:3000/clinica/${IdClinica}`;
    const jsonData = {
      "cnpj": listClinicas?.clinica[0].cnpj,
      "razao_social": listClinicas?.clinica[0].razao_social,
      "descricao": editDescricao ? editDescricao : listClinicas?.clinica[0].descricao,
      "email": listClinicas?.clinica[0].email,
      "foto": listClinicas?.clinica[0].foto,
      "id_telefone": listClinicas?.clinica[0].idTelefone,
      "telefone": editTelefone ? editTelefone : listClinicas?.clinica[0].telefone,
      "tipo_telefone": 2,
      "id_endereco": listClinicas?.clinica[0].idEndereco,
      "numero": editNumero ? editNumero : listClinicas?.clinica[0].numero,
      "complemento": listClinicas?.clinica[0].complemento,
      "cep": editCep ? editCep : listClinicas?.clinica[0].cep

    }

    axios.patch(url, jsonData)
      .then(response => {
        const data = response.data;
        if (response.status == 201) {
          console.log("teste");
          const notify = () => toast.success(data.result.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          notify()
        } else {
          console.log('foi');
          toast.error(data.result.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          
          notify()
        }
      })
      .catch(error => {
        error
      });
  }

  useEffect(() => {
    function getClinica() {
      const url = `http://localhost:3000/clinica/${IdClinica}`;
      axios.get(url)
        .then(response => {
          const data = response.data;
          setClinicas(data);
          const cepFromResponse = data.clinica[0].cep;
          setCep(cepFromResponse);
        })
        .catch(error => {
          console.error(error);
        });
    }

    getClinica();
  }, [IdClinica]);

  useEffect(() => {
    if (cep) {
      function enderecoClinica(cep) {
        const url = `https://viacep.com.br/ws/${cep}/json/`;
        axios.get(url)
          .then(response => {
            const data = response.data;
            setEnderecoClinica(data);
          })
          .catch(error => console.log(error));
      }

      enderecoClinica(cep);
    }
  }, [cep]);


  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="black" />

    <section className={styles.perfilSection}>
      <Sidebar />
      <div className={styles.container_geral}>
        <div className={styles.container_dados}>
          {listClinicas?.clinica.map(clinica => (
            <>
              <div className={styles.dados_iniciais}>
                <div className={styles.dados_foto}>
                  <div className={styles.dados_title}>Dados da Clínica</div>
                  <div className={styles.img_img}>
                    <img src={clinica.foto} alt="Foto de perfil da clinica" />
                  </div>
                  <div className={styles.inputs}>
                    {editMode ? (
                      <>
                        <input
                          placeholder={editTelefone}
                          value={editTelefone}
                          onChange={(e) => setEditedTelefone(e.target.value)}
                        />
                        <input placeholder={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
                      </>
                    ) : (
                      <>
                        <input value={clinica.telefone} />
                        <input value={clinica.email} />
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className={styles.dados_finais}>
                <div className={styles.inputs_row1}>
                  {editMode ? (
                    <textarea placeholder={editDescricao} onChange={(e) => setEditDescricao(e.target.value)} className="input_descricao" />
                  ) : (
                    <textarea value={clinica.descricao} className="input_descricao" />
                  )}
                </div>
                <div className={styles.inputs_row2}>

                  {editMode ? (
                    <>
                      <input placeholder={clinica.cep} onChange={(e) => setEditCep(e.target.value)} className={styles.input_cep} />
                      <input value={listEnderecoClinica?.logradouro} placeholder={listEnderecoClinica?.logradouro} className={styles.input_rua} />
                      <input type='text' placeholder={editNumero} onChange={(e) => setEditNumero(e.target.value)} className={styles.input_n} />
                      <input value={listEnderecoClinica?.bairro} placeholder={listEnderecoClinica?.bairro} className={styles.input_bairro} />
                      <input value={listEnderecoClinica?.localidade} placeholder={listEnderecoClinica?.localidade} className={styles.input_cidade} />
                    </>
                  ) : (
                    <>
                      <input placeholder={clinica.cep} value={clinica.cep} className={styles.input_cep} />
                      <input value={listEnderecoClinica?.logradouro} className={styles.input_rua} />
                      <input value={clinica.numero} className={styles.input_n} />
                      <input value={listEnderecoClinica?.bairro} className={styles.input_bairro} />
                      <input value={listEnderecoClinica?.localidade} className={styles.input_cidade} />
                    </>
                  )}
                </div>
                <div style={{ display: 'flex', gap: '30px' }}>
                  {editMode ? (
                    <button onClick={PutPerfilClinica} className={styles.btn}>Salvar</button>

                  ) : (
                    <button className={styles.btn} onClick={() => setEditMode(true)}>Editar</button>
                  )}
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </section>
    </>
  );
}