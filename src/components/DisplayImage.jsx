import React from 'react'
import { IoMdClose } from "react-icons/io"

const DisplayImage = ({ imgUrl, onClose }) => {
    return (
        <div className='fixed bottom-0 flex top-0 right-0 left-0 justify-center items-center'>
            <div className='bg-white shadow-lg rounded max-w-5xl mx-auto p-2'>
                <div className='w-fit ml-auto pb-3 hover:text-red-500 cursor-pointer' onClick={onClose}>
                    <IoMdClose />
                </div>
                <div className='flex justify-center p-4 max-w-[80vh] max-h-[80vh]'>
                    <img src={imgUrl} alt="img" className='w-full h-full' />
                </div>
            </div>

        </div>
    )
}

export default DisplayImage