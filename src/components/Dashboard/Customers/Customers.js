import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import fetcher from '../../../api/axios';

const Customers = () => {
    const [allCustomers, setAllCustomers] = useState([]);
    const [refetch, setRefetch] = useState(false);
    console.log(allCustomers);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await fetcher.get("admin/get-all-customer")
                setAllCustomers(data);
            } catch (error) {
                Swal.fire("Opps! Something went wrong")
            }
        })()
    }, [refetch])


    return (
        <div>
            <h1>List of All Customer</h1>
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
                        </tr>
                    </thead>
                    <tbody>
                        {allCustomers?.length > 0 &&
                            allCustomers?.map((customer, index) => {
                                return (
                                    <tr index={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>
                                            <img width={40}
                                                style={{ borderRadius: "50%" }}
                                                src={customer?.photoURL} alt="" />
                                        </td>
                                        <td>{customer?.user_name}</td>
                                        <td>{customer?.email}</td>
                                        <td>+880 {customer?.phone}</td>
                                        <td>{customer?.role}</td>
                                        <td>{customer?.address ? customer?.address : 'N/A'}</td>
                                    </tr>
                                )
                            })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Customers;