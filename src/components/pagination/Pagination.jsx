const PaginationLogic = ({ currentPage, totalPages, onPageChange, children }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return children({
    currentPage,
    totalPages,
    pages,
    canGoPrev,
    canGoNext,
    goToPage: onPageChange,
    goPrev: () => canGoPrev && onPageChange(currentPage - 1),
    goNext: () => canGoNext && onPageChange(currentPage + 1),
  });
};

export default PaginationLogic;

