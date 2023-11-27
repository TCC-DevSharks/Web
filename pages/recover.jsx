import { useRouter } from "next/router";
import React, { use, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Header from "../components/home/header/Header";
import stylesClinic from "../styles/ClinicLogin.module.css";
import stylesLogin from "../styles/Login.module.css";
import styles from "./ProfessionalLogin.module.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios, { Axios } from "axios";
import ReactInputMask from "react-input-mask";



function SenhaRecuperar() {
  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState(false);

  const router = useRouter();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [email, setEmail] = useState("");
  const [token, setToken] = useState("")
  const [password, setPassword] = useState("");


  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleTokenChange = (e) => {
    setToken(e.target.value);
  };


  const passwordRecover = (e) => {
    e.preventDefault()
    let url = 'https://api-bebevindo.azurewebsites.net/redefinir-senha/clinica/confirmar';
    axios.post(url, {
      email: email,
      token: token,
      novaSenha: password
    }).then((response) => {
      console.log(response);
      if (response.data.message.status == 200) {
        toast.success(response.data.message.result.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          router.push("/ClinicLogin");
        }, 3000); 
      } else {
        
        toast.error(response.data.message.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }).catch(console.log("erro"))
  }


  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
      />
      <Header />
      <div className={styles.login_pro}>
        <div className={stylesClinic.login_form}>
          <p className={stylesClinic.login_title}>Esqueceu a Senha?:</p>

          <form className={stylesLogin.form} >
            <div className={stylesClinic.input_container}>
              <label>E-mail:</label>
              <ReactInputMask
                className={stylesClinic.input}
                type="text"
                placeholder="Digite seu e-mail"
                onChange={handleEmailChange}
              />
            </div>
            <div className={stylesClinic.input_container}>
              <label>Token:</label>
              <ReactInputMask
                className={stylesClinic.input}
                type="text"
                mask={"9999"}
                placeholder="Digite seu token"
                onChange={handleTokenChange}
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

            <button onClick={passwordRecover} className={styles.button_login_pro}>Entrar</button>
          </form>
        </div>
      </div>
    </div>
  )
};


export default SenhaRecuperar;