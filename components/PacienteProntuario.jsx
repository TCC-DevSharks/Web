import styles from './../styles/Prontuario.module.css';
import Link from 'next/link';

const PacienteProntuario = ({ foto, nome, semanas, descricao }) => {
    return (
        <Link href={`/ProntuarioMedico?nome=${nome}`}>

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
              {semanas} X semanas
            </h4>
            <p className={styles['descricao_paciente']}>
              {descricao} descricao
            </p>
          </div>
        </div>
    </Link>
    );
};

export default PacienteProntuario;