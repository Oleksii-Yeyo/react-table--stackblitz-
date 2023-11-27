import React from 'react';


export default function TablePagination({value}) {

  const {
    paginate, 
    currentPage, 
    perPage,
    // totalPages,
    data_length,
    handlePerPageChange,
    MAX_ROWS_PER_PAGE,
    filteredDataLength,
    filteredDataPagesQuantity,
  } = value;

  return (
<div className="pagination">
<button
            area-label="go on the last page"
            className="btn"
            onClick={() => paginate(1)}
            disabled={currentPage === 1 || perPage === MAX_ROWS_PER_PAGE || !filteredDataLength}
          >
            &#x21e4;
          </button>

          <button
            area-label="Previous page"
            className="btn"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1 || perPage === MAX_ROWS_PER_PAGE}
          >
            &#x2190;
          </button>
          <span className="pagination__info">{(filteredDataLength ? currentPage : 0) + ' of ' + filteredDataPagesQuantity}</span>
          {/* <span className="pagination__info">&#x2026;</span> */}

   
          <button
            area-label="Next page"
            className="btn"
            onClick={() => paginate(currentPage + 1)}
            disabled={
              currentPage === filteredDataPagesQuantity || perPage >= data_length || !filteredDataLength
            }
          >
            &#x2192;
          </button>

          <button
            area-label="go on the last page"
            className="btn"
            onClick={() => paginate(filteredDataPagesQuantity)}
            disabled={
              currentPage === filteredDataPagesQuantity || perPage >= data_length || !filteredDataLength
            }
          >
            {/* {totalPages} */}
            &#x21e5;
          </button>

        <span className="pagination__info">{filteredDataLength + ' item' + (filteredDataLength !== 1 ? 's' : '')}</span>
        <span className="pagination__info">Show:</span>
        <select
          className="pagination__input-per-page"
          value={perPage}
          onChange={handlePerPageChange}
        >
          <option value={4}>4</option>
          <option value={12}>12</option>
          <option value={24}>24</option>
          <option value={MAX_ROWS_PER_PAGE}>All</option> {/* max 1000 items */}
        </select>
        {/* <span>items per page</span> */}
      </div>
  );
}
