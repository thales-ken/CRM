import React from 'react';

interface TableProps {
  headers: string[];
  rows: (string | number)[][];
  onRowClick?: (index: number) => void;
}

const DataTable: React.FC<TableProps> = ({ headers, rows, onRowClick }) => (
  <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
    <table style={{
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: '0.875rem',
    }}>
      <thead>
        <tr style={{ background: '#f5f5f5', borderBottom: '2px solid #e0e0e0' }}>
          {headers.map((header, idx) => (
            <th key={idx} style={{
              padding: '1rem',
              textAlign: 'left',
              fontWeight: '600',
              color: '#333',
            }}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIdx) => (
          <tr
            key={rowIdx}
            onClick={() => onRowClick?.(rowIdx)}
            style={{
              borderBottom: '1px solid #e0e0e0',
              cursor: onRowClick ? 'pointer' : 'default',
              background: onRowClick ? '#fafafa' : 'white',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => {
              if (onRowClick) (e.currentTarget as HTMLTableRowElement).style.background = '#f0f0f0';
            }}
            onMouseLeave={(e) => {
              if (onRowClick) (e.currentTarget as HTMLTableRowElement).style.background = '#fafafa';
            }}
          >
            {row.map((cell, cellIdx) => (
              <td key={cellIdx} style={{
                padding: '1rem',
                color: '#333',
              }}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default DataTable;
