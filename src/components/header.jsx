import { CiSearch } from "react-icons/ci";
import { FaUserAlt } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axiosInstance from '../axiosInstance'
import { setUserDetails } from "../store/userSlice";
import { useState } from "react";
import ROLE from "../common/role";
import { useStored } from "../context/appContext";



const Header = () => {
    const user = useSelector(state => state?.user?.user)
    const dispatch = useDispatch()
    const [menuDisplay, setMenuDisplay] = useState(false)
    const { cartCount } = useStored()
    const navigate = useNavigate()
    const searchInput = useLocation()
    const [search, setSearch] = useState(searchInput?.search?.split("=")[1])

    //console.log('search', user)

    const handleLogout = async () => {
        const response = await axiosInstance.get("/logout", { withCredentials: true })

        if (response.data.success) {
            toast.success(response.data.message)
            dispatch(setUserDetails(null))
        }

        if (response.error) {
            toast.error(response.data.message)
        }
    }

    const handleSearch = (e) =>{
        const {value} = e.target
        setSearch(value)

        if(value){
            navigate(`/search?q=${value}`)
        } else {
            navigate("/search")
        }
            
    }

    return (
        <header className="p-4 h-16 bg-white fixed w-full z-40 shadow-md">
            <div className="container justify-between mx-auto h-full items-center flex">
                <div>
                    <Link to={"/"} className="text-3xl font-bold text-blue-600">Blite commerce</Link>
                </div>
                <div className=" hidden md:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-md pl-2">
                    <input type="text" placeholder="Search for products here..." onChange={handleSearch} value={search} className="w-full pl-2 outline-none" />
                    <div className="bg-blue-400 min-w-[50px] flex items-center h-8 justify-center rounded-r-full" >
                        <CiSearch />
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <div className="relative group flex justify-center">
                        {
                            user?._id && (
                                <div className="text-3xl cursor-pointer relative flex justify-center " onClick={() => setMenuDisplay(!menuDisplay)}>
                                    {
                                        user?.profilePic ? (
                                            <img src={user?.profilePic} alt="profile photo" className="w-10 h-10 rounded-full" />
                                        ) : (
                                            <FaUserAlt size={25} />
                                        )
                                    }

                                </div>
                            )
                        }

                        {
                            menuDisplay && (
                                <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded">
                                    <nav>
                                        {
                                            user?.role === ROLE.ADMIN && (
                                                <Link to={"/admin-panel/all-products"} className="whitespace-nowrap hidden md:block hover:bg-slate-200">Admin Panel</Link>
                                            )
                                        }

                                    </nav>
                                </div>
                            )
                        }


                    </div>


                    {
                        user?._id && (
                            <Link to={"/cart"} className="cursor-pointer relative">
                                <span><IoMdCart size={25} /></span>

                                <div className="bg-blue-500 text-white p-1 w-4 h-4 rounded-full flex items-center justify-center absolute -top-2 -right-3">
                                    <p className="text-sm">{cartCount}</p>
                                </div>
                            </Link>
                        )
                    }

                    <div>
                        {
                            user?._id ? (
                                <button onClick={handleLogout} className="bg-blue-500 text-white px-4 py-1 hover:bg-blue-200 rounded-full">Logout</button>
                            ) : (
                                <Link to='/login' className="bg-blue-500 text-white px-4 py-1 hover:bg-blue-200 rounded-full">Login</Link>
                            )
                        }

                    </div>
                </div>

            </div>

        </header>
    )
}
export default Header