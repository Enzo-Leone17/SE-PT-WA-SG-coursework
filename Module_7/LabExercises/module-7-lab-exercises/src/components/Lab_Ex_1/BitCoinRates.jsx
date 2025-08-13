import { useState } from "react";
import useApi from "../../hooks/Lab_Ex_2/useApi";
import { useEmojiContext } from "../../contexts/Lab_Ex_3/useEmojiContext";


const currencies = ["USD", "AUD", "NZD", "GBP", "EUR", "SGD"];
function BitcoinRates() {
  const [currency, setCurrency] = useState(currencies[0]);
  // fetch URL: https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=${currency}
  const state = useApi(
    `/api/price?ids=bitcoin&vs_currencies=${currency}`
  );
  const {isHappy} = useEmojiContext();

//   useEffect(() => {
//     const controller = new AbortController();
//     const fetchPrice = async () => {
//       try {
//         const response = await axios.get(
//           `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=${currency}`,
//           { signal: controller.signal }
//         );
//         setPrice(response.data.bitcoin[currency.toLowerCase()]);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     fetchPrice();
//     return () => {
//        controller.abort();
//     };
//   }, [currency]);

  const options = currencies.map((curr) => (
    <option value={curr} key={curr}>
      {curr}
    </option>
  ));

  if(state?.isLoading) return <p>Loading...</p>;
  if(state?.isError) return <p>Error: {state.error}</p>;



  return (
    <div className="BitcoinRates componentBox">
      <h3>Bitcoin Exchange Rate</h3>
      <label>
        Choose currency:
        <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
          {options}
        </select>
      </label>
      <p>
        1 BTC = {state?.data?.bitcoin[currency.toLowerCase()]} {currency}
      </p>
      <br/>
      <p>Mood now: {isHappy ? "😁" : "😭"}</p>
    </div>
  );
}

export default BitcoinRates;