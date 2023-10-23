import React from 'react';
import styles from '../../styles/Agenda.module.css';
import TituloSecao from '../../../components/tituloSection/TituloSecao';

export default function Agenda() {
    return (
        <div>
            <span>teste</span>
            <div className={styles['agenda-container']}>
                <TituloSecao title="Agenda" />
            </div>
        </div>
    );
};


