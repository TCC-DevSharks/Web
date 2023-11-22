import Sidebar from '../../components/sideBar/Sidebar';

const Layout = ({ children }) => (
  <div>
    <Sidebar />
    {children}
  </div>
);

export default Layout;
