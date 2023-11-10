import axios from "axios";
import styles from "../../../pages/medico/chat/Chat.module.css";
import React, { useState, useRef, useEffect } from "react";
import ChatInput from "./ChatInput";
import { v4 as uuidv4 } from "uuid";

export default function ChatContainer({ currentChat, currentUser, socket }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() => {
    function getMensagem(from, to) {
      axios.get(`http://localhost:3000/chat/mensagem?from=${from}&to=${to}`)
        .then((response) => {
          const data = response.data;
          setMessages(data.conversa);
          
        })
        .catch((error) => {
          console.error(error);
        });
    }
    getMensagem(currentUser?._id, currentChat?._id);
    scrollToBottom();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    socket.current.emit("send-msg", {
      to: currentChat._id,
      msg,
    });

    await axios.post("http://localhost:3000/chat", {
      text: msg,
      users: [currentUser._id, currentChat._id],
      sender: currentUser._id,
    });

    // Atualize o estado das mensagens após o envio da mensagem
    setMessages([...messages, { _id: currentUser._id, text: msg }]);
    scrollToBottom();
  };

  useEffect(() => {

    if (socket.current) {
      socket.current.on("msg-receive", (msg) => {
        setMessages((messages) => [...messages, {sender: currentChat._id,_id: currentChat._id, text: msg }]);
      });

    }
  }, [socket.current]);



  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    scrollToBottom();
  }, [arrivalMessage]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Função para rolar para o fundo do elemento de mensagens
  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" }); 
    }
  };

  if (currentChat) {
    return (
      <div className={styles["container-conversa"]} >
        <div className={styles["chat-header"]}>
          <div className={styles["user-details"]}>
            <div className={styles["avatar"]}>
              <img src={currentChat.foto} alt="" />
            </div>
            <div className={styles["username"]}>
              <h3>{currentChat.nome}</h3>
            </div>
          </div>
        </div>
        
        <div className={styles["chat-messages"]}  >
          {messages.map((message) => {
            return (
              <div className={styles["message"]}>
                <div
                    
                  className={styles[
                    message.sender == `${currentChat._id}`
                      ? "pai__sended"
                      : "pai__recieved"
                  ]}
                >
                  <div ref={scrollRef} key={uuidv4()} className={styles["sended"]}>
                    <p >{message.text}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <ChatInput handleSendMsg={handleSendMsg} />
      </div>
    );
  }
}
