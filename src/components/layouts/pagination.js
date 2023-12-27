const Pagination = ({ perPage, totalPage, paginate, currentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPage / perPage); i++) {
        pageNumbers.push(i);
    }

    const renderPageNumbers = () => {
        const pageButtons = [];
        const totalPages = Math.ceil(totalPage / perPage);

        if (totalPages <= 7) {
            // If there are fewer than or equal to 7 pages, show all page numbers
            pageNumbers.forEach((number) => {
                pageButtons.push(
                    <li key={number} className={`page-item ${number === currentPage ? "active" : ""}`}>
                        <button onClick={() => paginate(number)} className="page-link">
                            {number}
                        </button>
                    </li>
                );
            });
        } else {
            // If there are more than 7 pages, show ellipsis (...) for intermediate pages
            if (currentPage <= 4) {
                // Show pages 1 to 5 and ellipsis for remaining pages
                for (let i = 1; i <= 5; i++) {
                    pageButtons.push(
                        <li key={i} className={`page-item ${i === currentPage ? "active" : ""}`}>
                            <button onClick={() => paginate(i)} className="page-link">
                                {i}
                            </button>
                        </li>
                    );
                }
                pageButtons.push(
                    <li key="ellipsis1" className="page-item disabled">
                        <span className="page-link">...</span>
                    </li>
                );
            } else if (currentPage >= totalPages - 3) {
                // Show ellipsis for initial pages and pages (totalPages - 4) to totalPages
                pageButtons.push(
                    <li key="ellipsis2" className="page-item disabled">
                        <span className="page-link">...</span>
                    </li>
                );
                for (let i = totalPages - 4; i <= totalPages; i++) {
                    pageButtons.push(
                        <li key={i} className={`page-item ${i === currentPage ? "active" : ""}`}>
                            <button onClick={() => paginate(i)} className="page-link">
                                {i}
                            </button>
                        </li>
                    );
                }
            } else {
                // Show ellipsis for intermediate pages
                pageButtons.push(
                    <li key="ellipsis3" className="page-item disabled">
                        <span className="page-link">...</span>
                    </li>
                );
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pageButtons.push(
                        <li key={i} className={`page-item ${i === currentPage ? "active" : ""}`}>
                            <button onClick={() => paginate(i)} className="page-link">
                                {i}
                            </button>
                        </li>
                    );
                }
                pageButtons.push(
                    <li key="ellipsis4" className="page-item disabled">
                        <span className="page-link">...</span>
                    </li>
                );
            }
        }

        return pageButtons;
    };

    return (
        <div className="pagination-area text-center">
            <ul className="pagination">
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                    <button onClick={() => paginate(currentPage - 1)} className="page-link">
                        <i class="fal fa-long-arrow-alt-left"></i> Previous
                    </button>
                </li>

                {renderPageNumbers()}

                <li className={`page-item ${currentPage === Math.ceil(totalPage / perPage) ? "disabled" : ""}`}>
                    <button onClick={() => paginate(currentPage + 1)} className="page-link">
                        Next <i class="fal fa-long-arrow-alt-right"></i>
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Pagination;
