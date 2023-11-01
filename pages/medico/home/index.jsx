import Sidebar from "../../../components/sideBar/Sidebar";
import styles from '../../../styles/Dash.module.scss';

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
                <h4 className={styles.title}>Pacientes Atendidos</h4>
                <h1 className={styles.valor}>{/* {dataClinica?.clinica.pacientes_cadastrados} */} 2 </h1>
                <span className={styles.legenda}>Pacientes</span>
              </div>

              <div className={styles.card}>
                <h4 className={styles.title}>Consultas do Dia</h4>
                <h1 className={styles.valor}>{/* {dataClinica?.clinica.consultas_diarias} */} 13 </h1>
                <span className={styles.legenda}>Consultas</span>
              </div>

              <div className={styles.card}>
                <h4 className={styles.title}>Consultas do Mês</h4>
                <h1 className={styles.valor}>{/* {dataClinica?.clinica.profissionais_cadastrados} */} 45 </h1>
                <span className={styles.legenda}>Consultas</span>
              </div>
            </div>
          </div>

          <div className={styles.container_baixo}>
            <div className={styles.card_funcionario}>
              <div className={styles.header_card}>
                <div className={styles.status}>
                  Próximas Pacientes
                </div>
              </div>

              <div className={styles.table}>
                <table>
                  <thead>
                    <tr>
                      <th>Nome da Paciente</th>
                      <th>Semana Gestacional</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div>
                          <img className={styles.round_image} src="https://i0.wp.com/bibliaseensina.com.br/wp-content/uploads/2020/07/e-blasfemia-usar-a-letra-j-nos-nomes-biblicos.jpg?fit=1280%2C720&ssl=1" />
                          Nome do Paciente 1
                        </div>
                      </td>
                      <td>30 semanas</td>
                    </tr>
                    <tr>
                      <td>
                        <div>
                          <img className={styles.round_image} src="https://i0.wp.com/bibliaseensina.com.br/wp-content/uploads/2020/07/e-blasfemia-usar-a-letra-j-nos-nomes-biblicos.jpg?fit=1280%2C720&ssl=1" />
                          Nome do Paciente 2
                        </div>
                      </td>
                      <td>28 semanas</td>
                    </tr>
                    <tr>
                      <td>
                        <div>
                          <img className={styles.round_image} src="https://i0.wp.com/bibliaseensina.com.br/wp-content/uploads/2020/07/e-blasfemia-usar-a-letra-j-nos-nomes-biblicos.jpg?fit=1280%2C720&ssl=1" />
                          Nome do Paciente 3
                        </div>
                      </td>
                      <td>32 semanas</td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>

            <div className={styles.card_funcionario}>
              <div className={styles.header_card}>
                <div className={styles.status}>
                  Pacientes Recentes
                </div>
              </div>

              <div className={styles.table}>
                <table>
                  <thead>
                    <tr>
                      <th>Nome da Paciente</th>
                      <th>Semana Gestacional</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div>
                          <img className={styles.round_image} src="https://i0.wp.com/bibliaseensina.com.br/wp-content/uploads/2020/07/e-blasfemia-usar-a-letra-j-nos-nomes-biblicos.jpg?fit=1280%2C720&ssl=1" />
                          Nome do Paciente 1
                        </div>
                      </td>
                      <td>30 semanas</td>
                    </tr>
                    <tr>
                      <td>
                        <div>
                          <img className={styles.round_image} src="https://i0.wp.com/bibliaseensina.com.br/wp-content/uploads/2020/07/e-blasfemia-usar-a-letra-j-nos-nomes-biblicos.jpg?fit=1280%2C720&ssl=1" />
                          Nome do Paciente 2
                        </div>
                      </td>
                      <td>28 semanas</td>
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
