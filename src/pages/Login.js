import React, { useEffect } from 'react';
import '../styles/Login/Login.css';
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [signInWithGoogle, , ,] = useSignInWithGoogle(auth);
    const [user, ,] = useAuthState(auth);
    const navigate = useNavigate();


    useEffect(() => {
        if (user) {
            navigate('/dashboard')
        }
    }, [user, navigate])

    return (
        <div className='login-main bg-dark'>
            <div className='login-form-wrapper w-25'>
                <h2 className='text-center'>বইঘর ইনভেনটরিতে স্বাগতম </h2>
                <div className='w-100'>
                    <button className='btn btn-success w-100' onClick={() => signInWithGoogle()}>Login</button>
                </div>
            </div>
        </div>
    );
};

export default Login;