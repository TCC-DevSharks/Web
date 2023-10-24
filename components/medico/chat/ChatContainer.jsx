import axios from "axios";
import styles from "../../../styles/Chat.module.css";
import ChatInput from "./ChatInput";
export default function ChatContainer({ currentChat, currentUser, socket }) {

    const handleSendMsg = async (msg) => {
      //   const data = await JSON.parse(
      // console.log(msg)
      //   );
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
              <div className={styles["chat-messages"]}></div>
              <ChatInput
                handleSendMsg={handleSendMsg}
              />
            </div>
          );
    }else{
        <div className={styles['container-conversa']}></div>
    }

}
