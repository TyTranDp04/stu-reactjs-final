import { useLocation } from "react-router-dom";
import AdminHome from "../../components/Admin/AdminHome";
import Layout from "../../layout";

function AdminPage() {

  const location = useLocation();

  const renderContent = () => {
    switch (location.pathname) {
      case "/admin":
        return <AdminHome/>;

      default:
        return <AdminHome/>;
    }
  };

  return <Layout>{renderContent()}</Layout>;
}

export default AdminPage;
