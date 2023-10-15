import React from 'react';
import styles from '../styles/Header.module.css'


function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <img className={styles.logo__img} src="/images/logo.png" alt=""/>
                <a href="/" className={styles.logo}> Bebê-Vindo </a>
            </div>

            <nav className={styles.navbar}>
                <a id='login__btn' href="/login">Login</a>
            </nav>
        </header>
    );
};

export default Header;