import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward } from '@fortawesome/free-solid-svg-icons';
import fetcher from '../../../api/axios';

const UserOrders = () => {
    const { email } = useParams();
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const { data: { result } } = await fetcher.get(`admin/find-a-customer-order?email=${email}`)
                setOrders(result)
            } catch (error) {

            }
        })()
    }, [email])

    const updateConfirmationStatus = async (e, order_id) => {
        const status = e.target.value;
        const id = order_id;
        const url = `admin/update_order_confirmation?email=${email}&order_id=${id}&status=${status}`
        try {
            const { data: { result } } = await fetcher.patch(url)
            Swal.fire(result)
        } catch (error) {

        }
    }

    const updateDeliveryStatus = async (e, order_id) => {
        const status = e.target.value;
        const id = order_id;
        const url = `admin/update_order_delivery?email=${email}&order_id=${id}&status=${status}`
        try {
            const { data: { result } } = await fetcher.patch(url)
            Swal.fire(result)
        } catch (error) {

        }
    }

    return (
        <div>
            <div className='d-flex justify-content-between align-items-center p-5'>
                <FontAwesomeIcon
                    onClick={() => navigate("/dashboard/order-list")}
                    style={{ cursor: 'pointer', fontSize: '2rem' }}
                    icon={faBackward} />
                <h6>Orders for: {email}</h6>
            </div>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Order Id</th>
                            <th scope="col">Payment Method</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Confirmation Status</th>
                            <th scope="col">payment Status</th>
                            <th scope="col">delivery Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders?.length > 0 ?
                            orders?.map((order, index) => {
                                return (
                                    <>
                                        <tr>
                                            <th scope="row">{index + 1}</th>
                                            <td>{order?.order_id}</td>
                                            <td>{order?.payment_method.includes('cod') ? 'Cash on delivery' : 'Bkash'}</td>
                                            <td>{order?.amount} Tk.</td>
                                            <td>
                                                <select
                                                    defaultValue={order?.confirmation_status}
                                                    onChange={(e) => updateConfirmationStatus(e, order?.order_id)}
                                                >
                                                    <option value="PROCESSING">PROCESSING</option>
                                                    <option value="APPROVED">APPROVED</option>
                                                    <option value="CANCELED">CANCELED</option>
                                                </select>
                                            </td>
                                            <td>{order?.payment_status}</td>
                                            <td>
                                                {/* {order?.delivery_status} */}
                                                <select
                                                    defaultValue={order?.confirmation_status}
                                                    onChange={(e) => updateDeliveryStatus(e, order?.order_id)}
                                                >
                                                    <option value="PENDING">PENDING</option>
                                                    <option value="SHIPPED">SHIPPED</option>
                                                </select>
                                            </td>
                                        </tr>
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

export default UserOrders;