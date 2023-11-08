import Link from "next/link";
import styles from "../../../styles/SidebarClinic.module.scss";
import { BsCalendarCheck } from "react-icons/bs";
import { FaHospitalUser } from "react-icons/fa";
import { MdOutlineDashboard, MdExitToApp } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";

const Sidebar = () => {
  const [listClinicas, setClinicas] = useState();
  let IdClinica = null;
  

  if (typeof window !== "undefined") {
    // Verificar se estamos no lado do cliente (navegador)
    IdClinica = localStorage.getItem("id");
  }

  useEffect(() => {
    if (IdClinica) {
      const url = `http://localhost:3000/clinica/${IdClinica}`;

      function getClinica() {
        axios
          .get(url)
          .then((response) => {
            const data = response.data;
           
            setClinicas(data);
          })
          .catch((error) => {
            console.error(error);
          });
      }

      getClinica();
    }
  }, []);

  return (
    <aside className={styles["sidebar"]}>
      <div className={styles["content"]}>
        <div className={styles["image-box"]}>
          <li>
            <Link href="/clinica/perfil">
              {listClinicas?.clinica.map((clinica) => (
                <>
                  <img
                    className={styles["image-clinica"]}
                    src={clinica.foto}
                    alt="foto de perfil da clinica"
                  />

                  <h1>{clinica.razao_social}</h1>
                </>
              ))}
            </Link>
          </li>
          <div className={styles["divisor"]}></div>
        </div>

        <ul>
          <li>
            <i>
              <Link href="/clinica/historico">
                <BsCalendarCheck />
                Agenda
              </Link>
            </i>
          </li>
          <li>
            <i>
              <Link href="/clinica/medico">
                <FaHospitalUser />
                Médicos
              </Link>
            </i>
          </li>
          <li>
            <i>
              <Link href="/clinica/home">
                <MdOutlineDashboard /> Dashboard
              </Link>
            </i>
          </li>
        </ul>
      </div>
      <div className={styles["footer"]}>
        <ul>
          <li>
            <a href="/">
              Sair <MdExitToApp />
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;

// <nav className={styles.sidebar}>
//     <ul className={styles.ul}>
//         <li>
//             <Link href="/clinica/perfil">
//                 {listClinicas?.clinica.map(clinica =>
//                 (
//                     <img className={styles.img_img}
//                         src={clinica.foto}
//                         alt="foto de perfil da clinica" />
//                 )
//                 )}

//             </Link>
//         </li>
//         <div>
//             <div className={styles.lista}>
//                 <li> <Link href="/clinica/historico"> <BsCalendarCheck /> </Link> </li>

//                 <li> <Link href="/clinica/medico"> <FaHospitalUser /> </Link> </li>

//                 <li> <Link href="/clinica/home"> <MdOutlineDashboard /> </Link> </li>
//             </div>
//         </div>
//         <li> <Link style={{ fontSize: '1.2rem' }} href="/clinica/home">Home</Link> </li>
//     </ul>
// </nav>
