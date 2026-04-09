import React, { useState } from 'react';
import {
  Button,
  Search,
  Breadcrumb,
  BreadcrumbItem,
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  Pagination,
} from '@carbon/react';
import { Launch, Add } from '@carbon/icons-react';
import { AreaChart, StackedBarChart } from '@carbon/charts-react';
import '@carbon/charts/styles.css';
import { useTheme } from '../contexts/ThemeContext';
import './NetworkDashboard.scss';

// ─── Chart Data (module-level constants – no theme dependency) ───────────────

const areaChartData = [
  { group: 'Network Traffic', key: 'Jan', value: 18000 },
  { group: 'Network Traffic', key: 'Feb', value: 55000 },
  { group: 'Network Traffic', key: 'Mar', value: 72000 },
  { group: 'Network Traffic', key: 'Apr', value: 30000 },
  { group: 'Network Traffic', key: 'May', value: 80000 },
  { group: 'Network Traffic', key: 'Jun', value: 78000 },
  { group: 'Network Traffic', key: 'Jul', value: 12000 },
  { group: 'Network Traffic', key: 'Aug', value: 14000 },
  { group: 'Network Traffic', key: 'Sep', value: 55000 },
  { group: 'Network Traffic', key: 'Oct', value: 40000 },
];

const stackedBarData = [
  { group: 'Downloads', key: 'Jan', value: 30 },
  { group: 'Downloads', key: 'Feb', value: 25 },
  { group: 'Downloads', key: 'Mar', value: 28 },
  { group: 'Downloads', key: 'Apr', value: 32 },
  { group: 'Downloads', key: 'May', value: 26 },
  { group: 'Downloads', key: 'Jun', value: 30 },
  { group: 'Downloads', key: 'Jul', value: 24 },
  { group: 'Downloads', key: 'Aug', value: 29 },
  { group: 'Downloads', key: 'Sep', value: 31 },
  { group: 'Downloads', key: 'Oct', value: 27 },
  { group: 'Uploads', key: 'Jan', value: 20 },
  { group: 'Uploads', key: 'Feb', value: 18 },
  { group: 'Uploads', key: 'Mar', value: 22 },
  { group: 'Uploads', key: 'Apr', value: 19 },
  { group: 'Uploads', key: 'May', value: 21 },
  { group: 'Uploads', key: 'Jun', value: 23 },
  { group: 'Uploads', key: 'Jul', value: 17 },
  { group: 'Uploads', key: 'Aug', value: 20 },
  { group: 'Uploads', key: 'Sep', value: 22 },
  { group: 'Uploads', key: 'Oct', value: 18 },
  { group: 'Streaming', key: 'Jan', value: 15 },
  { group: 'Streaming', key: 'Feb', value: 20 },
  { group: 'Streaming', key: 'Mar', value: 18 },
  { group: 'Streaming', key: 'Apr', value: 22 },
  { group: 'Streaming', key: 'May', value: 16 },
  { group: 'Streaming', key: 'Jun', value: 19 },
  { group: 'Streaming', key: 'Jul', value: 21 },
  { group: 'Streaming', key: 'Aug', value: 14 },
  { group: 'Streaming', key: 'Sep', value: 18 },
  { group: 'Streaming', key: 'Oct', value: 20 },
  { group: 'Gaming', key: 'Jan', value: 10 },
  { group: 'Gaming', key: 'Feb', value: 14 },
  { group: 'Gaming', key: 'Mar', value: 12 },
  { group: 'Gaming', key: 'Apr', value: 9 },
  { group: 'Gaming', key: 'May', value: 13 },
  { group: 'Gaming', key: 'Jun', value: 11 },
  { group: 'Gaming', key: 'Jul', value: 15 },
  { group: 'Gaming', key: 'Aug', value: 12 },
  { group: 'Gaming', key: 'Sep', value: 10 },
  { group: 'Gaming', key: 'Oct', value: 14 },
  { group: 'Other', key: 'Jan', value: 8 },
  { group: 'Other', key: 'Feb', value: 6 },
  { group: 'Other', key: 'Mar', value: 9 },
  { group: 'Other', key: 'Apr', value: 7 },
  { group: 'Other', key: 'May', value: 10 },
  { group: 'Other', key: 'Jun', value: 8 },
  { group: 'Other', key: 'Jul', value: 6 },
  { group: 'Other', key: 'Aug', value: 11 },
  { group: 'Other', key: 'Sep', value: 7 },
  { group: 'Other', key: 'Oct', value: 9 },
];

const meterSegments = [
  { group: 'Downloads', value: 300 },
  { group: 'Uploads', value: 200 },
  { group: 'Streaming', value: 250 },
  { group: 'Gaming', value: 150 },
  { group: 'Other', value: 100 },
];

