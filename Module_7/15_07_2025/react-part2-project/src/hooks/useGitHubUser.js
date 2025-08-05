import { useState, useEffect } from "react";

export default function useGitHubUser(username, setError) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const controller = new AbortController();
        async function fetchUser() {
            try {
                const response = await fetch(`https://api.github.com/users/${username}`);
                const data = await response.json();
                setUser(data);
                setLoading(false);
            } catch (err) {
                if(err.name === 'AbortError') {
                    console.log('fetch aborted');
                } else {
                    setError(err?.message || 'Unable to find user!');
                    setLoading(false);
                }
            }
        }
        fetchUser();

        return () => controller.abort();
    }, [username, setError]);
    return { user, loading};
}