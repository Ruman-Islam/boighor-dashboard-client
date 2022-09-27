import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase/firebaseConfig';
import Swal from 'sweetalert2';

const PrivateRoute = () => {
    const location = useLocation();
    const [user, isLoading,] = useAuthState(auth)
    // console.log(user)

    if (isLoading) {
        return <h1 className='text-center'>Loading...</h1>
    }

    if (!user) {
        Swal.fire("User not found. Please contact with your provider")
        return <Navigate to='/login' state={{ from: location }} replace />
    } else {
        return <Outlet />;
    }
};

export default PrivateRoute;