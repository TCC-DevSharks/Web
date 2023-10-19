import React, { useEffect, useState } from 'react';
import styles from '../../styles/Dieta.module.css';
import TituloSecao from '../../components/TituloSecao';
import PacienteDieta from '../../components/PacienteDieta';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';

const Dieta = () => {
    const [listpacientes, setPacientes] = useState();

    useEffect(() => {
        const url = 'http://localhost:3000/profissional/gestante/16';

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
        <Sidebar/>
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
                            {   
                                listpacientes?.pacientes.map(paciente => (
                                    <div key={paciente.id}>
                                         <PacienteDieta nome={paciente.nome}  semanas={paciente.semanas} />
                                    </div>
                                    
                                ))
                                
                            }
                            
                            
                        </div>

                    </div>

                    <div className={styles['container-dieta']}>
                        <div className={styles['box-dieta']}></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dieta;
