import styles from "./Historico.module.scss";
import { BiEditAlt } from "react-icons/bi";
import { AiFillCalendar, AiFillClockCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import { ModalHistorico } from "./modalConsulta";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Historico = () => {
  let IdClinica = null;
  if (typeof window !== "undefined") {
    IdClinica = localStorage.getItem("id");
  }
  const [listConsultas, setConsultas] = useState(null);
  const [listConsultasMarcadas, setConsultasMarcadas] = useState([]);
  const [listConsultasPassadas, setConsultasPassadas] = useState([]);
  const [listConsultasAtuais, setConsultasAtuais] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('consultasHoje');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPaciente, setSelectedPaciente] = useState(null);

  const closeModalConfirmacao = () => {
    
    setTimeout(()=> {
      setIsModalOpen(false)
      
    },1500)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  } 

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
    switch (filter) {
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
    const partesData = dataAPI.split("/"); // Supondo que a data esteja no formato dia/mês/ano
    const dia = parseInt(partesData[0], 10);
    const mes = parseInt(partesData[1], 10);
    const ano = parseInt(partesData[2], 10);

    const dataAPIFormatada = new Date(ano, mes - 1, dia); // Meses iniciam em 0 (janeiro)

    const dataAtual = new Date(); // Data atual
    let status = "futura";
    if (dataAPIFormatada < dataAtual) {
      status = "anterior";
    } else if (dataAPIFormatada.toDateString() === dataAtual.toDateString()) {
      status = "atual";
    }
    return status;
  };

  const url = `http://localhost:3000/clinica/consulta/${IdClinica}`;

  const getConsultas = () => {
    axios
      .get(url)
      .then((response) => {
        const consultasData = response.data.consultas;
        console.log(consultasData);
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
      <ToastContainer
        position="top-center"
        autoClose={6000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="black" />
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
                <h2>Consultas Marcadas:</h2>
                <div className={styles["consultas"]}>
                  {listConsultas?.map((data) => {
                    const [hora, min] = data.hora.split(":");

                    return (
                      <div className={styles["item-consulta"]}>
                        <div className={styles["item"]}>
                          <div className={styles["fotoPaciente"]}>
                            <img src={data.foto} alt="imagem de perfil" />
                          </div>
                          <div className={styles["informacoesPaciente"]}>
                            <div className={styles["info-box"]}>
                              <h3>
                                Paciente:{" "}
                                <span style={{ color: "#b6b6f6" }}>
                                  {data.gestante}
                                </span>
                              </h3>
                              <h4>Dr.{data.profissional}</h4>
                              <p>
                                Paciente grávida de {data.semana_gestacao}{" "}
                                semanas
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className={styles["infoTwo"]}>
                          <div className={styles["item-info"]}>
                            <span>
                              <AiFillCalendar />
                              {data.dia}
                            </span>
                          </div>
                          <div className={styles["item-info"]}>
                            <span>
                              <AiFillClockCircle />
                              {hora}:{min}
                            </span>
                          </div>
                          <div
                            onClick={(event) => handleEditClick(event, data, true)}
                            className={styles["item-edit"]}
                          >
                            <span>
                              <BiEditAlt style={{ fontSize: "1.3rem" }} />
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
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
              let url = `http://localhost:3000/consulta/${idConsulta}`;
              axios
                .delete(url)
                .then((response) => {
                  const data = response.data;
                  
                  if (data.status === 404) {
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

                    closeModalConfirmacao // Fecha o modal após 5 segundos
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
