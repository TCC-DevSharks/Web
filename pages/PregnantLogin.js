import React from 'react';

import Header from '../components/Header'

// import '../styles/Login.module.css';
import styles from '../styles/PregnantLogin.module.css';

function PregnantLogin() {
    return (
        <div>
            <Header />
            <div className={styles.p_login_container}>
                <div className={styles.dowload_app}>
                    <h4 className={styles.h4}>Disponível apenas na versão app para uma </h4>
                    <h4 className={styles.h4}>melhor experiência.</h4>
                    <img className={styles.download} src="./images/download.png" alt="" />
                </div>

                <div className={styles.phone}>
                    <img src="./images/app_mobile.png" alt="" />
                </div>
            </div>
        </div>
    );
};

export default PregnantLogin;