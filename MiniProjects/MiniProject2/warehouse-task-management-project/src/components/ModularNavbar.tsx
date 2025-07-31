import type React from "react";
import { useAuth } from "../hooks/useAuth";
import { UserCircleIcon,PresentationChartBarIcon } from "@heroicons/react/24/solid";
import Navbar from "./common/CustomNavbar";

const ModularNavbar : React.FC = () => {
    const authContext = useAuth();
    return (
        <div>
            {authContext?.isAuthenticated? 
            (<Navbar links={[{heroicon: PresentationChartBarIcon, name: "Dashboard", link: "dashboard/" + authContext?.user?.user?.id },{ heroicon: UserCircleIcon, name: "Profile", link: "profile/" + authContext?.user?.user?.id }]} baseUrlname="Home" />)
            :
            (<Navbar links={[{ name: "Login", link: "login" }]} baseUrlname="Home" />)}
        </div>
    )
}

export default ModularNavbar;