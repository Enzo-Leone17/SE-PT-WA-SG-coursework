export default function Home({welcomeMsg}) {
    localStorage.clear();
    return (
        <div className="bg-gray-500">
            <h1 className="text-3xl font-bold">{welcomeMsg}</h1>
        </div>
    );
}