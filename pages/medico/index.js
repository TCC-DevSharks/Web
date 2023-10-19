// import Sidebar from "@/components/Sidebar";
// import Sidebar from '@/components/Sidebar';

import Sidebar from "../../components/Sidebar.jsx";
// import styles from '../../styles/Sidebar.module.css';

// import '../styles/globals.css'; 
{/* <script src="https://kit.fontawesome.com/121a930925.js" crossorigin="anonymous"></script> */ }

export default function Home({ Component, pageProps }) {
  return (
    <div>
      <Sidebar />
      <span>home</span>
    </div>
  );
}
