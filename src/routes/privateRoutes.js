import OrderList from '../components/Dashboard/OrderList/OrderList';
import AllProducts from '../components/Dashboard/AllProducts/AllProducts';
import UserOrders from '../components/Dashboard/UserOrders/UserOrders';
import AddProduct from '../components/Dashboard/AddProduct/AddProduct';
import UpdateBook from '../components/Dashboard/UpdateBook/UpdateBook';

export const privateRoutes = [
    { name: "OrderList", Component: OrderList },
    { path: "order-list", name: "OrderList", Component: OrderList },
    { path: "all-product", name: "AllProduct", Component: AllProducts },
    { path: "user-orders/:email", name: "UserOrders", Component: UserOrders },
    { path: "add-product", name: "AddProduct", Component: AddProduct },
    { path: "update-product/:id", name: "UpdateBook", Component: UpdateBook },
]