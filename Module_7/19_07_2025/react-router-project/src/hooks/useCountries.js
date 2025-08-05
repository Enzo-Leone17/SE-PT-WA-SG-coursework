import { useState, useEffect } from "react"

export default function useCountries() {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const controller = new AbortController();
        const fetchCountries = async () => {
            try {
                const response = await fetch("https://restcountries.com/v3.1/all?fields=name,flags,cca3", { signal: controller.signal });
                const data = await response.json();
                setCountries(data);
                setLoading(false);
            } catch (err) {
                if (err.name === 'AbortError') {
                    console.log('fetch aborted');
                } else {
                    setError(err?.message || 'Failed to fetch countries API!');
                    setLoading(false);
                }
            }
        }

        fetchCountries();
        return () => {
            controller.abort();
        }
    }, [])
    return [countries, loading, error, setError];
}