import { useRouter } from "next/router";
import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Header from "../components/home/header/Header";
import stylesClinic from "../styles/ClinicLogin.module.css";
import stylesLogin from "../styles/Login.module.css";
import styles from "./ProfessionalLogin.module.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios, { Axios } from "axios";

function RecuperarSenha() {

  const router = useRouter();

  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div>
     
      <Header />
      <div className={styles.login_pro}>
        <div className={stylesClinic.login_form}>
          <p className={stylesClinic.login_title}>Esqueceu a Senha?:</p>

          <form className={stylesLogin.form} >
            <div className={stylesClinic.input_container}>
              <label>E-mail:</label>
              <input
                className={stylesClinic.input}
                type="text"
                placeholder="Digite seu e-mail"
                onChange={handleEmailChange}
              />
            </div>
            

            <button className={styles.button_login_pro}>Continuar</button>
          </form>
        </div>
      </div>
    </div>
  )
};


export default RecuperarSenha;