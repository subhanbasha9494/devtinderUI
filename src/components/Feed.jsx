import axios from "axios";
import { useEffect } from "react";
import { API_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import UserCard from './UserCard';
import { addFeed } from "../utils/feedSlice";

const Feed = () => {
  const feed = useSelector((state) => state.feed);
  const dispatch = useDispatch();
  const getFeedData = async () => {
     if (feed) return; // If feed is already loaded, skip fetching
    try {
      const response = await axios.get(API_URL + '/feed', { withCredentials: true }); // Adjust the endpoint as necessary
      const data = response.data;
      dispatch(addFeed(data));
    } catch (error) {
      console.error('Error fetching feed data:', error);
    }
  };


  useEffect(() => {
    getFeedData();
  }, []);

  return (
    feed && feed.data && feed.data.length > 0 ? (
      <div className="flex flex-col items-center justify-center">
        <UserCard users={feed.data} />
      </div>
    ) : (
      <div className="flex flex-col items-center justify-center">
        <p>No feed data available</p>
      </div>
    )
  );
}

export default Feed;
