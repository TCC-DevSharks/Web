import styles from '../../../../pages/medico/dieta/Dieta.module.css';

const PacienteDieta = ({
    nome,
    semanas,
    foto,
    onClick
}) => {
    return (
        <div className={styles['paciente']} onClick={onClick}>
            <div className={styles['pacientesControllerBox']}>
                <div className={styles['imagem']}> <img src={foto} alt={nome} /> </div>

                <div className={styles['nomeBox']}>
                    <h2 className={styles['nomePaciente']}>
                        <span className={styles['nomePacientePrincipal']}> {nome} </span>
                    </h2>

                    <h3 className={styles['semanasGestante']}> {semanas} semanas </h3>
                </div>
            </div>
        </div>
    );
};

export default PacienteDieta;
