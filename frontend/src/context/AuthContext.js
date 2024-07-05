import{createContext, useState, useEffect}from 'react';
import axios from 'axios'

export const AuthContext = createContext(null);

export const AuthProvider = ({children})=>{
    const[user,setUser]=useState(null);

    useEffect(()=>{
        const fetchUser = async()=>{
            const token = sessionStorage.getItem('token');
            if(token){
                try{
                    const response = await axios.get(
                        `${process.env.NEXT_PUBLIC_API_BASE_URL}/me`, 
                        {
                            headers: {
                              Authorization: `Bearer ${token}`, 
                            }
                          }
                    );
                    setUser(response.data.userData);
                }
                catch(error){
                console.error("Error fetching user data:", error);
                setUser(null);
                }
            }
         };
        fetchUser();
    },[]);

    return(
        <AuthContext.Provider value={{user,setUser}}>
            {children}
        </AuthContext.Provider>
    )
}