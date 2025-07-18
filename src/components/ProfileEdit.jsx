import { useState } from "react";
import { useDispatch } from "react-redux";
import { API_URL } from "../utils/constants";
import UserCard from "./UserCard";
import axios from "axios";
import { addUser } from "../utils/userSlice";

const ProfileEdit = ({ user }) => {
    const [firstName, setFirstName] = useState(user.firstName || "");
    const [lastName, setLastName] = useState(user.lastName || "");
    const [about, setAbout] = useState(user.about || "");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const [showToast, setShowToast] = useState(false);

    const saveProfile = async () => {
        //Clear Errors
        setError("");
        try {
            const res = await axios.patch(
                API_URL + "/profile/edit",
                {
                    firstName,
                    lastName,
                    about,
                },
                { withCredentials: true }
            );
            dispatch(addUser(res?.data?.data));
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 3000);
        } catch (err) {
          setError(err.response?.data?.message || "Failed to save profile. Please try again.");
        }
    };
    return (
        <>
            <>
                <div className="flex justify-center my-10">
                    <div className="flex justify-center mx-10">
                        <div className="card bg-base-300 w-96 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title justify-center">Edit Profile</h2>
                                <div>
                                    <label className="form-control w-full max-w-xs my-2">
                                        <div className="label">
                                            <span className="label-text">First Name:</span>
                                        </div>
                                        <input
                                            type="text"
                                            value={firstName}
                                            className="input input-bordered w-full max-w-xs"
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </label>
                                    <label className="form-control w-full max-w-xs my-2">
                                        <div className="label">
                                            <span className="label-text">Last Name:</span>
                                        </div>
                                        <input
                                            type="text"
                                            value={lastName}
                                            className="input input-bordered w-full max-w-xs"
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </label>
                                    <label className="form-control w-full max-w-xs my-2">
                                        <div className="label">
                                            <span className="label-text">About:</span>
                                        </div>
                                        <input
                                            type="text"
                                            value={about}
                                            className="input input-bordered w-full max-w-xs"
                                            onChange={(e) => setAbout(e.target.value)}
                                        />
                                    </label>
                                </div>
                                <p className="text-red-500">{error}</p>
                                <div className="card-actions justify-center m-2">
                                    <button className="btn btn-primary" onClick={saveProfile}>
                                        Save Profile
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <UserCard
                        user={{ firstName, lastName, about }}
                    /> */}
                </div>
                {showToast && (
                    <div className="toast toast-top toast-center">
                        <div className="alert alert-success">
                            <span>Profile saved successfully.</span>
                        </div>
                    </div>
                )}
            </>
        </>
    );
}

export default ProfileEdit;
