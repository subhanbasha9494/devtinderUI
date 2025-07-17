import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from './navbar.jsx';
import axios from 'axios';
import { API_URL } from '../utils/constants.js';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice.js';
import { useEffect } from 'react';

const Body = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((state) => state);
    const fetchUser = async () => {
        if (userData.user) return; // If user data is already present, skip fetching
        try {
            const user = await axios.get(API_URL + '/profile/view', {
                withCredentials: true
            });
            dispatch(addUser(user.data));

        } catch (error) {
            navigate('/login');
            console.error("Error fetching user data:", error);
        }
    };
    useEffect(() => {
            // Fetch user data only if not already present
            fetchUser();
    }, []);
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
}


export default Body;