import { createContext, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios'
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const [user, setUser] = useState(null); // State to hold user information
    const [showLogin, setShowLogin] = useState(false); // State to control login visibility
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [credit, setCredit] = useState(0);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();

    //loading the credits 
    const loadCreditsData = async () => {
        try {
            const { data } = await axios.post(
                backendUrl + '/api/user/credits',
                {}, // Empty data body since middleware gets userId from token
                {
                    headers: { token }  //  Headers in config object
                }
            )
            if (data.success) {
                setCredit(data.credits);
                setUser(data.user);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const generateImage = async (prompt) => {
        try {
            const { data } = await axios.post(
                backendUrl + '/api/image/generate-image',
                { prompt },
                { headers: { token } }
            )
            if (data.success) {
                loadCreditsData();
                return data.resultImage;
            } else {
                toast.error(data.message);
                loadCreditsData();
                if (data.creditBalance === 0) {
                    navigate('/buy');
                }
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }


    //for logout
    const logout = () => {
        localStorage.removeItem('token');
        setToken('');
        setUser(null);
    }

    //every time the token changes this loadCreditsData() will run 
    useEffect(() => {
        if (token) {
            loadCreditsData()
        }
    }, [token])

    const value = {
        user,
        setUser,
        showLogin,
        setShowLogin,
        backendUrl,
        token,
        setToken,
        credit,
        setCredit,
        loadCreditsData,
        logout,
        generateImage
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
}
export default AppContextProvider;
// This file creates a context for the application, allowing components to share state easily.