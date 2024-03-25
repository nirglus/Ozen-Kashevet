import { createContext, useState } from "react";
import axios from 'axios';

export const UserContext = createContext({});



export default function userManager({ children }) {
    const [userRole, setUserRole] = useState('default');
    const [userState, setUserState] = useState({ id: '' });
    const [userToken, setUserToken] = useState('');


    const signUp = async ({ email, userName, password, role }) => {
        const sentData = ({ email, userName, password, role });


        try {
            const response = axios.post('http://localhost:3000/OK/Register');
            const recievedData = await response.json();
            console.log(recievedData);
            setUserState(receivedData.user);
            setUserToken(receivedData.token);
            setUserRole(recievedData.role)
        }
        catch (error) {
            console.log('Failed To Sign Up (client error)', error);

        }
    }


    const signIn = async ({ userName, password }) => {
        const sentData = { userName, password }

        try {
            const response = axios.post('http://localhost:3000/OK/Login');
            const recievedData = await response.json();
            console.log(recievedData);
        } catch (error) {
            console.log('Failed To Sign In (client error)', error);
        }
    }

    const getUser = async (userToken) => {
        try {
            const res = await axios.get(`${baseURL}/users`, { headers });
            console.log(user);
            setUserState(res.data.user);
        } catch (error) {
            console.error("Failed to get user:", error);
        }
    }

    return (
        <UserContext.Provider value={{ signIn, signUp , getUser }}>
            {children}
        </UserContext.Provider>
    )

}