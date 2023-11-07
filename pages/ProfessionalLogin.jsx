import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import Header from '../components/home/header/Header'
import stylesClinic from '../styles/ClinicLogin.module.css';
import stylesLogin from '../styles/Login.module.css';
import styles from './ProfessionalLogin.module.scss';

function ClinicLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState(false)

  const router = useRouter()

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const entrarPerfilProfissinal = (id) => {
    if (id) {
      localStorage.setItem('id', id); // Defina o ID no localStorage
      setLogin(!login);
      router.push(`/medico/home/`); // Redirecione para a página de home
    } else {
      console.log('ID is undefined.');
      // Adicione aqui o tratamento apropriado para lidar com o ID undefined, como uma mensagem de erro.
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = {
      email: email,
      senha: password,
    };

    try {
      const response = await fetch('http://localhost:3000/login/profissional', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const status = response.status;

      if (status === 201) {
        const data = await response.json();
        const id = data.doctor[0].id;

        entrarPerfilProfissinal(id);


      } else {
        console.log("Login deu errado.");
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }

  };

  return (
    <div>
      <Header />
      <div className={styles.login_pro}>
        <div className={stylesClinic.login_form}>
          <p className={stylesClinic.login_title}>Entre na sua conta:</p>

          <form className={stylesLogin.form} onSubmit={handleLogin}>
            <div className={stylesClinic.input_container}>
              <label>E-mail:</label>
              <input className={stylesClinic.input}
                type="text"
                placeholder='Digite seu e-mail'
                onChange={handleEmailChange}
              />
            </div>
            <div className={stylesClinic.input_container}>
              <div className={stylesClinic.pass_forgot}>
                <label>Senha:</label>
              </div>
              <div className={stylesClinic.password_input}>
                <input
                  className={stylesClinic.input}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Digite sua senha"
                  onChange={handlePasswordChange}
                />
                <p onClick={handleShowPassword} className={stylesClinic.eye_icon}>
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </p>
              </div>
            </div>

            <button className={styles.button_login_pro}>
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ClinicLogin;