import React from "react";
import { AiFillCloseCircle, AiOutlineArrowRight } from "react-icons/ai";
import { ToastContainer } from "react-toastify";
import styles from "./style.module.css"

export default function ModalMedicoDash({ medicoInfo, closeModal }) {
    const [horaInicio,minInicio] = medicoInfo.inicio_atendimento.split(':');
    const [horaFim,minFim] = medicoInfo.fim_atendimento.split(':')
    console.log(medicoInfo);
    const handleChange = (event) => {
        setValor(event.target.value);
    };
    return (
        <>
            <div className={styles['modalContainer']}>
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

                <div className={styles['modalBox']}>
                    <div className={styles['modalContent']}>
                        <div className={styles['closeButtonModal']} onClick={closeModal}>
                            <AiFillCloseCircle style={{ fill: '#fa0000' }} />
                        </div>
                        <div className={styles['nameMedico']}>

                           <img className={styles['fotoPerfilMedico']} src={medicoInfo.foto} alt="imagem do Medico" /> 
                            Nome: 
                           <h2 style={{ fontSize: '2rem', color: '#B6B6F6' }}>{medicoInfo.nome}</h2>

                        </div>
                        <div className={styles['InfoMedicos']}>
                            <div className={styles['crmMedico']}>
                                 <span>CRM: {medicoInfo.crm}</span>
                            </div>
                            <div className={styles['crmMedico']}>
                                 <span>CPF: {medicoInfo.cpf}</span>
                            </div>
                            <div className={styles['crmMedico']}>
                                 <span>Especialidade: {medicoInfo.especialidade}</span>
                            </div>
                            <div className={styles['crmMedico']}>
                                 <span> Telefone: {medicoInfo.telefone}</span>
                            </div>
                        </div>
                        <div className={styles['InfoMedicos']}>
                            <div className={styles['crmMedicoHoras']}>
                                 <span>Inicio atendimento: {horaInicio}:{minInicio}h</span> 
                                 <span>Fim atendimento: {horaFim}:{minFim}h</span>
                            </div>
                        </div>
                        <textarea disabled  className={styles['descricaoBox']}>
                               
                                    {medicoInfo.descricao}
                                
                            </textarea>
                    </div>
                </div>
            </div>
        </>
    )
}