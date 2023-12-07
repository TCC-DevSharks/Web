import Link from "next/link";
import styles from "../../../styles/SidebarClinic.module.scss";
import { BsCalendarCheck } from "react-icons/bs";
import { FaHospitalUser,FaBars } from "react-icons/fa";
import { MdOutlineDashboard, MdExitToApp } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";

const Sidebar = () => {
  const [listClinicas, setClinicas] = useState();
  let IdClinica = null;
  

  if (typeof window !== "undefined") {
    IdClinica = localStorage.getItem("id");
  }

  useEffect(() => {
    if (IdClinica) {
      const url = `https://api-bebevindo.azurewebsites.net/clinica/${IdClinica}`;

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
            <a href="/" onClick={() => {localStorage.removeItem('id')}}>
              Sair <MdExitToApp />
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;

