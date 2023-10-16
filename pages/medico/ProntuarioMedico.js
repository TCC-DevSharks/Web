import styles from './../styles/ProntuarioMedico.module.css';
import Prontuario from '@/components/Prontuario'
import TituloSecao from '@/components/TituloSecao';
import { useRouter } from 'next/router';


export default function ProntuarioMedico() {
  const router = useRouter();
  const { nome } = router.query; 
  return (
    <div className={styles['prontuario-m-container']}>
            <TituloSecao title="Prontuário" />
            <Prontuario nome={nome}/>
        </div>
  )
}