import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import Header from '../components/Header'
import stylesClinic from '../styles/ClinicLogin.module.css';
import stylesLogin from '../styles/Login.module.css';
import styles from '../styles/ProfessionalLogin.module.css';

function ClinicLogin() {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div>
      <Header />
      <div className={styles.login_pro}>
        <div className={stylesClinic.login_form}>
          <p className={stylesClinic.login_title}>Entre na sua conta:</p>
          <form className={stylesLogin.form}>
            <div className={stylesClinic.input_container}>
              <label>E-mail:</label>
              <input className={stylesClinic.input} type="text" placeholder='Digite seu e-mail' />
            </div>
            <div className={stylesClinic.input_container}>
              <div className={stylesClinic.pass_forgot}>
                <label>Senha:</label>
                <a href='/forgot' className={styles.forgot_p}>Esqueceu?</a>
              </div>
              <div className={stylesClinic.password_input}>
                <input className={stylesClinic.input} type={showPassword ? 'text' : 'password'} placeholder="Digite sua senha" />
                <p onClick={handleShowPassword} className={stylesClinic.eye_icon}>
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </p>
              </div>
            </div>
            <div className={styles.button_login_pro}>
              <button>
                Entrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ClinicLogin;