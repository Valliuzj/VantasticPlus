import{createContext, useState, useEffect}from 'react';
import axios from 'axios'

export const AuthContext = createContext(null);

export const AuthProvider = ({children})=>{
    const[user,setUser]=useState(null);
    const [token, setToken] = useState(null);

    useEffect(()=>{
        const fetchUser = async()=>{
            const storedToken = sessionStorage.getItem('token'); 
            if (storedToken) {
                setToken(storedToken); 
                try{
                    const response = await axios.get(
                        `${process.env.NEXT_PUBLIC_API_BASE_URL}/me`, 
                        {
                            headers: {
                              Authorization: `Bearer ${storedToken}`, 
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
        <AuthContext.Provider value={{user,setUser,token}}>
            {children}
        </AuthContext.Provider>
    )
}