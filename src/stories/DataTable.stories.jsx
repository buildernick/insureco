import React, { useState, useMemo } from 'react';
import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableContainer,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
  Dropdown,
} from '@carbon/react';

const headers = [
  { key: 'name', header: 'Name' },
  { key: 'protocol', header: 'Protocol' },
  { key: 'port', header: 'Port' },
  { key: 'rule', header: 'Rule' },
];

const rows = [
  { id: '1', name: 'Load Balancer 1', protocol: 'HTTP', port: 80, rule: 'Round robin' },
  { id: '2', name: 'Load Balancer 2', protocol: 'HTTPS', port: 443, rule: 'Round robin' },
  { id: '3', name: 'Load Balancer 3', protocol: 'HTTP', port: 8080, rule: 'Least connections' },
  { id: '4', name: 'Load Balancer 4', protocol: 'TCP', port: 3306, rule: 'Source IP hash' },
];

export default {
  title: 'Components/DataTable',
  component: DataTable,
};

export const Default = () => (
  <div style={{ padding: '2rem' }}>
    <h3>Data Table</h3>
    <DataTable rows={rows} headers={headers}>
      {({ rows, headers, getTableProps, getHeaderProps, getRowProps }) => (
        <Table {...getTableProps()}>
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableHeader {...getHeaderProps({ header })} key={header.key}>
                  {header.header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow {...getRowProps({ row })} key={row.id}>
                {row.cells.map((cell) => (
                  <TableCell key={cell.id}>{cell.value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </DataTable>
  </div>
);

const protocolFilterItems = [
  { id: 'all', label: 'All protocols' },
  { id: 'HTTP', label: 'HTTP' },
  { id: 'HTTPS', label: 'HTTPS' },
  { id: 'TCP', label: 'TCP' },
];

export const WithFilteringAndSorting = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProtocol, setSelectedProtocol] = useState(protocolFilterItems[0]);

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      const matchesSearch =
        searchQuery === '' ||
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
        );
      const matchesProtocol =
        selectedProtocol.id === 'all' || row.protocol === selectedProtocol.id;
      return matchesSearch && matchesProtocol;
    });
  }, [searchQuery, selectedProtocol]);

  return (
    <div style={{ padding: '2rem' }}>
      <DataTable rows={filteredRows} headers={headers} isSortable>
        {({ rows, headers, getTableProps, getHeaderProps, getRowProps, getToolbarProps }) => (
          <TableContainer title="Load Balancers" description="Filter and sort the table using the controls below.">
            <TableToolbar {...getToolbarProps()} aria-label="data table toolbar">
              <TableToolbarContent>
                <TableToolbarSearch
                  placeholder="Search all columns…"
                  onChange={(e) => setSearchQuery(e.target.value)}
                  value={searchQuery}
                  persistent
                />
                <Dropdown
                  id="protocol-filter"
                  titleText=""
                  label="Filter by protocol"
                  items={protocolFilterItems}
                  itemToString={(item) => (item ? item.label : '')}
                  selectedItem={selectedProtocol}
                  onChange={({ selectedItem }) => setSelectedProtocol(selectedItem)}
                  size="md"
                />
              </TableToolbarContent>
            </TableToolbar>
            <Table {...getTableProps()} aria-label="load balancers table">
              <TableHead>
                <TableRow>
                  {headers.map((header) => (
                    <TableHeader {...getHeaderProps({ header })} key={header.key} isSortable>
                      {header.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.length > 0 ? (
                  rows.map((row) => (
                    <TableRow {...getRowProps({ row })} key={row.id}>
                      {row.cells.map((cell) => (
                        <TableCell key={cell.id}>{cell.value}</TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={headers.length} style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                      No results match your filter criteria.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DataTable>
    </div>
  );
};

WithFilteringAndSorting.storyName = 'With Filtering & Sorting';

export const Compact = () => (
  <div style={{ padding: '2rem' }}>
    <h3>Compact Table</h3>
    <DataTable rows={rows} headers={headers} size="xs">
      {({ rows, headers, getTableProps, getHeaderProps, getRowProps }) => (
        <Table {...getTableProps()} size="xs">
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableHeader {...getHeaderProps({ header })} key={header.key}>
                  {header.header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow {...getRowProps({ row })} key={row.id}>
                {row.cells.map((cell) => (
                  <TableCell key={cell.id}>{cell.value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </DataTable>
  </div>
);
