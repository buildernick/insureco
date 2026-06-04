import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Column,
  Button,
  Toggle,
  Tag,
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
} from '@carbon/react';
import { ArrowUp, Analytics } from '@carbon/icons-react';
import { AreaChart, GroupedBarChart } from '@carbon/charts-react';
import '@carbon/charts/styles.css';
import { useTheme } from '../contexts/ThemeContext';
import { monthlyData, assetData, calculateSummaryStats, formatCurrency, formatDate } from '../data/financialData';
import './FinancialDashboard2.scss';

const CHART_COLORS = {
  'Property Premiums': '#24a148',
  'Property Claims': '#da1e28',
  'Auto Premiums': '#198038',
  'Auto Claims': '#a2191f',
};

const SERIES_CONFIG = [
  { key: 'propertyPremiums', label: 'Property Premiums', kind: 'primary' },
  { key: 'propertyClaims', label: 'Property Claims', kind: 'danger' },
  { key: 'autoPremiums', label: 'Auto Premiums', kind: 'primary' },
  { key: 'autoClaims', label: 'Auto Claims', kind: 'danger' },
];

export default function FinancialDashboard2() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [chartType, setChartType] = useState('line');
  const [visibleSeries, setVisibleSeries] = useState({
    propertyPremiums: true,
    propertyClaims: true,
    autoPremiums: true,
    autoClaims: true,
  });

  const chartTheme = (theme === 'g90' || theme === 'g100') ? 'g100' : 'white';
  const stats = calculateSummaryStats();

  const chartData = useMemo(() => {
    return monthlyData.flatMap(month =>
      SERIES_CONFIG
        .filter(s => visibleSeries[s.key])
        .map(s => ({ group: s.label, date: month.month, value: month[s.key] }))
    );
  }, [visibleSeries]);

  const chartOptions = {
    axes: {
      left: { mapsTo: 'value', title: 'Amount (USD)' },
      bottom: { mapsTo: 'date', scaleType: 'labels' },
    },
    height: '450px',
    theme: chartTheme,
    curve: 'curveMonotoneX',
    color: { scale: CHART_COLORS },
    tooltip: { valueFormatter: (v) => formatCurrency(v) },
  };

  const headers = [
    { key: 'assetName', header: 'Asset Name' },
    { key: 'category', header: 'Category' },
    { key: 'premiumDue', header: 'Premium Due' },
    { key: 'dueDate', header: 'Due Date' },
    { key: 'totalClaims', header: 'Total Claims' },
    { key: 'region', header: 'Region' },
  ];

  const rows = assetData.map((asset) => ({
    id: asset.id,
    assetName: asset.assetName,
    category: asset.category,
    premiumDue: formatCurrency(asset.premiumDue),
    dueDate: formatDate(asset.dueDate),
    totalClaims: formatCurrency(asset.totalClaims),
    region: asset.region,
    _raw: asset,
  }));

  const toggleSeries = (key) => {
    setVisibleSeries(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleRowClick = (row) => {
    if (row._raw.category === 'Property') {
      navigate(`/business/properties/${row._raw.id}`, { state: { asset: row._raw } });
    } else {
      navigate(`/business/fleet/${row._raw.id}`, { state: { asset: row._raw } });
    }
  };

  return (
    <div className="financial-dashboard-2">
      <Grid fullWidth>
        <Column lg={16} md={8} sm={4}>
          <div className="modern-header">
            <div className="header-content">
              <Tag type="blue" size="sm">Financial Analytics</Tag>
              <h1>Insurance Portfolio Dashboard</h1>
              <p className="header-description">
                Real-time insights into premium collections and claim payouts across your entire portfolio
              </p>
            </div>
            <div className="header-icon">
              <Analytics size={48} />
            </div>
          </div>
        </Column>

        <Column lg={8} md={8} sm={4}>
          <div className="kpi-card-modern kpi-card-modern--primary">
            <div className="kpi-card-header">
              <span className="kpi-icon kpi-icon--success">
                <ArrowUp size={24} />
              </span>
              <Tag type="green" size="sm">+8.2%</Tag>
            </div>
            <div className="kpi-content">
              <div className="kpi-label">Total Premiums (YTD)</div>
              <div className="kpi-value">{formatCurrency(stats.totalOwed)}</div>
              <div className="kpi-breakdown">
                <span>Property: {formatCurrency(stats.propertyPremiums)}</span>
                <span className="divider">•</span>
                <span>Auto: {formatCurrency(stats.autoPremiums)}</span>
              </div>
            </div>
          </div>
        </Column>

        <Column lg={8} md={8} sm={4}>
          <div className="kpi-card-modern kpi-card-modern--danger">
            <div className="kpi-card-header">
              <span className="kpi-icon kpi-icon--danger">
                <ArrowUp size={24} />
              </span>
              <Tag type="red" size="sm">+12.5%</Tag>
            </div>
            <div className="kpi-content">
              <div className="kpi-label">Total Claims (YTD)</div>
              <div className="kpi-value">{formatCurrency(stats.totalClaimed)}</div>
              <div className="kpi-breakdown">
                <span>Property: {formatCurrency(stats.propertyClaims)}</span>
                <span className="divider">•</span>
                <span>Auto: {formatCurrency(stats.autoClaims)}</span>
              </div>
            </div>
          </div>
        </Column>

        <Column lg={4} md={4} sm={4}>
          <div className="stat-mini">
            <div className="stat-mini-label">Loss Ratio</div>
            <div className="stat-mini-value">{stats.lossRatio}%</div>
          </div>
        </Column>

        <Column lg={4} md={4} sm={4}>
          <div className="stat-mini">
            <div className="stat-mini-label">Total Assets</div>
            <div className="stat-mini-value">{assetData.length}</div>
          </div>
        </Column>

        <Column lg={4} md={4} sm={4}>
          <div className="stat-mini">
            <div className="stat-mini-label">Net Revenue</div>
            <div className="stat-mini-value">{formatCurrency(stats.totalOwed - stats.totalClaimed)}</div>
          </div>
        </Column>

        <Column lg={4} md={4} sm={4}>
          <div className="stat-mini">
            <div className="stat-mini-label">Avg Monthly Premium</div>
            <div className="stat-mini-value">{formatCurrency(stats.totalOwed / 12)}</div>
          </div>
        </Column>

        <Column lg={16} md={8} sm={4}>
          <div className="chart-card-modern">
            <div className="chart-card-header">
              <div className="chart-title-section">
                <h3>Financial Trends</h3>
                <p className="chart-subtitle">Monthly premium and claims comparison</p>
              </div>
              <div className="chart-controls-modern">
                <div className="series-toggles">
                  {SERIES_CONFIG.map(s => (
                    <Button
                      key={s.key}
                      kind={visibleSeries[s.key] ? s.kind : 'ghost'}
                      size="sm"
                      onClick={() => toggleSeries(s.key)}
                    >
                      {s.label}
                    </Button>
                  ))}
                </div>
                <div className="chart-type-toggle">
                  <Toggle
                    id="chart-type-toggle-2"
                    labelA="Area"
                    labelB="Bar"
                    toggled={chartType === 'bar'}
                    onToggle={(checked) => setChartType(checked ? 'bar' : 'line')}
                    size="sm"
                  />
                </div>
              </div>
            </div>

            <div className="chart-visualization">
              {chartType === 'line' ? (
                <AreaChart data={chartData} options={chartOptions} />
              ) : (
                <GroupedBarChart data={chartData} options={chartOptions} />
              )}
            </div>
          </div>
        </Column>

        <Column lg={16} md={8} sm={4}>
          <div className="table-card-modern">
            <DataTable rows={rows} headers={headers}>
              {({
                rows: tableRows,
                headers: tableHeaders,
                getHeaderProps,
                getRowProps,
                getTableProps,
                getTableContainerProps,
                getToolbarProps,
                onInputChange,
              }) => (
                <TableContainer
                  title="Asset Performance Ledger"
                  description="Click on any row to view detailed asset information"
                  {...getTableContainerProps()}
                >
                  <TableToolbar {...getToolbarProps()}>
                    <TableToolbarContent>
                      <TableToolbarSearch
                        onChange={onInputChange}
                        placeholder="Search assets..."
                      />
                    </TableToolbarContent>
                  </TableToolbar>
                  <Table {...getTableProps()} className="modern-table">
                    <TableHead>
                      <TableRow>
                        {tableHeaders.map((header) => (
                          <TableHeader {...getHeaderProps({ header })} key={header.key}>
                            {header.header}
                          </TableHeader>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {tableRows.map((row) => (
                        <TableRow
                          {...getRowProps({ row })}
                          key={row.id}
                          onClick={() => handleRowClick(row)}
                          className="modern-table-row"
                        >
                          {row.cells.map((cell) => (
                            <TableCell key={cell.id}>{cell.value}</TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </DataTable>
          </div>
        </Column>
      </Grid>
    </div>
  );
}
