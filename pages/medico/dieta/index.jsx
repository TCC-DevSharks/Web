import React, { useEffect, useState } from 'react';
import styles from './Dieta.module.css';
import TituloSecao from '../../../components/tituloSection/TituloSecao';
import PacienteDieta from '../../../components/medico/dieta/pacienteDieta/PacienteDieta';
import Sidebar from '../../../components/sideBar/Sidebar';
import axios from 'axios';
import { AiOutlineArrowRight } from 'react-icons/ai'
import ModalDieta from './modalDieta';
import { IoAddCircleSharp, IoRemoveCircleSharp } from 'react-icons/io5';


const Dieta = () => {
    const [listpacientes, setPacientes] = useState();
    const [listUnicPacientes, setUnicPaciente] = useState();
    const [categoriaRefeicao, setCategoriaRefeicao] = useState("")

    const [selectedPaciente, setSelectedPaciente] = useState(null);
    const [isModalOpen, setModalIsOpen] = useState(false);

    const [isRefeicoesModalOpen, setRefeicoesModalOpen] = useState(false);
    const [isRefeicaoPadraoModalOpen, setRefeicaoPadraoModalOpen] = useState(false);

    const [isAdicionarRefeicaoPadraoModalOpen, setAdicionarRefeicaoPadraoModalOpen] = useState(false);
    const [isAdicionarAlimentoRefeicaoPadraoModalOpen, setAdicionarAlimentoRefeicaoPadraoModalOpen] = useState(false);
    const [refeicoesPadrao, setRefeicoesPadrao] = useState([]);
    const [selectedRefeicao, setSelectedRefeicao] = useState(null);
    const [alimentosRefeicaoPadrao, setAlimentosRefeicaoPadrao] = useState([]);
    const [listaAlimentos, setListaAlimentos] = useState([]);


    const openRefeicoesModal = () => {
        setRefeicoesModalOpen(true);
    };
    const closeRefeicoesModal = () => {
        setRefeicoesModalOpen(false);
    };

    const openRefeicaoPadraoModal = async (idRefeicao) => {
        try {
            const response = await axios.get(`https://api-bebevindo.azurewebsites.net/refeicao/padrao/alimento/${idRefeicao}`);
            const data = response.data;
            setAlimentosRefeicaoPadrao(Array.isArray(data.alimentos) ? data.alimentos : []); // Ajuste aqui
            setRefeicaoPadraoModalOpen(true);
            console.log(data);
        } catch (error) {
            console.error('Erro ao buscar alimentos da refeição padrão:', error);
            // Adicione lógica para lidar com o erro, como exibir uma mensagem para o usuário
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
            // Faça a solicitação para obter a lista de alimentos
            const response = await axios.get('https://api-bebevindo.azurewebsites.net/refeicao/lista/alimento');
            const data = response.data;

            console.log('Data recebida:', data);

            setListaAlimentos(Array.isArray(data.alimentos) ? data.alimentos : []);
        } catch (error) {
            console.error('Erro ao buscar a lista de alimentos:', error);
            // Adicione lógica para lidar com o erro, como exibir uma mensagem para o usuário
        }
    };
    const closeAdicionarAlimentoRefeicaoPadraoModal = () => {
        setAdicionarAlimentoRefeicaoPadraoModalOpen(false);
    };

    const openModalForPaciente = (paciente) => {
        setSelectedPaciente(paciente);
        setModalIsOpen(true);
    };

    const [isRefeicoesModalDietaOpen, setRefeicoesModalDietaOpen] = useState(false);
    const openRefeicoesModalDieta = () => {
        setRefeicoesModalDietaOpen(true);
    };
    const closeRefeicoesModalDieta = () => {
        setRefeicoesModalDietaOpen(false);
    };

    const IdMedico = localStorage.getItem("id");

    useEffect(() => {
        const url = `https://api-bebevindo.azurewebsites.net/profissional/gestante/${IdMedico}`;

        function getPacientes() {
            axios.get(url)
                .then(response => {
                    const data = response.data;

                    const pacientesPorId = data.pacientes.reduce((obj, paciente) => {
                        obj[paciente.idGestante] = paciente;
                        return obj;
                    }, {});

                    const pacientesUnicos = Object.values(pacientesPorId);

                    setPacientes(pacientesUnicos);
                })
                .catch(error => {
                    console.error(error);
                });
        }
        getPacientes();
    }, []);


    useEffect(() => {
        // Obtenha as refeições padrão da API
        const fetchRefeicoesPadrao = async () => {
            try {
                const response = await axios.get(`https://api-bebevindo.azurewebsites.net/refeicao/padrao/profissional/${IdMedico}`);
                const data = response.data;
                setRefeicoesPadrao(data);
                console.log(data) // Assumindo que a resposta da API é um array de refeições
            } catch (error) {
                console.error('Erro ao buscar refeições padrão:', error);
            }
        };

        fetchRefeicoesPadrao();
    }, []);

    const adicionarAlimentoRefeicaoPadrao = async (idAlimento) => {
        try {
            const response = await axios.post('https://api-bebevindo.azurewebsites.net/refeicao/padrao/alimento/', {
                id_alimento: idAlimento,
                id_refeicao: selectedRefeicao.id, 
            });
    
            openRefeicaoPadraoModal(selectedRefeicao.id);
        } catch (error) {
            console.error('Erro ao adicionar alimento à refeição padrão:', error);
        }
    };
    
    const removerAlimentoRefeicaoPadrao = async (idAlimento) => {
        try {
            console.log('ID do alimento a ser removido:', idAlimento);
            console.log('ID da refeição a ser removida:', selectedRefeicao.id);
            await axios.delete(`https://api-bebevindo.azurewebsites.net/refeicao/padrao/${selectedRefeicao.id}/alimento/${idAlimento}`);
            console.log("ID da refeição a ser removida:", selectedRefeicao.id);
    
            // Atualize a lista de alimentos da refeição padrão
            openRefeicaoPadraoModal(selectedRefeicao.id);
        } catch (error) {
            console.error('Erro ao remover alimento da refeição padrão:', error);
            // Adicione lógica para lidar com o erro, como exibir uma mensagem para o usuário
        }
    };

    return (
        <>
            <Sidebar />

            <div className={styles['dieta-container']}>
                <TituloSecao title="Gerenciar Dietas" />

                <div className={styles['container-geral']}>
                    <div className={styles['container-pacientes']}>
                        <div > <input type="text" placeholder='Pesquisar paciente:' /> </div>

                        <div> <span> Selecione um paciente para gerenciar a dieta: </span> </div>

                        <div className={styles['box-pacientes']}>
                            {listpacientes && listpacientes.map(paciente => (
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

                    <div className={styles['container-dieta']}>
                        <div className={styles['box-dieta']}>
                            <h2>Refeições Padrão</h2>
                            <span>Crie padrões de refeição para agilizar a consulta! </span>
                        </div>

                        <div className={styles['container-refeicoes-padrao']}>
                            <div className={styles['todas-refeicoes-padrao']}>
                                {Array.isArray(refeicoesPadrao.refeicao) && refeicoesPadrao.refeicao.map((refeicao, index) => (
                                    <div
                                        key={index}
                                        className={styles['refeicao-padrao']}
                                        onClick={() => {
                                            setSelectedRefeicao(refeicao);
                                            openRefeicaoPadraoModal(refeicao.id);
                                        }}
                                    >
                                        <span>{refeicao.nome}</span>
                                    </div>
                                ))}
                            </div>
                            <button onClick={openAdicionarRefeicaoPadraoModal}>+</button>
                        </div>

                        {isRefeicaoPadraoModalOpen && (
                            <div className={styles['modalContainerRefeicoesPadrao']}>
                                <div className={styles['modalBox']}>
                                    <div className={styles['modalContentRefeicoes']}>
                                        <span onClick={closeRefeicaoPadraoModal} className={styles['closeButtonModal']}>&times;</span>
                                        <h2>{selectedRefeicao?.nome}</h2>
                                        <h4>Aqui vão aparecer os alimentos que estão inclusos na refeição padrão clicada. Aí vai dar pra adicionar mais alimentos e remover os já existentes também:</h4>
                                        <div className={styles["foods"]}>
                                            <div className={styles["boxFood"]} >
                                                {alimentosRefeicaoPadrao.map((alimento, index) => (
                                                    <div key={index} className={styles["foodItem"]}>
                                                        <div className={styles["imageFood"]}>
                                                            <img
                                                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                                                src={alimento.imagem}
                                                                alt={alimento.nome}
                                                            />
                                                        </div>
                                                        <div className={styles["foodInformations"]}>
                                                            <span>{alimento.nome}</span>
                                                            <IoRemoveCircleSharp
                                                                style={{ fontSize: "1.5rem", color: "red", cursor: "pointer" }}
                                                                onClick={() => removerAlimentoRefeicaoPadrao(alimento.idAlimento)}
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            <button onClick={openAdicionarAlimentoRefeicaoPadraoModal}>Adicionar alimentos</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {isAdicionarRefeicaoPadraoModalOpen && (
                            <div className={styles['modalContainerRefeicoesPadrao']}>
                                <div className={styles['modalBox']}>
                                    <div className={styles['modalContentRefeicoes']}>
                                        <span onClick={closeAdicionarRefeicaoPadraoModal} className={styles['closeButtonModal']}>&times;</span>
                                        <h2>ADICIONAR refeição padrão</h2>
                                        <h4>Aqui vc vai poder criar uma nova refeicao</h4>
                                    </div>
                                </div>
                            </div>
                        )}

                        {isAdicionarAlimentoRefeicaoPadraoModalOpen && (
                            <div className={styles['modalContainerRefeicoes']}>
                                <div className={styles['modalBox']}>
                                    <div className={styles['modalContentRefeicoes']}>
                                        <span onClick={closeAdicionarAlimentoRefeicaoPadraoModal} className={styles['closeButtonModal']}>&times;</span>
                                        <h2>Gerenciar alimentos em: {selectedRefeicao.nome}</h2>
                                        <h4>Clique para adicionar ou remover um alimento da sua Refeição Padrão.</h4>

                                        <div className={styles["foods"]}>

                                            <div className={styles["boxFood"]}>
                                                {listaAlimentos.map((alimento, index) => (
                                                    <div key={index} className={styles["foodItem"]}>
                                                        <div className={styles["imageFood"]}>
                                                            <img
                                                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                                                src={alimento.imagem}
                                                                alt={alimento.nome}
                                                            />
                                                        </div>
                                                        <div className={styles["foodInformations"]}>
                                                            <span>{alimento.nome}</span>
                                                            <IoAddCircleSharp
                                                                style={{ fontSize: "1.5rem", color: "#b6b6f6", cursor: "pointer" }}
                                                                onClick={() => adicionarAlimentoRefeicaoPadrao(alimento.id)}
                                                            />
                                                        </div>
                                                    </div>))}
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        )}
                    </div>



                    {isModalOpen && (
                        <div className={styles['modalContainer']}>
                            <div className={styles['modalBox']}>
                                <div className={styles['modalContent']}>
                                    <span onClick={() => setModalIsOpen(false)} className={styles['closeButtonModal']}>&times;</span>
                                    <div className={styles['nome-paciente-modal']}>
                                        <div>
                                            <img src={selectedPaciente.foto} alt="" />
                                        </div>
                                        <p> {selectedPaciente && selectedPaciente.nome}</p>
                                    </div>
                                    <div className={styles['refeicoes-pacientes-modal']}>
                                        <div className={styles['refeicoes-pacientes']} onClick={openRefeicoesModal}>
                                            <span>Nome refeição 1</span>
                                            <p>19:00</p>
                                        </div>

                                        <div className={styles['refeicoes-pacientes']} onClick={openRefeicoesModal}>
                                            <span>Nome refeição 2</span>
                                            <p>19:00</p>
                                        </div>

                                        <div className={styles['refeicoes-pacientes']} onClick={openRefeicoesModal}>
                                            <span>Nome refeição 3</span>
                                            <p>19:00</p>
                                        </div>
                                    </div>
                                    <button onClick={openRefeicoesModalDieta}>Adicionar refeição</button>
                                </div>
                            </div>


                            {isRefeicoesModalOpen && (
                                <div className={styles['modalContainerRefeicoes']}>
                                    <div className={styles['modalBox']}>
                                        <div className={styles['modalContentRefeicoes']}>
                                            <span onClick={closeRefeicoesModal} className={styles['closeButtonModal']}>&times;</span>
                                            <h2>Nome da refeição</h2>
                                            <h4>Aqui vão aparecer os alimentos que estão inclusos na refeição clicada. aí vai dar pra add mais alimentos e remover os ja existentes tbm:</h4>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {isRefeicoesModalDietaOpen && (
                                <ModalDieta
                                    title="Título do Modal"
                                    categoria="Categoria do Modal"
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