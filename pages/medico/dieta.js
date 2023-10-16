import React from 'react';
import styles from '../../styles/Dieta.module.css';
import TituloSecao from '@/components/TituloSecao';
import PacienteDieta from '@/components/PacienteDieta';
import Sidebar from '@/components/Sidebar';

const Dieta = () => {
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
                            <PacienteDieta />
                            <PacienteDieta />
                            <PacienteDieta />
                            <PacienteDieta />
                            <PacienteDieta />
                            <PacienteDieta />
                            <PacienteDieta />
                            <PacienteDieta />
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
