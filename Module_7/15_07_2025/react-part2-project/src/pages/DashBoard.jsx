import { React, useState, useEffect } from "react";
import axios from "axios";
import Loading from "../components/common/Loading";
import ErrorComponent from "../components/common/Error";
import UserPosts from "./UserPosts";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchUsersAndPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const [usersRes, postsRes] = await Promise.all([
          axios.get("https://jsonplaceholder.typicode.com/users"),
          axios.get("https://jsonplaceholder.typicode.com/posts"),
        ]);
        setUsers(usersRes.data);
        setPosts(postsRes.data);
      } catch (err) {
        setError(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchUsersAndPosts();
  }, []);
  if (loading) return <Loading />;
  if (error) return <ErrorComponent message={error} />;

  return (
    <>
      <div className="p-6 text-gray-800 flex flex-col gap-4 ">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p>Total Users: {users.length}</p>
        <p>Total Posts: {posts.length}</p>
      </div>
      <UserPosts />
    </>
  );
}
