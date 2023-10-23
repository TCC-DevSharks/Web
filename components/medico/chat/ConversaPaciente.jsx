import styles from '../../../styles/Chat.module.css'; // Importe os estilos do arquivo CSS da página

const ConversaPaciente = () => {
    return (
            <div className={styles['paciente']}>
                <div className={styles['imagem-div']}>
                    <img className={styles['img']} src="https://yt3.googleusercontent.com/IG7W37b4wX-x-X_7zl8wXPISZqeIvhRptwTCHNthN1B896jpKcbgQzdS_hITrPL7JvYdE-jC820=s900-c-k-c0x00ffffff-no-rj" alt="" />
                </div>
                <div className={styles['descricao-paciente-chat']}>
                    <div className={styles['nome-paciente']}> Ingryd Shirlley </div>

                    <div className={styles['previa-mensagem']}>oiiii wrb hewh HWvnweiovnioW</div>
                </div>
            </div>
    );
};

export default ConversaPaciente;