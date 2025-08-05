

export default function SearchBar({ searchValue, setSearchValue}) {
    return (
        <nav className="bg-gray-800">
            <div className="max-w-screen mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <label className="block text-sm font-medium text-gray-100 mb-1" for="search">Search:</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded shadow"
                                placeholder="Search"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                            ></input>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}