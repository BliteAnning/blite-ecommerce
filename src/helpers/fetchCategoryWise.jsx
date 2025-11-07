import axiosInstance from "../axiosInstance"

const FetchCategoryWise = async (category) =>{
    const response = await axiosInstance.post("/get-a-category", {category} )
    
    const categoryProducts = response.data

    return categoryProducts;
}

export default FetchCategoryWise;