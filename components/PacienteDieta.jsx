import styles from './../styles/Dieta.module.css';

const PacienteDieta = (
    nome,
    semanas
) => {
    console.log(nome);
    return (
        <div className={styles['paciente']}>
            <div className={styles['pacientesControllerBox']}>
            <div className={styles['imagem']}>
                <img src="https://firebasestorage.googleapis.com/v0/b/bebe-vindo.appspot.com/o/image%3A31?alt=media&token=96b70c5b-bba8-4be5-b38c-3d54be3895e2"></img>
            </div>
            <div className={styles['nomeBox']}>
                <h2 className={styles['nomePaciente']}>
                    Nome: <span  style={{color:'#b6b6f6'}}> {nome} </span> 
                </h2>
                <h3 className={styles['semanasGestante']}>
                    {semanas} semanas
                </h3>
            </div>
            </div>
            
        </div>
    );
};

export default PacienteDieta;