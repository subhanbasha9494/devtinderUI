import { Outlet } from 'react-router-dom';
import Navbar from './navbar.jsx';

const Body = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
}

export default Body;