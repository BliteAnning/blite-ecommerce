import React, { useState } from 'react'
import ROLE from '../common/role'
import { IoMdClose } from "react-icons/io";
import axiosInstance from '../axiosInstance';
import toast from 'react-hot-toast';

const ChangeUserRole = ({
    name,
    email,
    role,
    onClose,
    userId,
    calFunction
}) => {
    const [userRole, setUserRole] = useState(role)
    const handleOnChange = (e) =>{
        setUserRole (e.target.value)
        console.log(e.target.value);
        
    }
    const updateUserRole = async()=>{
        const response = await axiosInstance.post('/update-user',{
            role: userRole,
            userId: userId
        } ,{withCredentials:true})
        if(response.data.success){
            toast.success(response.data.message);
            onClose();
            calFunction();
            console.log("role updated", response.data.data)
            
        }
    }
    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 justify-between items-center flex bg-black/50'>
            <div className='w-full mx-auto bg-white shadow-md p-4 max-w-sm'>
                <button className='block ml-auto' onClick={onClose}>
                    <IoMdClose />
                </button>
                <h1 className='text-lg font-medium pb-4'>Change User Role</h1>
                <p>Name: {name}</p>
                <p>Email: {email}</p>

                <div className='flex items-center justify-between my-4'>
                    <p>Role</p>
                    <select className='border px-4 py-3' onChange={handleOnChange}>
                        {
                            Object.values(ROLE).map(a => {
                                return (
                                    <option value={a} key={a}>{a}</option>
                                )
                            })
                        }
                    </select>
                </div>
                    <button onClick={updateUserRole} className='w-fit mx-auto block border py-1 px-3 rounded-full bg-blue-600 text-white hover:bg-blue-300'>change role</button>
            </div>
        </div>
    )
}

export default ChangeUserRole