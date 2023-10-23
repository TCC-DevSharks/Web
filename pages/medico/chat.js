// Chat.js
import React, { useState } from "react";
import styles from "../../styles/Chat.module.css"; // Importe os estilos do arquivo CSS da página
import ConversaPaciente from "../../components/ConversaPaciente";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import { useEffect } from "react";
import ChatContainer from "../../components/medico/chat/ChatContainer";

const Chat = () => {
    const [listpacientes, setPacientes] = useState();
    const [currentChat, setCurrentChat] = useState(undefined);
    const handlePacienteClick = (pacienteInfo) => {
        setCurrentChat(pacienteInfo);
        console.log(pacienteInfo);
    };

    useEffect(() => {
        const url = "http://localhost:3000/profissional/gestante/16";

        function getPacientes() {
            axios
                .get(url)
                .then((response) => {
                    const data = response.data;
                    setPacientes(data);
                    console.log(data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }

        getPacientes();
    }, []);

    return (
      <>
      <Sidebar />
      <div className={styles["chat-container"]}>
        <div className={styles["container-pacientes"]}> 
          <div className={styles["pacientes-container"]}>
            <h1>Pacientes</h1>
            <input type="text" placeholder="Pesquisar um paciente" />
            <div className={styles["pacientes"]}>
              {listpacientes?.pacientes.map((paciente) => (
                <div key={paciente.id}>
                  <ConversaPaciente
                    idGestante={paciente.idGestante}
                    nome={paciente.nome}
                    foto={paciente.foto}
                    email={paciente.emailGestante}
                    usuario = {"Gestante"}
                    onPacienteClick={handlePacienteClick}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <ChatContainer currentChat={currentChat} />
      </div>
    </>
    );
};

export default Chat;