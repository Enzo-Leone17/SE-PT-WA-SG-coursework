import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


//custom hook using auth context
export const useAuth = () => useContext(AuthContext);