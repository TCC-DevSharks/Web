// Agenda.js
import React from 'react';
import styles from './../styles/Agenda.module.css';
import TituloSecao from '@/components/TituloSecao';
import Calendar from '@/components/Calendar';

const Agenda = () => {
    return (
        <div className={styles['agenda-container']}>
            <TituloSecao title="Agenda" />
            <Calendar/>
        </div>
        
    );
};

export default Agenda;

