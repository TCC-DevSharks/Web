import styles from '../../../components/clinica/historicoConsulta/Historico.module.scss';
import Sidebar from "../../../components/clinica/sideBar/SidebarClinica";
import HistoricoConsulta from '../../../components/clinica/historicoConsulta/HistoricoConsulta';

export default function Historico() {
  return (
   <div>
    < Sidebar/>
    <div className={styles.container_geral}>
      <div className={styles.container_dados}>
        <div className={styles.container_marcadas}>
          <div className={styles.title}>
            Consultas Marcadas
          </div>

          <div className={styles.box_marcadas}>
            <HistoricoConsulta />
            <HistoricoConsulta />
            <HistoricoConsulta />
            <HistoricoConsulta />
   
          </div>
        </div>

        <div className={styles.container_realizadas}>
          <div className={styles.title}>
            Consultas Realizadas
          </div>

          <div className={styles.box_realizadas}>
          <HistoricoConsulta />
            <HistoricoConsulta />
            <HistoricoConsulta />
            <HistoricoConsulta />

          </div>
        </div>
      </div>
    </div>
   </div>
  )
}

