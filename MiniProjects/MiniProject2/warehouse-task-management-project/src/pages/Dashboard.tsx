import StaffDashboard from "../components/StaffDashboard";
import ManagerDashboard from "../components/ManagerDashboard";
import { useAuth } from "../hooks/useAuth";


const Dashboard = () => {

    const authContext = useAuth();

    return authContext?.user?.user?.role === "staff"? <StaffDashboard /> : <ManagerDashboard />;
}

export default Dashboard;