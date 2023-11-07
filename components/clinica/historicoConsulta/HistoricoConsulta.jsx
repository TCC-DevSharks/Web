import styles from "./Historico.module.scss";
import { BiEditAlt } from "react-icons/bi";
import { AiFillCalendar, AiFillClockCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import { ModalHistorico } from "./modalConsulta";

const Historico = () => {
  let IdClinica = null;
  if (typeof window !== "undefined") {
    IdClinica = localStorage.getItem("id");
  }
  const [listConsultas, setConsultas] = useState(null);
  const [listConsultasMarcadas, setConsultasMarcadas] = useState([]);
  const [listConsultasPassadas, setConsultasPassadas] = useState([]);
  const [listConsultasAtuais, setConsultasAtuais] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPaciente, setSelectedPaciente] = useState(null);

  const handleEditClick = (event, data) => {
    event.stopPropagation(); // Impede a propagação do evento para o elemento pai (item-consulta)
    setSelectedPaciente(data);
    setIsModalOpen(true);
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

  useEffect(() => {
    if (IdClinica) {
      const url = `http://localhost:3000/clinica/consulta/${IdClinica}`;

      const getConsultas = () => {
        axios
          .get(url)
          .then((response) => {
            const consultasData = response.data.clinicas;
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

      getConsultas();
    }
  }, [IdClinica]);

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
                  onClick={() => {
                    setConsultas(listConsultasAtuais);
                  }}
                  className={styles["button-filter"]}
                >
                  Consultas de hoje
                </button>
                <button
                  onClick={() => {
                    setConsultas(listConsultasMarcadas);
                  }}
                  className={styles["button-filter"]}
                >
                  Consultas futuras
                </button>
                <button
                  onClick={() => {
                    setConsultas(listConsultasPassadas);
                  }}
                  className={styles["button-filter"]}
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
                            <img src={data.foto} alt="" />
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
                            onClick={(event) => handleEditClick(event, data)}
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
            closeModal={() => {
              setIsModalOpen(false);
            }}
          />
        )}
      </div>
    </>
  );
};

export default Historico;
