import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus,
    faThLarge,
    faShoppingBasket,
    faUserPlus,
    faIndustry,
    faUserTag,
    faFlag,
    faPrint
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
            <h3>{user?.displayName}</h3>
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
                            <FontAwesomeIcon icon={faPrint} />
                        </span>
                        Products
                    </Link>
                    <Link className="sidebarLink" to='admin-list'>
                        <span>
                            <FontAwesomeIcon icon={faUserPlus} />
                        </span>
                        Admins
                    </Link>
                    <Link className="sidebarLink" to='vendor-list'>
                        <span>
                            <FontAwesomeIcon icon={faIndustry} />
                        </span>
                        Vendors
                    </Link>
                    <Link className="sidebarLink" to='customer-list'>
                        <span>
                            <FontAwesomeIcon icon={faUserTag} />
                        </span>
                        Customers
                    </Link>
                    <Link className="sidebarLink" to='reports'>
                        <span>
                            <FontAwesomeIcon icon={faFlag} />
                        </span>
                        Reports
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
                            <FontAwesomeIcon icon={faPrint} />
                        </span>
                        My Products
                    </Link>
                    <Link className="sidebarLink" to='add-product'>
                        <span>
                            <FontAwesomeIcon icon={faPlus} />
                        </span>
                        Add  Product
                    </Link>
                    <Link className="sidebarLink" to='stat'>
                        <span>
                            <FontAwesomeIcon icon={faThLarge} />
                        </span>
                        Statistics
                    </Link>
                </div>}

            <button className='btn btn-secondary w-100 logout-btn' onClick={() => logout()}>Logout</button>
        </>
    );
};

export default Sidebar;