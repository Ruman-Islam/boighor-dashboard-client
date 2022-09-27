import OrderList from '../components/Dashboard/OrderList/OrderList';
import AllProducts from '../components/Dashboard/AllProducts/AllProducts';
import UserOrders from '../components/Dashboard/UserOrders/UserOrders';
import AddProduct from '../components/Dashboard/AddProduct/AddProduct';
import UpdateBook from '../components/Dashboard/UpdateBook/UpdateBook';
import Stat from '../components/Dashboard/Stat/Stat';
import Admins from '../components/Dashboard/Admins/Admins';
import Vendors from '../components/Dashboard/Vendors/Vendors';
import Customers from '../components/Dashboard/Customers/Customers';
import Reports from '../components/Dashboard/Reports/Reports';

export const privateRoutes = [
    { name: "OrderList", Component: OrderList },
    { path: "order-list", name: "OrderList", Component: OrderList },
    { path: "all-product", name: "AllProduct", Component: AllProducts },
    { path: "user-orders/:email", name: "UserOrders", Component: UserOrders },
    { path: "add-product", name: "AddProduct", Component: AddProduct },
    { path: "update-product/:id", name: "UpdateBook", Component: UpdateBook },
    { path: "stat", name: "Stat", Component: Stat },
    { path: "admin-list", name: "Admins", Component: Admins },
    { path: "vendor-list", name: "Vendors", Component: Vendors },
    { path: "vendor-list", name: "Vendors", Component: Vendors },
    { path: "customer-list", name: "Customers", Component: Customers },
    { path: "reports", name: "Reports", Component: Reports },
]