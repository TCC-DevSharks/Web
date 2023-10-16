import React, { useEffect, useState } from 'react';
import styles from '../../styles/Prontuario.module.css';
import TituloSecao from '@/components/TituloSecao';
import PacienteProntuario from '@/components/PacienteProntuario';
import Sidebar from '@/components/Sidebar';

const Prontuario = () => {
    const [pacientes, setPacientes] = useState([]);

    const getPacientes = async () => {
        try {
            const response = await fetch('http://localhost:3000/profissional/gestante/16', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setPacientes(data); 
            } else {
                console.error('Erro ao fazer a solicitação:', response.status);
            }
        } catch (error) {
            console.error('Erro ao fazer a solicitação:', error);
        }
    };

    useEffect(() => {
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
                            {
                            pacientes.map(paciente => (
                                <PacienteProntuario
                                    key={paciente.id}
                                    foto={paciente.foto}
                                    nome={paciente.nome}
                                    descricao={paciente.cep}
                                    semanas={2}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Prontuario;
