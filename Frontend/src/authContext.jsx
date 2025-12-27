import { createContext, useContext, useState } from "react";

const authContext = createContext();

export const authProvider =({children})=>{
   const [token, setToken] = useState(localStorage.getItem("token"));

   const login = (newtoken)=>{
       localStorage.setItem("token",newtoken)
       setToken(newtoken);
   }

   const logout = () =>{
    localStorage.removeItem("token");
    setToken(null);
   }

   return(
     <authContext.Provider value={{token, login, logout}}>
        {children}
     </authContext.Provider>
   )
}

export const useAuth = () => useContext(authContext);