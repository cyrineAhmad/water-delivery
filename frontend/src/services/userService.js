import axios from "axios";

export const getUser=() => 
localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

export const login = async (email, password) => {
    const { data } = await axios.post('api/users/login', { email, password });
    

    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data));
    
    return data;
};




export const register = async registerData => {
    const { data } = await axios.post('api/users/register', registerData);
    localStorage.setItem('user', JSON.stringify(data));
    return data;
};

export const logout = () => {
    localStorage.removeItem('user');  
};

export const updateProfile = async (user) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.put(
            '/api/users/updateProfile',
            user,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (err) {
        console.error('Error updating profile:', err);
        throw err;
    }
};

export const changePassword = async (passwords) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.put(
            '/api/users/changePassword',
            passwords,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (err) {
        throw err; 
    }
};


