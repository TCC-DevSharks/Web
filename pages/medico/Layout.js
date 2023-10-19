import Sidebar from '../../components/Sidebar';

const Layout = ({ children }) => (
  <div>
    <Sidebar />
    {children}
  </div>
);

export default Layout;
