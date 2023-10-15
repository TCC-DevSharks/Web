import styles from './../styles/ProntuarioMedico.module.css';

const Prontuario = ({ nome })=> {
    
    return (
        <div className={styles['prontuario-medico-m']}>
            <span className={styles['nome-paciente']}>Paciente: {nome}</span>
            <div className={styles['prontuario-medico']}>
                <div className={styles['inputs-prontuario']}>
                <span>Data:</span>
                <input type="date" className={styles['prontuario-input-date']}/>
                </div>
                <div className={styles['inputs-prontuario']}>
                <span>Especialidade:</span>
                <input type="text" className={styles['prontuario-input-especiality']}/>
                </div>
                <div className={styles['inputs-prontuario']}>
                <span>Descrição:</span>
                <input type="text" className={styles['prontuario-input-description']}/>
                </div>
            </div>    
            <div>
                <button className={styles['button-prontuario']}>
                <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        </div>
    );
};

export default Prontuario;