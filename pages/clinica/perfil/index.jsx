import styles from './PerfilClinica.module.scss';
import Sidebar from "../../../components/clinica/sideBar/SidebarClinica";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Perfil() {

  const [listClinicas, setClinicas] = useState();
  const [listEnderecoClinica,  setEnderecoClinica] = useState()
  const IdClinica = localStorage.getItem('id')

  useEffect(() => {
    const url = `http://localhost:3000/clinica/${IdClinica}`;

    function getClinica() {
      axios.get(url)
        .then(response => {
          const data = response.data;
          console.log(data);
          setClinicas(data);
        })
        .catch(error => {
          console.error(error);
        });
    }

    getClinica();
  }, []);

  useEffect(() => {
  
      function enderecoClinica(cep) {
        const url = `https://viacep.com.br/ws/${cep}/json/`;
        axios.get(url)
          .then(
            response => {
              const data = response.data
              setEnderecoClinica(data)
          
            }
          )
          .catch(error => console.log(error))
      }
    }
  )

  

  return (
    <section className={styles.perfilSection}>
      < Sidebar />
      <div className={styles.container_geral}>

        <div className={styles.container_dados}>

          {listClinicas?.clinica.map(clinica =>
          (
            <>
              <div className={styles.dados_iniciais}>
                <div className={styles.dados_foto}>
                  <div className={styles.dados_title}>Dados da Clínica</div>

                  <div className={styles.img_img}>
                    <img
                      src={clinica.foto}
                      alt="Foto de perfil da clinica"
                    />
                  </div>

                  <div className={styles.inputs}>
                    <input placeholder={clinica.telefone} />
                    <input placeholder={clinica.email} />
                  </div>
                </div>
              </div>

              <div className={styles.dados_finais}>
                <div className={styles.inputs_row1}>
                  <input placeholder={clinica.descricao} className='input_descricao' />
                </div>

                <div className={styles.inputs_row2}>
                  <input placeholder='' className={styles.input_cep} />
                  <input placeholder='Rua' className={styles.input_rua} />
                  <input placeholder='N' className={styles.input_n} />
                  <input placeholder='Bairro' className={styles.input_bairro} />
                  <input placeholder='Cidade' className={styles.input_cidade} />
                </div>

                <div className={styles.inputs_row3}>
                  <input placeholder='11 949676202' />
                  <input placeholder='Amilsilva@gmail.com' />
                </div>

                <button className={styles.btn}>Enviar</button>
              </div>
            </>
          )
          )}
        </div>
      </div >
    </section>
  )
}