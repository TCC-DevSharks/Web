import styles from '../../../styles/Prontuario.module.css';
import { AiFillCloseCircle } from 'react-icons/ai';

export function Modal({ pacienteInfo, closeModal }) {
  return (
    <div className={styles['modalContainer']}>
      <div className={styles['modalBox']}>
        <div className={styles['modalContent']}>
          <div className={styles['closeButtonModal']} onClick={closeModal}>
            <AiFillCloseCircle style={{ fill: '#fa0000' }} />
            <h2 style={{ color: '#464444' }}>
              Paciente: <span style={{ color: '#b6b6f6' }}>{pacienteInfo.nome}</span>
            </h2>
          </div>
          <div className={styles['especialidadesBox']}>
            <h4>Especialidade:</h4>
            <div className={styles['boxButtonEspecialidade']}>
              <button className={styles['buttonEspecialidade']}>Especialidade</button>
              <button className={styles['buttonEspecialidade']}>Especialidade</button>
            </div>
          </div>
          <div className={styles['datasBox']}>
            <h4>Data:</h4>
            <div className={styles['boxButtonEspecialidade']}>
              <button className={styles['buttonData']}>08/11</button>
              <button className={styles['buttonData']}>09/11</button>
            </div>
          </div>
          <div className={styles['descricaoBox']}>
            <h4>Descrição:</h4>
            <input className={styles['inputDescricao']} type="text" name="descricao" id="descricao" />
          </div>
        </div>
      </div>
    </div>
  );
}
