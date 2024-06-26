import { createContext, useState, useContext, ReactNode } from "react"

type Token = {
  token: string;
  setToken: (T: string) => void;
}

type TokenProviderProps = {
  children: ReactNode
}

const TokenContext = createContext<Token>({
  token: "",
  setToken: () => {}
});

export function TokenProvider({ children }: TokenProviderProps) {
  const [token, setToken] = useState("");

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  )
}

export function useToken() {
  return useContext(TokenContext);
}