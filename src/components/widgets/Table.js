import React, { useState } from 'react';
// import axios from 'axios';

const MyTable = ({ headings, onTableDataChange }) => {
  const [tableData, setTableData] = useState([]);

  const handleDeleteRow = () => {
    setTableData(prevState => prevState.slice(0, -1));
  };

  const handleAddRow = () => {
    // event.preventDefault();
    setTableData(prevState => [
      ...prevState,
      { id: Date.now(), column1: '', column2: '', column3: '' },
    ]);
  };

  const handleCellChange = (e, rowId, column) => {
    const newValue = e.target.value;
    setTableData(prevState => {
      const updatedRow = prevState.find(row => row.id === rowId);
      updatedRow[column] = newValue;
      return [...prevState];
    });

    onTableDataChange(tableData);
  };

  return (
    <div className='container mx-auto '>
      <table className='w-full mb-5'>
        <thead>
          <tr className='bg-red text-white border border-black'>
            {headings.map(heading => (
              <th
                key={heading}
                className='border border-black'
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map(row => (
            <tr key={row.id}>
              <td>
                <textarea
                  type='text'
                  value={row.column1}
                  row={4}
                  className='w-full px-2 py-1 border-black'
                  onChange={e => handleCellChange(e, row.id, 'column1')
                }
                />
              </td>
              <td>
                <textarea
                  type='text'
                  value={row.column2}
                  row={4}
                  onChange={e => handleCellChange(e, row.id, 'column2')}
                  className='w-full px-2 py-1 border-black'
                />
              </td>
              <td>
                <textarea
                  type='text'
                  value={row.column3}
                  row={4}
                  onChange={e => handleCellChange(e, row.id, 'column3')}
                  className='w-full px-2 py-1 border-black'
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className='inline-flex items-center gap-1 bg-gold text-white px-1 py-1 mt-5 mr-2 rounded'
        type='button'
        onClick={handleAddRow}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
          className='w-6 h-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 4.5v15m7.5-7.5h-15'
          />
        </svg>
      </button>
      <button
        onClick={handleDeleteRow}
        className='bg-bred text-white font-bold px-1 py-1 rounded mt-5 '
        type='button'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
          className='w-6 h-6'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 12h-15' />
        </svg>
      </button>
    </div>
  );
};

export default MyTable;
