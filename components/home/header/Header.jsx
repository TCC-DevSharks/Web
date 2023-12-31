import React from "react";
import styles from "./Header.module.scss";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img className={styles.logo__img} src="/images/logo.png" alt="" />
          <a href="/" className={styles.logo}>
            {" "}
            Bebê-Vindo{" "}
          </a>
        </div>

        <nav className={styles.navbar}>
          <a id={styles.login__btn} href="/login">
            Login
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
