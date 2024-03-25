import {React, useEffect, createContext, useState} from 'react'
import { APIBaseUrl } from '../config/baseUrl';
import axios from 'axios';

export const UserContext = createContext({});

export default function UserProvider({children}) {
  const [userData , setUserData] = useState([]);
  const [user , setUser] = useState({});
  const [userIn , setUserIn] = useState(false);

    const token = localStorage.getItem("token");
    
    const handleRegister = async (e) => {
      e.preventDefault()
      try {
        const response = await axios.post(`${APIBaseUrl}/users/register`, userData);
        console.log('Registration successful');
        localStorage.setItem("token", response.data.token);
        setUserIn(true)
        setUser(response.data.user);
      } catch (error) {
        console.error('Registration failed:', error);
      }
    };
    
    const handleLogin = async (e) => {
      e.preventDefault()
      try {
        const response = await axios.post(`${APIBaseUrl}/users/login`, userData);
        if(response.data.message ==="User not found"){
          return alert("user not found")
        }
        console.log('Login successful');
        localStorage.setItem("token", response.data.token);
        setUserIn(true)
        setUser(response.data.user);
      } catch (error) {
        console.error('Login failed:', error);
      }
    };
    
    const getUser = async()=>{
      console.log(token);
      try {
        const res = await axios.get(`${APIBaseUrl}/users/showUser`,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(res.data);
        setUserIn(true)
        console.log(res.data)
      } catch (error) {
        console.log(error);
      }
    }

    
    useEffect(()=>{
      if(token){
        getUser();
      }
    },[]);
    
    const changeHandler= (e)=>{
      userData[e.target.name] = e.target.value;
      setUserData({ ...userData });
      console.log(userData);
    }
    
    const logOut = ()=>{
      localStorage.removeItem("token")
      setUser({})
      setUserIn(false)
      alert("you log out");
    }
    
    const share = {
      changeHandler , handleLogin , handleRegister , user ,logOut, userID:user.id ,
       userIn, setUser, token , getUser
    }
    
    return (
      <UserContext.Provider value={share}>
        {children}
      </UserContext.Provider>
  );
}