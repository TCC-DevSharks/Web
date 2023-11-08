import styles from "./style.module.css";
import { AiFillCloseCircle } from "react-icons/ai";
import { useState } from "react";
import { ModalConfirmation } from "./modalConfirmacao";


export function ModalHistorico({ pacienteInfo, closeModal, onClick }) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hora, min] = pacienteInfo.hora.split(":");

  const handleConfirmacaoClick = function () {
    setIsModalOpen(true)
  }

  return (
    <div className={styles["modalContainer"]}>
      <div className={styles["modalBox"]}>
        <div className={styles["modalContent"]}>
          <div className={styles["closeButtonModal"]} onClick={closeModal}>
            <AiFillCloseCircle style={{ fill: "#fa0000" }} />
          </div>
          <h2 style={{ color: "#464444", fontSize: "2.4rem" }}>
            Paciente:{" "}
            <span style={{ color: "#b6b6f6" }}>{pacienteInfo.gestante}</span>
          </h2>
          <div className={styles["especialidadesBox"]}>
            <div className={styles["item"]}>
              <h4>Especialidade:</h4>
              <div className={styles["boxButtonEspecialidade"]}>
                <button className={styles["buttonEspecialidade"]}>
                  {pacienteInfo.especialidade}
                </button>
              </div>
            </div>
            <div className={styles["item"]}>
              <h4>Médico:</h4>
              <div className={styles["boxButtonEspecialidade"]}>
                <button className={styles["buttonEspecialidade"]}>
                  Dr.{pacienteInfo.profissional}
                </button>
              </div>
            </div>
            <div className={styles["item"]}>
              <h4>Valor da Consulta:</h4>
              <div className={styles["boxButtonEspecialidade"]}>
                <button className={styles["buttonData"]}>R$200,00</button>
              </div>
            </div>
          </div>

          <div className={styles["datasBox"]}>
            <div className={styles["item"]}>
              <h4>Data da consulta:</h4>
              <div className={styles["boxButtonEspecialidade"]}>
                <button className={styles["buttonData"]}>
                  {pacienteInfo.dia}
                </button>
              </div>
            </div>
            <div className={styles["item"]}>
              <h4>Hora:</h4>
              <div className={styles["boxButtonEspecialidade"]}>
                <button className={styles["buttonData"]}>
                  {hora}:{min}
                </button>
              </div>
            </div>
            <div className={styles["item"]}>
              <h4>Telefone paciente:</h4>
              <div className={styles["boxButtonEspecialidade"]}>
                <button className={styles["buttonData"]}>
                  {pacienteInfo.telefone}
                </button>
              </div>
            </div>
          </div>
          <div className={styles["datasBox"]}>

          </div>
          <div className={styles["boxButtons"]}>
            <button onClick={closeModal} className={styles["buttonEnvModal"]}>voltar</button>

            <button onClick={handleConfirmacaoClick} className={styles["buttonCancelarConsulta"]}>
              cancelar consulta
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <ModalConfirmation
          pacienteInfo={pacienteInfo}
          closeModal={() => {
            setIsModalOpen(false)
          }}
          onClick={onClick}
        />
      )}
    </div>
  );
}
