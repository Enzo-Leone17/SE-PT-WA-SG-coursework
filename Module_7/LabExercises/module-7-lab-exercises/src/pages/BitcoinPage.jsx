import BitcoinRates from "../components/Lab_Ex_1/BitCoinRates";
import EmojiProvider from "../components/Lab_Ex_3/EmojiProvider";
import MoodEmoji from "../components/Lab_Ex_3/MoodEmoji";

const BitcoinPage = () => {
  return (
    <>
      <EmojiProvider>
        <div>
          <h1>EX_1: Bitcoin Rates Component</h1>
          <BitcoinRates />
        </div>
        <div>
          <h1>EX_3: Mood Emoji Component</h1>
          <MoodEmoji />
        </div>
      </EmojiProvider>
    </>
  );
};

export default BitcoinPage;
