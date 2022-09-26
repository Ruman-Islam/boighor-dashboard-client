import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus,
    faThLarge,
    faShoppingBasket,
    faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase/firebaseConfig';
import useAdmin from '../../hooks/useAdmin';
import { signOut } from 'firebase/auth';

const Sidebar = () => {
    const [user, ,] = useAuthState(auth);
    const { admin } = useAdmin(user);


    const logout = async () => {
        await signOut(auth);
    };


    return (
        <>
            {(admin === 'super-admin' || admin === 'admin') &&
                <div>
                    <Link className="sidebarLink" to='order-list'>
                        <span>
                            <FontAwesomeIcon icon={faShoppingBasket} />
                        </span>
                        Orders
                    </Link>
                    <Link className="sidebarLink" to='add-product'>
                        <span>
                            <FontAwesomeIcon icon={faPlus} />
                        </span>
                        Add  Product
                    </Link>
                    <Link className="sidebarLink" to='all-product'>
                        <span>
                            <FontAwesomeIcon icon={faPlus} />
                        </span>
                        Products
                    </Link>
                    <Link className="sidebarLink" to='all-product'>
                        <span>
                            <FontAwesomeIcon icon={faUserPlus} />
                        </span>
                        Admins
                    </Link>
                    <Link className="sidebarLink" to='/'>
                        <span>
                            <FontAwesomeIcon icon={faThLarge} />
                        </span>
                        Vendors
                    </Link>
                    <Link className="sidebarLink" to='/'>
                        <span>
                            <FontAwesomeIcon icon={faThLarge} />
                        </span>
                        Customers
                    </Link>
                    <Link className="sidebarLink" to='/'>
                        <span>
                            <FontAwesomeIcon icon={faThLarge} />
                        </span>
                        Sold Books
                    </Link>
                    <Link className="sidebarLink" to='/'>
                        <span>
                            <FontAwesomeIcon icon={faThLarge} />
                        </span>
                        Reports
                    </Link>
                    <Link className="sidebarLink" to='/'>
                        <span>
                            <FontAwesomeIcon icon={faThLarge} />
                        </span>
                        Statistics
                    </Link>
                </div>}


            {admin === 'vendor' &&
                <div>
                    <Link className="sidebarLink" to='order-list'>
                        <span>
                            <FontAwesomeIcon icon={faShoppingBasket} />
                        </span>
                        My Orders
                    </Link>
                    <Link className="sidebarLink" to='all-product'>
                        <span>
                            <FontAwesomeIcon icon={faPlus} />
                        </span>
                        My Products
                    </Link>
                    <Link className="sidebarLink" to='/'>
                        <span>
                            <FontAwesomeIcon icon={faThLarge} />
                        </span>
                        Sold Books
                    </Link>
                    <Link className="sidebarLink" to='/'>
                        <span>
                            <FontAwesomeIcon icon={faThLarge} />
                        </span>
                        Statistics
                    </Link>
                </div>}

            <button onClick={() => logout()}>Logout</button>
        </>
    );
};

export default Sidebar;