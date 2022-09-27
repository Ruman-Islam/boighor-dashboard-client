import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import fetcher from '../../../api/axios';
import auth from '../../../firebase/firebaseConfig';
import UseGetAdmin from '../../../hooks/UseGetAdmin';

const Stat = () => {
    const [allOrders, setAllOrders] = useState([]);
    const [googleUser, ,] = useAuthState(auth);
    const { admin } = UseGetAdmin(googleUser);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalSoldBooks, setTotalSoldBooks] = useState([]);
    const dateObj = new Date();
    const month = dateObj.getUTCMonth() + 1; //months from 1-12
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();

    useEffect(() => {
        (async () => {
            try {
                const { data: { result } } = await fetcher.get("admin/all-orders")
                setAllOrders(result);
            } catch (error) {

            }
        })()
    }, [])

    useEffect(() => {
        for (const order of allOrders) {
            let totalPrice = 0;
            let totalPaidProducts = []
            for (const od of order?.orders) {
                if (od?.payment_status === "PAID") {
                    for (const myOrder of od.products) {
                        if (myOrder?.vendor_id === admin.vendor_id) {
                            totalPrice += myOrder?.sell_price * myOrder?.quantity;
                            totalPaidProducts.push(myOrder);
                            setTotalPrice(totalPrice);
                            setTotalSoldBooks(totalPaidProducts);
                        }
                    }
                }
            }
        }
    }, [admin.vendor_id, allOrders])


    return (
        <div>
            <div>
                <p className='fs-1 border-info border-2 border-bottom'>
                    Sells Count of <span className='text-primary'>{day}/{month}/{year}</span></p>
                <h3>Your total selling count is {totalPrice} TK.</h3>
            </div>
            <br /> <br />
            <br /> <br />
            <div>
                <p className='fs-1 border-info border-2 border-bottom'>
                    Sold out books of <span className='text-primary'>{day}/{month}/{year}</span></p>
                <div className='row'>
                    {
                        totalSoldBooks.length > 0 &&
                        totalSoldBooks?.map((book, index) => {
                            return (
                                <div className="card" style={{ width: '18rem' }}>
                                    <img src={book?.imgURL} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">{book?.title}</h5>
                                        <h5 className="card-title">Tk. {book?.sell_price}</h5>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default Stat;