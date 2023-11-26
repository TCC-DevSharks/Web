import React from "react";
import styles from "./SectionHome.module.scss";

function SectionHome() {
  return (
    <section className={styles.home}>
      <div className={styles.container}>
        <div className={styles.container__text_home}>
          <div>
            <h1>
              Acompanhe e cuide da sua 
              <span> gravidez.</span>
            </h1>
          </div>
          <p>
            Bebê-Vindo é uma comunidade de apoio e conhecimento que conecta
            futuras mamães aos seus médicos, proporcionando uma jornada mais
            tranquila e informada. Baixe agora e descubra como podemos tornar
            este momento ainda mais especial!
          </p>

          <button className={styles.button_home}>Baixe o App!</button>
        </div>
        <div className={styles.container__img_home}>
          <img src="./images/imgHome.png" alt="" />
        </div>{" "}
      </div>
    </section>
  );
}

export default SectionHome;
