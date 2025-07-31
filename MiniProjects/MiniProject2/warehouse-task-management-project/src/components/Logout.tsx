
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function LogoutButton() {
  const navigate = useNavigate();
  const authContext = useAuth();
  const authLogout = async () => {
    try {
      await authContext?.logout();
      navigate("/");
    } catch (error) {
      if(error instanceof Error) console.log(error.message);
    }
  };

  return (
    <button
      className="py-2 px-4 text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm"
      onClick={authLogout}
    >
      Logout
    </button>
  );
}
