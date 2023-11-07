import Link from "next/link";
import styles from "../../styles/SidebarClinic.module.scss";
import { BsCalendarCheck, BsFillChatDotsFill } from "react-icons/bs";
import { FaClipboardList, FaHospitalUser, FaUtensils } from "react-icons/fa";
import { MdOutlineDashboard, MdExitToApp } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";

const Sidebar = () => {
  const [listMedicos, setMedicos] = useState();
  let IdMedico = null;
 

  if (typeof window !== "undefined") {
    // Verificar se estamos no lado do cliente (navegador)
    IdMedico = localStorage.getItem("id");
  }

  useEffect(() => {
    if (IdMedico) {
      const url = `http://localhost:3000/medico/${IdMedico}`;

      function getMedico() {
        axios
          .get(url)
          .then((response) => {
            const data = response.data;
         
            setMedicos(data);
          })
          .catch((error) => {
            console.error(error);
          });
      }

      getMedico();
    }
  }, []);

  return (
    <aside className={styles["sidebar"]}>
      <div className={styles["content"]}>
        <div className={styles["image-box"]}>
          <li>
            <Link href="/medico/perfil">
              {listMedicos?.medico.map((medico) => (
                <>
                  <img
                    className={styles["image-clinica"]}
                    src={medico.foto}
                    alt="foto de perfil da clinica"
                  />

                  <h1>{medico.nome}</h1>
                </>
              ))}
            </Link>
          </li>
          <div className={styles["divisor"]}></div>
        </div>

        <ul>
          <li>
            <i>
              <Link href="/medico/agenda">
                <BsCalendarCheck />
                Agenda
              </Link>
            </i>
          </li>
          <li>
            <i>
              <Link href="/medico/chat">
                <BsFillChatDotsFill />
                Chat
              </Link>
            </i>
          </li>
          <li>
            <i>
              <Link href="/medico/dieta">
                <FaUtensils />
                Dieta
              </Link>
            </i>
          </li>
          <li>
            <i>
              <Link href="/medico/prontuario">
                <FaClipboardList />
                Prontuário
              </Link>
            </i>
          </li>
          <li>
            <i>
              <Link href="/medico/home">
                <MdOutlineDashboard /> Home
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