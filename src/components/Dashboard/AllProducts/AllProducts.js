/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import fetcher from '../../../api/axios';
import auth from '../../../firebase/firebaseConfig';
import UseGetAdmin from '../../../hooks/UseGetAdmin';

const AllProducts = () => {
    const navigate = useNavigate();
    const [user, ,] = useAuthState(auth);
    const { admin } = UseGetAdmin(user);
    const [books, setBooks] = useState([]);
    const [refetch, setRefetch] = useState(false);


    useEffect(() => {
        if (admin.role === 'super-admin' || admin.role === 'admin') {

            (async () => {
                try {
                    const { data: { result } } = await fetcher.get('admin/find-all-books');
                    setBooks(result);
                } catch (error) {
                    console.log(error);
                }
            })()
        } else {

            (async () => {
                try {
                    const { data: { result } } = await fetcher.get(`admin/find-vendor-books?vendor_id=${admin?.vendor_id}`);
                    setBooks(result);
                } catch (error) {
                    console.log(error);
                }
            })()
        }
    }, [admin, refetch])

    const deleteBook = (id) => {
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
                    const data = await fetcher.patch(`admin/delete_a_book?id=${id}`)
                    if (data.status === 200) {
                        setRefetch(!refetch)
                        Swal.fire(data.data.result)
                    }
                } catch (error) {
                    Swal.fire("Something went wrong")
                }
            }
        })

    }

    return (
        <div>
            <h1>All products</h1>
            <div className='row'>
                {books?.length > 0 ?
                    books?.map((book, index) => {
                        return (
                            <div key={index} className="card m-1 col-m-3" style={{ width: "16rem" }}>
                                <img src={book?.imgURL} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h6 className="card-title fs-5">{book?.title?.slice(0, 30)}</h6>
                                    <h6 className="card-title fs-6">{book?.author?.slice(0, 30)}</h6>
                                    <p className="card-text">Vendor ID: {book?.vendor_id}</p>
                                    <div className='d-flex justify-content-between'>
                                        <a
                                            onClick={() => navigate(`/dashboard/update-product/${book?._id}`)}
                                            className="btn btn-primary">
                                            Update
                                        </a>
                                        <a
                                            onClick={() => deleteBook(book?._id)}
                                            className="btn btn-danger">
                                            Delete
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    : <p>No Data </p>}
            </div>
        </div>
    );
};

export default AllProducts;