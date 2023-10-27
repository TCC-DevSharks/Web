import Sidebar from "../../../components/clinica/sideBar/SidebarClinica"
import GraficoPizza from "../../../components/clinica/dash/GraficoPizza"
import styles from '../../../styles/Dash.module.scss';
import { useEffect, useState } from "react";
import axios from "axios";



export default function Home({ Component, pageProps }) {
  const IdClinica = typeof window !== 'undefined' ? localStorage.getItem('id') : null;
  const [dataClinica, setDataClinica] = useState();
  const [dataMedico, setDataMedico] = useState();

  useEffect(() => {
    function getClinica() {
      const url = `http://localhost:3000/clinica/data/${IdClinica}`;
      axios.get(url)
        .then(response => {
          const data = response.data;
          setDataClinica(data);
        })
        .catch(error => {
          console.error(error);
        });
    }

    getClinica();
  }, [IdClinica]);

  useEffect(() => {
    function getMedicosClinica() {
      const url = `http://localhost:3000/clinica/profissional/${IdClinica}`;
      axios.get(url)
        .then(response => {
          const data = response.data;
          setDataMedico(data);
        })
        .catch(error => {
          console.error(error);
        });
    }

    getMedicosClinica();
  },[IdClinica])


  return (
    <>
      <Sidebar />
      <div className={styles.container_geral}>
        <div className={styles.container}>

          <div className={styles.container_cima}>
            <h1 className={styles.container_title}>Painel de Controle</h1>
            <div className={styles.cards}>
              <div className={styles.card}>
                <h4 className={styles.title}>Pacientes Cadastradas</h4>
                <h1 className={styles.valor}>{dataClinica?.clinica.pacientes_cadastrados}</h1>
                <span className={styles.legenda}>Pacientes</span>
              </div>

              <div className={styles.card}>
                <h4 className={styles.title}>Consultas Diárias</h4>
                <h1 className={styles.valor}>{dataClinica?.clinica.consultas_diarias}</h1>
                <span className={styles.legenda}>Consultas</span>
              </div>

              <div className={styles.card}>
                <h4 className={styles.title}>Total de Médicos</h4>
                <h1 className={styles.valor}>{dataClinica?.clinica.profissionais_cadastrados}</h1>
                <span className={styles.legenda}>Médicos</span>
              </div>
            </div>
          </div>

          <div className={styles.container_baixo}>
            <div className={styles.card_grafico}>
              <div>
                <h2>Composição dos Funcionários</h2>
              </div>
              < GraficoPizza />

            </div >

            <div className={styles.card_funcionario}>

              <div className={styles.header_card}>
                <div className={styles.status}>
                  Status do Funcionário
                </div>

                <div className={styles.filtro}>
                  <button>filter</button>
                </div>
              </div>

              <div className={styles.table}>
                <table>
                  <thead>
                    <tr>
                      <th>Nome do funcionário</th>
                      <th>Especialidade</th>
                      <th>Idade</th>
                    </tr>
                  </thead>

                  <tbody>
                    {
                      dataMedico?.clinicas.map(medico => {
                        return(
                        <tr>
                          <td>
                            <div key={medico.id}>
                              <img className={styles.round_image} src={medico.foto} />
                              {medico.nome}
                            </div>
                          </td>
                          <td>{medico.especialidade}</td>
                          <td>{medico.idade}</td>
                        </tr>
                      )})
                    }

                  </tbody>
                </table>
              </div>
            </div>

          </div>

        </div>
      </div>
    </>
  );
}
