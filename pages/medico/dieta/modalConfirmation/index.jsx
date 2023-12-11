import axios from "axios";
import style from "./style.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

export function ModalConfirmation({ idRefeicao, closeModal, get }) {
  const [isModalOpen, setModalOpen] = useState(true);

  const deleteRefeicao = () => {
    const url = `https://api-bebevindo.azurewebsites.net/dieta/refeicao/${idRefeicao}`;
    axios
      .delete(url)
      .then((response) => {
        const data = response.data;
        toast.success(data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        closeModal();
        setModalOpen(false);
        get()
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {isModalOpen && (
        <div className={style.ContainerModal}>
          <div className={style.BoxModal}>
            <h1 style={{ color: "#000" }}>
              Você deseja excluir está refeição?
            </h1>
            <div className={style.buttons}>
              <button onClick={() => closeModal()}>Cancelar</button>
              <button
                onClick={() => deleteRefeicao()}
                id={style.teste}
                className={style.exluir}
              >
                Excluir refeição
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
