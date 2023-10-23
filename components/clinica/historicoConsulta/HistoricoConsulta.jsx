import styles from '../../../styles/Historico.module.scss';
import { BiEditAlt } from 'react-icons/bi';


const Historico = () => {
    return (
        <div className={styles.medico}>
              <div className={styles.cima}>
                <div className={styles.foto_medico}>
                  <img src="https://i3.wp.com/iclinic-mkt.s3.amazonaws.com/ghost-images/images/2018/01/blog-como-ser-um-medico-bem-sucedido-5-atitudes-fundamentais.jpg?resize=1200,1200" />
                </div>

                <div className={styles.nome_medico}>
                  <span>Paciente: Rebecca</span>
                  <span>Dr. Beatriz Sick - <span>Psiquiatria</span></span>
                </div>
              </div>

              <div className={styles.baixo}>
                <div className={styles.dia}>
                  31 de Novembro de 2020
                </div>

                <div className={styles.hora}>
                  01.00
                </div>

                <div className={styles.infos}>
                  <BiEditAlt />
                </div>
              </div>
            </div>
    );
};

export default Historico;