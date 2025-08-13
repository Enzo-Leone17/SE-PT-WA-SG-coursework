import { useEmojiContext } from "../../contexts/Lab_Ex_3/useEmojiContext";



const MoodEmoji = () => {
    const EmojiContext = useEmojiContext();
    const {isHappy, setIsHappy} = EmojiContext;
    return (
        <div className="flex flex-row items-center gap-4">
            {/* <h1>Current Mood: {isHappy ? "😁" : "😭"}</h1> */}
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setIsHappy(!isHappy)}>Change mood: {isHappy ? "😭" : "😁"}</button>
        </div>
    );
};

export default MoodEmoji;