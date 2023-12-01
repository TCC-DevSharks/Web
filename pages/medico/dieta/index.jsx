import React, { useEffect, useState } from 'react';
import styles from './Dieta.module.css';
import TituloSecao from '../../../components/tituloSection/TituloSecao';
import PacienteDieta from '../../../components/medico/dieta/pacienteDieta/PacienteDieta';
import Sidebar from '../../../components/sideBar/Sidebar';
import axios from 'axios';
import { AiOutlineArrowRight } from 'react-icons/ai'
import ModalDieta from './modalDieta';

const Dieta = () => {
    const [listpacientes, setPacientes] = useState();
    const [listUnicPacientes, setUnicPaciente] = useState();
    const [categoriaRefeicao, setCategoriaRefeicao] = useState("")

    const [selectedPaciente, setSelectedPaciente] = useState(null);
    const [isModalOpen, setModalIsOpen] = useState(false);

    const openModalForPaciente = (paciente) => {
        setSelectedPaciente(paciente);
        setModalIsOpen(true);
    };

    useEffect(() => {
        const IdMedico = localStorage.getItem("id");
        const url = `https://api-bebevindo.azurewebsites.net/profissional/gestante/${IdMedico}`;

        function getPacientes() {
            axios.get(url)
                .then(response => {
                    const data = response.data;

                    // Cria um objeto onde as chaves são os IDs dos pacientes
                    const pacientesPorId = data.pacientes.reduce((obj, paciente) => {
                        obj[paciente.idGestante] = paciente;
                        return obj;
                    }, {});

                    // Converte o objeto de volta para um array
                    const pacientesUnicos = Object.values(pacientesPorId);

                    setPacientes(pacientesUnicos);
                })
                .catch(error => {
                    console.error(error);
                });
        }
        getPacientes();
    }, []);

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
                            <div className={styles['refeicao-padrao']}>
                                <span>Nome da refeição</span>
                                <p>19:00</p>
                            </div>

                            <div className={styles['refeicao-padrao']}>
                                <span>Nome da refeição</span>
                                <p>19:00</p>
                            </div>

                            <div className={styles['refeicao-padrao']}>
                                <span>Nome da refeição</span>
                                <p>19:00</p>
                            </div>

                            <div className={styles['refeicao-padrao']}>
                                <span>Nome da refeição</span>
                                <p>19:00</p>
                            </div>
                        </div>

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
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </>
    );
};

export default Dieta;