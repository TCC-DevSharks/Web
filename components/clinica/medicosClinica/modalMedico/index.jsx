import styles from "./style.module.css";
import { AiFillCloseCircle, AiOutlineArrowRight } from "react-icons/ai";
import { useState, useEffect } from "react";
import axios from "axios";
import { ModalConfirmation } from "./modalConfirmacao";

export function ModalMedico({ medicoInfo, closeModal, onClick }) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hora, min] = medicoInfo.inicio_atendimento.split(":");
  const [isEditMode, setIsEditMode] = useState(false);
  const [newNome, setNewNome] = useState(medicoInfo.nome);
  const [newTelefone, setNewTelefone] = useState(medicoInfo.telefone);
  const [endereco, setEndereco] = useState({
    rua: "",
    bairro: "",
    cidade: "",
  });

  const handleConfirmacaoClick = function () {
    setIsModalOpen(true);
  };

  const handleEditClick = function () {
    setIsEditMode(true);
  };

  const handleSaveClick = async () => {
    try {
      await axios.put(`sua/api/endpoint/${medicoInfo.id}`, {
        nome: newNome,
        telefone: newTelefone
      });
      setIsEditMode(false);
    } catch (error) {
      console.error('Erro ao salvar as informações:', error);
    }
  };

  const buscarEnderecoPorCep = async () => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${medicoInfo.cep}/json/`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      });
      const data = response.data;

      setEndereco({
        rua: data.logradouro || "",
        bairro: data.bairro || "",
        cidade: data.localidade || "",
      });
    } catch (error) {
      console.error('Erro ao buscar informações de endereço:', error);
    }
  };
  useEffect(() => {
    buscarEnderecoPorCep();
  }, [medicoInfo.cep]);

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

            <h2>
              Médico: {medicoInfo.nome}
              <span style={{ color: "#b6b6f6" }}></span>
            </h2>
          </div>

          <div className={styles["item"]}>
            <div className={styles["columnOne"]}>
              <h2>Informações pessoais:</h2>

              <div className={styles["medicoInfoPessoal"]}>
                <h3>Nome:</h3>
                {isEditMode ? (
                  <input
                    className={styles["input_editing"]}
                    type="text"
                    value={newNome}
                    onChange={(e) => setNewNome(e.target.value)}
                  />
                ) : (
                  <div className={styles["informartion"]}>{medicoInfo.nome}</div>
                )}
              </div>

              <div className={styles["medicoInfoPessoal"]}>
                <h3>Data de nascimento:</h3>
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
                {isEditMode ? (
                  <input
                    className={styles["input_editing"]}
                    type="text"
                    value={newTelefone}
                    onChange={(e) => setNewTelefone(e.target.value)}
                  />
                ) : (
                  <div className={styles["informartion"]}>{medicoInfo.telefone}</div>
                )}
              </div>
            </div>


            <div className={styles["columnTwo"]}>
              <h2>Endereço do profissional:</h2>

              <div className={styles["medicoInfoPessoal"]}>
                <h3>Rua:</h3>
                <div className={styles["informartion"]}>
                  {endereco.rua}
                </div>
              </div>

              <div className={styles["medicoInfoPessoal"]}>
                <h3>Bairro:</h3>
                <div className={styles["informartion"]}>
                  {endereco.bairro}
                </div>
              </div>

              <div className={styles["medicoInfoPessoal"]}>
                <h3>Cidade:</h3>
                <div className={styles["informartion"]}>
                  {endereco.cidade}
                </div>
              </div>

              <div className={styles["medicoInfoPessoal"]}>
                <h3>Número:</h3>
                <div className={styles["informartion"]}>
                  {medicoInfo.numero}
                </div>
              </div>

              <div className={styles["medicoInfoPessoal"]}>
                <h3>CEP:</h3>
                <div className={styles["informartion"]}>
                  {medicoInfo.cep}
                </div>
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
              <div
                onClick={handleConfirmacaoClick}
                className={styles['button']}
              >
                Excluir médico
              </div>
              {isEditMode ? (
                <div
                  onClick={handleSaveClick}
                  className={styles['button']}
                  id={styles['button_editar']}
                >
                  Salvar
                </div>
              ) : (
                <div
                  onClick={handleEditClick}
                  className={styles['button']}
                  id={styles['button_editar']}
                >
                  Editar médico
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <ModalConfirmation
          medicoInfo={medicoInfo}
          closeModal={() => {
            setIsModalOpen(false);
          }}
          onClick={onClick}
        />
      )}
    </div>
  );

}