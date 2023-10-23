import Link from 'next/link';
import styles from '../../../styles/SidebarClinic.module.scss';
import { BsCalendarCheck } from 'react-icons/bs';
import { FaHospitalUser } from 'react-icons/fa';
import { MdOutlineDashboard } from 'react-icons/md';

const Sidebar = () => {
    return (
        <nav className={styles.sidebar}>
            <ul className={styles.ul}>
                <li>
                    <Link href="/clinica/perfil">
                        <div className={styles.img_img}>
                            <img
                                src="https://play-lh.googleusercontent.com/lcdNm0UDhiEZFBOdscJap7agVIlOadFlVESsxBhTnapD54zg7za1Y0pMotPVpBXU8yE"
                                alt=""
                            />
                        </div>
                    </Link>
                </li>

                <div className={styles.lista}>
                    <li> <Link href="/clinica/historico"> <BsCalendarCheck/> </Link> </li>

                    <li> <Link href="/clinica/medicos"> <FaHospitalUser /> </Link> </li>

                    <li> <Link href="/clinica"> <MdOutlineDashboard /> </Link> </li>
                </div>
            </ul>
        </nav>
    );
};

export default Sidebar;