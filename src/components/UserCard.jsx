import axios from "axios";
import { API_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ({ users }) => {
    const dispatch = useDispatch();

    const handleSendRequest = async (status, userId) => {
        try {
            const res = await axios.post(
                API_URL + "/request/send/" + status + "/" + userId,
                {},
                { withCredentials: true }
            );
            dispatch(removeFeed(userId));
        } catch (err) { }
    };
    return (
        <div className="flex p-4 my-4 flex-wrap justify-center">
            {users.map((user) => (
                <div key={user._id} className="user-card">
                    <div className="card bg-base-100 w-96 shadow-sm">
                        <img
                            src="https://cdn.vectorstock.com/i/500p/29/52/faceless-male-avatar-in-hoodie-vector-56412952.jpg"
                            alt="Shoes" />
                        <div className="card-body">
                            <h2 className="card-title">{user.firstName}</h2>
                            <p>{user.about}</p>
                            <div className="card-actions justify-center my-4">
                                <button
                                    className="btn btn-primary"
                                    onClick={() => handleSendRequest("ignored", _id)}
                                >
                                    Ignore
                                </button>
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => handleSendRequest("interested", _id)}
                                >
                                    Interested
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
export default UserCard;