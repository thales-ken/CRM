import React from 'react';

interface TableProps {
  headers: string[];
  rows: (string | number | React.ReactNode)[][];
  onRowClick?: (index: number) => void;
  isMobile?: boolean;
}

const DataTable: React.FC<TableProps> = ({ headers, rows, onRowClick, isMobile = false }) => {
  if (isMobile) {
    return (
      <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {rows.map((row, rowIdx) => (
          <div
            key={rowIdx}
            onClick={() => onRowClick?.(rowIdx)}
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '1rem',
              cursor: onRowClick ? 'pointer' : 'default',
              transition: 'background 0.2s, box-shadow 0.2s',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
            onMouseEnter={(e) => {
              if (onRowClick) {
                (e.currentTarget as HTMLDivElement).style.background = 'var(--bg-secondary)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 6px rgba(0,0,0,0.15)';
              }
            }}
            onMouseLeave={(e) => {
              if (onRowClick) {
                (e.currentTarget as HTMLDivElement).style.background = 'var(--bg-secondary)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
              }
            }}
          >
            {row.map((cell, cellIdx) => (
              <div key={cellIdx} style={{ marginBottom: cellIdx === row.length - 1 ? 0 : '0.75rem' }}>
                <div style={{
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  color: 'var(--text-secondary)',
                  marginBottom: '0.25rem',
                  textTransform: 'uppercase',
                }}>
                  {headers[cellIdx]}
                </div>
                <div style={{
                  color: 'var(--text-primary)',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                }}>
                  {cell}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div style={{ overflowX: 'auto', marginTop: '1rem', borderRadius: '8px' }}>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
      }}>
        <thead>
          <tr style={{ background: 'var(--bg-secondary)', borderBottom: '2px solid var(--border)' }}>
            {headers.map((header, idx) => (
              <th key={idx} style={{
                padding: 'clamp(0.5rem, 1.5vw, 1rem)',
                textAlign: 'left',
                fontWeight: '600',
                color: 'var(--text-primary)',
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
                borderBottom: '1px solid var(--border)',
                cursor: onRowClick ? 'pointer' : 'default',
                background: 'var(--bg-secondary)',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => {
                if (onRowClick) (e.currentTarget as HTMLTableRowElement).style.background = 'var(--bg-secondary)';
              }}
              onMouseLeave={(e) => {
                if (onRowClick) (e.currentTarget as HTMLTableRowElement).style.background = 'var(--bg-primary)';
              }}
            >
              {row.map((cell, cellIdx) => (
                <td key={cellIdx} style={{
                  padding: 'clamp(0.5rem, 1.5vw, 1rem)',
                  color: 'var(--text-primary)',
                  wordBreak: 'break-word',
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
};

export default DataTable;