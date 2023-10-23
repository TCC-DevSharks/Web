import axios from 'axios';
import styles from './../styles/Chat.module.css'; // Importe os estilos do arquivo CSS da página
import { useEffect } from 'react';


const ConversaPaciente = (
  { idGestante,
    nome, 
    foto,
    email,
    usuario,
    onPacienteClick
}
) => {
    useEffect(() => {
        const url = `http://localhost:3000/user/one?email=${email}&usuario=${usuario}`;
        function getPacientes() {
            axios.get(url)
                .then(response => {
                    const data = response.data;
                })
                .catch(error => {
                    console.error(error);
                });
        }

        getPacientes();
    }, []);
    return (
        <div onClick={() => onPacienteClick(
          {nome, foto}
        )}>
            <div className={styles['paciente']}>
                <div className={styles['imagem-div']}>
                    <img className={styles['img']} src={foto} alt="" />
                </div>
                <div className={styles['descricao-paciente-chat']}>
                    <div className={styles['nome-paciente']}> {nome}</div>

                    <div className={styles['previa-mensagem']}>oiiii wrb hewh HWvnweiovnioW</div>
                </div>
            </div>
        </div>
    );
};

export default ConversaPaciente;