

export default function Pagination({ totalPages, currentPage, onPageChange }) {
  const pages = new Array(totalPages).fill().map((_, index) => index + 1); //create array of page number
  const handlePageChange = (toPage) => {
    if(toPage !== currentPage){
      onPageChange(toPage);
    }
  }

  return (
    <nav className="isolate inline-flex -space-x-px rounded-md shadow-xs">
      <ul className="flex space-x-2">
        {pages.map((page) => (
          <li key={page}>
            <button
              className={`px-4 py-2 ${currentPage === page ? "bg-indigo-600" : "bg-blue-500 hover:bg-blue-600"} text-white rounded focus:outline-none `}
              onClick={handlePageChange.bind(null, page)} //pass the page number to the handlePageChange function
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
