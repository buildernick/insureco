import React, { useState } from 'react';
import {
  Button,
  Search,
  Breadcrumb,
  BreadcrumbItem,
  InlineNotification,
  Tag,
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
import { Launch } from '@carbon/icons-react';
import { AreaChart, StackedBarChart } from '@carbon/charts-react';
import '@carbon/charts/styles.css';
import { useTheme } from '../contexts/ThemeContext';
import './NetworkDashboard.scss';

// ─── Chart Data (module-level constants – no theme dependency) ───────────────

const areaChartData = [
  { group: 'Total Revenue', key: 'Jan', value: 1_820_000 },
  { group: 'Total Revenue', key: 'Feb', value: 2_150_000 },
  { group: 'Total Revenue', key: 'Mar', value: 2_480_000 },
  { group: 'Total Revenue', key: 'Apr', value: 2_310_000 },
  { group: 'Total Revenue', key: 'May', value: 2_740_000 },
  { group: 'Total Revenue', key: 'Jun', value: 2_690_000 },
  { group: 'Total Revenue', key: 'Jul', value: 2_120_000 },
  { group: 'Total Revenue', key: 'Aug', value: 2_390_000 },
  { group: 'Total Revenue', key: 'Sep', value: 2_650_000 },
  { group: 'Total Revenue', key: 'Oct', value: 2_890_000 },
];

const stackedBarData = [
  { group: 'Premium Income',    key: 'Jan', value: 980 },
  { group: 'Premium Income',    key: 'Feb', value: 1100 },
  { group: 'Premium Income',    key: 'Mar', value: 1250 },
  { group: 'Premium Income',    key: 'Apr', value: 1180 },
  { group: 'Premium Income',    key: 'May', value: 1340 },
  { group: 'Premium Income',    key: 'Jun', value: 1290 },
  { group: 'Premium Income',    key: 'Jul', value: 1050 },
  { group: 'Premium Income',    key: 'Aug', value: 1210 },
  { group: 'Premium Income',    key: 'Sep', value: 1360 },
  { group: 'Premium Income',    key: 'Oct', value: 1480 },
  { group: 'Claims Paid',       key: 'Jan', value: 540 },
  { group: 'Claims Paid',       key: 'Feb', value: 490 },
  { group: 'Claims Paid',       key: 'Mar', value: 620 },
  { group: 'Claims Paid',       key: 'Apr', value: 570 },
  { group: 'Claims Paid',       key: 'May', value: 710 },
  { group: 'Claims Paid',       key: 'Jun', value: 680 },
  { group: 'Claims Paid',       key: 'Jul', value: 510 },
  { group: 'Claims Paid',       key: 'Aug', value: 590 },
  { group: 'Claims Paid',       key: 'Sep', value: 640 },
  { group: 'Claims Paid',       key: 'Oct', value: 720 },
  { group: 'Operating Expenses',key: 'Jan', value: 210 },
  { group: 'Operating Expenses',key: 'Feb', value: 230 },
  { group: 'Operating Expenses',key: 'Mar', value: 215 },
  { group: 'Operating Expenses',key: 'Apr', value: 240 },
  { group: 'Operating Expenses',key: 'May', value: 225 },
  { group: 'Operating Expenses',key: 'Jun', value: 250 },
  { group: 'Operating Expenses',key: 'Jul', value: 220 },
  { group: 'Operating Expenses',key: 'Aug', value: 235 },
  { group: 'Operating Expenses',key: 'Sep', value: 245 },
  { group: 'Operating Expenses',key: 'Oct', value: 260 },
  { group: 'Investment Income', key: 'Jan', value: 68 },
  { group: 'Investment Income', key: 'Feb', value: 74 },
  { group: 'Investment Income', key: 'Mar', value: 81 },
  { group: 'Investment Income', key: 'Apr', value: 77 },
  { group: 'Investment Income', key: 'May', value: 90 },
  { group: 'Investment Income', key: 'Jun', value: 85 },
  { group: 'Investment Income', key: 'Jul', value: 72 },
  { group: 'Investment Income', key: 'Aug', value: 79 },
  { group: 'Investment Income', key: 'Sep', value: 88 },
  { group: 'Investment Income', key: 'Oct', value: 95 },
  { group: 'Other Revenue',     key: 'Jan', value: 22 },
  { group: 'Other Revenue',     key: 'Feb', value: 19 },
  { group: 'Other Revenue',     key: 'Mar', value: 25 },
  { group: 'Other Revenue',     key: 'Apr', value: 21 },
  { group: 'Other Revenue',     key: 'May', value: 28 },
  { group: 'Other Revenue',     key: 'Jun', value: 24 },
  { group: 'Other Revenue',     key: 'Jul', value: 18 },
  { group: 'Other Revenue',     key: 'Aug', value: 23 },
  { group: 'Other Revenue',     key: 'Sep', value: 26 },
  { group: 'Other Revenue',     key: 'Oct', value: 30 },
];

const meterSegments = [
  { group: 'Claims Reserves',   value: 1_200_000 },
  { group: 'Operating Budget',  value:   800_000 },
  { group: 'Marketing',         value:   350_000 },
  { group: 'Investments',       value:   950_000 },
  { group: 'Contingency',       value:   300_000 },
];

// ─── Accounts Table Data ──────────────────────────────────────────────────────

const tableHeaders = [
  { key: 'policyId',   header: 'Policy ID' },
  { key: 'account',    header: 'Account' },
  { key: 'type',       header: 'Policy Type' },
  { key: 'premium',    header: 'Annual Premium' },
  { key: 'coverage',   header: 'Coverage Limit' },
  { key: 'status',     header: 'Status' },
  { key: 'dueDate',    header: 'Next Due Date' },
  { key: 'balance',    header: 'Outstanding ($)' },
];

const policyTypes   = ['Auto', 'Home', 'Life', 'Health', 'Commercial', 'Umbrella', 'Renters', 'Flood'];
const accountNames  = ['Acme Corp', 'Rivera Family', 'TechStart LLC', 'Chen Holdings', 'Nguyen Trust', 'Patel Group', 'Morrison Inc', 'Silva Partners', 'Kim Enterprises', 'Walsh & Sons'];
const dueDates      = ['2025-02-01', '2025-02-15', '2025-03-01', '2025-03-15', '2025-04-01', '2025-04-15', '2025-05-01', '2025-05-15', '2025-06-01', '2025-06-15'];

const allAccounts = Array.from({ length: 10 }, (_, i) => ({
  id:        `pol-${i + 1}`,
  policyId:  `POL-${String(100 + i + 1)}`,
  account:   accountNames[i],
  type:      policyTypes[i % policyTypes.length],
  premium:   `$${(1200 + i * 340).toLocaleString()}`,
  coverage:  `$${(100_000 + i * 50_000).toLocaleString()}`,
  status:    i % 4 === 3 ? 'Overdue' : 'Active',
  dueDate:   dueDates[i],
  balance:   i % 4 === 3 ? `${(250 + i * 30).toLocaleString()}` : '0',
}));

// ─── Meter color palette matching design ─────────────────────────────────────

const METER_COLORS = ['#6929C4', '#1192E8', '#005D5D', '#9F1853', '#570408'];

const TOTAL_BUDGET  = 3_600_000;
const TOTAL_SPENT   = meterSegments.reduce((s, seg) => s + seg.value, 0);
const BUDGET_AVAIL  = TOTAL_BUDGET - TOTAL_SPENT;

export default function NetworkDashboard() {
  const { theme } = useTheme();
  const chartTheme = theme === 'g90' || theme === 'g100' ? 'g100' : 'white';

  const [warningDismissed, setWarningDismissed] = useState(false);
  const [searchValue, setSearchValue]           = useState('');
  const [page, setPage]                         = useState(1);
  const [pageSize, setPageSize]                 = useState(5);

  // ─── Chart options (inside component to access chartTheme hook value) ───────

  const areaChartOptions = {
    title: 'Total Revenue (YTD)',
    theme: chartTheme,
    height: '340px',
    curve: 'curveMonotoneX',
    axes: {
      bottom: { title: 'Month',        mapsTo: 'key',   scaleType: 'labels' },
      left:   { title: 'Revenue ($)',   mapsTo: 'value', scaleType: 'linear' },
    },
    color: { scale: { 'Total Revenue': '#6929C4' } },
  };

  const stackedBarOptions = {
    title: 'Financial Breakdown by Category',
    theme: chartTheme,
    height: '340px',
    axes: {
      bottom: { title: 'Month',         mapsTo: 'key',   scaleType: 'labels' },
      left:   { title: 'Amount ($K)',    mapsTo: 'value', scaleType: 'linear' },
    },
    color: {
      scale: {
        'Premium Income':     '#6929C4',
        'Claims Paid':        '#1192E8',
        'Operating Expenses': '#005D5D',
        'Investment Income':  '#9F1853',
        'Other Revenue':      '#570408',
      },
    },
  };

  // ─── Filtered + paginated rows ────────────────────────────────────────────

  const filteredAccounts = allAccounts.filter(
    (row) =>
      searchValue === '' ||
      Object.values(row).some((v) =>
        String(v).toLowerCase().includes(searchValue.toLowerCase())
      )
  );
  const totalItems    = filteredAccounts.length;
  const displayedRows = filteredAccounts.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <div className="network-dashboard">

      {/* ─── Breadcrumb ─────────────────────────────────────────────────── */}
      <div className="network-dashboard__breadcrumb-wrapper">
        <Breadcrumb>
          <BreadcrumbItem href="#">Finance</BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>Financial Report</BreadcrumbItem>
        </Breadcrumb>
      </div>

      {/* ─── Page Header ─────────────────────────────────────────────────── */}
      <div className="network-dashboard__page-header">
        <div className="network-dashboard__page-title-group">
          <h1 className="network-dashboard__page-title">
            Financial Report Dashboard
          </h1>
          <p className="network-dashboard__page-description">
            Revenue, Claims, Budget Utilization, and Active Policies
          </p>
        </div>
        <Button
          kind="primary"
          renderIcon={Launch}
          className="network-dashboard__refresh-btn"
        >
          Export Report
        </Button>
      </div>

      {/* ─── Search + Pagination Bar ─────────────────────────────────────── */}
      <div className="network-dashboard__filter-bar">
        <div className="network-dashboard__search-wrapper">
          <Search
            labelText="Search"
            placeholder="Search policies, accounts…"
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
        <InlineNotification
          kind="warning"
          lowContrast
          title="Budget Alert:"
          subtitle="Q4 claims spending is 12% over forecast. Review reserve allocations before period close."
          onCloseButtonClick={() => setWarningDismissed(true)}
          aria-label="Dismiss budget alert notification"
          statusIconDescription="warning"
          className="network-dashboard__budget-alert"
        />
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

      {/* ─── Budget Utilization Meter ─────────────────────────────────────── */}
      <div className="network-dashboard__meter-card">
        <div className="network-dashboard__meter-header">
          <span className="network-dashboard__meter-title">Budget Utilization</span>
          <span className="network-dashboard__meter-total">${TOTAL_BUDGET.toLocaleString()} total</span>
        </div>
        <p className="network-dashboard__meter-label">
          ${TOTAL_SPENT.toLocaleString()} allocated (${BUDGET_AVAIL.toLocaleString()} remaining)
        </p>
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

      {/* ─── Policy Accounts Section ─────────────────────────────────────── */}
      <div className="network-dashboard__devices-section">
        <div className="network-dashboard__devices-header">
          <div>
            <h2 className="network-dashboard__devices-title">Policy Accounts</h2>
            <p className="network-dashboard__devices-description">Active policies and account balances</p>
          </div>
          <Button kind="primary" renderIcon={Launch}>
            New Policy
          </Button>
        </div>

        <DataTable rows={displayedRows} headers={tableHeaders} isSortable>
          {({ rows, headers, getHeaderProps, getRowProps, getTableProps, getTableContainerProps }) => (
            <TableContainer {...getTableContainerProps()}>
              <Table {...getTableProps()} size="md">
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
                              <Tag type={cell.value === 'Active' ? 'green' : 'red'} size="sm">
                                {cell.value}
                              </Tag>
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
              <Pagination
                totalItems={totalItems}
                pageSize={pageSize}
                pageSizes={[5, 10, 25, 100]}
                page={page}
                onChange={({ page: p, pageSize: ps }) => {
                  setPage(p);
                  setPageSize(ps);
                }}
              />
            </TableContainer>
          )}
        </DataTable>
      </div>
    </div>
  );
}
