import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "./common/Loading";
import ErrorComponent from "./common/Error";

export default function CountryCard() {
  const { countryCode } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchSpecificCountry = async () => {
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/alpha/${countryCode}?fields=name,region,subregion,capital,population`,
          { signal: controller.signal }
        );
        const data = await response.json();
        setCountry(data);
        setLoading(false);
        console.log(data.capital);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("fetch aborted");
        } else {
          setError(err?.message || "Failed to fetch countries API!");
          setLoading(false);
        }
      }
    };

    fetchSpecificCountry();
    return () => {
      controller.abort();
    };
  }, [countryCode]);

  if (loading) return <Loading />;
  if (error) {
    setTimeout(() => setError(null), 5000);
    return (
      <ErrorComponent message={error} reset="link" resetPage="/countries" />
    );
  }
  return (
    <div className="bg-white rounded shadow p-4 text-black">
      <h2 className="text-xl font-semibold mb-2">
        {country.name?.common || "Country name"}
      </h2>
      <p>
        <strong>Full name:</strong>{" "}
        {country.name?.official || "Country full name"}
      </p>
      <p>
        <strong>Region:</strong> {country?.region|| "Country region"}
      </p>
      <p>
        <strong>Subregion:</strong> {country?.subregion || "Country subregion"}
      </p>
      <div className="flex flex-row gap-2 justify-center">
        <strong>Capital:</strong>
        <ul className="list-disc list-inside">
          {country?.capital? country.capital.map((c) => <li key={c}>{c}</li>) : "No capital"}
        </ul>
      </div>
      <p><strong>Population: </strong>{country?.population || "Country population"}</p>
    </div>
  );
}
