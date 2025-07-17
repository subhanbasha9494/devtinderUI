import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { API_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
    const { user } = useSelector((state) => state);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = async () => {
        //clear the token from application state
        try {
            await axios.post(API_URL + '/logout', {}, { withCredentials: true });
            dispatch(removeUser());
            navigate('/login');
        } catch (error) {
            console.error("Error during logout:", error);
        };
    }
        return (
            <div className="navbar bg-base-100 shadow-sm">
                <div className="flex-1">
                    <Link to="/" className="btn btn-ghost text-xl">daisyUI</Link>
                </div>
                {user && (
                    <div className="flex gap-2">
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="Tailwind CSS Navbar component"
                                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                <Link to="/profile" className="justify-between">
                                    Profile Name : {user?.firstName || "Guest"}
                                </Link>
                                <Link to="/settings">Settings</Link>
                                <Link onClick={handleLogout}>Logout</Link>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    export default Navbar;