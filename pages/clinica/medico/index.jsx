import React, { useState, useEffect } from "react";
import styles from "../../../styles/Medico.module.scss";
import Sidebar from "../../.././components/clinica/sideBar/SidebarClinica";
import { useRouter } from "next/router";
import { AiOutlineUserAdd } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import axios from "axios";
import { ModalMedico } from "../../../components/clinica/medicosClinica/modalMedico";
import { BsClockFill } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";

export default function Medicos() {
  const [listMedicos, setListMedicos] = useState([]);
  const [listMedicos2, setListMedicos2] = useState([]);
  const [medicoSelected, setSelectMedico] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filtroNome, setFiltroNome] = useState('');
  const [filtroEspecialidade, setFiltroEspecialidade] = useState('');
  const [listaOriginal, setListaOriginal] = useState([]);
  const router = useRouter();
  const IdClinica = typeof window !== "undefined" ? localStorage.getItem("id") : null;

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const closeModalConfirmacao = () => {
    setTimeout(() => {
      setIsModalOpen(false)
    }, 1500)
  }

  const handleClick = () => {
    router.push("/clinica/cadastroMedico");
  };

  const handleEditClick = (event, data) => {
    event.stopPropagation();
    setSelectMedico(data);
    setIsModalOpen(true);
  };

  const removerAcentos = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const filtrar = () => {
    const medicosFiltradosPorNome = filtrarMedicosNome(listaOriginal, filtroNome);
    filtrarMedicosEspecialidade(medicosFiltradosPorNome, filtroEspecialidade);
  };

  const filtrarMedicosNome = (lista, filtro) => {
    const filtroSemAcentos = removerAcentos(filtro).toLowerCase();
    return lista.filter(medico =>
      removerAcentos(medico.nome).toLowerCase().includes(filtroSemAcentos)
    );
  };

  const filtrarMedicosEspecialidade = (lista, filtro) => {
    const filtroSemAcentos = removerAcentos(filtro).toLowerCase();
    const medicosFiltradosEspecialidade = lista.filter(medico =>
      removerAcentos(medico.especialidade).toLowerCase().includes(filtroSemAcentos)
    );

    setListMedicos(medicosFiltradosEspecialidade);
  };

  const limparFiltro = () => {
    setFiltroNome('');
    setFiltroEspecialidade('');
    setListMedicos(listaOriginal);
  };

  const getMedicos = () => {
    const url = `https://api-bebevindo.azurewebsites.net/clinica/profissional/${IdClinica}`;
    axios
      .get(url)
      .then((response) => {
        const medicos = response;
        setListMedicos(medicos.data.clinicas);
        setListaOriginal(medicos.data.clinicas)
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    
    getMedicos()
  }, []);

  return (
    <>
      <Sidebar />
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
                  value={filtroNome}
                  placeholder="Pesquise pelo nome do médico:"
                  onChange={(e) => setFiltroNome(e.target.value)}
                />
                <input
                  className={styles["pesquisarMedico"]}
                  name="pesquisarmedicos"
                  id="filterMedico"
                  cols="30"
                  rows="10"
                  value={filtroEspecialidade}
                  placeholder="Pesquise pela especilidade do médico:"
                  onChange={(e) => setFiltroEspecialidade(e.target.value)}
                />
                <button
                  onClick={filtrar}
                  className={styles["button-filter"]}>
                  filtrar
                </button>
                <button
                  onClick={limparFiltro}
                  className={styles["button-filter"]}>
                  limpar filtro
                </button>
              </div>
              <div className={styles["box-medicos"]}>
                <div className={styles["medicos"]}>
                  <div className={styles["item-consulta"]}>
                    <table>
                      <thead>
                        <tr>
                          <th>Nome do funcionário</th>
                          <th>Especialidade</th>
                          <th>Inicio atendimento <BsClockFill /></th>
                          <th>Fim atendimento <BsClockFill /></th>
                          <th>Vizualizar profissional</th>
                        </tr>
                      </thead>

                      {listMedicos?.map((medico) => {
                        const nomeMedico = medico.nome;
                        const nomeCapitalizado = nomeMedico.charAt(0).toUpperCase() + nomeMedico.slice(1);
                        const [horaInicio, minInicio] = medico.inicio_atendimento.split(':')
                        const [horaFim, minFim] = medico.fim_atendimento.split(':')
                        return (
                          <>
                            <tbody>
                              <tr>
                                <td>
                                  <div >
                                    <img
                                      className={styles.round_image}
                                      src={medico.foto}
                                    />
                                    {nomeCapitalizado}
                                  </div>
                                </td>
                                <td>{medico.especialidade}</td>
                                <td style={{ paddingLeft: '3%' }}>{horaInicio}:{minInicio}</td>
                                <td style={{ paddingLeft: '3%' }}>{horaFim}:{minFim}</td>
                                <td>
                                  <div
                                    onClick={(event) => handleEditClick(event, medico)}
                                    className={styles["item-edit"]}> Editar médico <BiEditAlt />
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </>
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
          <ModalMedico
            medicoInfo={medicoSelected}
            closeModal={ closeModal }
            onClick={(IdMedico) => {
              closeModalConfirmacao()
              let url = `https://api-bebevindo.azurewebsites.net/profissional/${IdMedico}`
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
                    getMedicos()
                    toast.success(data.message, {
                      position: "top-center",
                      autoClose: 6000, 
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
                    });

                    closeModalConfirmacao() 
                  }

                })
                .catch((err) => console.log(err));
            }}
          />
        )}
      </div>
    </>
  );
}

