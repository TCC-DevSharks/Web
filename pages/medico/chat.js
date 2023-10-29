// Chat.js
import React, { useState, useEffect, useRef } from "react";
import styles from "../../styles/Chat.module.css"; // Importe os estilos do arquivo CSS da página
import ConversaPaciente from "../../components/ConversaPaciente";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import ChatContainer from "../../components/medico/chat/ChatContainer";
import { io } from "socket.io-client";

const Chat = () => {
  const socket = useRef();
  const [listpacientes, setPacientes] = useState();
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
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
        })
        .catch((error) => {
          console.error(error);
        });
    }

    getPacientes();
  }, []);

  useEffect(() => {
    const url = `http://localhost:3000/profissional/16`;

    function getProfessional() {
      axios
        .get(url)
        .then((response) => {
          const data = response.data.profissionais;
          localStorage.setItem("emailProfissional", data[0].email);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    getProfessional();
  }, []);

  useEffect(() => {
    const url = `http://localhost:3000/user/one?email=${localStorage.getItem(
      "emailProfissional"
    )}&usuario=${"Profissional"}`;

    function getMongoProfessional() {
      axios
        .get(url)
        .then((response) => {
          const data = response.data;
          setCurrentUser(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    getMongoProfessional();
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io("ws://localhost:3000");
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

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
                    nome={paciente.nome}
                    foto={paciente.foto}
                    email={paciente.emailGestante}
                    usuario={"Gestante"}
                    onPacienteClick={handlePacienteClick}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <ChatContainer
          currentChat={currentChat}
          currentUser={currentUser}
          socket={socket}
        />
      </div>
    </>
  );
};

export default Chat;
