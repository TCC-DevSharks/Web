import styles from '../styles/Alimentos.module.css'
import TituloSecao from '@/components/TituloSecao';
import AlimentosDieta from '@/components/AlimentosDieta';

export default function Home() {
  return (
    <div className={styles['alimentos-container']}>
          <TituloSecao title="Gerenciar Dieta" />
          <div className={styles['buscar-alimento']}>
          <input type="text" placeholder='Buscar alimento:'/>
          </div>
          <AlimentosDieta foto="https://o.remove.bg/downloads/64f39b4c-3aeb-4e4c-8cf3-8e87b5f99752/image-removebg-preview.png" nome_alimento="Banana"/>
          <AlimentosDieta foto="https://o.remove.bg/downloads/64f39b4c-3aeb-4e4c-8cf3-8e87b5f99752/image-removebg-preview.png" nome_alimento="Banana"/>
          <AlimentosDieta foto="https://o.remove.bg/downloads/64f39b4c-3aeb-4e4c-8cf3-8e87b5f99752/image-removebg-preview.png" nome_alimento="Banana"/>
    </div>
  )
}