import React from 'react';

export default function TableBody({ value }) {
  const { sortedData } = value;

  return (
    <tbody>
      {sortedData.map((item) => (
        <tr key={item.id}>
          {Object.values(item).map((data) => {
            return <td key={item.id + '' + data}>{data}</td>;
          })}
        </tr>
      ))}
    </tbody>
  );
}
