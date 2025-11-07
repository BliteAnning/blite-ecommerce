import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../axiosInstance'
import { IoStarSharp } from "react-icons/io5"
import { IoIosStarHalf } from "react-icons/io";
import Currency from '../components/Currency';
import VerticalCardProduct from '../components/VerticalCardProduct';
import CategoryWiseProductDisplay from '../components/CategoryProductDisplay';

const ProductDetails = () => {
    const [data, setData] = useState({
        productName: "",
        brandName: "",
        category: "",
        productImage: [],
        description: "",
        price: "",
        selling: ""
    })

    const params = useParams()
    const [loading, setLoading] = useState(false)
    const productImageList = new Array(4).fill(null)
    const [activeImage, setActiveImage] = useState("")
    const [zoomCoordinate, setZoomCoordinate] = useState({
        x: 0,
        y: 0
    })

    const [zoomImage, setZoomImage] = useState(false)

    const getProductDetails = async () => {
        setLoading(true)
        try {
            const response = await axiosInstance.post("/product-details", { productId: params?.id })

        if (response.data.success) {
            
            setData(response.data.data)
            setActiveImage(response?.data?.data?.productImage[0])
        }
            
        } catch (error) {
            console.error("getProductdetails error:", err)
            setData({})
        } finally{
            setLoading(false)
        }
        
    }


    useEffect(() => {
        getProductDetails()
    }, [params])

    const handleMouseEnterProduct = (imageUrl) => {
        setActiveImage(imageUrl)
    }
    const handleZoomImage = useCallback((e) => {
        setZoomImage(true)
        const { left, top, width, height } = e.target.getBoundingClientRect()
        const x = (e.clientX - left) / width
        const y = (e.clientY - top) / height

        setZoomCoordinate({
            x, y
        })

    }, [zoomCoordinate])

    const handleLeaveZoomImage = () => {
        setZoomImage(false)
    }
    return (
        <div className='container mx-auto p-4'>
            <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>
                {/* product image */}
                <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>
                    <div className='h-[300px] bg-slate-200 w-[300px] relative lg:h-96 lg:w-96 '>
                        <img src={activeImage} alt="" className='h-full w-full object-scale-down mix-blend-multiply' onMouseMove={handleZoomImage} onMouseLeave={handleLeaveZoomImage} />
                        {/*product zoom */}
                        {
                            zoomImage && (
                                <div className='absolute min-w-[500px] overflow-hidden hidden lg:block min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0'>
                                    <div
                                        className='w-full h-full min-h-[400px] min-w-[500px] scale-125 mix-blend-multiply'
                                        style={{
                                            backgroundImage: `url(${activeImage})`,
                                            backgroundRepeat: 'no-repeat',
                                            backgroundPosition: `${zoomCoordinate.x * 100}% ${zoomCoordinate.y * 100}%`
                                        }}
                                    >

                                    </div>
                                </div>
                            )
                        }

                    </div>
                    <div className='h-full'>
                        {
                            loading ? (
                                <div className='flex gap-3 lg:flex-col h-full overflow-scroll scrollbar-none'>
                                    {
                                        productImageList.map((_,i) => {
                                            return (
                                                <div className='h-20 w-20 bg-slate-200 rounded animate-pulse' key={`skeleton-${i}`}>

                                                </div>
                                            )
                                        })
                                    }
                                </div>

                            ) : (
                                <div className='flex gap-3 lg:flex-col h-full overflow-scroll scrollbar-none'>
                                    {
                                        data?.productImage.map((image, index) => {
                                            return (
                                                <div className='h-20 w-20 bg-slate-200 rounded p-1' key={image}>
                                                    <img src={image} alt="" className='w-fulll bg-slate-200 cursor-pointer object-scale-down mix-blend-multiply' onMouseEnter={() => handleMouseEnterProduct(image)} onClick={() => handleMouseEnterProduct(image)} />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>
                {/* product details */}
                {
                    loading ? (
                        <div className='grid w-full gap-1'>
                            <p className=' w-full bg-slate-200 inline-block animate-pulse h-5 rounded-full '></p>
                            <h2 className='text-2xl w-full bg-slate-200 lg:text-4xl font-semibold'></h2>
                            <p className='capitalize w-full animate-pulse bg-slate-200 text-slate-500'></p>
                            <div className='text-red-600 animate-pulse w-full bg-slate-200 h-6 flex items-center gap-3'>

                            </div>
                            <div className='flex w-full items-baseline-last gap-2 text-2xl lg:text-3xl font-medium my-1'>
                                <p className='text-green-500 animate-pulse w-full bg-slate-200'></p>
                                <p className='line-through text-slate-400 w-full animate-pulse bg-slate-200 h-6'></p>
                            </div>

                            <div className='flex items-center gap-3 my-2'>
                                <button className='animate-pulse bg-slate-200 h-6'></button>
                                <button className='animate-pulse bg-slate-200 h-6'></button>
                            </div>
                            <div>
                                <p className='text-slate-600 font-medium my-1 animate-pulse bg-slate-200 h-6'></p>
                                <p className='animate-pulse bg-slate-200 h-6'></p>
                            </div>
                        </div>
                    ) : (
                        <div className='flex flex-col gap-1'>
                            <p className='text-blue-600 w-fit bg-blue-200 inline-block px-2 rounded-full'>{data?.brandName}</p>
                            <h2 className='text-2xl lg:text-4xl font-semibold'>{data?.productName}</h2>
                            <p className='capitalize text-slate-500'>{data?.category}</p>
                            <div className='text-red-600 flex items-center gap-3'>
                                <IoStarSharp />
                                <IoStarSharp />
                                <IoStarSharp />
                                <IoStarSharp />
                                <IoIosStarHalf />
                            </div>
                            <div className='flex items-baseline-last gap-2 text-2xl lg:text-3xl font-medium my-1'>
                                <p className='text-green-500'>{Currency(data?.selling)}</p>
                                <p className='line-through text-slate-400'>{Currency(data?.price)}</p>
                            </div>

                            <div className='flex items-center gap-3 my-2'>
                                <button className=' border-2 border-blue-600 rounded px-3 py-1 min-w-[120px] font-medium hover:bg-blue-600 hover:text-white text-blue-600'>Buy</button>
                                <button className=' min-w-[120px] border-2 border-blue-600 rounded px-3 py-1 font-medium bg-blue-600 text-white hover:text-blue-600 hover:bg-white'>Add to Cart</button>
                            </div>
                            <div>
                                <p className='text-slate-600 font-medium my-1'>Description</p>
                                <p>{data?.description}</p>
                            </div>
                        </div>
                    )
                }
            </div>
            {
                data.category && (
                    <CategoryWiseProductDisplay category={data?.category} heading={"Recommended product"} />
                )
            }

        </div>
    )
}

export default ProductDetails