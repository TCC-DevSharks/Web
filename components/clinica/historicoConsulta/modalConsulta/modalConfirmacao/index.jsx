import React from "react";
import styles from "./style.module.css";
import { AiFillCloseCircle } from "react-icons/ai";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ModalConfirmation = ({ pacienteInfo, closeModal, onClick }) => {
  const idConsulta = pacienteInfo.idConsulta;
  // const url = `http://localhost:3000/consulta/${idConsulta}`;

  // function deleteConsulta() {
  //   axios
  //     .delete(url)
  //     .then((response) => {
  //       const data = response.data;
  //       console.log(data);
  //       if (data.status === 404)  {
  //         toast.error(data.message, {
  //           position: "top-center",
  //           autoClose: 6000, 
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //           theme: "light",
  //         });
  //         setTimeout(closeModal, 5000); 
  //       } else {
            
  //         toast.success(data.message, {
  //           position: "top-center",
  //           autoClose: 6000, // Aumenta o tempo de exibição para 6 segundos
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //           theme: "light",
  //         });

  //         setTimeout(closeModal, 5000); // Fecha o modal após 5 segundos
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // }

  return (
    <div className={styles["modalContainer"]}>
        <ToastContainer
        position="top-center"
        autoClose={6000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="black" />
      <div className={styles["modalBox"]}>
        <div className={styles["modalContent"]}>
          <div className={styles["closeButtonModal"]} onClick={closeModal}>
            <AiFillCloseCircle style={{ fill: "#fa0000" }} />
          </div>
          <div className={styles["content"]}>
            <h1 className={styles["title"]}>
              Tem certeza que deseja cancelar essa consulta?
            </h1>
            <div className={styles["boxButtons"]}>
              <button onClick={closeModal} className={styles["buttonEnvModal"]}>
                voltar
              </button>
              <button
                onClick={()=>{
                  onClick(idConsulta)
                  closeModal
                }}
                className={styles["buttonCancelarConsulta"]}
              >
                cancelar consulta
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
