import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Outlet } from 'react-router-dom';
import fetcher from '../api/axios';
import Sidebar from '../components/Dashboard/Sidebar';
import auth from '../firebase/firebaseConfig';
import '../styles/Sidebar/Sidebar.css';


const Dashboard = () => {
    const [isExists, setIsExists] = useState(true);
    const [user, ,] = useAuthState(auth);


    useEffect(() => {
        (async () => {
            try {
                const { data: { result } } = await fetcher.get(`admin/is-exists?email=${user?.email}`)
                // console.log(result);
                setIsExists(result)
            } catch (error) {
                setIsExists(false);
            }
        })()

    }, [user])

    useEffect(() => {
        if (!isExists) {
            const logout = async () => {
                await signOut(auth);
            }
            logout();
        }
    }, [isExists])

    return (
        <section>
            <div className="sidebar">
                <Sidebar />
            </div>
            <div className='outlet'>
                <Outlet />
            </div>
        </section>
    );
};

export default Dashboard;