import { createContext, useContext, useState } from "react";

interface User {
  name: string;
  id: string;
}

interface AuthContextProps {
  user?: User;
  login: (name: string) => void;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

const AuthContextProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User>();
  console.log(user);
  const fetchUser = async (name: string) => {
    const response = await fetch(`http://localhost:4000/users/${name}`);
    const { user }: { user: User } = await response.json();
    setUser(user);
  };
  const login = async (name: string) => {
    try {
      console.log(name);
      const response = await fetch("http://localhost:4000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      const { user, error }: { user: User; error?: string } =
        await response.json();

      if (!error) {
        setUser(user);
      } else {
        if (error === "user exists") {
          fetchUser(name);
        }
      }
    } catch (e) {
      console.log(e);
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
