import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import fetcher from '../../../api/axios';
import auth from '../../../firebase/firebaseConfig';

const OrderList = () => {
    const navigate = useNavigate();
    const [allOrders, setAllOrders] = useState([]);
    const [user, ,] = useAuthState(auth);

    useEffect(() => {
        (async () => {
            try {
                const { data: { result } } = await fetcher.get("admin/all-orders")
                setAllOrders(result);
            } catch (error) {

            }
        })()
    }, [])

    return (
        <div>
            <h1 className='border border-1 p-2'>Order list of: {user?.displayName}</h1>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Customer Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Orders</th>
                            <th scope="col">Order Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allOrders?.length > 0 ?
                            allOrders?.map((order, index) => {
                                return (
                                    <>
                                        <tr>
                                            <th scope="row">{index + 1}</th>
                                            <td>{order?.user_name}</td>
                                            <td>{order?.email}</td>
                                            <td>{order?.phone}</td>
                                            <td>
                                                <button
                                                    onClick={() => navigate(`/dashboard/user-orders/${order?.email}`)}
                                                    className='btn btn-primary'>
                                                    Orders
                                                </button>
                                            </td>
                                            <td>{order?.updatedAt}</td>
                                        </tr>
                                        {/* <div className='border border-1'>
                                            {order?.orders.map((od, index) => {
                                                return (
                                                    <div>
                                                        <div>
                                                            <p>Order ID</p>
                                                            <p>{od?.order_id}</p>
                                                        </div>
                                                        <div>
                                                            <p>Amount</p>
                                                            <p>{od?.amount}</p>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div> */}
                                    </>
                                )
                            })
                            :
                            <p>No Order</p>}


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderList;