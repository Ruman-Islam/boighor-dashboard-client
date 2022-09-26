import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase/firebaseConfig';

const PrivateRoute = () => {
    const location = useLocation();
    const [user, isLoading,] = useAuthState(auth)

    if (isLoading) {
        return <h1 className='text-center'>Loading...</h1>
    }

    if (!user) {
        return <Navigate to='/login' state={{ from: location }} replace />
    } else {
        return <Outlet />;
    }
};

export default PrivateRoute;