import React, { useEffect, useState } from 'react';
import styles from './Dieta.module.css';
import TituloSecao from '../../../components/tituloSection/TituloSecao';
import PacienteDieta from '../../../components/medico/dieta/pacienteDieta/PacienteDieta';
import Sidebar from '../../../components/sideBar/Sidebar';
import axios from 'axios';
import { AiOutlineArrowRight } from 'react-icons/ai'
import { ModalDieta } from './modalDieta';

const Dieta = () => {
    const [listpacientes, setPacientes] = useState();
    const [listUnicPacientes, setUnicPaciente] = useState();

    useEffect(() => {
        const IdMedico = localStorage.getItem("id");
        const url = `https://api-bebevindo.azurewebsites.net/profissional/gestante/${IdMedico}`;

        function getPacientes() {
            axios.get(url)
                .then(response => {
                    const data = response.data;
                    console.log(data);

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

                        <div >
                            <input type="text" placeholder='Pesquisar paciente:' />
                        </div>
                        <div>
                            <span>Todos:</span>
                        </div>
                        <div className={styles['box-pacientes']}>
                            {listpacientes && listpacientes.map(paciente => (
                                <PacienteDieta
                                    key={paciente.idGestante}
                                    nome={paciente.nome}
                                    foto={paciente.foto}
                                    semanas={paciente.semana_gestacao}
                                />
                            ))}
                        </div>
                    </div>

                    <div className={styles['container-dieta']}>
                        <div className={styles['box-dieta']}>
                            <div className={styles['box-controler-breakfast']}>
                                <div className={styles['boxContent']}>
                                    <span style={{ display: 'flex', alignItems: 'center', fontSize: '1.4rem' }}>
                                        Café da manhã {/* <MdFreeBreakfast/> */}
                                    </span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#b6b6f6', cursor: 'pointer' }}>
                                        adicionar meta calorica <AiOutlineArrowRight />
                                    </span>
                                </div>
                            </div>
                            <div className={styles['box-controler-breakfast']}>
                                <div className={styles['boxContent']}>
                                    <span style={{ display: 'flex', alignItems: 'center', fontSize: '1.4rem' }}>
                                        Almoço {/* <PiBowlFoodFill/> */}
                                    </span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#b6b6f6', cursor: 'pointer' }}>
                                        adicionar meta calorica <AiOutlineArrowRight />
                                    </span>
                                </div>
                            </div>
                            <div className={styles['box-controler-breakfast']}>
                                <div className={styles['boxContent']}>
                                    <span style={{ display: 'flex', alignItems: 'center', fontSize: '1.4rem' }}>
                                        Lanche da Tarde {/* <MdFreeBreakfast/> */}
                                    </span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#b6b6f6', cursor: 'pointer' }}>
                                        adicionar meta calorica <AiOutlineArrowRight />
                                    </span>
                                </div>
                            </div>
                            <div className={styles['box-controler-breakfast']}>
                                <div className={styles['boxContent']}>
                                    <span style={{ display: 'flex', alignItems: 'center', fontSize: '1.4rem' }}>
                                        Janta {/* <MdFreeBreakfast/> */}
                                    </span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#b6b6f6', cursor: 'pointer' }}>
                                        adicionar meta calorica <AiOutlineArrowRight />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ModalDieta title="Titulo" categoria="nsbb" />
            </div>
        </>
    );
};

export default Dieta;