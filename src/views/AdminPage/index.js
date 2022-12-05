import { useLocation } from "react-router-dom";
import AdminHome from "../../components/Admin/AdminHome";
import ChangePassword from "../../components/ChangePassword/index";
import Layout from "../../layout";

function AdminPage() {

  const location = useLocation();

  const renderContent = () => {
    switch (location.pathname) {
      case "/admin":
        return <AdminHome/>;
        case "/change-password":
          return <ChangePassword/>;
      default:
        return <AdminHome/>;
        
    }
  };

  return <Layout>{renderContent()}</Layout>;
}

export default AdminPage;
