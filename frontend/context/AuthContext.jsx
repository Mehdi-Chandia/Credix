import {createContext, useContext, useEffect, useState} from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isloading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

 const fetchProfile = async () => {
     try {
         const response=await fetch("http://localhost:3000/api/user/auth/me",{
             method:"GET",
             credentials:"include",
             headers: {
                 "Content-Type": "application/json",
             }
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
            value={{fetchProfile, user,isloading}}>
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