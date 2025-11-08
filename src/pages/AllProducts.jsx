import { useState, useEffect } from 'react'
import UploadProduct from '../components/UploadProduct'
import axiosInstance from '../axiosInstance'

import AdminProductCard from '../components/AdminProductCard';

const AllProducts = () => {
        const [openUpProduct, setOpenUpProduct] = useState(false)
        const [allProducts, setAllProducts] = useState([])

        const getProducts = async()=>{
            const response = await axiosInstance.get("/get-all-products", {withCredentials:true})

            
            if(response.data.success){
                
                //console.log("Data fetched", response.data );
                setAllProducts(response.data?.data)
            }

            
        }

        useEffect(()=>{
                getProducts()
        },[])

    return (
        <div>
            <div className='bg-green-300 py-2 px-4 flex justify-between items-center'>
                <h2 className='font-bold text-lg'>All Products</h2>
                <button className='border border-white hover:text-white hover:bg-green-600 py-1 px-3 rounded-full' onClick={()=>setOpenUpProduct(true)}>Upload Prodcut</button>
            </div>
            <div className='flex-wrap flex items-center gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll'>
                {
                    allProducts.map((products,index)=>{
                        return (
                            <AdminProductCard data={products} key={index+"allProduct"} getProducts={getProducts}/>
                            
                        )
                    })
                }
            </div>



            {
                openUpProduct && (
                    <UploadProduct onClose={()=>setOpenUpProduct(false)} getProducts={getProducts}/>
                )
            }
            
        </div>

    )
}

export default AllProducts