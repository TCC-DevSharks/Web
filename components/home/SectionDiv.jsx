import React from "react";
import styles from "./SectionDiv.module.scss";
import { FaUserDoctor, FaAppleWhole } from "react-icons/fa6";
import { FaFileMedical } from "react-icons/fa";
import { BsFillChatDotsFill } from "react-icons/bs";
import { TbYoga } from "react-icons/tb";

function SectionDiv() {
  return (
    <section className={styles.divLine}>
      <div className={styles.container}>
        <div className={styles.container__text}>
          <div>
            <h1>
              Conheça nossos <span>serviços: </span>{" "}
            </h1>
          </div>
        </div>

        <div className={styles.container__funcionalidades}>
          <div className={styles.funcionalidade}>
            <div className={styles.descricao}>
              <span>
                {" "}
                <FaUserDoctor />{" "}
              </span>
              <span className={styles.text}>Diversas especialidades</span>
            </div>
          </div>

          <div className={styles.funcionalidade}>
            <div className={styles.descricao}>
              <span>
                {" "}
                <FaFileMedical />{" "}
              </span>
              <span className={styles.text}>Serviço de prontuário</span>
            </div>
          </div>

          <div className={styles.funcionalidade}>
            <div className={styles.descricao}>
              <span>
                {" "}
                <BsFillChatDotsFill />{" "}
              </span>
              <span className={styles.text}>Contate um médico</span>
            </div>
          </div>

          <div className={styles.funcionalidade}>
            <div className={styles.descricao}>
              <span>
                {" "}
                <FaAppleWhole />{" "}
              </span>
              <span className={styles.text}>Acompanhe sua dieta</span>
            </div>
          </div>

          <div className={styles.funcionalidade}>
            <div className={styles.descricao}>
              <span>
                {" "}
                <TbYoga />{" "}
              </span>
              <span className={styles.text}>Exercícios selecionados</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SectionDiv;
