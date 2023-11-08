import React from "react";
import styles from "./style.module.css";
import { AiFillCloseCircle } from "react-icons/ai";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ModalConfirmation = ({ medicoInfo, closeModal, onClick }) => {

  const idMedico = medicoInfo.id;
  return (
    <div className={styles["modalContainer"]}>
       
      <div className={styles["modalBox"]}>
        <div className={styles["modalContent"]}>
          <div className={styles["closeButtonModal"]} onClick={closeModal}>
            <AiFillCloseCircle style={{ fill: "#fa0000" }} />
          </div>
          <div className={styles["content"]}>
            <h1 className={styles["title"]}>
              Tem certeza que deseja excluir esse médico?
            </h1>
            <div className={styles["boxButtons"]}>
              <button onClick={closeModal} className={styles["buttonEnvModal"]}>
                voltar
              </button>
              <button
                onClick={()=>{
                  onClick(idMedico)
                  closeModal
                }}
                className={styles["buttonCancelarConsulta"]}
              >
                excluir médico
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
