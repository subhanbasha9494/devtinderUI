import axios from "axios";
import { useState } from "react";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("rizzu@gmail.com");
  const [password, setPassword] = useState("Rizzu@2022");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const res = await axios.post(`${API_URL}/login`, {
        emailId,
        password,
      },
        { withCredentials: true });
      dispatch(addUser(res.data));
      return navigate("/feed");
    } catch (error) {
      setError(error.response?.message || "Login failed. Please try again.");
    }
  };
  return (
    <>
      <div className="flex justify-center my-10">
        <div className="card bg-base-100 w-96 shadow-sm">
          <div className="card-body">
            <h2 className="card-title justify-center">Login</h2>
            <input type="text" className="input" placeholder="Email Id" value={emailId} onChange={(e) => setEmailId(e.target.value)} />
            <input type="password" className="input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <p className="text-red-500">{error}</p>
            <div className="justify-center card-actions">
              <button className="btn btn-primary" onClick={handleLogin}>Login</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login;