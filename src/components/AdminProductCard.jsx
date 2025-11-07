import React from 'react'
import { useState } from 'react';
import { CiEdit } from "react-icons/ci";
import AdminEditProduct from './AdminEditProduct';
import Currency from './Currency';
const AdminProductCard = ({ data, getProducts }) => {
    const [editProduct, setEditproduct] = useState(false)

    return (
        <div className='bg-white p-4 rounded'>
            <div className='w-40'>
                <div className='w-32 h-32 flex justify-center items-center'>
                    <img src={data.productImage[0]} width={100} height={100} alt="Product Image" className='mx-auto object-fill h-full' />
                </div>

                <h1 className='text-ellipsis line-clamp-2'>{data.productName}</h1>
                <div>
                    <div>
                        <p className='font-semibold'>
                            {
                                Currency(data.selling)
                            }
                        </p>


                    </div>
                    <div className='w-fit ml-auto p-2 bg-green-400 text-white rounded-full hover:bg-green-900' onClick={() => setEditproduct(true)}>
                        <CiEdit />
                    </div>
                </div>

            </div>

            {
                editProduct && (
                    <AdminEditProduct product={data} onClose={() => setEditproduct(false)} getProducts={getProducts} />
                )
            }


        </div>
    )
}

export default AdminProductCard