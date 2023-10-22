import styles from './../styles/Chat.module.css'; // Importe os estilos do arquivo CSS da página

const ConversaPaciente = (
  { idGestante,
    nome, 
    foto,
    onPacienteClick
}
) => {
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