import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../utils/constants";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
    const connections = useSelector((state) => state);
    const dispatch = useDispatch();

    const fetchConnections = async () => {
        try {
            const response = await axios.get(API_URL + '/user/connections', { withCredentials: true });
            // Handle the response data as needed
            console.log(response.data.data);
            dispatch(addConnection(response.data.data));
        } catch (error) {
            console.error('Error fetching connections:', error);
        }
    }


    useEffect(() => {
        fetchConnections();
    }, []);
     console.log(connections,'----');
    if (!connections) return;
    if (connections.length === 0) return <h1>No Connections found</h1>

    return (
        <div className="text-center my-10">
            {connections.connection && connections.connection.length > 0 && connections.connection.map((connection) => (
                <div key={connection._id} className="card bg-base-300 shadow-xl my-4">
                    <div className="card-body">
                        <h2 className="card-title">{connection.firstName}</h2>
                        <p className="">{connection.lastName}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Connections;