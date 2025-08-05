import { React, useState, useEffect } from "react";
import axios from "axios";
import Loading from "../components/common/Loading";
import ErrorComponent from "../components/common/Error";

export default function UserPosts() {
  const [posts, setPosts] = useState([]);
  const [authors, setAuthors] = useState({}); // userId → user object
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostsAndAuthors = async () => {
      setLoading(true);
      setError(null);

      try {
        // Step 1: Fetch all posts
        const postsRes = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        const allPosts = postsRes.data;
        setPosts(allPosts);

        // Step 2: Get unique userIds
        const userIds = [...new Set(allPosts.map((post) => post.userId))];

        // Step 3: Fetch each user only once
        const userRequests = userIds.map((id) =>
          axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
        );

        const userResponses = await Promise.all(userRequests);
        const usersMap = {};

        userResponses.forEach((res) => {
          const user = res.data;
          usersMap[user.id] = user;
        });

        setAuthors(usersMap);
      } catch (err) {
        setError(err.message || "Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchPostsAndAuthors();
  }, []);
  if (loading) return <Loading />;
  if (error) return <ErrorComponent message={error} />;

  return (
    <div className="p-6 text-gray-800 flex flex-col gap-4 bg-gray-400">
      <h1 className="text-3xl font-bold">Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white p-4 rounded-lg shadow-md relative"
          >
            <h2 className="text-lg font-semibold">Title: {post.title}</h2>
            <p className="text-gray-600 pb-4">{post.body}</p>
            <span className="absolute bottom-2 right-2 text-sm text-gray-500">
              By: ~{authors[post.userId]?.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
