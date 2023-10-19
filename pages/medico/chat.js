// Chat.js
import React from 'react';
import styles from '../../styles/Chat.module.css'; // Importe os estilos do arquivo CSS da página
import ConversaPaciente from '../../components/ConversaPaciente';
import Sidebar from '../../components/Sidebar';

const Chat = () => {
    return (
        <>
            <Sidebar />
            <div className={styles['chat-container']}>
                <div className={styles['container-pacientes']}>
                    <div className={styles['pacientes-container']}>
                        <h1>Pacientes</h1>
                        <input type="text" placeholder='Pesquisar um paciente' />
                        <div className={styles['pacientes']}>
                            <ConversaPaciente />
                            <ConversaPaciente />
                            <ConversaPaciente />
                            <ConversaPaciente />
                            <ConversaPaciente />
                            <ConversaPaciente />
                            <ConversaPaciente />
                            <ConversaPaciente />
                        </div>
                    </div>
                </div>
                <div className={styles['container-conversa']}>
                </div>
            </div>
        </>
    );
};

export default Chat;
