import { useLocation } from "react-router-dom";
import AdminHome from "../../components/Admin/AdminHome";
import ManagementUser from "../../components/Admin/ManagementUser";
import Layout from "../../layout";

function AdminPage() {
  const location = useLocation();

  const renderContent = () => {
    switch (location.pathname) {
      case "/admin":
        return <AdminHome/>
      case "/admin/user":         
        return  <ManagementUser/>
      default:
        return <AdminHome/>;
    }
  };

  return <Layout>{renderContent()}</Layout>;
}

export default AdminPage;
