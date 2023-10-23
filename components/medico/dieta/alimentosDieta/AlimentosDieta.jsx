import styles from './style.module.css';



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