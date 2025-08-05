import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../components/common/Loading";
import ErrorComponent from "../components/common/Error";
import axios from "axios";

export default function ListUserIDs() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAPIData();
  }, []);

  const fetchAPIData = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://jsonplaceholder.typicode.com/users");
      if(res.status === 200 && res.data) {
        setUsers(res.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching users:", error);
      setError("failed to get users data");
    }
  };

  if(loading) return <Loading />;

  if(error) return <ErrorComponent message={error} />


  return (
    <div className="p-6 text-gray-800 flex flex-col gap-4 ">
      <h2 className="text-xl font-semibold mb-4">User ID List</h2>
      <ul className="list-disc space-y-2 grow">
        {users.map((s) => (
          <li key={s.id} className="border p-2 rounded hover:bg-gray-50">
            <Link to={`/user/${s.id}`} className="hover:underline">
              {s.id}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
