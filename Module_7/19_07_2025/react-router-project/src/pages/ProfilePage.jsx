import React, { useEffect, useState } from "react";
//import api interceptor 
import api from "../components/api";
import Loading from "../components/common/Loading";
import ErrorComponent from "../components/common/Error";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const profileUrl = "http://localhost:4000/api/profile";
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


  useEffect(() => {
    
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await api.get(profileUrl);
        setUser(response.data);
        setLoading(false);
      } catch (err) {
        // Handle error or redirect to login
        setError(err.message + (err.response.status === 401? ". Please login" : ""));
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorComponent message={error} reset="link" resetPage="/login" />;
  }

  return (
    <>
      <div className="bg-gray-500">
        <h1 className="text-3xl font-bold">Profile</h1>
      </div>

      <div className="p-6 text-gray-800">
        <h2 className="text-xl font-bold mb-2">{user?.name ? "Name: " + user.name : "No name found"}</h2>
        <pre>
            {`Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Cupiditate quibusdam reprehenderit explicabo, consectetur itaque eaque! 
            Voluptas non, eum commodi assumenda eveniet nobis praesentium magnam veritatis. 
            Excepturi nesciunt quibusdam vero a!`}
        </pre>
      </div>
    </>
  );
}
