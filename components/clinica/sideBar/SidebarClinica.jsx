import Link from 'next/link';
import styles from '../../../styles/SidebarClinic.module.scss';
import { BsCalendarCheck } from 'react-icons/bs';
import { FaHospitalUser } from 'react-icons/fa';
import { MdOutlineDashboard } from 'react-icons/md';
import { useEffect, useState } from 'react';
import axios from 'axios';




const Sidebar = () => {
    const [listClinicas, setClinicas] = useState();
    const IdClinica = localStorage.getItem('id')
    
    useEffect(() => {
      const url = `http://localhost:3000/clinica/${IdClinica}`;
  
      function getClinica() {
          axios.get(url)
              .then(response => {
                  const data = response.data;
                  console.log(data);
                  setClinicas(data);
              })
              .catch(error => {
                  console.error(error);
              });
      }
  
      getClinica();
    }, []);
  
    return (
        <nav className={styles.sidebar}>
            <ul className={styles.ul}>
                <li>
                    <Link href="/clinica/perfil"> 
                    {listClinicas?.clinica.map(clinica => 
                        (
                            <img className={styles.img_img}  
                            src={clinica.foto}
                            alt="foto de perfil da clinica" /> 
                        )
                    )}
                    
                    </Link> 
                </li>
                <div>
                    <div className={styles.lista}>
                        <li> <Link href="/clinica/historico"> <BsCalendarCheck/> </Link> </li>

                        <li> <Link href="/clinica/medico"> <FaHospitalUser /> </Link> </li>

                        <li> <Link href="/clinica/home"> <MdOutlineDashboard /> </Link> </li>
                    </div> 
                </div>
                <li> <Link style={{fontSize:'1.2rem'}} href="/medico/home">Home</Link> </li>
            </ul>
        </nav>
    );
};

export default Sidebar;