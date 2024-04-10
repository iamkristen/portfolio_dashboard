import { getToken, removeToken, addToken } from './token';
import { createContext, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AuthContext = createContext();

export const useAuthData = () => useContext(AuthContext);

export const Login = async (formData) => {
  try {
   removeToken();
    const response = await axios.post('http://localhost:5000/api/login', formData);
    if (response.status === 200) {
      const data = response.data;
      addToken(data.token);
      return true; // Indicate successful login
    } else {
      // Handle other response status codes if needed
      console.error('Authentication failed:', response.statusText);
      return false; // Indicate failed login
    }
  } catch (error) {
    console.error('Error during authentication:', error);
    return false; // Indicate failed login due to an error
  }
};

export const isAuthenticated = () => {
  const token = getToken();
  return token ? true : false;
};

export const LogOut = () => {
  removeToken();
  const navigate = useNavigate();
  navigate('/login', { replace: true }); 
};
