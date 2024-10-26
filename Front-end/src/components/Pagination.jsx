const Pagination = ({ currentPage, totalPages, onPageChange }) => { 
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  
  let startPage = 1;
  let endPage = totalPages;

  if (totalPages > 5) {
    if (currentPage <= 3) {
      startPage = 1;
      endPage = 5;
    } else if (currentPage >= totalPages - 2) {
      startPage = totalPages - 4;
      endPage = totalPages;
    } else {
      startPage = currentPage - 2;
      endPage = currentPage + 2;
    }
  }

  return (
    <div className="flex justify-center mb-4 col-span-full mt-6">
      {startPage > 1 && (
        <button
          onClick={() => onPageChange(1)}
          className="px-4 py-2 bg-white"
        >
          «
        </button>
      )}
      {currentPage > 1 && (
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className="px-4 py-2 bg-white"
        >
          ‹
        </button>
      )}
      {pages.slice(startPage - 1, endPage).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 ${page === currentPage ? 'bg-gray-200' : 'bg-white'}`}
        >
          {page}
        </button>
      ))}
      {endPage < totalPages && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="px-4 py-2 bg-white"
        >
          ›
        </button>
      )}
      {endPage < totalPages && (
        <button
          onClick={() => onPageChange(totalPages)}
          className="px-4 py-2 bg-white"
        >
          »
        </button>
      )}
    </div>
  );
};

export default Pagination;