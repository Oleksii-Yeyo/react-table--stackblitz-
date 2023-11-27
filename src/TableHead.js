import React from 'react';

export default function TableHead({ value }) {
  const {data, sortConfig, requestSort} = value;

  return (
    <thead>
          <tr>
            {Object.keys(data[0]).map((header) => {
              // if (header === 'id') { return }
              return (
                <th key={header} onClick={() => requestSort(header)}>
                  <div className="table__header">
                    {header.charAt(0).toLocaleUpperCase() + header.slice(1)}
                    {sortConfig.key === header &&
                      (sortConfig.direction === 'ascending' ? (
                        <span className="sorting-icon">&#x2191;</span>
                      ) : (
                        <span className="sorting-icon">&#x2193;</span>
                      ))}
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
  );
}
