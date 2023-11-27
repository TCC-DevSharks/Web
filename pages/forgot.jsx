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




  const SolicitarCodigo = (e) => {
    e.preventDefault();
    let url = `https://api-bebevindo.azurewebsites.net/redefinir-senha/clinica/solicitar`
    console.log(email);
    axios.post(url, {
      email: email
    }).then((response) => {
      
      if (response.data.message.status == 200) {
        toast.success(response.data.message.message, {
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
          router.push("/recover");
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

    }).catch(console.log("error"))
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
              <input
                className={stylesClinic.input}
                type="text"
                placeholder="Digite seu e-mail"
                onChange={handleEmailChange}
              />
            </div>
            <a onClick={SolicitarCodigo} className={stylesClinic.forgot_a}>
              Continuar
            </a>
          </form>
        </div>
      </div>
    </div>
  )
};


export default RecuperarSenha;