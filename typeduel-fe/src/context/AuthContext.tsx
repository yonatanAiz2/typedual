import { AxiosError } from "axios";
import { createContext, useContext, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

interface User {
  name: string;
  id: string;
}

interface AuthContextProps {
  user?: User | null;
  login: (name: string) => void;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

const AuthContextProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async (name: string) => {
    const {
      data: { user },
    } = await axiosInstance.get<{ user: User }>(`users/${name}`);
    setUser(user);
  };

  const login = async (name: string) => {
    try {
      const {
        data: { user },
      } = await axiosInstance.post<{ user: User }>("users", { name });

      setUser(user);
    } catch (e) {
      const errorData = (e as AxiosError)?.response?.data;

      if (errorData?.error === "user exists") {
        fetchUser(name);
      }
    }
  };
  return (
    <AuthContext.Provider value={{ login, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
export default AuthContextProvider;
