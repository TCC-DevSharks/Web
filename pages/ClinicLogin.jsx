import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Header from "../components/home/header/Header";
import stylesLogin from "../styles/Login.module.css";
import { useRouter } from "next/navigation";
import stylesClinic from "../styles/ClinicLogin.module.css";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

function ClinicLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState(false);
  const messageLoginFalse = useState("");

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

  const entrarPerfilClinica = (id) => {
    setLogin(!login);
    router.push(`/clinica/home/`);
    localStorage.setItem("id", id);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = {
      email: email,
      senha: password,
    };

    const url = 'https://api-bebevindo.azurewebsites.net/login/clinica'
    axios.post(url, {
      email: loginData.email,
      senha: loginData.senha
    }).then(response => {
      console.log(response);
      if (response.data.doctor.status == 401) {
        toast.error(response.data.doctor.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

      } else {
        const id = response.data.doctor.id
        toast.success(response.data.doctor.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        entrarPerfilClinica(id);
      }
    }).catch(console.log("erro"))

  }

  return (
    <>
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
      <div>
        <Header />
        <div className={stylesClinic.login_clinic}>
          <div className={stylesClinic.login_form}>
            <p className={stylesClinic.login_title}>
              Entre na conta da sua Clínica:
            </p>
            <form className={stylesLogin.form} onSubmit={handleLogin}>
              <div className={stylesClinic.input_container}>
                <label>E-mail:</label>
                <input
                  type="text"
                  placeholder="Digite seu e-mail"
                  value={email}
                  onChange={handleEmailChange}
                  className={stylesClinic.input}
                />
              </div>
              <div className={stylesClinic.input_container}>
                <div className={stylesClinic.pass_forgot}>
                  <label>Senha:</label>
                  <a href="/forgot" className={stylesClinic.forgot_a}>
                    Esqueceu?
                  </a>
                </div>
                <div className={stylesClinic.password_input}>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={handlePasswordChange}
                    className={stylesClinic.input}
                  />
                  <p
                    onClick={handleShowPassword}
                    className={stylesClinic.eye_icon}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </p>
                </div>
              </div>
              <div className={stylesClinic.button_login_clinic}>
                <button type="submit">Entrar</button>
              </div>
              <div className={stylesClinic.register_page}>
                <span>
                  Ainda não tem uma conta?{" "}
                  <a href="/RegisterClinic" className={stylesClinic.cad}>
                    Cadastre-se!
                  </a>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ClinicLogin;