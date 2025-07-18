import axios from "axios";
import { useEffect } from "react";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useDispatch, useSelector } from "react-redux";

const Requests = () => {
  const requests = useSelector((store) => store);
  console.log(requests);
  const dispatch = useDispatch();

    const reviewRequest = async (status, _id) => {
        try {
            const res = axios.post(
                BASE_URL + "/request/review/" + status + "/" + _id,
                {},
                { withCredentials: true }
            );
            dispatch(removeRequest(_id));
        } catch (err) { }
    };

    const fetchRequests = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/requests/received", {
                withCredentials: true,
            });

            dispatch(addRequests(res.data.data));
        } catch (err) { }
    };

    useEffect(() => {
        fetchRequests();
    }, []);


    return (
        <div>
            {requests && requests.map((request) => {
                const { _id, firstName, lastName, about } =
                    request.fromUserId;

                return (
                    <div
                        key={_id}
                        className=" flex justify-between items-center m-4 p-4 rounded-lg bg-base-300  mx-auto"
                    >
                        <div className="text-left mx-4 ">
                            <h2 className="font-bold text-xl">
                                {firstName + " " + lastName}
                            </h2>
                            <p>{about}</p>
                        </div>
                        <div>
                            <button
                                className="btn btn-primary mx-2"
                                onClick={() => reviewRequest("rejected", request._id)}
                            >
                                Reject
                            </button>
                            <button
                                className="btn btn-secondary mx-2"
                                onClick={() => reviewRequest("accepted", request._id)}
                            >
                                Accept
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Requests;
