import styles from '../../../styles/Prontuario.module.css';
import { BsFillCalendarDateFill, BsClockFill } from 'react-icons/bs';


const PacienteProntuario = ({
  idConsulta,
  foto,
  nome,
  semanas,
  dataConsulta,
  horaConsulta,
  especialidade,
  onPacienteClick
}) => {
  const [hora, minutos] = horaConsulta.split(':');
  return (
    <div onClick={() => onPacienteClick({ nome, foto, semanas, dataConsulta, horaConsulta, especialidade, idConsulta })}>
      <div className={styles['box-paciente']}>
        <div className={styles['img-box-div']}>
          <div className={styles['image-box']}>
            <img className='img' src={foto} alt={`Foto de ${nome}`} />
          </div>
        </div>
        <div className={styles['paciente_data']}>
          <h2 className={styles['nome_paciente']}>
            {nome}
          </h2>
          <h4 className={styles['semanas_paciente']}>
            {semanas} semanas
          </h4>
          <div className={styles['descricao_paciente']}>
            <p style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <BsFillCalendarDateFill className={styles['iconDate']} /> Data: {dataConsulta}
            </p>
            <p>
              <BsClockFill className={styles['iconDate']} /> Horário: {hora}:{minutos}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PacienteProntuario;
