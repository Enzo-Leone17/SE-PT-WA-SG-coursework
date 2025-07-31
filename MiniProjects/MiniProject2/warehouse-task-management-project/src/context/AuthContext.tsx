//import react hooks and types
import { createContext, useState, type ReactNode } from "react";
import { useEffect, useMemo } from "react";

//import components
import Loading from "../components/common/Loading";
import ErrorComponent from "../components/common/Error";

//backend
import axios from "axios";

const authURL = "http://localhost:8000/api/warehouse/auth/";

//create a type for the auth context
interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isAuthenticated: boolean;
  login: (loginInfo: object) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (updatedInfo: object) => Promise<void>;
}

//children type
interface AuthProviderProps {
  children: ReactNode;
}

//user typing
interface User {
  accessToken?: string;
  refreshToken?: string;
  user?: {
    id?: number;
    username?: string;
    email?: string;
    role?: string;
  };
}

//create the auth context, default undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

//create the auth provider
const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("auth_user");
    return storedUser ? JSON.parse(storedUser) : null;
  }); //user data if logged in
  const isAuthenticated = useMemo(() => !!user?.accessToken, [user]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  

  useEffect(() => {
    if (user) {
      localStorage.setItem("auth_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("auth_user");
    }
  }, [user]);

  const login = async (loginInfo: object): Promise<void> => {
    setLoading(true);
    try {
      const response = await axios.post(authURL + "login", loginInfo); //try to login
      if (!response || response.status !== 200) {
        throw new Error("Login failed");
      }
      console.log("Successful login",response.data);
      setUser(response.data);
      setLoading(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        setLoading(false);
      } else {
        setError("Something went wrong");
        setLoading(false);
      }
    }
  };

  const logout = async (): Promise<void> => {
    try {
      const response = await axios.post(authURL + "logout", user); //try to logout
      if (!response || response.status !== 200) {
        throw new Error("Logout failed");
      }
      setUser(null);
      setLoading(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        setLoading(false);
      } else {
        setError("Something went wrong");
        setLoading(false);
      }
    }
  };

  const updateUser = async (updatedInfo : object): Promise<void> => {
    setUser({
      ...user,
      ...updatedInfo
    })
  };

  if (loading) return <Loading />;
  if (error) {
    setTimeout(() => {
      //refresh page in 3 seconds after encounter error
      setError(null);
      window.location.reload();
    }, 3000);
    return <ErrorComponent message={error} />;
  }

  return (
    <AuthContext.Provider
      value={{ user, setUser, isAuthenticated, login, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };

export type { AuthContextType };
