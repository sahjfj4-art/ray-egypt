import React from 'react';
import { Table, Button, Badge } from 'react-bootstrap';

interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: any) => React.ReactNode;
}

interface BootstrapTableProps {
  columns: TableColumn[];
  data: any[];
  striped?: boolean;
  bordered?: boolean;
  hover?: boolean;
  responsive?: boolean;
  className?: string;
  onRowClick?: (row: any) => void;
}

const BootstrapTable: React.FC<BootstrapTableProps> = ({
  columns,
  data,
  striped = true,
  bordered = false,
  hover = true,
  responsive = true,
  className = '',
  onRowClick
}) => {
  return (
    <Table 
      striped={striped}
      bordered={bordered}
      hover={hover}
      responsive={responsive}
      className={className}
    >
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key}>
              {column.label}
              {column.sortable && (
                <span className="ms-1">⇅</span>
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr 
            key={index}
            onClick={() => onRowClick?.(row)}
            style={{ cursor: onRowClick ? 'pointer' : 'default' }}
          >
            {columns.map((column) => (
              <td key={column.key}>
                {column.render ? 
                  column.render(row[column.key], row) : 
                  row[column.key]
                }
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default BootstrapTable;
