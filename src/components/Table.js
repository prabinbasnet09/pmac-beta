import React, { useState } from 'react';
// import axios from 'axios';

<<<<<<< HEAD
const MyTable = ({ headings, onTableDataChange }) => {
  const [tableData, setTableData] = useState([]);

const handleDeleteRow = () => {
  setTableData(prevState => prevState.slice(0, -1));
};



=======
const MyTable = ({ headings }) => {
  const [tableData, setTableData] = useState([]);

>>>>>>> 9346c4296420f80a7de36a5863d6d1f94c71db5a
  const handleAddRow = () => {
    // event.preventDefault();
    setTableData(prevState => [
      ...prevState,
      { id: Date.now(), column1: '', column2: '', column3: '' },
    ]);
  };

<<<<<<< HEAD

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
=======
  const handleCellChange = (e, rowId, column) => {
    const newValue = e.target.value;
    setTableData(prevState => {
      const updatedRow = prevState.find(row => row.id === rowId);
      updatedRow[column] = newValue;
      return [...prevState];
    });
  };

  const handleSaveTableData = async () => {
    event.preventDefault();
      console.log(tableData);
   
  };

  return (
    <div className="container mx-auto ">
      <table className="border-collapse border border-gray-600">
>>>>>>> 9346c4296420f80a7de36a5863d6d1f94c71db5a
        <thead>
          <tr>
            {headings.map(heading => (
              <th
                key={heading}
<<<<<<< HEAD
                className="border border-black font-semibold"
=======
                className="border border-gray-600 px-4 py-2 font-semibold"
>>>>>>> 9346c4296420f80a7de36a5863d6d1f94c71db5a
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
<<<<<<< HEAD
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

=======
          {tableData.map(row => (
            <tr key={row.id}>
              <td className="border border-gray-600 px-4 py-2">
                <input
                  type="text"
                  value={row.column1}
                  className="w-full border-0 focus:outline-none"
                  onChange={e => handleCellChange(e, row.id, 'column1')}
                />
              </td>
              <td className="border border-gray-600 px-4 py-2">
                <input
                  type="text"
                  value={row.column2}
                  className="w-full border-0 focus:outline-none"
                  onChange={e => handleCellChange(e, row.id, 'column2')}
                />
              </td>
              <td className="border border-gray-600 px-4 py-2">
                <input
                  type="text"
                  value={row.column3}
                  className="w-full border-0 focus:outline-none"
                  onChange={e => handleCellChange(e, row.id, 'column3')}
                />
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={3} className="border border-gray-600 px-4 py-2">
              <button
                className="bg-green hover:bg-green text-white font-bold py-2 px-4 rounded"
                onClick={handleAddRow}
              >
                Add Row
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="mt-4">
        <button
          className="bg-green hover:bg-green text-white font-bold py-2 px-4 rounded mr-4"
          onClick={handleSaveTableData}
        >
          Save Table Data
        </button>
        <button className="bg-bred hover:bg-red text-white font-bold py-2 px-4 rounded">
          Cancel
        </button>
      </div>
>>>>>>> 9346c4296420f80a7de36a5863d6d1f94c71db5a
    </div>
  );
};

export default MyTable;
