import styles from './../styles/Alimentos.module.css';
import styles from '../.next/static/webpack/039134f3321dd262.webpack.hot-update.json';


const AlimentosDieta = ({foto, nome_alimento}) => {
    return (  
            <div className={styles['alimentos']}>
                <div className={styles['alimento-nome']}>
                <img className='img_alimento' src={foto} alt={`Foto de ${nome_alimento}`} />
                <p>{nome_alimento}</p>
                </div>
            </div>
);
};

export default AlimentosDieta;