import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import fetcher from '../../../api/axios';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';

const UpdateBook = () => {
    const [book, setBook] = useState({});
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: book
    });
    const { id } = useParams();
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [publisher, setPublisher] = useState("");
    const [category, setCategory] = useState("");
    const [country, setCountry] = useState("");
    const [language, setLanguage] = useState("");
    const [edition, setEdition] = useState("");
    const [copy, setCopy] = useState("");
    const [isbn, setIsbn] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [length, setLength] = useState("");
    const [summary, setSummary] = useState("");
    const [offers, setOffers] = useState("");
    const [discount, setDiscount] = useState("");


    useEffect(() => {
        (async () => {
            try {
                const { data: { result } } = await fetcher.get(`admin/find-a-book?id=${id}`)
                setBook(result)
                reset(result)
            } catch (error) {
                console.log(error);
            }
        })()
    }, [id, reset, isOpen])

    useEffect(() => {
        setTitle(book?.title)
        setAuthor(book?.author)
        setPublisher(book?.publisher)
        setCategory(book?.category)
        setCountry(book?.country)
        setEdition(book?.edition)
        setLanguage(book?.language)
        setCopy(book?.copy_version)
        setIsbn(book?.ISBN)
        setPrice(book?.sell_price)
        setQuantity(book?.quantity)
        setLength(book?.page_length)
        setSummary(book?.summary)
        setOffers(book?.offers)
        setDiscount(book?.current_discount)
    }, [book])

    const onSubmit = async updated_data => {
        try {
            const data = await fetcher.patch('admin/update_a_book', updated_data)
            if (data.status === 200) {
                setIsOpen(!isOpen)
                reset(data.data.result)
                Swal.fire("Book updated successfully")
            }
        } catch (error) {
            Swal.fire("Something went wrong")
        }
    };


    return (
        <div className=''>
            <div className='row'>
                <div className='col-md-2'>
                    <div>
                        <img width={300} className='img-fluid' src={book?.imgURL} alt="" />
                    </div>
                </div>
                <div className='col-md-8'>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='row p-2'>
                            <div className='col-md-6'>
                                <label className="form-label" htmlFor="">Title</label>
                                <input
                                    {...register("title", {
                                        required: {
                                            value: true,
                                            message: 'title is Required'
                                        }
                                    })}
                                    onChange={(e) => setTitle(e.target.value)} className='w-100 form-control' type="text" />
                                <p className="text-danger" >{errors.title && errors.title?.message}</p>
                            </div>
                            <div className='col-md-6'>
                                <label className="form-label" htmlFor="">Author</label>
                                <input
                                    {...register("author", {
                                        required: {
                                            value: true,
                                            message: 'author is Required'
                                        }
                                    })}
                                    onChange={(e) => setAuthor(e.target.value)} className='w-100 form-control' type="text" />
                                <p className="text-danger" >{errors.author && errors.author?.message}</p>
                            </div>
                        </div>
                        <div className='row p-2'>
                            <div className='col-md-6'>
                                <label className="form-label" htmlFor="">Publisher</label>
                                <input
                                    {...register("publisher", {
                                        required: {
                                            value: true,
                                            message: 'publisher is Required'
                                        }
                                    })}
                                    onChange={(e) => setPublisher(e.target.value)} className='w-100 form-control' type="text" />
                                <p className="text-danger" >{errors.publisher && errors.publisher?.message}</p>
                            </div>
                            <div className='col-md-6'>
                                <label className="form-label" htmlFor="">Category</label>
                                <input
                                    {...register("category", {
                                        required: {
                                            value: true,
                                            message: 'category is Required'
                                        }
                                    })}
                                    onChange={(e) => setCategory(e.target.value)} className='w-100 form-control' type="text" />
                                <p className="text-danger" >{errors.category && errors.category?.message}</p>
                            </div>
                        </div>
                        <div className='row p-2'>
                            <div className='col-md-6'>
                                <label className="form-label" htmlFor="">Country</label>
                                <input
                                    {...register("country", {
                                        required: {
                                            value: true,
                                            message: 'country is Required'
                                        }
                                    })}
                                    onChange={(e) => setCountry(e.target.value)} className='w-100 form-control' type="text" />
                                <p className="text-danger" >{errors.country && errors.country?.message}</p>
                            </div>
                            <div className='col-md-6'>
                                <label className="form-label" htmlFor="">Language</label>
                                <input
                                    {...register("language", {
                                        required: {
                                            value: true,
                                            message: 'language is Required'
                                        }
                                    })}
                                    onChange={(e) => setLanguage(e.target.value)} className='w-100 form-control' type="text" />
                                <p className="text-danger" >{errors.language && errors.language?.message}</p>
                            </div>
                        </div>
                        <div className='row p-2'>
                            <div className='col-md-6'>
                                <label className="form-label" htmlFor="">Edition</label>
                                <input
                                    {...register("edition", {
                                        required: {
                                            value: true,
                                            message: 'edition is Required'
                                        }
                                    })}
                                    onChange={(e) => setEdition(e.target.value)} className='w-100 form-control' type="text" />
                                <p className="text-danger" >{errors.edition && errors.edition?.message}</p>
                            </div>
                            <div className='col-md-6'>
                                <label className="form-label" htmlFor="">Copy Version</label>
                                <input
                                    {...register("copy_version", {
                                        required: {
                                            value: true,
                                            message: 'copy_version is Required'
                                        }
                                    })}
                                    onChange={(e) => setCopy(e.target.value)} className='w-100 form-control' type="text" />
                                <p className="text-danger" >{errors.copy_version && errors.copy_version?.message}</p>
                            </div>
                        </div>
                        <div className='row p-2'>
                            <div className='col-md-6'>
                                <label className="form-label" htmlFor="">ISBN No.</label>
                                <input
                                    {...register("ISBN", {
                                        valueAsNumber: true,
                                        required: {
                                            value: true,
                                            message: 'isbn is Required'
                                        }
                                    })}
                                    onChange={(e) => setIsbn(+e.target.value)} className='w-100 form-control' type="number" />
                                <p className="text-danger" >{errors.ISBN && errors.ISBN?.message}</p>
                            </div>
                            <div className='col-md-6'>
                                <label className="form-label" htmlFor="">Price</label>
                                <input
                                    {...register("sell_price", {
                                        valueAsNumber: true,
                                        required: {
                                            value: true,
                                            message: 'sell_price is Required'
                                        }
                                    })}
                                    onChange={(e) => setPrice(+e.target.value)} className='w-100 form-control' type="number" />
                                <p className="text-danger" >{errors.sell_price && errors.sell_price?.message}</p>
                            </div>
                        </div>
                        <div className='row p-2'>
                            <div className='col-md-6'>
                                <label className="form-label" htmlFor="">Quantity</label>
                                <input
                                    {...register("quantity", {
                                        valueAsNumber: true,
                                        required: {
                                            value: true,
                                            message: 'quantity is Required'
                                        }
                                    })}
                                    onChange={(e) => setQuantity(+e.target.value)} className='w-100 form-control' type="number" />
                                <p className="text-danger" >{errors.quantity && errors.quantity?.message}</p>
                            </div>
                            <div className='col-md-6'>
                                <label className="form-label" htmlFor="">Page Length</label>
                                <input
                                    {...register("page_length", {
                                        valueAsNumber: true,
                                        required: {
                                            value: true,
                                            message: 'page_length is Required'
                                        }
                                    })}
                                    onChange={(e) => setLength(+e.target.value)} className='w-100 form-control' type="number" />
                                <p className="text-danger" >{errors.page_length && errors.page_length?.message}</p>
                            </div>
                        </div>
                        <div className='row p-2'>
                            <div className='col-md-6'>
                                <label className="form-label" htmlFor="">Discount</label>
                                <input
                                    {...register("current_discount", {
                                        valueAsNumber: true,
                                        required: {
                                            value: true,
                                            message: 'current_discount is Required'
                                        }
                                    })}
                                    onChange={(e) => setDiscount(+e.target.value)} className='w-100 form-control' type="number" />
                                <p className="text-danger" >{errors.current_discount && errors.current_discount?.message}</p>
                            </div>
                            <div className='col-md-6'>
                                <label className="form-label" htmlFor="">Offer</label>
                                <input
                                    {...register("offers", {
                                        required: {
                                            value: true,
                                            message: 'offers is Required'
                                        }
                                    })}
                                    onChange={(e) => setOffers(e.target.value)} className='w-100 form-control' type="text" />
                                <p className="text-danger" >{errors.offers && errors.offers?.message}</p>
                            </div>
                        </div>
                        <div className='row p-2'>
                            <label className="form-label" htmlFor="">Summary</label>
                            <textarea
                                {...register("summary", {
                                    required: {
                                        value: true,
                                        message: 'summary is Required'
                                    }
                                })}
                                onChange={(e) => setSummary(e.target.value)} rows={5} col={80} className='w-100 form-control' type="text" />
                            <p className="text-danger" >{errors.summary && errors.summary?.message}</p>
                        </div>
                        <button
                            type="submit"
                            className={`btn btn-primary w-100 
                         ${(
                                    title === book?.title &
                                    author === book?.author &
                                    publisher === book?.publisher &
                                    category === book?.category &
                                    country === book?.country &
                                    language === book?.language &
                                    edition === book?.edition &
                                    copy === book?.copy_version &
                                    isbn === book?.ISBN &
                                    price === book?.sell_price &
                                    quantity === book?.quantity &
                                    length === book?.page_length &
                                    summary === book?.summary &
                                    offers === book?.offers &
                                    discount === book?.current_discount) ? 'd-none' : 'd-block'}`}>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default UpdateBook;