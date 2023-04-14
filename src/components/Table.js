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
    setTableData((prevState) => {
      const updatedRow = prevState.find((row) => row.id === rowId);
      updatedRow[column] = newValue;
      return [...prevState];
    });
    
    onTableDataChange(tableData);
  };
  

  return (
    <div className="container mx-auto ">
      <table className="border-collapse border border-black bg-red text-black px-2 py-4 w-full">
        <thead>
          <tr>
            {headings.map(heading => (
              <th
                key={heading}
                className="border border-black font-semibold"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
        {tableData.map((row) => (
  <tr
    key={row.id}
  >
    <td className="border border-black">
      <input
        type="text"
        value={row.column1}
        className="w-full text-black border-0 focus:outline-none"
        onChange={(e) => handleCellChange(e, row.id, "column1")}
      />
    </td>
    <td className="border border-black">
      <input
        type="text"
        value={row.column2}
        className="w-full border-0 focus:outline-none"
        onChange={(e) => handleCellChange(e, row.id, "column2")}
      />
    </td>
    <td className="border border-black">
      <input
        type="text"
        value={row.column3}
        className="w-full border-0 focus:outline-none"
        onChange={(e) => handleCellChange(e, row.id, "column3")}
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
                  stroke-width='1.5'
                  stroke='currentColor'
                  class='w-6 h-6'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
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
                  stroke-width='1.5'
                  stroke='currentColor'
                  class='w-6 h-6'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    d='M19.5 12h-15'
                  />
                </svg>
              </button>

    </div>
  );
};

export default MyTable;
