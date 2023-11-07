import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from "../../../components/sideBar/Sidebar";
import styles from '../../../styles/Dash.module.scss';

export default function Home({ Component, pageProps }) {
  const [pacientesAtendidos, setPacientesAtendidos] = useState(0);
  const [consultasDoDia, setConsultasDoDia] = useState(0);
  const [consultasDoMes, setConsultasDoMes] = useState(0);

  useEffect(() => {
    // Faça a solicitação para o endpoint de pacientes atendidos
    axios.get('http://localhost:3000/profissional/gestante/35')
      .then(response => {
        // Extraia o valor do número de pacientes do resultado
        const numPacientes = response.data.pacientes.length;
        setPacientesAtendidos(numPacientes);

        // Faça a contagem das consultas do dia com base na data "dia"
        const dataAtual = new Date().toLocaleDateString(); // Obtém a data atual no formato "MM/DD/YYYY"
        const consultasDia = response.data.pacientes.filter(paciente => paciente.dia === dataAtual);
        const numConsultasDia = consultasDia.length;
        setConsultasDoDia(numConsultasDia);

        // Faça a contagem das consultas do mês com base no mês atual
        const mesAtual = new Date().getMonth() + 1; // Obtém o número do mês atual (1 a 12)
        const consultasMes = response.data.pacientes.filter(paciente => {
          const dataConsulta = new Date(paciente.diaDesformatado);
          const mesConsulta = dataConsulta.getMonth() + 1; // Obtém o mês da consulta
          return mesConsulta === mesAtual;
        });
        const numConsultasMes = consultasMes.length;
        setConsultasDoMes(numConsultasMes);
      })
      .catch(error => {
        console.error('Erro ao buscar dados do endpoint:', error);
      });
  }, []);

  return (
    <div>
      <Sidebar />

      <div className={styles.container_geral}>
        <div className={styles.container}>
          <div className={styles.container_cima}>
            <h1 className={styles.container_title}>Painel de Controle</h1>

            <div className={styles.cards}>
              <div className={styles.card}>
                <h4 className={styles.title}>Pacientes Atendidas</h4>
                <h1 className={styles.valor}> {pacientesAtendidos} </h1>
                <span className={styles.legenda}>Pacientes</span>
              </div>

              <div className={styles.card}>
                <h4 className={styles.title}>Consultas do Dia</h4>
                <h1 className={styles.valor}> {consultasDoDia} </h1>
                <span className={styles.legenda}>Consultas</span>
              </div>

              <div className={styles.card}>
                <h4 className={styles.title}>Consultas do Mês</h4>
                <h1 className={styles.valor}>{consultasDoMes}</h1>
                <span className={styles.legenda}>Consultas</span>
              </div>
            </div>
          </div>

          <div className={styles.container_baixo}>
            <div className={styles.card_funcionario}>
              <div className={styles.header_card}>
                <div className={styles.status}>
                  Pacientes
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
          </div>

        </div>
      </div>
    </div>
  );
}
