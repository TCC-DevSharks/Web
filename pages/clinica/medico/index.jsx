import React, { useState, useEffect } from "react";
import styles from "../../../styles/Medico.module.scss";
import Medico from "../../.././components/clinica/medicosClinica/Medico";
import Sidebar from "../../.././components/clinica/sideBar/SidebarClinica";
import { useRouter } from "next/router";
import {
  AiFillCalendar,
  AiFillClockCircle,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { BiEditAlt, BiRightArrowCircle } from "react-icons/bi";
import axios, { Axios } from "axios";
import { ModalMedico } from "../../../components/clinica/medicosClinica/modalMedico";

export default function Medicos() {
  const [listMedicos, setListMedicos] = useState();
  const [medicoSelected, setSelectMedico] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
console.log(medicoSelected);

  const router = useRouter();
  const IdClinica =
    typeof window !== "undefined" ? localStorage.getItem("id") : null;

  const handleClick = () => {
    router.push("/clinica/cadastroMedico");
  };

  const handleEditClick = (event, data) => {
    event.stopPropagation(); 
    setSelectMedico(data);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const url = `http://localhost:3000/clinica/profissional/${IdClinica}`;
    const getMedicos = () => {
      axios
        .get(url)
        .then((response) => {
          const medicos = response;
          setListMedicos(medicos.data.clinicas);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    getMedicos();
  }, []);

  return (
    <>
      <Sidebar />
      <div className={styles.container_geral}>
        <div className={styles.container}>
          <div className={styles.container_cima}>
            <h1 className={styles.container_title}>Gerenciamento de Médicos</h1>
          </div>
          <div className={styles["container-medicos"]}>
            <div className={styles["container-box"]}>
              <div className={styles["filter-consultas"]}>
                <button
                  onClick={handleClick}
                  className={styles["button-filter"]}
                >
                  <AiOutlineUserAdd style={{ fontSize: "1.5rem" }} /> adicionar
                  médicos
                </button>
                <input
                  className={styles["pesquisarMedico"]}
                  name="pesquisarmedicos"
                  id="filterMedico"
                  cols="30"
                  rows="10"
                  placeholder="Pesquise pelo nome do médico:"
                />
                <input
                  className={styles["pesquisarMedico"]}
                  name="pesquisarmedicos"
                  id="filterMedico"
                  cols="30"
                  rows="10"
                  placeholder="Pesquise pela especilidade do médico:"
                />
                <button className={styles["button-filter"]}>filtrar</button>
              </div>
              <div className={styles["box-medicos"]}>
                <h2>Profissionais:</h2>
                <div className={styles["medicos"]}>
                  {listMedicos?.map((medico) => {
                    return (
                      <>
                        <div className={styles["item-consulta"]}>
                          <div className={styles["item"]}>
                            <div className={styles["fotoPaciente"]}>
                              <img
                                src={medico.foto}
                                alt="foto de perfil do medico"
                              />
                            </div>
                            <div className={styles["informacoesPaciente"]}>
                              <div className={styles["info-box"]}>
                                <h3>Dr. {medico.nome}</h3>
                                <h4>
                                  Especialidade:{" "}
                                  <span style={{ color: "#b6b6f6" }}>
                                    Nutricionista
                                  </span>
                                </h4>
                                <p>Clique no botão abaixo com uma seta para vizualizar mais sobre este médico:</p>
                              </div>
                            </div>
                          </div>
                          <div className={styles["infoTwo"]}>
                            <div className={styles["item-info"]}>
                              <span>Inicio: 11:00{/* {data.dia} */}</span>
                            </div>
                            <div className={styles["item-info"]}>
                              <span>
                                Fim: 18:00
                                {/* {hora}:{min} */}
                              </span>
                            </div>
                            <div
                              onClick={(event) => handleEditClick(event, medico)}
                              className={styles["item-edit"]}
                            >
                              <span>
                                <BiRightArrowCircle style={{ fontSize: "1.3rem", fontWeight:"bold" }} />
                              </span>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        {isModalOpen && (
          <ModalMedico
            medicoInfo={medicoSelected}
            closeModal={() => {
              setIsModalOpen(false);
            }}
          />
        )}
      </div>

      {/* < Sidebar />
            <div className={styles.container_geral}>
            <div className={styles.container_dados}>
                <div className={styles.container_cima}>
                    <div className={styles.title}>Gerenciar Médicos</div>

                    <div className={styles.inputs}>
                        <button className={styles.button} onClick={handleClick}>
                            +
                        </button>
                        <input className={styles.search}></input>
                        <input className={styles.filter}></input>
                    </div>
                </div>

                <div className={styles.box_medicos}>
                    {Array.isArray(medicos) ? (
                        medicos.map((medico) => (
                            <Medico key={medico.id} medico={medico} />
                        ))
                    ) : (
                        <p>Nenhum médico disponível</p>
                    )}
                </div>

            </div>
        </div> */}
    </>
  );
}
