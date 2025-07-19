export default function SearchBar({ onQueryStudents}) {
    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Search by Name:</label>
            <input
                type="text"
                className="w-full p-2 border rounded shadow"
                placeholder="Enter student name"
                onChange={e => onQueryStudents(e.target.value)} 
            ></input>
        </div>
    );
}