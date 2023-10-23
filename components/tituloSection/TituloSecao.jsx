import React from 'react';
import styles from '../../styles/Perfil.module.css';
import Sidebar from '../sideBar/Sidebar';

const TituloSecao = ({ title }) => {
    return (
        <>
            <Sidebar />
            <div className={styles['perfil-header']}>
                {title}
            </div>
        </>
    );
};

export default TituloSecao;