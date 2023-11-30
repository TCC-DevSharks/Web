// Chat.js
import React, { useState, useEffect, useRef } from "react";
import styles from "./Chat.module.css"
import ConversaPaciente from "../../../components/medico/chat/ConversaPaciente";
import Sidebar from "../../../components/sideBar/Sidebar";
import axios from "axios";
import ChatContainer from "../../../components/medico/chat/ChatContainer";
import { io } from "socket.io-client";

const Chat = () => {
  const socket = useRef();
  const [listpacientes, setPacientes] = useState();
  const [currentChat, setCurrentChat] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const handlePacienteClick = (pacienteInfo) => {
    setCurrentChat(pacienteInfo);
  };

  useEffect(() => {
    const IdMedico = localStorage.getItem("id");
    const url = `https://api-bebevindo.azurewebsites.net/profissional/gestante/${IdMedico}`;

    function getPacientes() {
      axios
        .get(url)
        .then((response) => {
          // Filtrar pacientes únicos
          const pacientesUnicos = Array.from(new Set(response.data.pacientes.map(paciente => paciente.idGestante)));
          const pacientesUnicosData = pacientesUnicos.map(id => response.data.pacientes.find(paciente => paciente.idGestante === id));

          setPacientes(pacientesUnicosData);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    getPacientes();
  }, []);

  useEffect(() => {
    const IdMedico = localStorage.getItem("id");
    const url = `https://api-bebevindo.azurewebsites.net/profissional/gestante/${IdMedico}`;

    function getProfessional() {
      axios
        .get(url)
        .then((response) => {
          const data = response.data.profissionais;

        })
        .catch((error) => {
          console.error(error);
        });
    }

    getProfessional();
  }, []);

  useEffect(() => {
    const url = `https://api-bebevindo.azurewebsites.net/user/one?email=${localStorage.getItem(
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
      socket.current = io("https://api-bebevindo.azurewebsites.net");
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]); // Passando um array vazio como segundo argumento
  

  return (
    <>
      <Sidebar />
      
      <div className={styles["chat-container"]}>
        <div className={styles["container-pacientes"]}>
          <div className={styles["pacientes-container"]}>
            <h1>Pacientes</h1>
            <input type="text" placeholder="Pesquisar um paciente" />

            <div className={styles["pacientes"]}>
              {listpacientes?.map((paciente) => (
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
