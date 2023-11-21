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

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Verificar se estamos no lado do cliente (navegador)
      IdMedico = localStorage.getItem("id");
    }

    if (IdMedico) {
      const url = `https://api-bebevindo.azurewebsites.net/profissional/${IdMedico}`;
      
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
              {listMedicos?.profissionais?.map((profissionais) => (
                <>
                  <img
                    className={styles["image-clinica"]}
                    src={profissionais.foto}
                    alt="foto de perfil do médico"
                  />

                  <h1>{profissionais.nome}</h1>
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
            <a href="/" onClick={() => {localStorage.removeItem('id')}}>
            <MdExitToApp />Sair 
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;