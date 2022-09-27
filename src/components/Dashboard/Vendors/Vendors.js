import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import fetcher from '../../../api/axios';

const Vendors = () => {
    const [allVendors, setAllVendors] = useState([]);
    const [refetch, setRefetch] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await fetcher.get("admin/get-all-vendor")
                setAllVendors(data);
            } catch (error) {
                Swal.fire("Opps! Something went wrong")
            }
        })()
    }, [])

    const deleteVendor = async (id) => {
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
                    const { data } = await fetcher.patch(`admin/delete_vendor?id=${id}`)
                    setRefetch(!refetch)
                    Swal.fire("Vendor Removed")
                } catch ({ response }) {
                    Swal.fire("Something Went wrong")
                }
            }
        })

    }
    return (
        <div>
            <h1>List of All Vendors</h1>
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
                        {allVendors?.length > 0 &&
                            allVendors?.map((vendor, index) => {
                                return (
                                    <tr index={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>
                                            <img width={40} style={{ borderRadius: "50%" }} src={vendor?.imgURL} alt="" />
                                        </td>
                                        <td>{vendor?.user_name}</td>
                                        <td>{vendor?.email}</td>
                                        <td>+880 {vendor?.phone}</td>
                                        <td>{vendor?.role}</td>
                                        <td>{vendor?.address}</td>
                                        <td>
                                            <button
                                                onClick={() => deleteVendor(vendor?._id)}
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

export default Vendors;