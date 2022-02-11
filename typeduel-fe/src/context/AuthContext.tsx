import { createContext, useContext, useState } from "react";

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
  const getUser = () => {
    const u = localStorage.getItem("user");
    if (u) {
      return JSON.parse(u) as User;
    }

    return null;
  };
  const [user, setUser] = useState<User | null>(getUser());

  const fetchUser = async (name: string) => {
    const response = await fetch(`http://localhost:4000/users/${name}`);
    const { user }: { user: User } = await response.json();
    setUser(user);
    // localStorage.setItem("user", JSON.stringify(user));
  };

  const login = async (name: string) => {
    try {
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
        // localStorage.setItem("user", JSON.stringify(user));
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
