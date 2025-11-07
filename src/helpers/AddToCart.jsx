import toast from "react-hot-toast";
import axiosInstance from "../axiosInstance";

const addToCart = async(e, id) =>{
    e?.stopPropagation()
    e?.preventDefault()

    const response = await axiosInstance.post("/addToCart", {productId : id}, {withCredentials: true})

    
    if(response.data.success){
        toast.success(response.data.message)
    }

    if(response.data.error){
        toast.error(response.data.message)
        
    }
        
}

export default addToCart;