import { useEffect, useRef, useState } from "react"
import FetchCategoryWise from "../helpers/fetchCategoryWise"
import Currency from "./Currency"
import addToCart from "../helpers/AddToCart";
import { Link } from "react-router-dom";
import { useStored } from "../context/appContext";
import Scroll from "../helpers/Scroll";

const CategoryWiseProductDisplay = ({ category, heading }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const loadingList = new Array(13).fill(null)
    const {getUserCart} = useStored();

    const handelAddToCart = async (e, id) =>{
       await addToCart(e, id)
       getUserCart();
    }

    const getData = async () => {
        setLoading(true)
        const categoryWiseProduct = await FetchCategoryWise(category)
        //console.log("pro", categoryWiseProduct)
        setLoading(false)

        setData(categoryWiseProduct?.data)
    }

    useEffect(() => {
        getData();
    }, [])


    return (
        <div className="container mx-auto px-4 my-6 relative">
            <h2 className="text-2xl font-bold py-4">{heading}</h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,320px))] justify-between md:gap-6 overflow-x-scroll scrollbar-none transition-all" >
                
                {
                    loading ? (
                          loadingList.map((product, index) => {
                        return (
                            <div className="w-full min-w-[320px] md:min-w-[340px] max-w-[280px] md:max-w-[320px] rounded-sm shadow">
                                <div className="bg-slate-200 min-w-[280px] md:min-w-[145px] p-4 h-44 flex justify-center animate-pulse items-center">
                                    
                                </div>
                                <div className="p-4 grid gap-3">
                                    <h2 className="font-medium md:text-lg text-ellipsis line-clamp-1 p-1 bg-slate-200 animate-pulse text-black "></h2>
                                    <p className="capitalize p-1 bg-slate-200 animate-pulse"></p>
                                    <div className="flex gap-3">
                                        <p className="text-green-600 font-medium p-1 bg-slate-200 animate-pulse"></p>
                                        <p className="line-through p-1 bg-slate-200 animate-pulse"></p>
                                    </div>
                                    <button className=" text-white px-3 py-1 rounded-full p-1 bg-slate-200 animate-pulse"></button>
                                </div>
                            </div>
                        )
                    })
                    ):(
                          data.map((product, index) => {
                        return (
                            <Link to={"/product/" + product?._id} className="w-full min-w-[320px] md:min-w-[340px] max-w-[280px] md:max-w-[320px] rounded-sm shadow" onClick={Scroll}>
                                <div className="bg-slate-200 min-w-[280px] md:min-w-[145px] p-4 h-44 flex justify-center items-center">
                                    <img src={product?.productImage[0]} alt="" className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply" />
                                </div>
                                <div className="p-4 grid gap-3">
                                    <h2 className="font-medium md:text-lg text-ellipsis line-clamp-1 text-black">{product?.productName}</h2>
                                    <p className="capitalize">{product?.category}</p>
                                    <div className="flex gap-3">
                                        <p className="text-green-600 font-medium">{Currency(product?.selling)}</p>
                                        <p className="line-through">{Currency(product?.price)}</p>
                                    </div>
                                    <button className="bg-blue-600 text-white px-3 py-1 hover:bg-blue-800 rounded-full" onClick={(e)=>handelAddToCart(e, product?._id) }>Add to cart</button>
                                </div>
                            </Link>
                        )
                    })
                    )
                  
                }

            </div>

        </div>
    )
}

export default CategoryWiseProductDisplay;