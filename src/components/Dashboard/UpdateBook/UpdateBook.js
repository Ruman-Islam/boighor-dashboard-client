import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import fetcher from '../../../api/axios';

const UpdateBook = () => {
    const { id } = useParams();
    const [book, setBook] = useState({});
    console.log(book)

    useEffect(() => {
        (async () => {
            try {
                const { data: { result } } = await fetcher.get(`admin/find-a-book?id=${id}`)
                setBook(result)
            } catch (error) {
                console.log(error);
            }
        })()
    }, [id])


    return (
        <div>
            {id}
        </div>
    );
};

export default UpdateBook;