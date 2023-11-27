import React, { useState, useCallback, useMemo } from 'react';
import TableSearchInput from './TableSearchInput';
import TableHead from './TableHead';
import TableBody from './TableBody';
import TablePagination from './TablePagination';

const Table = ({ data, isFiltering, isPagination }) => {
  // States for pagination, filtering, and sorting
  const [currentPage, setCurrentPage] = useState(1);
  const MAX_ROWS_PER_PAGE = 1e3;
  const [perPage, setPerPage] = useState(isPagination ? 4 : MAX_ROWS_PER_PAGE); // Default per page value
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending',
  });

  // Pagination logic
  const indexOfLastItem = currentPage * perPage;
  const indexOfFirstItem = indexOfLastItem - perPage;
  // const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const currentItems = data;

  const handlePerPageChange = useCallback((e) => {
    setPerPage(parseInt(e.target.value));
    setCurrentPage(1);
    // Here you might want to update the data to reflect the new per page value
    // For instance, fetching new data based on the selected perPage value
  }, []);

  // Total pages
  // const totalPages = useMemo(
  //   () => Math.ceil(data.length / perPage),
  //   [data, perPage]
  // );
  const totalItems = useMemo(() => data.length, [data]);

  // Handle page change
  const paginate = useCallback((pageNumber) => setCurrentPage(pageNumber), []);

  // Handle search/filter
  const handleSearch = useCallback((event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset pagination when searching
  }, []);

  // Filtering logic
  const filterData = useCallback(
    () =>
      currentItems.filter((item) =>
        Object.values(item).some((value) =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      ),
    [searchTerm, currentItems]
  );

  const filteredData = useMemo(filterData, [searchTerm, currentItems]);
  const filteredDataPagesQuantity = useMemo(
    () => Math.ceil(filteredData.length / perPage),
    [filterData, perPage]
  );

  // Sorting logic
  const sortData = useCallback(
    () =>
      filteredData
        .sort((a, b) => {
          if (sortConfig.key && a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (sortConfig.key && a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        })
        .slice(indexOfFirstItem, indexOfLastItem),
    [filteredData, sortConfig, currentPage, perPage]
  );

  const sortedData = useMemo(sortData, [
    filteredData,
    sortConfig,
    currentPage,
    perPage,
  ]);

  // Handle sorting
  const requestSort = useCallback((key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  });

  return (
    <div className="table-wrapper">
      {/* Table search input */}
      {isFiltering && <TableSearchInput value={{ searchTerm, handleSearch }} />}
      <div className="x-scroll">
        <table className="table">
          {/* Table header */}
          <TableHead value={{ data, sortConfig, requestSort }} />

          {/* Table body */}
          <TableBody value={{ sortedData }} />
        </table>
      </div>

      {isPagination && (
        <TablePagination
          value={{
            paginate,
            currentPage,
            perPage,
            // totalPages,
            filteredDataLength: filteredData.length,
            filteredDataPagesQuantity,
            data_length: totalItems,
            handlePerPageChange,
            MAX_ROWS_PER_PAGE,
          }}
        />
      )}
    </div>
  );
};

export default Table;
