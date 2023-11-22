import React, { useState } from 'react';
import styles from '../../../styles/Prontuario.module.css';
import TituloSecao from '../../../components/tituloSection/TituloSecao';
import PacienteProntuario from '../../../components/medico/prontuario/PacienteProntuario';
import Sidebar from '../../../components/sideBar/Sidebar';
import axios from 'axios';
import { useEffect } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Modal } from './modal';

const Prontuario = () => {
    const [listpacientes, setPacientes] = useState({ pacientes: [] });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPaciente, setSelectedPaciente] = useState(null);

    const handlePacienteClick = (pacienteInfo) => {
        console.log(pacienteInfo);
        setSelectedPaciente(pacienteInfo);
        setIsModalOpen(true);
    };

    useEffect(() => {
        const IdMedico = localStorage.getItem("id");
        const url = `https://api-bebevindo.azurewebsites.net/profissional/gestante/${IdMedico}`;

        function getPacientes() {
            axios
                .get(url)
                .then((response) => {
                    // Filtrar pacientes únicos
                    const pacientesUnicos = response.data.pacientes
                        ? Array.from(new Set(response.data.pacientes.map(paciente => paciente.idGestante)))
                            .map(id => response.data.pacientes.find(paciente => paciente.idGestante === id))
                        : [];

                    setPacientes({ pacientes: pacientesUnicos });
                })
                .catch((error) => {
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
                        <div className={styles['container']}>
                            {listpacientes?.pacientes &&
                                listpacientes.pacientes.map(paciente => (
                                    <div key={paciente.idGestante}>
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
                            setIsModalOpen(false)
                        }
                        }
                    />
                )}
            </div>
        </>
    );
};

export default Prontuario;
