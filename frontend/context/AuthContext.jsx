import {createContext, useContext, useEffect, useState} from "react";
import API from "../src/config/api.js";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isloading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

 const fetchProfile = async () => {
     try {
         const response=await fetch(`${API}/api/user/auth/me`,{
             method:"GET",
             credentials:"include",

         })

         if (response.status === 401) {
             console.log("user is not logged in");
             setUser(null);
             setIsLoading(false);
             return;
         }

         const res=await response.json();

         if(!response.ok){
             throw new Error(res.message);
         }
         console.log(res)
         setUser(res)

     }catch (error) {
         console.log(error.message);
         setUser(null);

     }finally {
         setIsLoading(false);
     }
 }
 useEffect(() => {
     fetchProfile();
 },[])

    return(
        <AuthContext.Provider
            value={{fetchProfile,setUser, user,isloading}}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth=()=>{
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("useAuth must be used within a AuthProvider");
    }
    return context;
}