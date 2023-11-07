import styles from "./style.module.css";
import { AiFillCloseCircle, AiOutlineArrowRight } from "react-icons/ai";
import { useState } from "react";
import axios from "axios";
import { ModalConfirmation } from "./modalConfirmacao";

export function ModalMedico({ medicoInfo, closeModal }) {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hora, min] = medicoInfo.inicio_atendimento.split(":");

  const [valor, setValor] = useState("");

  const handleConfirmacaoClick = function () {
    setIsModalOpen(true);
  };

  const infoPessoalMedico = {
    list: [
      {
        nome: medicoInfo.nome,
      },
      {
        data_nascimento: medicoInfo.data_nascimento,
      },
      {
        cpf: medicoInfo.cpf,
      },
      {
        email: medicoInfo.email,
      },
      {
        telefone: medicoInfo.telefone,
      },
    ],
  };

  return (
    <div className={styles["modalContainer"]}>
      <div className={styles["modalBox"]}>
        <div className={styles["modalContent"]}>
          <div className={styles["closeButtonModal"]} onClick={closeModal}>
            <AiFillCloseCircle style={{ fill: "#fa0000" }} />
          </div>
          <div className={styles["nameImage"]}>
            <img
              className={styles["medicoImage"]}
              width={50}
              src={medicoInfo.foto}
              alt="foto do médico"
            />
            <h2 style={{ color: "#464444", fontSize: "2.4rem" }}>
              Médico: {medicoInfo.nome}
              <span style={{ color: "#b6b6f6" }}></span>
            </h2>
          </div>

          <div className={styles["item"]}>
            <div className={styles["columnOne"]}>
              <h2>Informações pessoais:</h2>

              <div className={styles["medicoInfoPessoal"]}>
                <h3>Nome:</h3>
                <div className={styles["informartion"]}>{medicoInfo.nome}</div>
              </div>
              <div className={styles["medicoInfoPessoal"]}>
                <h3>Data de nascinto:</h3>
                <div className={styles["informartion"]}>
                  {medicoInfo.data_nascimento}
                </div>
              </div>
              <div className={styles["medicoInfoPessoal"]}>
                <h3>CPF:</h3>
                <div className={styles["informartion"]}>{medicoInfo.cpf}</div>
              </div>
              <div className={styles["medicoInfoPessoal"]}>
                <h3>E-mail:</h3>
                <div className={styles["informartion"]}>{medicoInfo.email}</div>
              </div>
              <div className={styles["medicoInfoPessoal"]}>
                <h3>Telefone:</h3>
                <div className={styles["informartion"]}>
                  {medicoInfo.telefone}
                </div>
              </div>
            </div>
            <div className={styles["columnTwo"]}>
              <h2>Endereço do profissional:</h2>

              <div className={styles["medicoInfoPessoal"]}>
                <h3>Rua:</h3>
                <div className={styles["informartion"]}>{medicoInfo.nome}</div>
              </div>
              <div className={styles["medicoInfoPessoal"]}>
                <h3>Bairro:</h3>
                <div className={styles["informartion"]}>
                  {medicoInfo.data_nascimento}
                </div>
              </div>
              <div className={styles["medicoInfoPessoal"]}>
                <h3>Cidade:</h3>
                <div className={styles["informartion"]}>{medicoInfo.cpf}</div>
              </div>
              <div className={styles["medicoInfoPessoal"]}>
                <h3>Número:</h3>
                <div className={styles["informartion"]}>
                  {medicoInfo.numero}
                </div>
              </div>  
              <div className={styles["medicoInfoPessoal"]}>
                <h3>CEP:</h3>
                <div className={styles["informartion"]}>{medicoInfo.cep}</div>
              </div>
            </div>
            <div className={styles["columnTwo"]}>
              <h2>Informações técnicas:</h2>

              <div className={styles["medicoInfoPessoal"]}>
                <h3>CRM:</h3>
                <div className={styles["informartion"]}>{medicoInfo.crm}</div>
              </div>
              <div className={styles["medicoInfoPessoal"]}>
                <h3>Especialidade:</h3>
                <div className={styles["informartion"]}>
                  {medicoInfo.especialidade}
                </div>
              </div>
              <div className={styles["medicoInfoPessoal"]}>
                <h3>Inicio do atendimento:</h3>
                <div className={styles["informartion"]}>
                  {medicoInfo.inicio_atendimento}
                </div>
              </div>
              <div className={styles["medicoInfoPessoal"]}>
                <h3>Fim do atendimento:</h3>
                <div className={styles["informartion"]}>
                  {medicoInfo.fim_atendimento}
                </div>
              </div>
              <div className={styles["medicoInfoPessoal"]}>
                <h3>Clínica de Atuação:</h3>
                <div className={styles["informartion"]}>
                  {medicoInfo.clinica}
                </div>
              </div>
            </div>
            <div className={styles['buttonExcluir']}>
                <div onClick={handleConfirmacaoClick} className={styles['button']}>
                  excluir médico
                </div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <ModalConfirmation
          pacienteInfo={medicoInfo}
          closeModal={() => {
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
