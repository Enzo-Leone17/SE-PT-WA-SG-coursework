import useDebounce from "../hooks/useDebounce";
import useGitHubUser from "../hooks/useGitHubUser";
import Loading from "./common/Loading";
import ErrorComponent from "./common/Error";
import SearchBar from "./common/SearchBar";
import { useState } from "react";

export default function GitHubUserSearch() {
  const resetError = () => {
    setError(null);
    setUsername("");
  };
  const [username, setUsername] = useState("Enzo-Leone17");
  const [error, setError] = useState(null);
  const debouncedUsername = useDebounce(username, 600);
  const { user, loading } = useGitHubUser(debouncedUsername, setError);

  if (loading) return <Loading />;
  if (error) return <ErrorComponent message={error} reset={resetError} />;
  if (user) console.log(user);

  return (
    <div>
      <br />
      <br />
      <SearchBar searchValue={username} setSearchValue={setUsername} />
      <div className="flex justify-center gap-4">
        <img
          src={user?.avatar_url}
          alt={user?.name ? user.name : "avatar"}
          className="col"
        />
        <div className="col">
          <h2>{user?.name ? "Username: " + user.name : "No name found"}</h2>
          <p>
            {user?.public_repos
              ? "Public Repos: " + user.public_repos
              : "No public repos found"}
          </p>
          <a href={user?.html_url} target="_blank">{user?.html_url ? "URL: " + user.html_url : "No url found"}</a>
        </div>
      </div>
    </div>
  );
}
