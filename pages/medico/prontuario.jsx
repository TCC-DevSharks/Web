import React, { useState } from 'react';
import styles from '../../styles/Prontuario.module.css';
import TituloSecao from '/components/TituloSecao';
import PacienteProntuario from '../../components/medico/prontuario/PacienteProntuario';
import Sidebar from '/components/Sidebar';
import axios from 'axios';
import { useEffect } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Modal } from './prontuario/modal';

const Prontuario = () => {
    const [listpacientes, setPacientes] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPaciente, setSelectedPaciente] = useState(null);

    const handlePacienteClick = (pacienteInfo) => {
        setSelectedPaciente(pacienteInfo);
        setIsModalOpen(true);
    };

    useEffect(() => {
        const url = 'http://localhost:3005/profissional/gestante/9';

        function getPacientes() {
            axios.get(url)
                .then(response => {
                    const data = response.data;
                    setPacientes(data);
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
            <div className={styles['prontuario-container']}>
                <TituloSecao title="Gerenciar Prontuários" />

                <div className={styles['prontuarios']}>
                    <div className={styles['input-area']}>
                        <input type="text" placeholder='Pesquise um paciente' />
                    </div>
                    <div className={styles['pacientes']}>
                        <span className={styles['title-pacientes']}>Todos os pacientes:</span>
                        <div className={styles['container']}>
                            {listpacientes?.pacientes.map(paciente => (
                                <div key={paciente.id}>
                                    <PacienteProntuario
                                        idConsulta={paciente.idConsulta}
                                        foto={paciente.foto}
                                        nome={paciente.nome}
                                        semanas={paciente.semana_gestacao}
                                        dataConsulta={paciente.dia}
                                        horaConsulta={paciente.hora}
                                        especialidade={paciente.especialidade}
                                        onPacienteClick={handlePacienteClick}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {isModalOpen && (
                    <Modal
                        pacienteInfo={selectedPaciente}
                        closeModal={() => {
                            setIsModalOpen(false)}
                        }
                    />
                )}
            </div>
        </>
    );
};

export default Prontuario;
