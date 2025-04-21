import {useState,useEffect,useContext,createContext} from 'react';
import axios from 'axios';
const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const checkauth =async()=>{
            try{
                const response = await axios.get('http://localhost:5000/api/auth/verify',{withCredentials:true});
                setUser(response.data);
            }
            catch(err){
                setUser(null);
            }
            finally{
                setLoading(false);  
            }
        }
        checkauth();
    },[]);

    const login =async (email,password)=>{
        const res =await axios.post('http://localhost:5000/api/auth/login',{email,password},{ withCredentials: true })
        setUser(res.data.user)
    }
    
    const register = async (username,email,password)=>{
        const res =await axios.post('http://localhost:5000/api/auth/register',{username,email,password},{ withCredentials: true })
        console.log(res.data.user)
        setUser(res.data.user)
    }

    const logout = async ()=>{
        await axios.get('http://localhost:5000/api/auth/logout',{ withCredentials: true });
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{user,login,register,logout,loading}}> 
        {children}
        </AuthContext.Provider>
    );
};
export const useAuth = ()=> useContext(AuthContext);

