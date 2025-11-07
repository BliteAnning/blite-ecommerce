import React from 'react'
import { useState } from 'react'
import axiosInstance from '../axiosInstance'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const CategoryList = () => {
    const [categoryproduct, setCategoryProduct] = useState([])
    const [loading, setLoading] = useState(false)

    const categoryLoading = new Array(13).fill(null)

    const getAllCategoryProducts = async () => {
        setLoading(true)
        const response = await axiosInstance.get("/get-category")
        if (response.data.success) {
            setLoading(false)
            setCategoryProduct(response.data.data)
        }
    }

    useEffect(() => {
        getAllCategoryProducts()
    }, [])
    return (
        <div className='container mx-auto p-4'>
            <div className='flex items-center gap-2 justify-between overflow-scroll scrollbar-none'>
                {
                    loading ? (

                        categoryLoading.map((el, index) => {
                            return (
                                <div className='h-16 w-16 md:w-20 md:h-20 overflow-hidden rounded-full bg-slate-200 animate-pulse' key={"categoryLoading"+index}>

                                </div>
                            )
                        })
                    ) : (
                        categoryproduct.map((product, index) => {
                            return (
                                <Link to={"/product-category/" + product?.category} className='cursor-pointer' key={product?.category}>
                                    <div className='w-16 md:w-20 items-center justify-center p-4 bg-slate-200 h-16 md:h-20 rounded-full overflow-hidden'>
                                        <img src={product?.productImage[0]} alt={product?.category} className='h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all' />
                                    </div>
                                    <p className='text-center text-sm md:text-base capitalize'>{product?.category}</p>
                                </Link>
                            )
                        })
                    )

                }
            </div>

        </div>
    )
}

export default CategoryList