// ─── Device Table Data ────────────────────────────────────────────────────────

const tableHeaders = [
  { key: 'name',         header: 'Device Name' },
  { key: 'ip',           header: 'IP Address' },
  { key: 'mac',          header: 'MAC Address' },
  { key: 'type',         header: 'Type' },
  { key: 'manufacturer', header: 'Manufacturer' },
  { key: 'status',       header: 'Status' },
  { key: 'lastSeen',     header: 'Last Seen' },
  { key: 'traffic',      header: 'Traffic (MB)' },
];

const generateDevices = () =>
  Array.from({ length: 10 }, (_, i) => ({
    id: `device-${i + 1}`,
    name: `Device-${String(i + 1).padStart(3, '0')}`,
    ip: `192.168.1.${10 + i}`,
    mac: `AA:BB:CC:DD:EE:${String(i + 10).padStart(2, '0')}`,
    type: ['Laptop', 'Phone', 'Tablet', 'Smart TV', 'Router', 'IoT', 'Desktop', 'Printer'][i % 8],
    manufacturer: ['Apple', 'Samsung', 'Dell', 'HP', 'Sony', 'Cisco', 'Lenovo', 'LG'][i % 8],
    status: i % 3 === 2 ? 'Offline' : 'Online',
    lastSeen: i % 3 === 2 ? '2 hours ago' : 'Just now',
    traffic: String((Math.floor(Math.random() * 900) + 100)),
  }));

const allDevices = generateDevices();

// ─── Meter color palette matching design ─────────────────────────────────────

const METER_COLORS = ['#6929C4', '#1192E8', '#005D5D', '#9F1853', '#570408'];

