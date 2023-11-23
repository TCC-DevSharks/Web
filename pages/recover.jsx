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

function SenhaRecuperar() {
  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState(false);

  const router = useRouter();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
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
            <div className={stylesClinic.input_container}>
              <label>Token:</label>
              <input
                className={stylesClinic.input}
                type="text"
                placeholder="Digite seu token"
                onChange={handleEmailChange}
              />
            </div>
            <div className={stylesClinic.input_container}>
              <div className={stylesClinic.pass_forgot}>
                <label>Nova senha:</label>
              </div>
              <div className={stylesClinic.password_input}>
                <input
                  className={stylesClinic.input}
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite sua senha"
                  onChange={handlePasswordChange}
                />
                <p
                  onClick={handleShowPassword}
                  className={stylesClinic.eye_icon}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </p>
              </div>
            </div>

            <button className={styles.button_login_pro}>Entrar</button>
          </form>
        </div>
      </div>
    </div>
  )
};


export default SenhaRecuperar;