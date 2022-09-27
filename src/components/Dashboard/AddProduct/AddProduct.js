import axios from 'axios';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import fetcher from '../../../api/axios';
import auth from '../../../firebase/firebaseConfig';
import UseGetAdmin from '../../../hooks/UseGetAdmin';


const AddProduct = () => {
    const [user, ,] = useAuthState(auth);
    const { admin } = UseGetAdmin(user);


    const imageStorageKey = '4ae31085e7494be569a28241773ffa30';
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [imageURL, setImageURL] = useState({});


    const onSubmit = async product => {
        const formData = new FormData();
        formData.append('image', imageURL);

        const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`
        if (imageURL.name) {
            const result = await axios.post(url, formData)
            if (result.data.success) {
                let productInfo = {
                    title: product.title,
                    author: product.author,
                    publisher: product.publisher,
                    category: product.category,
                    country: product.country,
                    language: product.language,
                    edition: product.edition,
                    copy_version: product.copy_version,
                    ISBN: +product.isbn,
                    sell_price: +product.sell_price,
                    quantity: +product.quantity,
                    page_length: +product.page_length,
                    summary: product.summary,
                    vendor_id: admin.vendor_id,
                    imgURL: result.data.data.url,
                }
                try {
                    const { data } = await fetcher.post('admin/add_a_book', productInfo)
                    if (data) {
                        reset();
                        Swal.fire("Book Added Successfully")
                    }

                } catch (error) {
                    console.log(error)
                }
            }
        }

    };

    return (
        <div>
            <h3 className='text-center mb-5'>Add new book</h3>
            <div className='container'>
                <form className='container' onSubmit={handleSubmit(onSubmit)}>

                    <div className='row'>
                        <div className="mb-3 col-md-6">
                            <label for="exampleFormControlInput1" className="form-label">Book Title</label>
                            <input
                                {...register("title", {
                                    required: {
                                        value: true,
                                        message: 'title is Required'
                                    }
                                })}
                                type="text"
                                className="form-control" />
                            <p className="text-danger" >{errors.title && errors.title?.message}</p>
                        </div>

                        <div className="mb-3 col-md-6">
                            <label for="exampleFormControlInput1" className="form-label">Author Name</label>
                            <input
                                {...register("author", {
                                    required: {
                                        value: true,
                                        message: 'author is Required'
                                    }
                                })}
                                type="text"
                                className="form-control" />
                            <p className="text-danger" >  {errors.author && errors.author?.message}</p>
                        </div>
                    </div>

                    <div className='row'>
                        <div className="mb-3 col-md-6">
                            <label for="exampleFormControlInput1" className="form-label">Publisher Name</label>
                            <input
                                {...register("publisher", {
                                    required: {
                                        value: true,
                                        message: 'publisher is Required'
                                    }
                                })}
                                type="text"
                                className="form-control" />
                            <p className="text-danger" >{errors.publisher && errors.publisher?.message}</p>
                        </div>

                        <div className="mb-3 col-md-6">
                            <label for="exampleFormControlInput1" className="form-label">Book Category</label>
                            <input
                                {...register("category", {
                                    required: {
                                        value: true,
                                        message: 'category is Required'
                                    }
                                })}
                                type="text"
                                className="form-control" />
                            <p className="text-danger" > {errors.category && errors.category?.message}</p>
                        </div>
                    </div>

                    <div className='row'>
                        <div className="mb-3 col-md-6">
                            <label for="exampleFormControlInput1" className="form-label">Book Country</label>
                            <input
                                {...register("country", {
                                    required: {
                                        value: true,
                                        message: 'country is Required'
                                    }
                                })}
                                type="text"
                                className="form-control" />
                            <p className="text-danger" >  {errors.country && errors.country?.message}</p>
                        </div>

                        <div className="mb-3 col-md-6">
                            <label for="exampleFormControlInput1" className="form-label">Book Language</label>
                            <input
                                {...register("language", {
                                    required: {
                                        value: true,
                                        message: 'language is Required'
                                    }
                                })}
                                type="text"
                                className="form-control" />
                            <p className="text-danger" >  {errors.language && errors.language?.message}</p>
                        </div>
                    </div>

                    <div className='row'>
                        <div className="mb-3 col-md-6">
                            <label for="exampleFormControlInput1" className="form-label">Publish Edition</label>
                            <input
                                {...register("edition", {
                                    required: {
                                        value: true,
                                        message: 'edition is Required'
                                    }
                                })}
                                type="text"
                                className="form-control" />
                            <p className="text-danger" >    {errors.edition && errors.edition?.message}</p>
                        </div>

                        <div className="mb-3 col-md-6">
                            <label for="exampleFormControlInput1" className="form-label">Copy Version</label>
                            <input
                                {...register("copy_version", {
                                    required: {
                                        value: true,
                                        message: 'copy_version is Required'
                                    }
                                })}
                                type="text"
                                className="form-control" />
                            <p className="text-danger" >  {errors.copy_version && errors.copy_version?.message}</p>
                        </div>
                    </div>

                    <div className='row'>
                        <div className="mb-3 col-md-6">
                            <label for="exampleFormControlInput1" className="form-label">ISBN No.</label>
                            <input
                                {...register("isbn", {
                                    required: {
                                        value: true,
                                        message: 'isbn is Required'
                                    }
                                })}
                                type="number"
                                className="form-control" />
                            <p className="text-danger" >  {errors.isbn && errors.isbn?.message}</p>
                        </div>

                        <div className="mb-3 col-md-6">
                            <label for="exampleFormControlInput1" className="form-label">Sell Price</label>
                            <input
                                {...register("sell_price", {
                                    required: {
                                        value: true,
                                        message: 'sell_price is Required'
                                    }
                                })}
                                type="number"
                                className="form-control" />
                            <p className="text-danger" >{errors.sell_price && errors.sell_price?.message}</p>
                        </div>
                    </div>

                    <div className='row'>
                        <div className="mb-3 col-md-6">
                            <label for="exampleFormControlInput1" className="form-label">Quantity</label>
                            <input
                                {...register("quantity", {
                                    required: {
                                        value: true,
                                        message: 'quantity is Required'
                                    }
                                })}
                                type="number"
                                className="form-control" />
                            <p className="text-danger" > {errors.quantity && errors.quantity?.message}</p>
                        </div>

                        <div className="mb-3 col-md-6">
                            <label for="exampleFormControlInput1" className="form-label">Page Length</label>
                            <input
                                {...register("page_length", {
                                    required: {
                                        value: true,
                                        message: 'page_length is Required'
                                    }
                                })}
                                type="number"
                                className="form-control" />
                            <p className="text-danger" >{errors.page_length && errors.page_length?.message}</p>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label for="exampleFormControlTextarea1" className="form-label">Summary</label>
                        <textarea
                            {...register("summary", {
                                required: {
                                    value: true,
                                    message: 'summary is Required'
                                }
                            })}
                            className="form-control"
                            rows="3"
                        >
                        </textarea>
                        <p className="text-danger" >    {errors.summary && errors.summary?.message}</p>
                    </div>

                    <div className='row'>
                        <input
                            className='col-md-6'
                            onChange={(e) => setImageURL(e.target.files[0])}
                            type="file" name="image" id="" />

                        <button className='btn btn-success col-md-6' type="submit">
                            Submit
                        </button>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;