export default function NetworkDashboard() {
  const { theme } = useTheme();
  const chartTheme = theme === 'g90' || theme === 'g100' ? 'g100' : 'white';

  const [warningDismissed, setWarningDismissed] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // ─── Chart options (inside component to access chartTheme hook value) ───────

  const areaChartOptions = {
    title: 'Network Traffic',
    theme: chartTheme,
    height: '340px',
    curve: 'curveMonotoneX',
    axes: {
      bottom: { title: 'Month', mapsTo: 'key', scaleType: 'labels' },
      left:   { title: 'Bytes (KB)', mapsTo: 'value', scaleType: 'linear' },
    },
    color: { scale: { 'Network Traffic': '#6929C4' } },
  };

  const stackedBarOptions = {
    title: 'Traffic Breakdown',
    theme: chartTheme,
    height: '340px',
    axes: {
      bottom: { title: 'Month', mapsTo: 'key', scaleType: 'labels' },
      left:   { title: 'Usage (%)',  mapsTo: 'value', scaleType: 'linear' },
    },
    color: {
      scale: {
        Downloads: '#6929C4',
        Uploads:   '#1192E8',
        Streaming: '#005D5D',
        Gaming:    '#9F1853',
        Other:     '#570408',
      },
    },
  };

  // ─── Filtered + paginated rows ────────────────────────────────────────────

  const filteredDevices = allDevices.filter(
    (d) =>
      searchValue === '' ||
      Object.values(d).some((v) =>
        String(v).toLowerCase().includes(searchValue.toLowerCase())
      )
  );
  const totalItems   = filteredDevices.length;
  const displayedRows = filteredDevices.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <div className="network-dashboard">

      {/* ─── Breadcrumb ─────────────────────────────────────────────────── */}
      <div className="network-dashboard__breadcrumb-wrapper">
        <Breadcrumb>
          <BreadcrumbItem href="#">Service</BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>Administrative Dashboard</BreadcrumbItem>
        </Breadcrumb>
      </div>

      {/* ─── Page Header ─────────────────────────────────────────────────── */}
      <div className="network-dashboard__page-header">
        <div className="network-dashboard__page-title-group">
          <h1 className="network-dashboard__page-title">
            Network Administration Dashboard
          </h1>
          <p className="network-dashboard__page-description">
            Network Traffic, Credit Usage, and Your Devices
          </p>
        </div>
        <Button
          kind="primary"
          renderIcon={Launch}
          className="network-dashboard__refresh-btn"
        >
          Refresh Data
        </Button>
      </div>

      {/* ─── Search + Pagination Bar ─────────────────────────────────────── */}
      <div className="network-dashboard__filter-bar">
        <div className="network-dashboard__search-wrapper">
          <Search
            labelText="Search"
            placeholder="Placeholder"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              setPage(1);
            }}
            size="sm"
          />
        </div>
        <div className="network-dashboard__pagination-compact">
          {[2, 3, 4, 5].map((n) => (
            <button
              key={n}
              className={`network-dashboard__page-btn ${page === n ? 'network-dashboard__page-btn--active' : ''}`}
              onClick={() => setPage(n)}
            >
              {n}
            </button>
          ))}
          <button className="network-dashboard__page-btn network-dashboard__page-btn--arrow">›</button>
        </div>
      </div>

      {/* ─── Warning Banner ──────────────────────────────────────────────── */}
      {!warningDismissed && (
        <div className="network-dashboard__alert-banner">
          <div className="network-dashboard__alert-inner">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="network-dashboard__alert-icon">
              <g clipPath="url(#clip0)">
                <path d="M8.125 5.647V8.784M8.125 10.667H8.131M14.4 8c0 3.465-2.81 6.275-6.275 6.275C4.66 14.275 1.85 11.465 1.85 8S4.66 1.725 8.125 1.725 14.4 4.535 14.4 8Z" stroke="#946C00" strokeWidth="1.882" strokeLinecap="round" strokeLinejoin="round"/>
              </g>
              <defs><clipPath id="clip0"><rect width="16" height="16" fill="white"/></clipPath></defs>
            </svg>
            <span className="network-dashboard__alert-text">This is a warning message</span>
          </div>
          <button
            className="network-dashboard__alert-dismiss"
            onClick={() => setWarningDismissed(true)}
          >
            Dismiss
          </button>
        </div>
      )}

      {/* ─── Charts Row ──────────────────────────────────────────────────── */}
      <div className="network-dashboard__charts-row">
        <div className="network-dashboard__chart-card">
          <AreaChart data={areaChartData} options={areaChartOptions} />
        </div>
        <div className="network-dashboard__chart-card">
          <StackedBarChart data={stackedBarData} options={stackedBarOptions} />
        </div>
      </div>

      {/* ─── Meter / Credit Usage Chart ──────────────────────────────────── */}
      <div className="network-dashboard__meter-card">
        <div className="network-dashboard__meter-header">
          <span className="network-dashboard__meter-title">Credit Usage</span>
          <span className="network-dashboard__meter-total">1300 GB total</span>
        </div>
        <p className="network-dashboard__meter-label">1000 GB used (300 GB available)</p>
        <div className="network-dashboard__meter-bar">
          {meterSegments.map((seg, i) => (
            <div
              key={seg.group}
              className="network-dashboard__meter-segment"
              style={{
                flex: seg.value,
                background: METER_COLORS[i],
                borderLeft: i > 0 ? '2px solid var(--background-primary)' : 'none',
              }}
            />
          ))}
          <div className="network-dashboard__meter-remaining" />
        </div>
        <div className="network-dashboard__meter-legend">
          {meterSegments.map((seg, i) => (
            <div key={seg.group} className="network-dashboard__legend-item">
              <span
                className="network-dashboard__legend-swatch"
                style={{ background: METER_COLORS[i] }}
              />
              <span className="network-dashboard__legend-label">{seg.group}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ─── My Devices Section ──────────────────────────────────────────── */}
      <div className="network-dashboard__devices-section">
        <div className="network-dashboard__devices-header">
          <div>
            <h2 className="network-dashboard__devices-title">My Devices</h2>
            <p className="network-dashboard__devices-description">Devices on your local network</p>
          </div>
          <Button kind="primary" renderIcon={Launch}>
            Add Device
          </Button>
        </div>

        <DataTable rows={displayedRows} headers={tableHeaders} isSortable>
          {({ rows, headers, getHeaderProps, getRowProps, getTableProps, getTableContainerProps }) => (
            <TableContainer
              title="Network Devices"
              description={`${totalItems} devices found`}
              {...getTableContainerProps()}
            >
              <Table {...getTableProps()} size="md">
                <TableHead>
                  <TableRow>
                    {headers.map((header) => (
                      <TableHeader key={header.key} {...getHeaderProps({ header })}>
                        {header.header}
                      </TableHeader>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id} {...getRowProps({ row })}>
                      {row.cells.map((cell) => (
                        <TableCell key={cell.id}>
                          {cell.info.header === 'status' ? (
                            <span className={`network-dashboard__status-badge network-dashboard__status-badge--${cell.value.toLowerCase()}`}>
                              {cell.value}
                            </span>
                          ) : (
                            cell.value
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Pagination
                totalItems={totalItems}
                pageSize={pageSize}
                pageSizes={[5, 10, 25, 100]}
                page={page}
                onChange={({ page: p, pageSize: ps }) => {
                  setPage(p);
                  setPageSize(ps);
                }}
                itemsCountInPage={displayedRows.length}
              />
            </TableContainer>
          )}
        </DataTable>
      </div>
    </div>
  );
}
