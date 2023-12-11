import React, { useEffect, useState } from "react";
import styles from "./Dieta.module.css";
import TituloSecao from "../../../components/tituloSection/TituloSecao";
import PacienteDieta from "../../../components/medico/dieta/pacienteDieta/PacienteDieta";
import Sidebar from "../../../components/sideBar/Sidebar";
import axios from "axios";
import ModalDieta from "./modalDieta";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  IoAddCircleSharp,
  IoRemoveCircleSharp,
  IoWarningOutline,
} from "react-icons/io5";
import { AiFillCloseCircle } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";

const Dieta = () => {
  let IdMedico;
  if (typeof window !== "undefined") {
    IdMedico = localStorage.getItem("id");
  }

  const [listpacientes, setPacientes] = useState();

  const [listRefeicaoGestante, setRefeicaoGestante] = useState();
  const [listaAlimentosRefeicao, setAlimentosRefeicaoGestante] = useState();
  const [idDieta, setIdDieta] = useState();

  const [selectedPaciente, setSelectedPaciente] = useState(null);
  const [isModalOpen, setModalIsOpen] = useState(false);

  const [isRefeicoesModalOpen, setRefeicoesModalOpen] = useState(false);
  const [isRefeicaoPadraoModalOpen, setRefeicaoPadraoModalOpen] =
    useState(false);

  const [
    isAdicionarRefeicaoPadraoModalOpen,
    setAdicionarRefeicaoPadraoModalOpen,
  ] = useState(false);
  const [
    isAdicionarAlimentoRefeicaoPadraoModalOpen,
    setAdicionarAlimentoRefeicaoPadraoModalOpen,
  ] = useState(false);
  const [refeicoesPadrao, setRefeicoesPadrao] = useState([]);
  const [selectedRefeicao, setSelectedRefeicao] = useState(null);
  const [alimentosRefeicaoPadrao, setAlimentosRefeicaoPadrao] = useState([]);
  const [listaAlimentos, setListaAlimentos] = useState([]);
  const [isRefeicoesModalDietaOpen, setRefeicoesModalDietaOpen] =
    useState(false);
  const [novaRefeicaoNome, setNovaRefeicaoNome] = useState("");
  const [toastMessage, setToastMessage] = useState(null);

  const openRefeicoesModal = () => {
    setRefeicoesModalOpen(true);
  };
  const closeRefeicoesModal = () => {
    setRefeicoesModalOpen(false);
  };

  const openRefeicaoPadraoModal = async (idRefeicao) => {
    try {
      const response = await axios.get(
        `https://api-bebevindo.azurewebsites.net/refeicao/padrao/alimento/${idRefeicao}`
      );
      const data = response.data;
      setAlimentosRefeicaoPadrao(
        Array.isArray(data.alimentos) ? data.alimentos : []
      );
      setRefeicaoPadraoModalOpen(true);
    } catch (error) {
      console.error("Erro ao buscar alimentos da refeição padrão:", error);
    }
  };
  const closeRefeicaoPadraoModal = () => {
    setRefeicaoPadraoModalOpen(false);
  };

  const openAdicionarRefeicaoPadraoModal = () => {
    setAdicionarRefeicaoPadraoModalOpen(true);
  };
  const closeAdicionarRefeicaoPadraoModal = () => {
    setAdicionarRefeicaoPadraoModalOpen(false);
  };

  const openAdicionarAlimentoRefeicaoPadraoModal = async () => {
    setAdicionarAlimentoRefeicaoPadraoModalOpen(true);
    try {
      const response = await axios.get(
        "https://api-bebevindo.azurewebsites.net/refeicao/lista/alimento"
      );
      const data = response.data;

      setListaAlimentos(Array.isArray(data.alimentos) ? data.alimentos : []);
    } catch (error) {
      console.error("Erro ao buscar a lista de alimentos:", error);
    }
  };
  const closeAdicionarAlimentoRefeicaoPadraoModal = () => {
    setAdicionarAlimentoRefeicaoPadraoModalOpen(false);
  };

  const openModalForPaciente = (paciente) => {
    
    setSelectedPaciente(paciente);
    setModalIsOpen(true);

  };

  const openRefeicoesModalDieta = () => {
    setRefeicoesModalDietaOpen(true);
  };
  const closeRefeicoesModalDieta = () => {
    setRefeicoesModalDietaOpen(false);
  };

  
  const criarNovaRefeicaoPadrao = async () => {
    try {
      const response = await fetch(
        "https://api-bebevindo.azurewebsites.net/refeicao/padrao",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nome: novaRefeicaoNome,
            id_profissional: IdMedico,
          }),
        }
      );

      if (response.ok) {
        setToastMessage("Refeição padrão criada com sucesso!");
        fetchRefeicoesPadrao();
        setAdicionarRefeicaoPadraoModalOpen(false);
        setNovaRefeicaoNome("");
      } else {
        console.error("Erro ao criar refeição padrão");
        setToastMessage("Erro ao criar refeição padrão. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao criar refeição padrão", error);
      setToastMessage("Erro ao criar refeição padrão. Tente novamente.");
    }
  };
  const excluirRefeicaoPadrao = async (id_refeicao) => {
    try {
      await axios.delete(
        `https://api-bebevindo.azurewebsites.net/refeicao/padrao/${id_refeicao}`
      );

      const updatedRefeicoes = refeicoesPadrao.refeicao.filter(
        (refeicao) => refeicao.id !== id_refeicao
      );
      setRefeicoesPadrao({ ...refeicoesPadrao, refeicao: updatedRefeicoes });
      toast.success("Refeição padrão excluída com sucesso!");
    } catch (error) {
      console.error("Erro ao remover refeição padrão:", error);
      toast.error("Erro ao excluir refeição padrão. Tente novamente.");
    }
  };

  const adicionarAlimentoRefeicaoPadrao = async (idAlimento) => {
    try {
      const response = await axios.post(
        "https://api-bebevindo.azurewebsites.net/refeicao/padrao/alimento/",
        {
          id_alimento: idAlimento,
          id_refeicao: selectedRefeicao.id,
        }
      );

      openRefeicaoPadraoModal(selectedRefeicao.id);
    } catch (error) {
      console.error("Erro ao adicionar alimento à refeição padrão:", error);
    }
  };
  const removerAlimentoRefeicaoPadrao = async (idAlimento) => {
    try {
      await axios.delete(
        `https://api-bebevindo.azurewebsites.net/refeicao/padrao/${selectedRefeicao.id}/alimento/${idAlimento}`
      );

      openRefeicaoPadraoModal(selectedRefeicao.id);
    } catch (error) {
      console.error("Erro ao remover alimento da refeição padrão:", error);
    }
  };

  const getRefeicaoGestante = (idGestante, idConsulta) => {
    
    if (idGestante == null || idGestante === undefined) {
      console.error("idGestante é nulo ou indefinido");
    } else {

      const url = `https://api-bebevindo.azurewebsites.net/dieta/${idGestante}`;
      axios
        .get(url)
        .then((response) => {
          const data = response.data;
      
  
          if (data.dieta.length === 0) {
            const urlPost = `https://api-bebevindo.azurewebsites.net/dieta/`;
            axios
              .post(urlPost, {
                id_consulta: idConsulta,
              })
              .then((response) => {
                setIdDieta(response.data);
              })
              .catch((error) => {
                console.error(error);
              });
          } else {
            setIdDieta(data.dieta[0].idDieta);
            const url = `https://api-bebevindo.azurewebsites.net/dieta/refeicao/${idGestante}`;
            axios
              .get(url)
              .then((response) =>{
                const data = response.data
                setRefeicaoGestante(data);
              })
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  useEffect(() => {
    console.log("oiii");
    getRefeicaoGestante(
      selectedPaciente?.idGestante,
      selectedPaciente?.idConsulta
    );
  }, [isRefeicoesModalDietaOpen]);


  useEffect(() => {
    if (
      selectedPaciente?.idGestante === null ||
      selectedPaciente?.idGestante === undefined
    ) {
      console.log("bhajfvf");
    } else {
      getRefeicaoGestante(
        selectedPaciente?.idGestante,
        selectedPaciente?.idConsulta
      );
    }
  }, [selectedPaciente]);

  useEffect(() => {
    if (toastMessage) {
      toast.success(toastMessage, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setToastMessage(null);
    }
  }, [toastMessage]);

  useEffect(() => {
    const url = `https://api-bebevindo.azurewebsites.net/profissional/gestante/${IdMedico}`;

    function getPacientes() {
      axios
        .get(url)
        .then((response) => {
          const data = response.data;

          const pacientesPorId = data.pacientes.reduce((obj, paciente) => {
            obj[paciente.idGestante] = paciente;
            return obj;
          }, {});

          const pacientesUnicos = Object.values(pacientesPorId);

          setPacientes(pacientesUnicos);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    getPacientes();
  }, []);

  const fetchRefeicoesPadrao = async () => {
    try {
      const response = await axios.get(
        `https://api-bebevindo.azurewebsites.net/refeicao/padrao/profissional/${IdMedico}`
      );
      const data = response.data;
      setRefeicoesPadrao(data);
    } catch (error) {
      console.error("Erro ao buscar refeições padrão:", error);
    }
  };
  useEffect(() => {
    fetchRefeicoesPadrao();
  }, []);

  return (
    <>
      <Sidebar />

      <div className={styles["dieta-container"]}>
        <TituloSecao title="Gerenciar Dietas" />
        <div className={styles["container-geral"]}>
          <div className={styles["container-pacientes"]}>
            <div>
              {" "}
              <input type="text" placeholder="Pesquisar paciente:" />{" "}
            </div>

            <div>
              {" "}
              <span> Selecione um paciente para gerenciar a dieta: </span>{" "}
            </div>

            <div className={styles["box-pacientes"]}>
              {listpacientes &&
                listpacientes.map((paciente) => (
                  <PacienteDieta
                    key={paciente.idGestante}
                    nome={paciente.nome}
                    foto={paciente.foto}
                    semanas={paciente.semana_gestacao}
                    onClick={() => openModalForPaciente(paciente)}
                  />
                ))}
            </div>
          </div>

          <div className={styles["container-dieta"]}>
            <div className={styles["box-dieta"]}>
              <h2>Refeições Padrão</h2>
              <span>Crie padrões de refeição para agilizar a consulta!</span>
            </div>

            <div className={styles["container-refeicoes-padrao"]}>
              <div className={styles["todas-refeicoes-padrao"]}>
                {Array.isArray(refeicoesPadrao.refeicao) &&
                  refeicoesPadrao.refeicao.map((refeicao, index) => (
                    <div
                      key={index}
                      className={styles["refeicao-padrao"]}
                      onClick={() => {
                        setSelectedRefeicao(refeicao);
                        openRefeicaoPadraoModal(refeicao.id);
                      }}
                    >
                      <span>{refeicao.nome}</span>
                      <IoRemoveCircleSharp
                        style={{
                          fontSize: "1.3rem",
                          color: "white",
                          cursor: "pointer",
                          alignSelf: "center",
                        }}
                        onClick={() => excluirRefeicaoPadrao(refeicao.id)}
                      />
                    </div>
                  ))}
              </div>
              <button onClick={() => openAdicionarRefeicaoPadraoModal()}>
                +
              </button>
            </div>

            {isRefeicaoPadraoModalOpen && (
              <div className={styles["modalContainerRefeicoesPadrao"]}>
                <div className={styles["modalBox"]}>
                  <div className={styles["modalContentRefeicoes"]}>
                    <span
                      onClick={closeRefeicaoPadraoModal}
                      className={styles["closeButtonModal"]}
                    >
                      &times;
                    </span>
                    <h2>{selectedRefeicao?.nome}</h2>
                    <h4>
                      Alimentos que estão inclusos em "{selectedRefeicao?.nome}
                      ":
                    </h4>

                    {alimentosRefeicaoPadrao.length === 0 ? (
                      <p style={{ marginTop: "18rem" }}>
                        {" "}
                        Nenhum alimento adicionado ainda.
                      </p>
                    ) : (
                      <div className={styles["foods"]}>
                        <div className={styles["boxFood"]}>
                          {alimentosRefeicaoPadrao.map((alimento, index) => (
                            <div key={index} className={styles["foodItem"]}>
                              <div className={styles["imageFood"]}>
                                <img
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                  }}
                                  src={alimento.imagem}
                                  alt={alimento.nome}
                                />
                              </div>
                              <div className={styles["foodInformations"]}>
                                <span>{alimento.nome}</span>
                                <IoRemoveCircleSharp
                                  style={{
                                    fontSize: "1.5rem",
                                    color: "red",
                                    cursor: "pointer",
                                  }}
                                  onClick={() =>
                                    removerAlimentoRefeicaoPadrao(
                                      alimento.idAlimento
                                    )
                                  }
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <button onClick={openAdicionarAlimentoRefeicaoPadraoModal}>
                      Adicionar alimentos
                    </button>
                  </div>
                </div>
              </div>
            )}

            {isAdicionarRefeicaoPadraoModalOpen && (
              <div className={styles["modalContainerRefeicoesPadrao"]}>
                <div className={styles["modalBoxMenor"]}>
                  <div className={styles["modalContentRefeicoesMenor"]}>
                    <span
                      onClick={closeAdicionarRefeicaoPadraoModal}
                      className={styles["closeButtonModal"]}
                    >
                      &times;
                    </span>
                    <h2>Criar refeição padrão</h2>
                    <input
                      type="text"
                      placeholder="Nome da Nova Refeição"
                      value={novaRefeicaoNome}
                      onChange={(e) => setNovaRefeicaoNome(e.target.value)}
                    />
                    <button onClick={() => criarNovaRefeicaoPadrao()}>
                      Salvar
                    </button>
                  </div>
                </div>
              </div>
            )}

            <ToastContainer />

            {isAdicionarAlimentoRefeicaoPadraoModalOpen && (
              <div className={styles["modalContainerRefeicoes"]}>
                <div className={styles["modalBox"]}>
                  <div className={styles["modalContentRefeicoes"]}>
                    <span
                      onClick={closeAdicionarAlimentoRefeicaoPadraoModal}
                      className={styles["closeButtonModal"]}
                    >
                      &times;
                    </span>
                    <h2>Gerenciar alimentos em: {selectedRefeicao.nome}</h2>
                    <h4>
                      Clique para adicionar um alimento em "
                      {selectedRefeicao.nome}":
                    </h4>

                    <div className={styles["foods"]}>
                      <div className={styles["boxFood"]}>
                        {listaAlimentos.map((alimento, index) => (
                          <div key={index} className={styles["foodItem"]}>
                            <div className={styles["imageFood"]}>
                              <img
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                                src={alimento.imagem}
                                alt={alimento.nome}
                              />
                            </div>
                            <div className={styles["foodInformations"]}>
                              <span>{alimento.nome}</span>
                              <IoAddCircleSharp
                                style={{
                                  fontSize: "1.5rem",
                                  color: "#b6b6f6",
                                  cursor: "pointer",
                                }}
                                onClick={() =>
                                  adicionarAlimentoRefeicaoPadrao(alimento.id)
                                }
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {isModalOpen && (
            <div className={styles["modalContainer"]}>
              <div className={styles["modalBox"]}>
                <div className={styles["modalContent"]}>
                  <span
                    onClick={() => setModalIsOpen(false)}
                    className={styles["closeButtonModal"]}
                  >
                    <AiFillCloseCircle
                      fill="#FF0000"
                      style={{ cursor: "pointer" }}
                    />
                  </span>
                  <div className={styles["nome-paciente-modal"]}>
                    <div>
                      <img src={selectedPaciente.foto} alt="Foto da paciente" />
                    </div>
                    <p> {selectedPaciente && selectedPaciente.nome}</p>
                  </div>
                  <div className={styles["refeicoes-pacientes-modal"]}>
                    {listRefeicaoGestante?.dieta &&
                    listRefeicaoGestante.dieta.length > 0 ? (
                      listRefeicaoGestante.dieta.map((data) => (
                        <div
                          className={styles["refeicoes-pacientes"]}
                          onClick={openRefeicoesModal}
                        >
                          <span>{data.refeicao}</span>
                          <p>{data.horario}</p>
                          <MdDeleteOutline/>
                        </div>
                      ))
                    ) : (
                      <div className={styles["mensagem-vazia"]}>
                        <IoWarningOutline style={{ fontSize: "2.5rem" }} />A
                        lista de refeições está vazia.
                      </div>
                    )}
                  </div>
                  <button onClick={openRefeicoesModalDieta}>
                    Adicionar refeição
                  </button>
                </div>
              </div>

              {isRefeicoesModalOpen && (
                <div className={styles["modalContainerRefeicoes"]}>
                  <div className={styles["modalBox"]}>
                    <div className={styles["modalContentRefeicoes"]}>
                      <span
                        onClick={closeRefeicoesModal}
                        className={styles["closeButtonModal"]}
                      >
                        &times;
                      </span>

                      <h2>Nome da refeição</h2>
                      <h4>
                        Aqui vão aparecer os alimentos que estão inclusos na
                        refeição clicada. aí vai dar pra add mais alimentos e
                        remover os ja existentes tbm:
                      </h4>
                    </div>
                    <button>Adicionar alimentos</button>
                    <button>Copiar refeiçao</button>
                  </div>
                </div>
              )}

              {isRefeicoesModalDietaOpen && (
                <ModalDieta
                  title="Adicionar refeição"
                  id_gestante={selectedPaciente}
                  id_profissional={IdMedico}
                  id_dieta={idDieta}
                  closeModal={closeRefeicoesModalDieta}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dieta;
