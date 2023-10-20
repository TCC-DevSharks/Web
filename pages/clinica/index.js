import Sidebar from "../../components/SidebarClinica";
import styles from '../../styles/Dash.module.scss';


export default function Home({ Component, pageProps }) {
  return (
    <div>
      <Sidebar />
      <span>home</span>
    </div>
  );
}
