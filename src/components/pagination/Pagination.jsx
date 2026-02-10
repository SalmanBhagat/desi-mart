const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex items-center justify-between mt- px-2">
      <p className="text-sm text-g-600 hidden sm:block">
        Page <span className="font-medium">{currentPage}</span> of{" "}
        <span className="font-medium">{totalPages}</span>
      </p>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1.5 rounded-lg text-sm border cursor-pointer
            ${
              currentPage === 1
                ? "text-g-400 border-gray-200 cursor-not-allowed"
                : "text-g-700 border-gray-300 hover:bg-p-50"
            }`}
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, i) => {
          const page = i + 1;
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-3 py-1.5 rounded-lg text-sm border cursor-pointer
                ${
                  currentPage === page
                    ? "bg-p-500 text-white border-pink-500"
                    : "text-g-700 border-gray-300 hover:bg-p-50"
                }`}
            >
              {page}
            </button>
          );
        })}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1.5 rounded-lg text-sm border cursor-pointer
            ${
              currentPage === totalPages
                ? "text-g-400 border-gray-200 cursor-not-allowed"
                : "text-g-700 border-gray-300 hover:bg-p-50"
            }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
