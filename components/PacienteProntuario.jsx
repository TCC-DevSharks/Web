import styles from './../styles/Prontuario.module.css';
import Link from 'next/link';

const PacienteProntuario = ({ foto, nome }) => {
    return (
        <Link href={`/ProntuarioMedico?nome=${nome}`}>

        <div className={styles['box-paciente']}>
          <div className={styles['img-box-div']}>
            <img className='img' src={foto} alt={`Foto de ${nome}`} />
          </div>
          <div className={styles['nome']}>
            {nome}
          </div>
        </div>
    </Link>
    );
};

export default PacienteProntuario;