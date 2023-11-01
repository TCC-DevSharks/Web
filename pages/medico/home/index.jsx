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
                      <th>Nome do funcionário</th>
                      <th>Semana Gestacional</th>
                    </tr>
                  </thead>

                  <tbody>
                    {
                      /* dataMedico?.clinicas.map(medico => {
                        return ( */
                      <tr>
                        <td>
                          <div /*key={ medico.id }*/>
                            <img className={styles.round_image} src={/* medico.foto */"https://i0.wp.com/bibliaseensina.com.br/wp-content/uploads/2020/07/e-blasfemia-usar-a-letra-j-nos-nomes-biblicos.jpg?fit=1280%2C720&ssl=1"} />
                            {/* medico.nome */}
                          </div>
                        </td>
                        <td>{/* medico.especialidade */}</td>
                        <td>{/* medico.idade */}</td>
                      </tr>
                      /* )
                    }) */
                    }
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
                      <th>Nome do funcionário</th>
                      <th>Semana Gestacional</th>
                    </tr>
                  </thead>

                  <tbody>
                    {
                      /* dataMedico?.clinicas.map(medico => {
                        return ( */
                      <tr>
                        <td>
                          <div /*key={ medico.id }*/>
                            <img className={styles.round_image} src={/* medico.foto */"https://i0.wp.com/bibliaseensina.com.br/wp-content/uploads/2020/07/e-blasfemia-usar-a-letra-j-nos-nomes-biblicos.jpg?fit=1280%2C720&ssl=1"} />
                            {/* medico.nome */}
                          </div>
                        </td>
                        <td>{/* medico.especialidade */}</td>
                        <td>{/* medico.idade */}</td>
                      </tr>
                      /* )
                    }) */
                    }

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
