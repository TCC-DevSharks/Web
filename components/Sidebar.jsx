import Link from 'next/link';
import styles from '../styles/Sidebar.module.css';
import { BsCalendarCheck, BsFillChatDotsFill } from 'react-icons/bs';
import { FaUtensils, FaClipboardList } from 'react-icons/fa';

export default function Sidebar() {
    return (
        <nav className={styles.sidebar}>
            <ul className={styles.ul}>
                <li> <Link href="/medico/perfil"> <img className={styles.img_img} src="https://i2.wp.com/ocapacitor.com/wp-content/uploads/2020/09/2362.jpg?fit=720%2C720&ssl=1" alt="" /> </Link> </li>
                <div className={styles.lista}>
                    <li> <Link href="/medico/agenda"> <BsCalendarCheck /> </Link> </li>
                    <li> <Link href="/medico/chat"> <BsFillChatDotsFill /> </Link> </li>
                    <li> <Link href="/medico/dieta"> <FaUtensils /> </Link> </li>
                    <li> <Link href="/medico/prontuario"> <FaClipboardList /> </Link> </li>
                </div>
                <li> <Link href="/medico">Home</Link> </li>
            </ul>
        </nav>
    );
};


