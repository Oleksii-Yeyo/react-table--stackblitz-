import React from 'react';

export default function TableSearchInput({ value }) {
  const { searchTerm, handleSearch } = value;

  return (
    <input
      className="input-text"
      type="text"
      placeholder="Search..."
      value={searchTerm}
      onChange={handleSearch}
    />
  );
}
