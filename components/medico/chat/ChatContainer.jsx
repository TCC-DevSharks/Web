import axios from "axios";
import styles from "../../../styles/Chat.module.css";
import React, { useState, useRef, useEffect } from "react";
import ChatInput from "./ChatInput";

export default function ChatContainer({ currentChat, currentUser, socket }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();


  console.log(currentUser);

  useEffect(() => {
    function getMensagem(from, to) {
      axios.get(`http://localhost:3000/chat/mensagem?from=${from}&to=${to}`)
      .then(response => {
          const data = response.data;
          setMessages(data)
      
      })
      .catch(error => {
          console.error(error);
      });
    }
    getMensagem(currentUser?._id,currentChat?._id)
  }, [currentChat]);



  const handleSendMsg = async (msg) => {
    console.log(currentChat);

    axios.post("http://localhost:3000/chat", {
      text:msg,
      users:[
        currentUser._id,
      currentChat._id
      ],
      sender: currentUser._id,

    });

    console.log(msg);
  };

  if (currentChat) {
    return (
      <div className={styles["container-conversa"]}>
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
        <div className={styles["chat-messages"]}>
          {messages.map((message) => {
            return (
                <div
                className={styles["sended", "message"]}
                >
                  <div className={styles["content"]}>
                    <p>{message.text}</p> 
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