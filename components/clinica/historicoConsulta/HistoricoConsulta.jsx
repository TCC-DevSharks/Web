import styles from "./Historico.module.scss";
import { BiEditAlt } from "react-icons/bi";
import { AiFillCalendar, AiFillClockCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import { ModalHistorico } from "./modalConsulta";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsClockFill } from "react-icons/bs";

const Historico = () => {
  let IdClinica = null;
  if (typeof window !== "undefined") {
    IdClinica = localStorage.getItem("id");
  }
  const [listConsultas, setConsultas] = useState(null);
  const [listConsultasTodas, setConsultasTodas] = useState(null);
  const [listConsultasMarcadas, setConsultasMarcadas] = useState([]);
  const [listConsultasPassadas, setConsultasPassadas] = useState([]);
  const [listConsultasAtuais, setConsultasAtuais] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('todas');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPaciente, setSelectedPaciente] = useState(null);

  const closeModalConfirmacao = () => {
    setTimeout(() => {
      setIsModalOpen(false)
    }, 1500)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
    switch (filter) {
      case 'todas':
        setConsultas(listConsultasTodas)
        break;
      case 'consultasHoje':
        setConsultas(listConsultasAtuais);
        break;
      case 'consultasFuturas':
        setConsultas(listConsultasMarcadas);
        break;
      case 'consultasPassadas':
        setConsultas(listConsultasPassadas);
        break;
      default:
        break;
    }
  };

  const handleEditClick = (event, data) => {
    if (event) {
      event.stopPropagation(); // Impede a propagação do evento para o elemento pai (item-consulta)
      setSelectedPaciente(data);
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  };

  const validarData = (dataAPI) => {
    const partesData = dataAPI.split("/");
    const dia = parseInt(partesData[0], 10);
    const mes = parseInt(partesData[1], 10);
    const ano = parseInt(partesData[2], 10);
    const dataAPIFormatada = new Date(ano, mes - 1, dia);

    const dataAtual = new Date();
    let status = "futura";
    if (dataAPIFormatada < dataAtual) {
      status = "anterior";
    } else if (dataAPIFormatada.toDateString() === dataAtual.toDateString()) {
      status = "atual";
    }
    return status;
  };

  const url = `https://api-bebevindo.azurewebsites.net/clinica/consulta/${IdClinica}`;

  const getConsultas = () => {
    axios
      .get(url)
      .then((response) => {
        const consultasData = response.data.consultas;

        setConsultas(consultasData);

        const consultasPassadas = consultasData.filter(
          (data) => validarData(data.dia) === "anterior"
        );
        const consultasFuturas = consultasData.filter(
          (data) => validarData(data.dia) === "futura"
        );
        const consultasAtuais = consultasData.filter(
          (data) => validarData(data.dia) === "atual"
        );

        setConsultasPassadas(consultasPassadas);
        setConsultasMarcadas(consultasFuturas);
        setConsultasAtuais(consultasAtuais);
        setConsultasTodas(consultasData)
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (IdClinica) {
      getConsultas();
    }
  }, [IdClinica, url]);

  return (
    <>
      <div className={styles.container_geral}>      
        <div className={styles.container}>
          <div className={styles.container_cima}>
            <h1 className={styles.container_title}>
              Gerenciamento de Consultas
            </h1>
          </div>
          <div className={styles["container-consultas"]}>
            <div className={styles["container-box"]}>
              <div className={styles["filter-consultas"]}>
                <button
                  onClick={() => handleFilterClick('todasConsultas')}
                  className={selectedFilter === 'todasConsultas' ? styles["button-filter-clicked"] : styles["button-filter"]}
                >
                  Todas
                </button>
                <button
                  onClick={() => handleFilterClick('consultasHoje')}
                  className={selectedFilter === 'consultasHoje' ? styles["button-filter-clicked"] : styles["button-filter"]}
                >
                  Consultas de hoje
                </button>
                <button
                  onClick={() => handleFilterClick('consultasFuturas')}
                  className={selectedFilter === 'consultasFuturas' ? styles["button-filter-clicked"] : styles["button-filter"]}

                >
                  Consultas futuras
                </button>
                <button
                  onClick={() => handleFilterClick('consultasPassadas')}
                  className={selectedFilter === 'consultasPassadas' ? styles["button-filter-clicked"] : styles["button-filter"]}

                >
                  Consultas realizadas
                </button>
              </div>
              <div className={styles["box-consultas"]}>
                <div className={styles["consultas"]}>
                  <div className={styles["item-consulta"]}>
                    <table>
                      <thead>
                        <tr>
                          <th>Nome do Paciente:</th>
                          <th>Especialidade da consulta:</th>
                          <th style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>Inicio<BsClockFill /></th>
                          <th>Data da consulta<AiFillCalendar /></th>
                          <th>Profissional:</th>
                          <th>Ver detalhes da consulta:</th>
                        </tr>
                      </thead>

                      {listConsultas?.map((data) => {
                        console.log(data);
                        const [hora, min] = data.hora.split(":");
                        const nomePaciente = data.gestante;
                        const nomeCapitalizado = nomePaciente.charAt(0).toUpperCase() + nomePaciente.slice(1);
                        const [horaInicio, minInicio] = data.dia.split(':')
                        const [horaFim, minFim] = data.hora.split(':')

                        return (

                          <tbody>
                            <tr>
                              <td>
                                <div >
                                  <img
                                    className={styles.round_image}
                                    src={data.foto}
                                  />
                                  {nomeCapitalizado}
                                </div>
                              </td>
                              <td>{data.especialidade}</td>
                              <td >{horaFim}:{minFim}</td>
                              <td>{horaInicio}:{minInicio}</td>
                              <td style={{ paddingLeft: '20px' }}>{data.profissional}</td>
                              <td>
                                <div
                                  onClick={(event) => handleEditClick(event, data)}
                                  className={styles["item-edit"]}> Ver mais <BiEditAlt />
                                </div>
                              </td>
                            </tr>
                          </tbody>

                        );
                      })}
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {isModalOpen && (
          <ModalHistorico
            pacienteInfo={selectedPaciente}
            closeModal={closeModal}
            onClick={(idConsulta) => {
              closeModalConfirmacao()
              let url = `https://api-bebevindo.azurewebsites.net/consulta/${idConsulta}`;
              axios
                .delete(url)
                .then((response) => {
                  const data = response.data;

                  if (data.status === 404) {
                    console.log(data);
                    toast.error(data.message, {
                      position: "top-center",
                      autoClose: 6000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
                    });
                    setTimeout(closeModal, 5000);
                  } else {
                    getConsultas()
                    console.log(data.message);
                    toast.success(data.message, {
                      position: "top-center",
                      autoClose: 6000, // Aumenta o tempo de exibição para 6 segundos
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
                    });

                    closeModalConfirmacao() // Fecha o modal após 5 segundos
                  }

                })
                .catch((err) => console.log(err));
            }}
          />
        )}
      </div>
    </>
  );
};

export default Historico;
