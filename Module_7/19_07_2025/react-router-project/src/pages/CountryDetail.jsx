import useCountries from "../hooks/useCountries";
import { Link } from "react-router-dom";
import Loading from "../components/common/Loading";
import ErrorComponent from "../components/common/Error";

export default function CountryDetail() {
  const [countries, loading, error, setError] = useCountries();
  if (loading) return <Loading />;

  if (error) {
    setTimeout(() => setError(null), 5000);
    return <ErrorComponent message={error} reset={() => setError(null)} />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow rounded text-black">
        <thead className="bg-gray-100 border-b border-indigo-600">
          <tr>
            <th className="text-left p-2">Name</th>
            <th className="text-left p-2">Flags</th>
          </tr>
        </thead>
        <tbody>
          {countries.map((country) => (
            <tr
              key={country?.cca3}
              className="hover:bg-gray-50 cursor-pointer border-b border-indigo-600" 
            >
              <td className="p-2">
                <Link to={`/countries/${country?.cca3}`} key={country?.cca3}>
                  {country.name?.official || "Country name"}
                </Link>
              </td>
              <td className="p-2">
                <Link to={`/countries/${country?.cca3}`} key={country?.cca3}>
                  <img src={country.flags?.png} alt="Country flag" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
