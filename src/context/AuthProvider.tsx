import { createContext, useState, useContext, ReactNode } from "react"

type Auth = {
  token: string;
  setToken: (T: string) => void;
}

type AuthProviderProps = {
  children: ReactNode
}

const AuthContext = createContext<Auth>({
  token: "",
  setToken: () => {}
});

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState("");

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext);
}