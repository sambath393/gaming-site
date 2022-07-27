import React from 'react';

const TableDefualt = ({ children, defaultStyle, showHeader, columns, dataSource }) => {
  // check children
  return children ? (
    <table className={`${defaultStyle}`}>{children}</table>
  ) : (
    <table className={`${defaultStyle}`}>
      {
        // check show header
        showHeader && (
          <thead>
            <tr>
              {columns &&
                columns.map((load) => {
                  return (
                    <th key={load.key} width={load.width}>
                      {load.title}
                    </th>
                  );
                })}
            </tr>
          </thead>
        )
      }
      <tbody>
        {
          // loop rows
          dataSource &&
            dataSource.map((load) => {
              return (
                <tr key={load.id}>
                  {/* loop columns */}
                  {columns.map((col) => {
                    // check data in dataSource
                    return (
                      load[col.key] && (
                        <td key={col.key} className='px-2 py-3' width={col.width}>
                          {load[col.key]}
                        </td>
                      )
                    );
                  })}
                </tr>
              );
            })
        }
      </tbody>
    </table>
  );
};

export default function Table({ type, children, columns, dataSource, showHeader = true }) {
  const defaultStyle = 'w-full';

  const props = {
    defaultStyle,
    type,
    children,
    columns,
    dataSource,
    showHeader,
  };

  switch (type) {
    default:
      return TableDefualt(props);
  }
}
