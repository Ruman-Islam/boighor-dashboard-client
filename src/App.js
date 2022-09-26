import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./authentication/PrivateRoute";
import ScrollToTop from "./hooks/UseScrillTop";
import Dashboard from "./pages/Dashboard";
import { publicRoutes } from './routes/publicRoutes';
import { privateRoutes } from './routes/privateRoutes';



function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Public routes */}
        {publicRoutes.map(({ path, Component }, index) => (
          <Route key={index} path={path} element={<Component />} />))}

        {/* Private routes */}
        <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />}>
            {privateRoutes.map(({ path, name, Component }, index) => (
              <Route key={index} path={path} index={name === 'OrderList'} element={<Component />} />))}
          </Route>
        </Route>

      </Routes>
    </>
  );
}

export default App;