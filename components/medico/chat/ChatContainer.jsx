import axios from "axios";
import styles from "../../../styles/Chat.module.css";
import React, { useState } from "react";
import ChatInput from "./ChatInput";
export default function ChatContainer({ currentChat, currentUser, socket }) {

  const [messages, setMessages] = useState([]);


 
    const handleSendMsg = async (msg) => {
      console.log(currentChat);

      axios.post("http://localhost:3000/chat",{

          from: currentUser._id,
          to: currentChat._id,
          sender: currentUser._id,
          text: msg
      
      })

      console.log(msg);
    
    }
    
    if (currentChat) {
        return (
            <div className={styles['container-conversa']}>
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
              <div className="content ">
                  <p>{message.message}</p>
                </div>
              </div>
              <ChatInput
                handleSendMsg={handleSendMsg}
              />
            </div>
          );
    }else{
        <div className={styles['container-conversa']}></div>
    }

}
