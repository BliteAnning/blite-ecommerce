
import { Link, useNavigate } from 'react-router-dom'
import { RiLoginBoxLine } from "react-icons/ri" 
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from 'react';
import axiosInstance from '../axiosInstance';
import toast from 'react-hot-toast';
import { useStored } from '../context/appContext';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const {getUserDetails, getUserCart} = useStored();
    const [data, setData] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate();

    const handleOnChange = (e) => {
        const {name, value} = e.target
        setData((prev)=>{
            return{
                ...prev,
                [name]: value
            }
        })
    }
    //console.log(data)

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const response = await axiosInstance.post('/login', data,{ withCredentials: true })

        if(response.data.success){
           // console.log("response", response);
            toast.success(response.data.message)
            navigate('/')
            getUserDetails();
            getUserCart();
        }
        if(response.data.error){
            toast.error(response.data.message)
        }
    }


  return (
    <section id='login'>
        <div className="container mx-auto p-4">
            <div className='bg-white p-5 w-full max-w-sm mx-auto'>
                <div>
                    <RiLoginBoxLine size={30} className='mx-auto text-blue-600'/>
                </div>
                <form action="" className='pt-6 flex flex-col gap-3'onSubmit={handleSubmit}>
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
                                type={showPassword?"text":"password"} 
                                placeholder= "your passowrd" 
                                name='password'
                                value={data.password}
                                onChange={handleOnChange}
                                className='w-full h-full outline-none bg transparent' />
                            <div className='cursor-pointer' onClick={() => setShowPassword((prev)=>!prev)}>
                                <span>
                                    {
                                        showPassword?(
                                            <FaRegEyeSlash />
                                        ):
                                        (
                                            <FaEye/>
                                        )
                                    }
                                    
                                </span>
                            </div>

                        </div>
                        <Link to={'/forgot-password'} className='block w-fit ml-auto hover:underline text-blue-500'>Forgot password</Link>
                    </div>

                    <button className='bg-blue-500 hover:bg-blue-300 text-white px-2 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-5 duration-300'>Login</button>
                </form>

                <p className='my-5'>Don't have account ? <Link to={'/signup'} className='hover:underline text-blue-500 hover:text-blue-400'>Sign up</Link></p>
            </div>
        </div>
        
    </section>
  )
}
export default Login;