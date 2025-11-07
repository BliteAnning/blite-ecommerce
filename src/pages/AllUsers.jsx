import { useEffect, useState } from "react"
import axiosInstance from "../axiosInstance"
import moment from "moment"
import { MdEdit } from "react-icons/md";
import ChangeUserRole from "../components/ChangeUserRole";

const AllUsers = () => {
    const [allUsers, setAllUsers] = useState([])
    const [openUpdateRole, setOpenUpdateRole] = useState(false)
    const [updateUserDetails, setUserUpdateUserDetails] = useState({
        name: "",
        email: "",
        role: "",
        _id: ""
    })

    const getAllUsers = async () => {
        const response = await axiosInstance.get('/all-users', { withCredentials: true });

        if (response.data.success) {
            setAllUsers(response.data.data)
            console.log(response.data)
        }

    }

    useEffect(() => {
        getAllUsers()
    }, [])
    return (
        <div className="bg-white pb-4">
            <table className="w-full usertable">
                <thead>
                    <tr className="bg-gray-800 text-white">
                        <th>Sr.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Created Date</th>
                        <th>Action</th>
                    </tr>

                </thead>
                <tbody>
                    {
                        allUsers.map((u, index) => {
                            return (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{u?.name}</td>
                                    <td>{u?.email}</td>
                                    <td>{u?.role}</td>
                                    <td>{moment(u?.createdAt).format('LLL')}</td>
                                    <td>
                                        <button className="bg-green-200 cursor-pointer rounded-full p-2 hover:bg-green-400 hover:text-white"
                                            onClick={() => {
                                                setUserUpdateUserDetails(u)
                                                setOpenUpdateRole(true)
                                            }}
                                        ><MdEdit /></button>
                                    </td>
                                </tr>

                            )
                        }
                        )
                    }
                </tbody>
            </table>
            {
                openUpdateRole && (
                    <ChangeUserRole onClose={() => setOpenUpdateRole(false)}
                        name={updateUserDetails.name}
                        email={updateUserDetails.email}
                        role={updateUserDetails.role}
                        userId={updateUserDetails._id}
                        calFunction={getAllUsers}
                    />
                )
            }


        </div>
    )
}

export default AllUsers