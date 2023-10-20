import React from 'react';
import styles from '../styles/Medico.module.scss';

const Medico = ({ medico }) => {
    return (
        <div className={styles.medico}>
            <div className={styles.foto_medico}>
                <img src={medico.foto} alt={medico.nome} />
            </div>

            <div className={styles.nome_medico}>{medico.nome}</div>
        </div>
    );
};

export default Medico;
