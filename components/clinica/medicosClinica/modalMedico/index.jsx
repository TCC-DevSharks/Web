import styles from "./style.module.css";
import { AiFillCloseCircle, AiOutlineArrowRight } from "react-icons/ai";
import { useState, useEffect } from "react";
import { ModalConfirmation } from "./modalConfirmacao";
import EditableField from "./EditableField"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function ModalMedico({ medicoInfo, closeModal, onClick }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hora, min] = medicoInfo.inicio_atendimento.split(":");
  console.log(medicoInfo)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedMedicoInfo, setEditedMedicoInfo] = useState({
    ...medicoInfo,
    id_especialidade: medicoInfo.id_especialidade,
    id_telefone: medicoInfo.idTelefone,
    id_endereco: medicoInfo.idEndereco,
  });

  const [enderecoByCep, setEnderecoByCep] = useState({
    rua: '',
    bairro: '',
    cidade: '',
  });

  // Função para buscar o endereço com base no CEP
  const fetchEnderecoByCep = async (cep) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      if (response.ok) {
        const data = await response.json();
        setEnderecoByCep({
          rua: data.logradouro || '',
          bairro: data.bairro || '',
          cidade: data.localidade || '',
        });
      } else {
        console.error('Erro ao buscar endereço pelo CEP');
      }
    } catch (error) {
      console.error('Erro ao buscar endereço pelo CEP', error);
    }
  };

  const handleSave = async () => {
    const especialidades = {
      'Nutricionista': 1,
      'Obstetra': 2,
      'Psicologo': 3,
      'Fisioterapeuta': 4,
    };

    const idEspecialidade = especialidades[editedMedicoInfo.especialidade];

    if (idEspecialidade === undefined) {
      console.error('Especialidade inválida');
      return;
    }

    setEditedMedicoInfo((prev) => ({
      ...prev,
      id_especialidade: idEspecialidade,
    }));

    if (!editedMedicoInfo.id_especialidade || !editedMedicoInfo.id_telefone || !editedMedicoInfo.id_endereco) {
      console.error('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    console.log('Valores antes da solicitação:', editedMedicoInfo);

    if (!editedMedicoInfo.id_especialidade || !editedMedicoInfo.id_telefone || !editedMedicoInfo.id_endereco) {
      console.error('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    let errorText;

    try {
      const response = await fetch(
        `https://api-bebevindo.azurewebsites.net/clinica/profissional/${medicoInfo.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editedMedicoInfo),
        }
      );
        console.log(response);
      if (response.ok) {
        toast.success("Médico editado com sucesso", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setIsEditModalOpen(false);
      } else {
        toast.error("", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        errorText = await response.text();
        toast.error('Erro ao editar médico', errorText);
      }
    }
    
    catch (error) {
      toast.error('Erro ao editar médico', error);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="black" />
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
                  <div className={styles["informartion"]}>
                    {medicoInfo.nome}
                  </div>
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
                  {isEditModalOpen ? (
                    <EditableField
                      value={editedMedicoInfo.email}
                      onChange={(value) =>
                        setEditedMedicoInfo((prev) => ({ ...prev, email: value }))
                      }
                    />
                  ) : (
                    <div className={styles["informartion"]}>{medicoInfo.email}</div>
                  )}
                </div>

                <div className={styles["medicoInfoPessoal"]}>
                  <h3>Telefone:</h3>
                  {isEditModalOpen ? (
                    <EditableField
                      value={editedMedicoInfo.telefone}
                      onChange={(value) =>
                        setEditedMedicoInfo((prev) => ({ ...prev, telefone: value }))
                      }
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
                    {medicoInfo.rua}
                  </div>
                </div>

                <div className={styles["medicoInfoPessoal"]}>
                  <h3>Bairro:</h3>
                  <div className={styles["informartion"]}>
                    {medicoInfo.bairro}
                  </div>
                </div>

                <div className={styles["medicoInfoPessoal"]}>
                  <h3>Cidade:</h3>
                  <div className={styles["informartion"]}>
                    {medicoInfo.cidade}
                  </div>
                </div>

                <div className={styles["medicoInfoPessoal"]}>
                  <h3>Número:</h3>
                  {isEditModalOpen ? (
                    <EditableField
                      value={editedMedicoInfo.numero}
                      onChange={(value) =>
                        setEditedMedicoInfo((prev) => ({ ...prev, numero: value }))
                      }
                    />
                  ) : (
                    <div className={styles["informartion"]}>{medicoInfo.numero}</div>
                  )}
                </div>

                <div className={styles["medicoInfoPessoal"]}>
                  <h3>CEP:</h3>
                  {isEditModalOpen ? (
                    <EditableField
                      value={editedMedicoInfo.cep}
                      onChange={(value) =>
                        setEditedMedicoInfo((prev) => ({ ...prev, cep: value }))
                      }
                    />
                  ) : (
                    <div className={styles["informartion"]}>{medicoInfo.cep}</div>
                  )}
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
                  {isEditModalOpen ? (
                    <EditableField
                      value={editedMedicoInfo.especialidade}
                      onChange={(value) =>
                        setEditedMedicoInfo((prev) => ({ ...prev, especialidade: value }))
                      }
                    />
                  ) : (
                    <div className={styles["informartion"]}>{medicoInfo.especialidade}</div>
                  )}
                </div>

                <div className={styles["medicoInfoPessoal"]}>
                  <h3>Inicio do Atemdimento:</h3>
                  {isEditModalOpen ? (
                    <EditableField
                      value={editedMedicoInfo.inicio_atendimento}
                      onChange={(value) =>
                        setEditedMedicoInfo((prev) => ({ ...prev, inicio_atendimento: value }))
                      }
                    />
                  ) : (
                    <div className={styles["informartion"]}>{medicoInfo.inicio_atendimento}</div>
                  )}
                </div>

                <div className={styles["medicoInfoPessoal"]}>
                  <h3>Fim do Atemdimento:</h3>
                  {isEditModalOpen ? (
                    <EditableField
                      value={editedMedicoInfo.fim_atendimento}
                      onChange={(value) =>
                        setEditedMedicoInfo((prev) => ({ ...prev, fim_atendimento: value }))
                      }
                    />
                  ) : (
                    <div className={styles["informartion"]}>{medicoInfo.fim_atendimento}</div>
                  )}
                </div>

                <div className={styles["medicoInfoPessoal"]}>
                  <h3>Clínica de Atuação:</h3>
                  <div className={styles["informartion"]}>
                    {medicoInfo.clinica}
                  </div>
                </div>
              </div>


              <div className={styles['buttonExcluir']}>
                <div className={styles['button']}>
                  Excluir médico
                </div>

                <div className={styles['buttonEdit']} onClick={() => setIsEditModalOpen(true)}>
                  Editar médico
                </div>

                <div className={styles['buttonSave']} onClick={handleSave}>
                  Salvar alterações
                </div>
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
    </>

  );

}