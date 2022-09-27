import React, { useEffect, useState } from 'react';
import fetcher from '../../../api/axios';

const Reports = () => {
    const [allReports, setAllReports] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await fetcher.get("admin/get-all-report")
                setAllReports(data)
            } catch (error) {

            }
        })()
    }, [])

    return (
        <div>
            <h1>Customer Complains &amp; others</h1>
            <br /><br />
            <div className='row'>
                {allReports?.length > 0 &&
                    allReports?.map((rp, index) => {
                        return (
                            <div className='col-md-6 border shadow p-5'>
                                <p>{rp?.createdAt}</p>
                                <h3 className='border-bottom pb-2'>{rp?.user_name}</h3>
                                <h4 className='border-bottom pb-2'>{rp?.user_email}</h4>
                                <p>{rp?.message}</p>
                            </div>
                        )
                    })}
            </div>
        </div>
    );
};

export default Reports;




