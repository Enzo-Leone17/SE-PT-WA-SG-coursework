import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../components/common/Loading";
import ErrorComponent from "../components/common/Error";
import axios from "axios";

export default function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchUserDetails = async () => {
      console.log("Fetching user details for ID:", id);
      try {
        setLoading(true);
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${id}`,
          { signal: controller.signal }
        );
        if (response.status === 200 && response.data) {
          setUser(response.data);
          setLoading(false);
        }
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Request canceled by cleanup");
        } else {
          setLoading(false);
          console.error(err);
          setError("failed to get user details");
        }
      }
    };

    fetchUserDetails();

    return () => {
      controller.abort();
    };
  }, [id]);

  if (loading) return <Loading />;

  if (error) return <ErrorComponent message={error} />;

  return (
    <div className="p-6 text-gray-800">
      {" "}
      {/* Set text color */}
      <h2 className="text-xl font-bold mb-2">{user?.name || "Loading..."}</h2>
      <p>Email: {user?.email || "Loading..."}</p>
      <ul>
        <li>Phone: {user?.phone || "Loading..."}</li>
        <li>Website: {user?.website || "Loading..."}</li>
      </ul>
    </div>
  );
}
