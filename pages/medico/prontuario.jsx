"use client"
import React from 'react';
import styles from '../../styles/Prontuario.module.css';
import TituloSecao from '/components/TituloSecao';
import PacienteProntuario from '/components/PacienteProntuario';
import Sidebar from '/components/Sidebar';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import Image from 'next/image';




const Prontuario = () => {
    const [listpacientes, setPacientes] = useState()

   

    useEffect(()=>{
         const url = 'http://localhost:3000/profissional/gestante/16'

        function getPacientes() {
            axios.get(url)
                .then(response => {
                    const data = response.data
                    setPacientes(data)

                })
                .catch(console.error())
        }

        getPacientes()
    }, [])
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
                          
                                listpacientes?.pacientes.map(paciente => (
                                    
                                    <div>
                                        <PacienteProntuario foto={paciente.foto} nome={paciente.nome} semanas={paciente.semana_gestacao} dataConsulta={paciente.dia} horaConsulta={paciente.hora} />
                                    </div>
                                    )
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Prontuario;
