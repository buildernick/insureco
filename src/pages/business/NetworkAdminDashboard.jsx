import React, { useState } from 'react';
import {
  Grid,
  Column,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableToolbar,
  TableToolbarContent,
  TableContainer,
  Pagination,
  Search,
  InlineNotification,
} from '@carbon/react';
import { AreaChart, GaugeChart } from '@carbon/charts-react';
import { Launch, Add } from '@carbon/icons-react';
import '@carbon/charts/styles.css';
import './NetworkAdminDashboard.scss';

const areaChartData = [
  { group: 'Network Traffic', date: new Date('2024-01-01').getTime(), value: 65 },
  { group: 'Network Traffic', date: new Date('2024-01-02').getTime(), value: 29 },
  { group: 'Network Traffic', date: new Date('2024-01-03').getTime(), value: 72 },
  { group: 'Network Traffic', date: new Date('2024-01-04').getTime(), value: 85 },
  { group: 'Network Traffic', date: new Date('2024-01-05').getTime(), value: 40 },
  { group: 'Network Traffic', date: new Date('2024-01-06').getTime(), value: 38 },
  { group: 'Network Traffic', date: new Date('2024-01-07').getTime(), value: 78 },
  { group: 'Network Traffic', date: new Date('2024-01-08').getTime(), value: 90 },
  { group: 'Network Traffic', date: new Date('2024-01-09').getTime(), value: 55 },
  { group: 'Network Traffic', date: new Date('2024-01-10').getTime(), value: 20 },
];

const areaChartOptions = {
  title: 'Network Traffic',
  axes: {
    left: { title: 'Info', mapsTo: 'value' },
    bottom: { title: 'Info', mapsTo: 'date', scaleType: 'time' },
  },
  curve: 'curveNatural',
  height: '300px',
  color: {
    scale: { 'Network Traffic': '#6929C4' },
  },
  legend: { enabled: true },
};

const gaugeChartData = [
  { group: 'value', value: 42 },
  { group: 'delta', value: -13.37 },
];

const gaugeChartOptions = {
  title: 'Credit Usage',
  resizable: true,
  height: '300px',
  gauge: {
    type: 'semi',
    status: 'danger',
  },
  color: {
    scale: { value: '#6929C4' },
  },
  legend: { enabled: false },
};

const deviceHeaders = [
  { key: 'name', header: 'Device Name' },
  { key: 'type', header: 'Type' },
  { key: 'ip', header: 'IP Address' },
  { key: 'mac', header: 'MAC Address' },
  { key: 'status', header: 'Status' },
  { key: 'os', header: 'OS' },
  { key: 'lastSeen', header: 'Last Seen' },
  { key: 'location', header: 'Location' },
];

const deviceRows = [
  { id: '1', name: 'Router-Main', type: 'Router', ip: '192.168.1.1', mac: 'AA:BB:CC:DD:EE:01', status: 'Online', os: 'RouterOS', lastSeen: '2024-01-10 09:00', location: 'Main Office' },
  { id: '2', name: 'Switch-01', type: 'Switch', ip: '192.168.1.2', mac: 'AA:BB:CC:DD:EE:02', status: 'Online', os: 'SwitchOS', lastSeen: '2024-01-10 09:00', location: 'Server Room' },
  { id: '3', name: 'Workstation-A', type: 'PC', ip: '192.168.1.10', mac: 'AA:BB:CC:DD:EE:03', status: 'Online', os: 'Windows 11', lastSeen: '2024-01-10 08:55', location: 'Floor 1' },
  { id: '4', name: 'Laptop-B', type: 'Laptop', ip: '192.168.1.11', mac: 'AA:BB:CC:DD:EE:04', status: 'Offline', os: 'macOS 14', lastSeen: '2024-01-09 17:30', location: 'Floor 2' },
  { id: '5', name: 'Printer-01', type: 'Printer', ip: '192.168.1.20', mac: 'AA:BB:CC:DD:EE:05', status: 'Online', os: 'Firmware', lastSeen: '2024-01-10 08:00', location: 'Reception' },
];

