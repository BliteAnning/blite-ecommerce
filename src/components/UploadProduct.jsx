import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io"
import productCategory from '../helpers/productCategory'
import { IoCloudUploadOutline } from "react-icons/io5";
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import { MdOutlineDeleteOutline } from "react-icons/md";
import axiosInstance from "../axiosInstance"
import toast from 'react-hot-toast';

const UploadProduct = ({ onClose, getProducts }) => {
    const [fullImage, setFullImage] = useState("")
    const [openFullImage, setOpenFullImage] = useState(false)
    const [data, setData] = useState({
        productName: "",
        brandName: "",
        category: "",
        productImage: [],
        description: "",
        price: "",
        selling: ""
    })


    const handleOnChange = (e) => {
        const { name, value } = e.target

        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleUpload = async (e) => {
        const file = e.target.files[0]

        const uploadImageCloudinary = await uploadImage(file)
        setData((prev) => {
            return {
                ...prev,
                productImage: [...prev.productImage, uploadImageCloudinary.url]
            }
        })

    }

    const handleDeleteProductImage = async (index) => {
        console.log("image index", index);
        const newproductImage = [...data.productImage]
        newproductImage.splice(index, 1);
        setData((prev) => {
            return {
                ...prev,
                productImage: [...newproductImage]
            }
        })

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const response = await axiosInstance.post('/upload-product', data, {withCredentials: true})

        if(response.data.success){
            console.log("response", response.data)
            toast.success(response.data.message)
            onClose();
            getProducts();
        }
        if(response.data.error){
           
            toast.error(response.data.message)
        }
        

    }

    return (
        <div className='fixed w-full h-full bg-black/40 top-0 left-0 bottom-0 flex justify-center items-center'>
            <div className='overflow-hidden bg-white w-full max-w-2xl p-4 h-full max-h-[80%]'>
                <div className='justify-between items-center flex'>
                    <h2 className='font-bold text-lg'>Upload Product</h2>
                    <div className='w-fit ml-auto pb-3 hover:text-red-500 cursor-pointer' onClick={onClose}>
                        <IoMdClose />
                    </div>
                </div>
                <form onSubmit={handleSubmit} className='grid mb-3 p-4 gap-3 overflow-y-auto h-full'>
                    <label htmlFor="productName">Product name :</label>
                    <input
                        type="text"
                        required
                        id='productName'
                        name="productName"
                        placeholder='Your Product name'
                        value={data.productName}
                        onChange={handleOnChange}
                        className='p-2 bg-slate-300  rounded'
                    />

                    <label htmlFor="brandName" className='mt-2'>Brand name :</label>
                    <input
                        type="text"
                        required
                        id='brandName'
                        name="brandName"
                        placeholder='Your brand name'
                        value={data.brandName}
                        onChange={handleOnChange}
                        className='p-2 bg-slate-300 rounded'
                    />


                    <label htmlFor="category" className='mt-2'>Category :</label>
                    <select required name="category" id="category" value={data.category} onChange={handleOnChange} className='p-2 bg-slate-200 rounded'>
                        <option value={""}>Select Category</option>
                        {
                            productCategory.map((items, index) => {
                                return (
                                    <option value={items.value} key={items.value + index}>{items.label}</option>
                                )
                            })
                        }
                    </select>
                    <label htmlFor="productImage" className='mt-2'>Product Image :</label>
                    <label htmlFor='uploadImage'>
                        <div className='p-2 bg-slate-200 rounded flex h-32 w-full justify-center cursor-pointer items-center'>

                            <div className='text-slate-600 flex justify-center items-center gap-3 flex-col'>

                                <span className='text-4xl'><IoCloudUploadOutline /></span>
                                <p className='text-sm'>Upload product</p>
                                <input  type="file" id='uploadImage' className='hidden' onChange={handleUpload} />
                            </div>
                        </div>
                    </label>
                    <div>
                        <div className='flex items-center gap-3'>
                            {
                                data?.productImage[0] ? (
                                    data.productImage.map((el, index) => {
                                        return (
                                            <div className='relative group'>
                                                <img src={el} alt={el} width={80} height={80} className='bg-slate-300 cursor-pointer'
                                                    onClick={() => {
                                                        setOpenFullImage(true)
                                                        setFullImage(el)
                                                    }} />
                                                <div className='absolute bottom-0 right-0 p-1 bg-red-500 text-white cursor-pointer rounded-full hidden group-hover:block'
                                                    onClick={() => handleDeleteProductImage(index)}>
                                                    <MdOutlineDeleteOutline />
                                                </div>
                                            </div>

                                        )
                                    })
                                ) : (
                                    <p className='text-red-600 text-xs'>Upload Product Image</p>
                                )
                            }
                        </div>

                    </div>
                    <label htmlFor="price" className='mt-1'>Price</label>
                    <input
                        type="number"
                        required
                        id='price'
                        name="price"
                        placeholder='Enter Price'
                        value={data.price}
                        onChange={handleOnChange}
                        className='p-2 bg-slate-300 rounded'
                    />

                    <label htmlFor="selling" className='mt-1'>Selling price</label>
                    <input
                        type="number"
                        required
                        id='selling'
                        name="selling"
                        placeholder='Enter selling Price'
                        value={data.selling}
                        onChange={handleOnChange}
                        className='p-2 bg-slate-300 rounded'
                    />

                    <label htmlFor="description" className='mt-1'>Description</label>
                    <textarea
                        name="description"
                        required
                        className='h-28 bg-gray-300 p-2 resize-none'
                        placeholder='Enter product description'
                        id="description"
                        onChange={handleOnChange}
                        value={data.description}
                        rows={3}>

                    </textarea>
                    <button className='px-3 py-2 bg-green-600 mb-10 text-white hover:bg-green-900'>Upload product</button>




                </form>

            </div>
            {/*full image display*/}
            {
                openFullImage && (
                    <DisplayImage onClose={() => setOpenFullImage(false)} imgUrl={fullImage} />
                )
            }

        </div>
    )
}

export default UploadProduct