import Sidebar from "../../components/SidebarClinica";
import  GraficoPizza from "../../components/GraficoPizza"
import styles from '../../styles/Dash.module.scss';


export default function Home({ Component, pageProps }) {
  return (
    <div>
      <Sidebar />
      <div className={styles.container_geral}>
      <div className={styles.container}>

        <div className={styles.container_cima}>
          <h1 className={styles.container_title}>Painel de Controle</h1>

          <div className={styles.cards}>
            <div className={styles.card}>
              <h4 className={styles.title}>Pacientes Cadastradas</h4>
              <h1 className={styles.valor}>856</h1>
              <span className={styles.legenda}>Pacientes</span>
            </div>

            <div className={styles.card}>
              <h4 className={styles.title}>Consultas Diárias</h4>
              <h1 className={styles.valor}>77</h1>
              <span className={styles.legenda}>Consultas</span>
            </div>

            <div className={styles.card}>
              <h4 className={styles.title}>Total de Médicos</h4>
              <h1 className={styles.valor}>17</h1>
              <span className={styles.legenda}>Médicos</span>
            </div>
          </div>
        </div>

        <div className={styles.container_baixo}>
          <div className={styles.card_grafico}>
            <div>
              <h2>Composição dos Funcionários</h2>
            </div>

           
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
                  <tr>
                    <td>
                      <div>
                        <img className={styles.round_image} src="https://pbs.twimg.com/media/F8prEhEWMAAOT8I?format=jpg&name=large" />
                        Marcos
                      </div>
                    </td>
                    <td>Psicólogo</td>
                    <td>32</td>
                  </tr>

                  <tr>
                    <td>
                      <div>
                        <img className={styles.round_image} src="https://pbs.twimg.com/media/F8rx24UXUAAeus6?format=jpg&name=900x900" />
                        Maria
                      </div>
                    </td>
                    <td>Obstetra</td>
                    <td>24</td>
                  </tr>

                  <tr>
                    <td>
                      <div>
                        <img className={styles.round_image} src="https://pbs.twimg.com/media/F8RWT8fXMAAT-Qr?format=jpg&name=medium" />
                        Henrique
                      </div>
                    </td>
                    <td>Clínico Geral</td>
                    <td>28</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>
    </div>
    </div>
  );
}
