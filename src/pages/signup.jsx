import { Link, useNavigate } from 'react-router-dom'
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from 'react';
import { ImageToBase64 } from '../helpers/imageToBase64';
import axiosInstance from '../axiosInstance';
import toast from 'react-hot-toast';


export const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        profilePic: ""
    })

    const navigate = useNavigate();
    const handleOnChange = (e) => {
        const { name, value } = e.target
        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    //console.log(data)

    const handleUploadPic = async (e) => {
        const file = e.target.files[0];
        const imagePic = await ImageToBase64(file)
        console.log("imagePic,", imagePic);
        setData((prev) => {
            return {
                ...prev,
                profilePic: imagePic
            }
        })

    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (data.password !== data.confirmPassword) {
                toast.error("password not match")
                return;
        }
        try {
            const response = await axiosInstance.post('/register', data)
            
            if (response.data.success) {
                console.log("response", response);
                toast.success(response.data.message)
                navigate('/login')
            }

            if (response.data.error) {
                toast.error(response.data.message)
            }
            

            
        } catch (err) {
            console.log("error", err);
            toast.error(response.data.message)
        }

    }
    return (
        <section id='signup'>
            <div className="container mx-auto p-4">
                <div className='bg-white p-5 w-full max-w-sm mx-auto'>
                    <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
                        <div>
                            <img src={data.profilePic} alt="" />

                        </div>
                        <form action="">
                            <label >
                                <div className='text-xs bg-slate-200 w-full absolute bottom-0 bg-opacity-80 pb-4 pt-4 cursor-pointer text-center py-4'>
                                    Upload Photo
                                </div>
                                <input type='file' className='hidden' onChange={handleUploadPic} />
                            </label>

                        </form>

                    </div>

                    <form action="" className='pt-6 flex flex-col gap-3' onSubmit={handleSubmit}>
                        <div className='grid' >
                            <label htmlFor="">Name:</label>
                            <div className='bg-slate-200 p-2' >
                                <input
                                    type="text"
                                    name='name'
                                    value={data.name}
                                    onChange={handleOnChange}
                                    placeholder='your name'
                                    className='w-full h-full outline-none bg transparent' />
                            </div>

                        </div>
                        <div className='grid' >
                            <label htmlFor="">Email:</label>
                            <div className='bg-slate-200 p-2' >
                                <input
                                    type="email"
                                    name='email'
                                    value={data.email}
                                    onChange={handleOnChange}
                                    placeholder='your email'
                                    className='w-full h-full outline-none bg transparent' />
                            </div>

                        </div>
                        <div>
                            <label htmlFor="">Password</label>
                            <div className='bg-slate-200 flex p-2'>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="your password"
                                    name='password'
                                    value={data.password}
                                    onChange={handleOnChange}
                                    className='w-full h-full outline-none bg transparent' />
                                <div className='cursor-pointer' onClick={() => setShowPassword((prev) => !prev)}>
                                    <span>
                                        {
                                            showPassword ? (
                                                <FaRegEyeSlash />
                                            ) :
                                                (
                                                    <FaEye />
                                                )
                                        }

                                    </span>
                                </div>

                            </div>
                        </div>
                        <div>
                            <label htmlFor=""> Confirm Password</label>
                            <div className='bg-slate-200 flex p-2'>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="confirm your password"
                                    name='confirmPassword'
                                    value={data.confirmPassword}
                                    onChange={handleOnChange}
                                    className='w-full h-full outline-none bg transparent' />
                                <div className='cursor-pointer' onClick={() => setShowConfirmPassword((prev) => !prev)}>
                                    <span>
                                        {
                                            showConfirmPassword ? (
                                                <FaRegEyeSlash />
                                            ) :
                                                (
                                                    <FaEye />
                                                )
                                        }

                                    </span>
                                </div>

                            </div>

                        </div>

                        <button className='bg-blue-500 hover:bg-blue-300 text-white px-2 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-5 duration-300'>Sign Up</button>
                    </form>

                    <p className='my-5'>Already have an account ? <Link to={'/login'} className='hover:underline text-blue-500 hover:text-blue-400'>Log in</Link></p>
                </div>
            </div>

        </section>
    )
}
