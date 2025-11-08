import React from 'react'
import { useState } from 'react'
import axiosInstance from '../axiosInstance'
import { useEffect } from 'react'
import { useStored } from '../context/appContext'
import Currency from '../components/Currency'
import { MdDelete } from "react-icons/md";

const ViewCart = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const { cartCount, getUserCart } = useStored();
    const loadingCart = new Array(Math.max(1, cartCount || 1)).fill(null)

    const getData = async () => {
        
        try {
            const response = await axiosInstance.get("/view-cart", { withCredentials: true })
            if (response.data.success) {
                
                setData(response.data.data)
            }
        } catch (err) {
            console.error("getData error:", err)
            setData([])
        }
    }

    const handleloading = async()=>{
        await getData()
    }

    useEffect(() => {
        setLoading(true)
        handleloading()
        setLoading(false)

    }, [])

    const increaseQty = async (id, qty) => {
        const response = await axiosInstance.post("/update-cart", { quantity: qty + 1, _id: id }, { withCredentials: true })

        if (response.data.success) {
            getData();
        }
    }

    const decreaseQty = async (id, qty) => {
        if (qty >= 2) {
            const response = await axiosInstance.post("/update-cart", { quantity: qty - 1, _id:id }, { withCredentials: true })

            if (response.data.success) {
                getData();
            }
        }

    }

    const deleteCartProduct = async (id)=>{
        const response = await axiosInstance.post("/delete-cart", { _id: id }, { withCredentials: true })

        if (response.data.success) {
            getData();
            getUserCart();
        }
    }

    const totalQty = data.reduce((previous, current)=> previous + current.quantity,0)
    const totalPrice = data.reduce((previous, current)=> previous + (current.quantity * current?.productId?.selling ),0)
    return (
        <div className='container mx-auto'>
            <div className='text-center text-lg my-3'>
                {
                    data.length === 0 && !loading && (
                        <p className='bg-slate-200 py-5'>No Data</p>
                    )
                }
            </div>
            <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
                {/**view product */}
                <div className='w-full max-w-3xl'>
                    {
                        loading ? (
                            loadingCart.map((_, i) => {
                                return (
                                    <div key={`skeleton-${i}`} className='w-full bg-slate-200 h-32 my-1 border border-slate-300 animate-pulse'>

                                    </div>
                                )
                            })

                        ) : (
                            data.map((product, index) => {
                                return (
                                    <div key={product?._id + "cart loading"} className='w-full bg-slate-100 h-32 my-2 border border-slate-300 rounded flex'>
                                        <div className='w-32 h-32 bg-slate-300'>
                                            <img src={product?.productId?.productImage[0]} className='w-full h-full object-scale-down mix-blend-multiply' />
                                        </div>
                                        <div className='px-4 py-2 w-full relative'>
                                            {/**DELET PRODUCT */}
                                            <div className='absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white' onClick={()=>deleteCartProduct(product?._id)}>
                                                <MdDelete />
                                            </div>
                                            <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
                                            <p>{product?.productId?.category}</p>
                                            <div className='flex items-center justify-between'>
                                                <p className='text-slate-500 font-semi'>{Currency(product?.productId?.selling)}</p>
                                                <p className='text-green-600 font-bold'>{Currency(product?.productId?.selling * product?.quantity)}</p>
                                            </div>
                                            <div className='flex items-center gap-3 mt-1'>
                                                <button className='cursor-pointer hover:bg-blue-600 hover:text-white rounded justify-center items-center border border-blue-600 text-blue-600 w-6 h-6' onClick={() => decreaseQty(product?._id, product?.quantity)}>-</button>
                                                <span>{product?.quantity}</span>
                                                <button className='cursor-pointer rounded justify-center items-center hover:bg-blue-600 hover:text-white border border-blue-600 text-blue-600 w-6 h-6' onClick={() => increaseQty(product?._id, product?.quantity)}>+</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        )
                    }
                </div>

                {/**summary */}
                <div className='mt-5 lg:mt-0 w-full max-w-sm'>
                    {
                        loading ? (
                            <div className='h-36 bg-slate-200 border border-slate-200 animate-pulse'>

                            </div>
                        ) : (
                            <div className='h-36 bg-slate-200'>
                                <h2 className='text-white bg-blue-600 py-1 px-4'>Summary</h2>
                                <div className='flex items-center justify-between px-4 font-medium text-lg text-slate-800 gap-2'>
                                    <p>Quantity</p>
                                    <p>{totalQty}</p>
                                </div>
                                <div className='flex items-center justify-between px-4 font-medium text-lg text-slate-800 gap-2'>
                                    <p>Total Price</p>
                                    <p className='text-green-600 font-extrabold'>{Currency(totalPrice)}</p>
                                </div>

                                <button className='bg-blue-500 px-3 py-4 cursor-pointer hover:bg-blue-800 font-bold text-white w-full '>Payment</button>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default ViewCart