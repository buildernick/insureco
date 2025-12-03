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
import { formatCurrency, formatMileage, formatVehicleName, getStatusTagType } from '../../utils/businessHelpers';
import './FleetTable.scss';

/**
 * FleetTable - Reusable table component for displaying fleet vehicles
 * @param {Array} vehicles - Array of vehicle objects
 * @param {boolean} compact - Whether to show compact view (fewer rows)
 * @param {number} maxRows - Maximum number of rows to display
 */
export default function FleetTable({ vehicles, compact = false, maxRows }) {
  const navigate = useNavigate();

  const headers = [
    { key: 'vehicle', header: 'Vehicle' },
    { key: 'licensePlate', header: 'License Plate' },
    { key: 'currentMileage', header: 'Mileage' },
    { key: 'monthlyPremium', header: 'Monthly Premium' },
    { key: 'claimsCount', header: 'Claims' },
    { key: 'status', header: 'Status' },
  ];

  // Limit rows if maxRows is specified or compact mode
  const displayVehicles = maxRows 
    ? vehicles.slice(0, maxRows)
    : compact 
    ? vehicles.slice(0, 5) 
    : vehicles;

  // Convert vehicles to row format for DataTable
  const rows = displayVehicles.map(vehicle => ({
    id: vehicle.id,
    vehicle: formatVehicleName(vehicle),
    licensePlate: vehicle.licensePlate,
    currentMileage: formatMileage(vehicle.currentMileage, false),
    monthlyPremium: formatCurrency(vehicle.monthlyPremium),
    claimsCount: `${vehicle.claimsCount} (${vehicle.openClaims} open)`,
    status: vehicle.status,
  }));

  const handleRowClick = (vehicleId) => {
    navigate(`/business/fleet/${vehicleId}`);
  };

  return (
    <div className="fleet-table">
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
