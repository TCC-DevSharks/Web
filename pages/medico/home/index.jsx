import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from "../../../components/sideBar/Sidebar";
import styles from '../../../styles/Dash.module.scss';

export default function Home({ Component, pageProps }) {
  const [pacientesAtendidos, setPacientesAtendidos] = useState(0);
  const [consultasDoDia, setConsultasDoDia] = useState(0);
  const [consultasDoMes, setConsultasDoMes] = useState(0);
  const [pacientes, setPacientes] = useState([]);
  console.log(pacientes);
  useEffect(() => {
    const IdMedico = localStorage.getItem("id");

    if (IdMedico) {
      axios.get(`https://api-bebevindo.azurewebsites.net/profissional/gestante/${IdMedico}`)
        .then(response => {
          // Contagem de pacientes únicos
          const pacientesUnicos = Array.from(new Set(response.data.pacientes.map(paciente => paciente.idGestante)));
          const numPacientesUnicos = pacientesUnicos.length;
          setPacientesAtendidos(numPacientesUnicos);

          // Contagem das consultas do dia com base na data "dia"
          const dataAtual = new Date().toLocaleDateString();
          const consultasDia = response.data.pacientes.filter(paciente => paciente.dia === dataAtual);
          const numConsultasDia = consultasDia.length;
          setConsultasDoDia(numConsultasDia);

          // Contagem das consultas do mês com base no mês atual
          const mesAtual = new Date().getMonth() + 1;
          const consultasMes = response.data.pacientes.filter(paciente => {
            const dataConsulta = new Date(paciente.diaDesformatado);
            const mesConsulta = dataConsulta.getMonth() + 1;
            return mesConsulta === mesAtual;
          });

          const numConsultasMes = consultasMes.length;
          setConsultasDoMes(numConsultasMes);

          // Filtrar pacientes únicos
          const pacientesUnicosData = pacientesUnicos.map(id => response.data.pacientes.find(paciente => paciente.idGestante === id));
          setPacientes(pacientesUnicosData);
        })
        .catch(error => {
          console.error('Erro ao buscar dados do endpoint:', error);
        });
    }
  }, []);

  useEffect(() => {
    const IdMedico = localStorage.getItem("id");

    if(IdMedico){
      axios.get(`https://api-bebevindo.azurewebsites.net/profissional/${IdMedico}`)
      .then((response) => {
        const data = response.data;
        localStorage.setItem("emailProfissional", data.profissionais[0].email)
        console.log(data)
      })
      .catch((error) => {
        console.error(error);
      });
    }
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
                      <th>Nome da Paciente </th>
                      <th>Semana Gestacional</th>
                      <th>Especialidade da consulta</th>
                      <th>Dia consulta</th>
                      <th>Hora consulta</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pacientes.map(paciente => (
                       
                      <tr key={paciente.id}>
                        <td>
                          <div>
                            <img className={styles.round_image} src={paciente.foto} />
                            {paciente.nome}
                          </div>
                        </td>
                        <td>{paciente.semana_gestacao} semanas</td>
                        <td>{paciente.especialidade}</td>
                        <td>{paciente.dia}</td>
                        <td>{paciente.hora.split("0:00")}</td>
                      </tr>
                    ))}
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
