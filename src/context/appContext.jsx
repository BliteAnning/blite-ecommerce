import { createContext, useContext, useEffect } from "react";
import axiosInstance from "../axiosInstance";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/userSlice";
import { useState } from "react";


const appContext = createContext();

export const useStored = () => useContext(appContext);

export const AppProvider = ({ children }) => {
    const dispatch = useDispatch()
    const [cartCount, setCartCount] = useState(0)
    const getUserDetails = async () => {
        try {
            const response = await axiosInstance.get('/user-details', { withCredentials: true });

            
            if(response.data.success){
                dispatch(setUserDetails(response.data.data))
            }
           // console.log('user-details', response)
        } catch (error) {
            console.log(error)
        }
    }

    const getUserCart = async ()=>{
        const response = await axiosInstance.get("/count-cart", {withCredentials: true})
        if(response.data.success){
            setCartCount(response?.data?.data)
            
        }
    }

    useEffect(() => {
        getUserDetails()
        getUserCart()
    }, [])


    return (
        <appContext.Provider value={{
            getUserDetails,
            getUserCart,
            cartCount
        }}>
            {children}
        </appContext.Provider>
    )
}