import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Column,
  Tile,
  Button,
  Toggle,
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
import { ArrowUp, WarningAlt } from '@carbon/icons-react';
import { LineChart, GroupedBarChart } from '@carbon/charts-react';
import '@carbon/charts/styles.css';
import { useTheme } from '../contexts/ThemeContext';
import { monthlyData, assetData, calculateSummaryStats, formatCurrency, formatDate } from '../data/financialData';
import './FinancialDashboard1.scss';

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

export default function FinancialDashboard1() {
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

  const highRiskAssets = useMemo(() => {
    return assetData
      .map(asset => ({
        ...asset,
        lossRatio: (asset.totalClaims / asset.premiumDue) * 100,
      }))
      .sort((a, b) => b.lossRatio - a.lossRatio)
      .slice(0, 5);
  }, []);

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
    height: '400px',
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
    <div className="financial-dashboard-1">
      <Grid fullWidth>
        <Column lg={16} md={8} sm={4}>
          <div className="dashboard-header">
            <h1>Insurance Financial Analytics Dashboard</h1>
            <p className="dashboard-subtitle">
              Comprehensive overview of premium collections and claim payouts across Auto and Property portfolios
            </p>
          </div>
        </Column>

        <Column lg={4} md={4} sm={4}>
          <Tile className="kpi-card kpi-card--primary">
            <div className="kpi-label">Total Owed (YTD)</div>
            <div className="kpi-value">{formatCurrency(stats.totalOwed)}</div>
            <div className="kpi-change kpi-change--positive">
              <ArrowUp size={16} />
              <span>8.2% vs last year</span>
            </div>
          </Tile>
        </Column>

        <Column lg={4} md={4} sm={4}>
          <Tile className="kpi-card kpi-card--danger">
            <div className="kpi-label">Total Claimed (YTD)</div>
            <div className="kpi-value">{formatCurrency(stats.totalClaimed)}</div>
            <div className="kpi-change kpi-change--negative">
              <ArrowUp size={16} />
              <span>12.5% vs last year</span>
            </div>
          </Tile>
        </Column>

        <Column lg={4} md={4} sm={4}>
          <Tile className="kpi-card kpi-card--success">
            <div className="kpi-label">Property Premiums</div>
            <div className="kpi-value">{formatCurrency(stats.propertyPremiums)}</div>
            <div className="kpi-subtitle">Claims: {formatCurrency(stats.propertyClaims)}</div>
          </Tile>
        </Column>

        <Column lg={4} md={4} sm={4}>
          <Tile className="kpi-card kpi-card--success">
            <div className="kpi-label">Auto Premiums</div>
            <div className="kpi-value">{formatCurrency(stats.autoPremiums)}</div>
            <div className="kpi-subtitle">Claims: {formatCurrency(stats.autoClaims)}</div>
          </Tile>
        </Column>

        <Column lg={16} md={8} sm={4}>
          <Tile className="chart-tile">
            <div className="chart-header">
              <h3>Premium vs Claims Analysis</h3>
              <div className="chart-controls">
                <div className="legend-toggles">
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
                <Toggle
                  id="chart-type-toggle"
                  labelA="Line"
                  labelB="Bar"
                  toggled={chartType === 'bar'}
                  onToggle={(checked) => setChartType(checked ? 'bar' : 'line')}
                  size="sm"
                />
              </div>
            </div>

            <div className="chart-container">
              {chartType === 'line' ? (
                <LineChart data={chartData} options={chartOptions} />
              ) : (
                <GroupedBarChart data={chartData} options={chartOptions} />
              )}
            </div>
          </Tile>
        </Column>

        <Column lg={16} md={8} sm={4}>
          <div className="high-risk-section">
            <div className="section-header">
              <div className="section-title-group">
                <WarningAlt size={24} className="warning-icon" />
                <h2>High Risk Assets</h2>
              </div>
              <p className="section-description">
                Assets with the highest claims-to-premium ratios requiring immediate attention
              </p>
            </div>

            <div className="high-risk-grid">
              {highRiskAssets.map((asset) => (
                <Tile
                  key={asset.id}
                  className="high-risk-card"
                  onClick={() => {
                    if (asset.category === 'Property') {
                      navigate(`/business/properties/${asset.id}`, { state: { asset } });
                    } else {
                      navigate(`/business/fleet/${asset.id}`, { state: { asset } });
                    }
                  }}
                >
                  <div className="risk-card-header">
                    <span className={`risk-category risk-category--${asset.category.toLowerCase()}`}>
                      {asset.category}
                    </span>
                    <span className="risk-region">{asset.region}</span>
                  </div>

                  <h3 className="risk-asset-name">{asset.assetName}</h3>

                  <div className="risk-metrics">
                    <div className="risk-metric">
                      <span className="metric-label">Loss Ratio</span>
                      <span className="metric-value metric-value--danger">
                        {asset.lossRatio.toFixed(1)}%
                      </span>
                    </div>
                    <div className="risk-divider"></div>
                    <div className="risk-metric">
                      <span className="metric-label">Total Claims</span>
                      <span className="metric-value">{formatCurrency(asset.totalClaims)}</span>
                    </div>
                    <div className="risk-divider"></div>
                    <div className="risk-metric">
                      <span className="metric-label">Premium Due</span>
                      <span className="metric-value">{formatCurrency(asset.premiumDue)}</span>
                    </div>
                  </div>

                  <div className="risk-card-footer">
                    <div className="risk-indicator">
                      <div
                        className="risk-bar"
                        style={{ width: `${Math.min(asset.lossRatio, 100)}%` }}
                      ></div>
                    </div>
                    <span className="view-details-link">View Details →</span>
                  </div>
                </Tile>
              ))}
            </div>
          </div>
        </Column>

        <Column lg={16} md={8} sm={4}>
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
                description="Detailed breakdown of premium and claims by individual asset"
                {...getTableContainerProps()}
              >
                <TableToolbar {...getToolbarProps()}>
                  <TableToolbarContent>
                    <TableToolbarSearch onChange={onInputChange} />
                  </TableToolbarContent>
                </TableToolbar>
                <Table {...getTableProps()}>
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
                        className="clickable-row"
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
        </Column>
      </Grid>
    </div>
  );
}
