import React from 'react';

interface TableProps {
  tableName: string;
  dataHeaders?: string[];
  data2?: { name: string; value: string }[];
}

const TableComponent: React.FC<TableProps> = ({ tableName, data2, dataHeaders = [] }) => {
  return (
    <div className="min-h-full min-w-full flex flex-col items-center justify-center p-4 grow">
      <div className="bg-blue-200 text-black p-4 grow min-w-full">
        <h2 className="text-xl font-bold text-center p-4 border-b">{tableName}</h2>
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-200">
              {dataHeaders?.map((header, index) => (
                <th key={index} className="py-2 px-4 border-b">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data2?.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-500">
                <td className="py-2 px-4">{item.name}</td>
                <td className="py-2 px-4">{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableComponent;
