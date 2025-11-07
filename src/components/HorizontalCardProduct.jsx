import { useEffect, useRef, useState } from "react"
import FetchCategoryWise from "../helpers/fetchCategoryWise"
import Currency from "./Currency"
import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa"
import { Link } from "react-router-dom";
import addToCart from "../helpers/AddToCart";
import { useStored } from "../context/appContext";


const HorizontalCardProduct = ({ category, heading }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const loadingList = new Array(13).fill(null)

    const [scroll, setScroll] = useState(0)
    const scrollElement = useRef();

    const { getUserCart } = useStored();

    const handelAddToCart = async (e, id) => {
        await addToCart(e, id)
        getUserCart();
    }


    const getData = async () => {
        setLoading(true)
        const categoryWiseProduct = await FetchCategoryWise(category)

        setLoading(false)

        setData(categoryWiseProduct?.data)
    }

    useEffect(() => {
        getData();
    }, [])

    const scrollRight = () => {
        scrollElement.current.scrollLeft += 300
    }

    const scrollLeft = () => {
        scrollElement.current.scrollLeft -= 300
    }

    return (
        <div className="container mx-auto px-4 my-6 relative">
            <h2 className="text-2xl font-bold py-4">{heading}</h2>
            <div className="flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all" ref={scrollElement}>
                <button className="bg-white shadow-md rounded-full p-2 absolute left-0 text-lg hidden md:block" onClick={scrollLeft}><FaAngleLeft /></button>
                <button className="bg-white shadow-md rounded-full p-2 absolute right-0 text-lg hidden md:block" onClick={scrollRight}><FaAngleRight /></button>
                {
                    loading ? (
                        loadingList.map((product, index) => {
                            return (
                                <div className="w-full min-w-[300px] md:min-w-[340px] max-w-[280px] md:max-w-[320px] h-36 rounded-sm shadow-md flex">
                                    <div className="bg-slate-200 min-w-[120px] md:min-w-[145px] p-4 animate-pulse h-full">

                                    </div>
                                    <div className="p-4 grid w-full gap-2 ">
                                        <h2 className="font-medium md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 p-1 animate-pulse rounded-full">{product?.productName}</h2>
                                        <p className="capitalize p-1 bg-slate-200"></p>
                                        <div className="flex gap-3 w-full">
                                            <p className="text-green-600 font-medium bg-slate-200 animate-pulse rounded-full w-full p-1"></p>
                                            <p className="line-through p-1 bg-slate-200 animate-pulse rounded-full w-full"></p>
                                        </div>
                                        <button className=" text-white px-3 py-1 bg-slate-200  animate-pulse rounded-full w-full"></button>
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        data.map((product, index) => {
                            return (
                                <Link to={"/product/" + product?._id} className="w-full min-w-[300px] md:min-w-[340px] max-w-[280px] md:max-w-[320px] h-36 rounded-sm shadow-md flex">
                                    <div className="bg-slate-200 min-w-[120px] md:min-w-[145px] p-4 h-full">
                                        <img src={product?.productImage[0]} alt="" className="object-scale-down h-full hover:scale-110 transition-all" />
                                    </div>
                                    <div className="p-4 grid">
                                        <h2 className="font-medium md:text-lg text-ellipsis line-clamp-1 text-black">{product?.productName}</h2>
                                        <p className="capitalize">{product?.category}</p>
                                        <div className="flex gap-3">
                                            <p className="text-green-600 font-medium">{Currency(product?.selling)}</p>
                                            <p className="line-through">{Currency(product?.price)}</p>
                                        </div>
                                        <button className="bg-blue-600 text-white px-3 py-1 hover:bg-blue-800 rounded-full cursor-pointer" onClick={(e) => handelAddToCart(e, product?._id)}>Add to cart</button>
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

export default HorizontalCardProduct