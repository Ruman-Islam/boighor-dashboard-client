import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import fetcher from '../../../api/axios';

const Admins = () => {
    const [allAdmins, setAllAdmins] = useState([]);
    const [refetch, setRefetch] = useState(false);


    useEffect(() => {
        (async () => {
            try {
                const { data } = await fetcher.get("admin/get-all-admin")
                setAllAdmins(data);
            } catch (error) {
                Swal.fire("Opps! Something went wrong")
            }
        })()
    }, [refetch])

    const deleteAdmin = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const { data } = await fetcher.patch(`admin/delete_admin?id=${id}`)
                    setRefetch(!refetch)
                    Swal.fire("Admin Removed")
                } catch ({ response }) {
                    if (response.status === 401) {
                        Swal.fire(response.data.result)
                    }
                }
            }
        })

    }

    return (
        <div>
            <h1>List of All Admins</h1>
            <div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Avatar</th>
                            <th scope="col">Username</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Role</th>
                            <th scope="col">Address</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allAdmins?.length > 0 &&
                            allAdmins?.map((admin, index) => {
                                return (
                                    <tr index={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>
                                            <img width={40} style={{ borderRadius: "50%" }} src={admin?.imgURL} alt="" />
                                        </td>
                                        <td>{admin?.user_name}</td>
                                        <td>{admin?.email}</td>
                                        <td>+880 {admin?.phone}</td>
                                        <td>{admin?.role}</td>
                                        <td>{admin?.address}</td>
                                        <td>
                                            <button
                                                onClick={() => deleteAdmin(admin?._id)}
                                                className='btn btn-danger'>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Admins;