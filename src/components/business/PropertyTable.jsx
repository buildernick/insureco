import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  Tag,
  Button,
} from '@carbon/react';
import { View } from '@carbon/icons-react';
import { formatCurrency, getStatusTagType } from '../../utils/businessHelpers';
import './PropertyTable.scss';

/**
 * PropertyTable - Reusable table component for displaying properties
 * @param {Array} properties - Array of property objects
 * @param {boolean} compact - Whether to show compact view (fewer rows)
 * @param {number} maxRows - Maximum number of rows to display
 */
export default function PropertyTable({ properties, compact = false, maxRows }) {
  const navigate = useNavigate();

  const headers = [
    { key: 'name', header: 'Property Name' },
    { key: 'address', header: 'Address' },
    { key: 'monthlyPremium', header: 'Monthly Premium' },
    { key: 'claimsCount', header: 'Claims' },
    { key: 'status', header: 'Status' },
  ];

  // Limit rows if maxRows is specified or compact mode
  const displayProperties = maxRows 
    ? properties.slice(0, maxRows)
    : compact 
    ? properties.slice(0, 5) 
    : properties;

  // Convert properties to row format for DataTable
  const rows = displayProperties.map(property => ({
    id: property.id,
    name: property.name,
    address: property.address,
    monthlyPremium: formatCurrency(property.monthlyPremium),
    claimsCount: `${property.claimsCount} (${property.openClaims} open)`,
    status: property.status,
  }));

  const handleRowClick = (propertyId) => {
    navigate(`/business/properties/${propertyId}`);
  };

  return (
    <div className="property-table">
      <DataTable rows={rows} headers={headers} isSortable>
        {({ rows, headers, getHeaderProps, getRowProps, getTableProps }) => (
          <Table {...getTableProps()}>
            <TableHead>
              <TableRow>
                {headers.map((header) => {
                  const { key, ...headerProps } = getHeaderProps({ header });
                  return (
                    <TableHeader key={key} {...headerProps}>
                      {header.header}
                    </TableHeader>
                  );
                })}
                <TableHeader>Actions</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => {
                const { key, ...rowProps } = getRowProps({ row });
                return (
                  <TableRow
                    key={key}
                    {...rowProps}
                    onClick={() => handleRowClick(row.id)}
                    className="clickable-row"
                  >
                    {row.cells.map((cell) => (
                      <TableCell key={cell.id}>
                        {cell.info.header === 'status' ? (
                          <Tag type={getStatusTagType(cell.value, 'asset')}>
                            {cell.value}
                          </Tag>
                        ) : (
                          cell.value
                        )}
                      </TableCell>
                    ))}
                    <TableCell>
                      <Button
                        kind="ghost"
                        size="sm"
                        renderIcon={View}
                        iconDescription="View details"
                        hasIconOnly
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRowClick(row.id);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </DataTable>
    </div>
  );
}
