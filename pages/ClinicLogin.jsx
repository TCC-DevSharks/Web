import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import Header from '../components/home/header/Header'
import stylesLogin from '../styles/Login.module.css';
import { useRouter } from 'next/navigation';
import stylesClinic from '../styles/ClinicLogin.module.css';

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

        const entrarPerfilClinica = (id) => {
            setLogin(!login)
            router.push( `/clinica/home/`)
            localStorage.setItem('id', id)
          
        }

        const handleLogin = async (e) => {
            e.preventDefault();

            const loginData = {
                email: email,
                senha: password,
            };

            try {
                const response = await fetch('https://api-bebevindo.azurewebsites.net/login/clinica', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(loginData),
                });
            
                const status = response.status;
            
                if (status === 201) {
                    const data = await response.json(); 
                    const id = data.id[0].id; 

                    entrarPerfilClinica(id);


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
            <div className={stylesClinic.login_clinic}>
                <div className={stylesClinic.login_form}>
                    <p className={stylesClinic.login_title}>Entre na conta da sua Clínica:</p>
                    <form className={stylesLogin.form} onSubmit={handleLogin}>
                        <div className={stylesClinic.input_container}>
                            <label>E-mail:</label>
                            <input
                                type="text"
                                placeholder='Digite seu e-mail'
                                value={email}
                                onChange={handleEmailChange}
                                className={stylesClinic.input}
                            />
                        </div>
                        <div className={stylesClinic.input_container}>
                            <div className={stylesClinic.pass_forgot}>
                                <label>Senha:</label>
                                <a href='/forgot' className={stylesClinic.forgot_a}>Esqueceu?</a>
                            </div>
                            <div className={stylesClinic.password_input}>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Digite sua senha"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    className={stylesClinic.input}
                                />
                                <p onClick={handleShowPassword} className={stylesClinic.eye_icon}>
                                    {showPassword ? <FiEyeOff /> : <FiEye />}
                                </p>
                            </div>
                        </div>
                        <div className={stylesClinic.button_login_clinic}>
                            <button      type="submit">Entrar</button>
                        </div>
                        <div className={stylesClinic.register_page}>
                            <span>Ainda não tem uma conta? <a href="/RegisterClinic" className={stylesClinic.cad}>Cadastre-se</a></span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ClinicLogin;
