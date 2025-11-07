import { useSelector } from "react-redux";
import { FaUserAlt } from "react-icons/fa";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ROLE from "../common/role";



const AdminPanel = () => {
    const user = useSelector(state => state?.user?.user)
    const navigate = useNavigate();

    useEffect(()=>{
        if(user?.role !== ROLE.ADMIN){
            navigate("/")
        }
    })

    return (
        <div className='min-h-[calc(100vh-120px)]  md:flex hidden'>
            <aside className='bg-white min-h-full w-full max-w-60 shadow-lg'>
                <div className="h-32 bg-green-300 flex flex-col justify-center items-center">
                    <div className="text-3xl cursor-pointer relative flex justify-center ">
                        {
                            user?.profilePic ? (
                                <img src={user?.profilePic} alt="profile photo" className="w-20 h-20 rounded-full" />
                            ) : (
                                <FaUserAlt size={25} />
                            )
                        }

                    </div>
                    <p className="capitalize text-lg font-semibold">{user?.name}</p>
                    <p className="font-light">{user?.role}</p>
                </div>
                <div>
                    <nav className="grid p-4">
                        <Link to={"all-users"} className="px-2 py-1 hover:bg-slate-100">All users</Link>
                        <Link to={"all-products"} className="px-2 py-1 hover:bg-slate-100" >All Products</Link>
                    </nav>
                </div>
            </aside>
            <main className="w-full h-full p-2">
                <Outlet/> 
            </main>
        </div>
    )
}

export default AdminPanel