export default function NetworkAdminDashboard() {
  const [warningDismissed, setWarningDismissed] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filteredRows = deviceRows.filter((row) =>
    Object.values(row).some((val) =>
      String(val).toLowerCase().includes(searchValue.toLowerCase())
    )
  );

  return (
    <div className="network-admin-dashboard">
      {/* Page Header */}
      <div className="page-header">
        <Breadcrumb noTrailingSlash>
          <BreadcrumbItem href="#">Service</BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>Administrative Dashboard</BreadcrumbItem>
        </Breadcrumb>

        <div className="header-title-row">
          <div className="header-text">
            <h1 className="page-title">Network Adminstration Dashboard</h1>
            <p className="page-description">Network Traffic, Credit Usage, and Your Devices</p>
          </div>
          <Button
            kind="primary"
            renderIcon={Launch}
            className="refresh-btn"
          >
            Refresh Data
          </Button>
        </div>

        <div className="header-controls">
          <div className="search-wrapper">
            <Search
              placeholder="Placeholder"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              labelText="Search devices"
              size="md"
            />
          </div>
          <div className="pagination-controls">
            <button className="page-btn page-btn--disabled" disabled aria-label="Previous page">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M10 1L11.2845 2.28446L5.56964 8L11.2845 13.7155L10 15L3 8L10 1Z" fill="currentColor"/></svg>
            </button>
            {[1,2,3,4,5].map((num) => (
              <button
                key={num}
                className={`page-btn${currentPage === num ? ' page-btn--active' : ''}`}
                onClick={() => setCurrentPage(num)}
                aria-label={`Page ${num}`}
              >
                {num}
              </button>
            ))}
            <button className="page-btn" aria-label="Next page" onClick={() => setCurrentPage(Math.min(5, currentPage + 1))}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M5.28442 1L3.99996 2.28446L9.71478 8L3.99996 13.7155L5.28442 15L12.2844 8L5.28442 1Z" fill="currentColor"/></svg>
            </button>
            <div className="page-divider" />
            <button className="page-settings-btn" aria-label="Page settings">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6.84866 0.0820535C7.60663 -0.0273512 8.37681 -0.0273512 9.13479 0.0820535C9.58595 0.147223 9.93551 0.509791 9.98537 0.962913C10.0235 1.30784 10.2491 1.60365 10.5713 1.73244C10.8937 1.86119 11.2611 1.80198 11.5264 1.57815C11.8812 1.27855 12.3959 1.26205 12.7686 1.53908C13.3944 2.0045 13.9487 2.55971 14.4141 3.18557C14.6889 3.5554 14.6758 4.06509 14.3819 4.41994C14.1573 4.69108 14.103 5.06494 14.2412 5.38869C14.3793 5.73418 14.6761 5.96008 15.0215 5.99807C15.4744 6.04806 15.8361 6.3977 15.9014 6.84866C16.0108 7.60663 16.0108 8.37681 15.9014 9.13479C15.8351 9.59329 15.4624 9.94582 15.001 9.98733C14.6535 10.0187 14.352 10.2404 14.2178 10.5625C14.0837 10.8846 14.1389 11.2547 14.3614 11.5235C14.6554 11.8784 14.6696 12.3889 14.3946 12.7588C13.9291 13.3847 13.3739 13.9389 12.7481 14.4043C12.3799 14.6778 11.8734 14.6656 11.5186 14.375C11.2504 14.1553 10.8827 14.1016 10.5625 14.2344C10.2424 14.3671 10.0215 14.665 9.98733 15.0098C9.9421 15.4676 9.59005 15.8356 9.13479 15.9014C8.37681 16.0108 7.60663 16.0108 6.84866 15.9014C6.39025 15.8351 6.03761 15.4623 5.99612 15.001C5.96472 14.6535 5.74305 14.3519 5.42092 14.2178C5.09881 14.0837 4.72873 14.1389 4.45998 14.3614C4.10506 14.6554 3.59451 14.6696 3.22463 14.3946C2.59883 13.9292 2.0445 13.3739 1.57912 12.7481C1.3057 12.38 1.31791 11.8734 1.60842 11.5186C1.82809 11.2504 1.88179 10.8827 1.74905 10.5625C1.61631 10.2424 1.31852 10.0215 0.973655 9.98733C0.515873 9.9421 0.147816 9.59006 0.0820535 9.13479C-0.0273512 8.37681 -0.0273512 7.60663 0.0820535 6.84866C0.148058 6.39232 0.517573 6.04002 0.976585 5.99612C1.32437 5.96287 1.62465 5.73943 1.75686 5.41604C1.88902 5.09267 1.83134 4.72244 1.60647 4.4551C1.30822 4.10026 1.29273 3.58685 1.56936 3.21487C2.03472 2.58911 2.58911 2.03472 3.21487 1.56936C3.58685 1.29273 4.10026 1.30822 4.4551 1.60647C4.72244 1.83134 5.09267 1.88902 5.41604 1.75686C5.73943 1.62465 5.96287 1.32437 5.99612 0.976585C6.04002 0.517573 6.39232 0.148058 6.84866 0.0820535Z" fill="currentColor"/></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Warning Banner */}
      {!warningDismissed && (
        <div className="warning-banner">
          <div className="warning-content">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.12497 5.64703V8.78428M8.12497 10.6666H8.13125M14.3995 7.99997C14.3995 11.4653 11.5903 14.2745 8.12497 14.2745C4.65966 14.2745 1.85046 11.4653 1.85046 7.99997C1.85046 4.53466 4.65966 1.72546 8.12497 1.72546C11.5903 1.72546 14.3995 4.53466 14.3995 7.99997Z" stroke="#946C00" strokeWidth="1.88235" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="warning-text">This is a warning message</span>
          </div>
          <button
            className="warning-dismiss"
            onClick={() => setWarningDismissed(true)}
            aria-label="Dismiss warning"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Charts Section */}
      <div className="charts-section">
        <div className="chart-card">
          <AreaChart data={areaChartData} options={areaChartOptions} />
        </div>
        <div className="chart-card">
          <GaugeChart data={gaugeChartData} options={gaugeChartOptions} />
        </div>
      </div>

      {/* My Devices Section */}
      <div className="devices-section">
        <div className="devices-header">
          <div className="devices-title-group">
            <h2 className="devices-title">My Devices</h2>
            <p className="devices-description">Devices on your local network</p>
          </div>
          <Button kind="primary" renderIcon={Launch}>
            Add Device
          </Button>
        </div>

        <DataTable rows={filteredRows} headers={deviceHeaders}>
          {({ rows, headers, getHeaderProps, getRowProps, getTableProps, getTableContainerProps }) => (
            <TableContainer
              title="Title"
              description="Description"
              {...getTableContainerProps()}
            >
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
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => {
                    const { key, ...rowProps } = getRowProps({ row });
                    return (
                      <TableRow key={key} {...rowProps}>
                        {row.cells.map((cell) => (
                          <TableCell key={cell.id}>
                            {cell.info.header === 'status' ? (
                              <span className={`device-status device-status--${cell.value.toLowerCase()}`}>
                                {cell.value}
                              </span>
                            ) : (
                              cell.value
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DataTable>

        <Pagination
          totalItems={filteredRows.length}
          pageSize={pageSize}
          pageSizes={[10, 20, 50]}
          page={currentPage}
          onChange={({ page, pageSize: ps }) => {
            setCurrentPage(page);
            setPageSize(ps);
          }}
        />
      </div>
    </div>
  );
}
