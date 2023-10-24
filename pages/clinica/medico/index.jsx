import React, { useState, useEffect } from 'react';
import styles from '../../../styles/Medico.module.scss';
import Medico from '../../.././components/clinica/medicosClinica/Medico';
import Sidebar from "../../.././components/clinica/sideBar/SidebarClinica";
import { useRouter } from 'next/router';

export default function Medicos() {
    const router = useRouter();
    const [medicos, getMedicos] = useState([]); // Armazena os dados dos médicos

    const handleClick = () => {
        // redirecionar para outra página
        router.push('/clinica/cadastroMedico');
    };

    useEffect(() => {
        //solicitação GET à API 
        fetch('http://localhost:3005/clinica/profissional/5')
            .then((response) => response.json())
            .then((data) => {
                console.log(data); // Adicione esta linha para ver a resposta da API
                getMedicos(data.clinicas);
            });
    }, []);
    

    return (
        <div>
            < Sidebar />
            <div className={styles.container_geral}>
            <div className={styles.container_dados}>
                <div className={styles.container_cima}>
                    <div className={styles.title}>Gerenciar Médicos</div>

                    <div className={styles.inputs}>
                        <button className={styles.button} onClick={handleClick}>
                            +
                        </button>
                        <input className={styles.search}></input>
                        <input className={styles.filter}></input>
                    </div>
                </div>

                <div className={styles.box_medicos}>
                    {Array.isArray(medicos) ? (
                        medicos.map((medico) => (
                            <Medico key={medico.id} medico={medico} />
                        ))
                    ) : (
                        <p>Nenhum médico disponível</p>
                    )}
                </div>

            </div>
        </div>
        </div>
    );
}
