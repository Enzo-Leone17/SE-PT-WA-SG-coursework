import SingleCat from "./SingleCat";
import { useState, useEffect } from "react";
import { useBigCatContext } from "../../context/useBigCatContext";

const BigCat = () => {
  const { bigCatList, setBigCatList } = useBigCatContext();
  const [catList, setCatList] = useState(bigCatList);
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortBy, setSortBy] = useState("none");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setCatList(bigCatList);
  }, [bigCatList]);

  const handleSorting = (value) => {
    if (
      (value === "alphabetical" && sortDirection === "asc") ||
      value === "asc"
    ) {
      if (sortBy !== "alphabetical") setSortBy(value);
      setSortDirection("asc");
      setCatList([...catList].sort((a, b) => a.name.localeCompare(b.name)));
    } else if (
      (value === "alphabetical" && sortDirection === "desc") ||
      value === "desc"
    ) {
      if (sortBy !== "alphabetical") setSortBy(value);
      setSortDirection("desc");
      setCatList([...catList].sort((a, b) => b.name.localeCompare(a.name)));
    } else if (value === "reversed") {
      setSortBy(value);
      setCatList([...catList].reverse());
    } else {
      setSortBy(value);
      searchTerm === "" ? setCatList([...bigCatList]) : handleSearch();
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCatList(
      bigCatList.filter((cat) => {
        if (
          cat.name.toLowerCase().includes(value.toLowerCase()) ||
          cat.latinName.toLowerCase().includes(value.toLowerCase())
        ) {
          return cat;
        }
      })
    );
  };

  const handleDelete = (latinName) => {
    setBigCatList(bigCatList.filter((cat) => cat.latinName !== latinName));
  };

  return (
    <>
      <div className="flex flex-row gap-4">
        <div className="flex flex-col">
          <label htmlFor="sortBy">Sorting by:</label>
          <select
            id="sortBy"
            onChange={(e) => handleSorting(e.target.value)}
            value={sortBy}
          >
            <option value="none" className="text-gray-800">
              None
            </option>
            <option value="alphabetical" className="text-gray-800">
              Alphabetical
            </option>
            <option value="reversed" className="text-gray-800">
              Reversed
            </option>
          </select>
        </div>
        <button
          onClick={() =>
            handleSorting(sortDirection === "asc" ? "desc" : "asc")
          }
          className={`border rounded-full px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 ${
            sortBy === "none" || sortBy === "reversed" ? "hidden" : ""
          }`}
        >
          {sortDirection === "asc" ? "Sort Descending" : "Sort Ascending"}
        </button>
        <div className="flex flex-col">
          <label htmlFor="search">Search:</label>
          <input
            type="text"
            id="search"
            onChange={(e) => handleSearch(e.target.value)}
            value={searchTerm}
            placeholder="E.g Panthera"
            className="border rounded-full px-4 py-2"
          />
        </div>
        <button
          onClick={() => handleSearch("")}
          className={`border rounded-full px-4 text-white bg-red-600 hover:bg-red-700 ${
            searchTerm !== "" ? "" : "hidden"
          }`}
        >
          Clear
        </button>
      </div>
      <ul className="list-disc pl-4">
        {catList.map((cat) => (
          <li key={cat.latinName} className="mb-4 flex flex-row">
            <SingleCat
              name={cat.name}
              latinName={cat.latinName}
              image={cat.image}
            />
            {/* add delete button */}
            <div className="ml-4 flex items-center justify-center">
              <button
                onClick={() => handleDelete(cat.latinName)}
                className="border rounded-full px-4 py-2 text-white bg-red-600 hover:bg-red-700"
              >
                ⛔
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default BigCat;
