
import Header from '../components/home/header/Header'
import styles from '../styles/Login.module.css'


export default function Home() {
    return (
        <div>
            <Header />
            <div className={styles.login_container}>
                <div className={styles.login_type}>
                    <h7 className= {styles.usuario}>Qual o seu tipo de usuário?</h7>
                    <a href="/ClinicLogin">
                        <button className={styles.choice_login}>Clínicas</button>
                    </a>
                    <a href="/ProfessionalLogin">
                        <button className={styles.choice_login}>Profissionais</button>
                    </a>
                    <a href="/PregnantLogin">
                        <button className={styles.choice_login}>Gestantes</button>
                    </a>
                </div>
                <div className={styles.login_img}>
                    <img src="./images/login_img.png" alt="" />
                </div>
            </div>
        </div>
    );
};

