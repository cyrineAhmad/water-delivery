import { useState , createContext, useContext,} from "react";
import * as userService from '../services/userService';
import { toast } from "react-toastify";
const AuthContext = createContext(null);
export const AuthProvider = ({ children}) => {
const [user, setUser] = useState(userService.getUser());
const login = async (email,password) => {
try{
            const user = await userService.login(email,password);
            setUser(user);
            toast.success('Logged in successfully!');
}catch(err){
            toast.error(err.response.data);
        }
};

const register = async data => {
    try {
          const user = await userService.register(data);
          setUser(user);
          toast.success('Registered Successfully');
    } catch (err) {
          toast.error(err.response.data);
    }
};

const logout = () => {
    userService.logout();
    setUser(null);
    toast.success('Logged out successfully!');
};

const updateProfile = async user => {
    const updatedUser = await userService.updateProfile(user);
    toast.success('Profile Updated Successfully!');
    if(updatedUser) setUser(updatedUser);
};

const changePassword = async passwords => {
    await userService.changePassword(passwords);
    toast.success('Password changed successfully! Please Login again.');
};

return (
        <AuthContext.Provider value={{user,login,logout, register, updateProfile, changePassword}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);