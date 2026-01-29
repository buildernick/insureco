import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Column,
  Tile,
  Button,
  Toggle,
  Dropdown,
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
import { ArrowUp, ArrowDown, WarningAlt } from '@carbon/icons-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { monthlyData, assetData, calculateSummaryStats, formatCurrency, formatDate } from '../data/financialData';
import './FinancialDashboard1.scss';

export default function FinancialDashboard1() {
  const navigate = useNavigate();
  const [chartType, setChartType] = useState('line');
  const [showGross, setShowGross] = useState(true);
  const [visibleSeries, setVisibleSeries] = useState({
    propertyPremiums: true,
    propertyClaims: true,
    autoPremiums: true,
    autoClaims: true,
  });

  const stats = calculateSummaryStats();

  // Calculate high-risk assets (worst claims-to-premium ratios)
  const highRiskAssets = useMemo(() => {
    return assetData
      .map(asset => ({
        ...asset,
        lossRatio: (asset.totalClaims / asset.premiumDue) * 100,
      }))
      .sort((a, b) => b.lossRatio - a.lossRatio)
      .slice(0, 5); // Top 5 highest risk assets
  }, []);

  // Table headers configuration
  const headers = [
    { key: 'assetName', header: 'Asset Name' },
    { key: 'category', header: 'Category' },
    { key: 'premiumDue', header: 'Premium Due' },
    { key: 'dueDate', header: 'Due Date' },
    { key: 'totalClaims', header: 'Total Claims' },
    { key: 'region', header: 'Region' },
  ];

  // Format table rows
  const rows = assetData.map((asset) => ({
    id: asset.id,
    assetName: asset.assetName,
    category: asset.category,
    premiumDue: formatCurrency(asset.premiumDue),
    dueDate: formatDate(asset.dueDate),
    totalClaims: formatCurrency(asset.totalClaims),
    region: asset.region,
    _raw: asset, // Keep raw data for navigation
  }));

  const toggleSeries = (series) => {
    setVisibleSeries(prev => ({ ...prev, [series]: !prev[series] }));
  };

  const handleRowClick = (row) => {
    // Navigate to existing property or vehicle pages based on category
    if (row._raw.category === 'Property') {
      // Navigate to business property detail page
      navigate(`/business/properties/${row._raw.id}`, { state: { asset: row._raw } });
    } else {
      // Navigate to business fleet vehicle detail page
      navigate(`/business/fleet/${row._raw.id}`, { state: { asset: row._raw } });
    }
  };

  return (
    <div className="financial-dashboard-1">
      <Grid fullWidth>
        {/* Page Header */}
        <Column lg={16} md={8} sm={4}>
          <div className="dashboard-header">
            <h1>Insurance Financial Analytics Dashboard</h1>
            <p className="dashboard-subtitle">
              Comprehensive overview of premium collections and claim payouts across Auto and Property portfolios
            </p>
          </div>
        </Column>

        {/* KPI Summary Cards */}
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
            <div className="kpi-subtitle">
              Claims: {formatCurrency(stats.propertyClaims)}
            </div>
          </Tile>
        </Column>

        <Column lg={4} md={4} sm={4}>
          <Tile className="kpi-card kpi-card--success">
            <div className="kpi-label">Auto Premiums</div>
            <div className="kpi-value">{formatCurrency(stats.autoPremiums)}</div>
            <div className="kpi-subtitle">
              Claims: {formatCurrency(stats.autoClaims)}
            </div>
          </Tile>
        </Column>

        {/* Chart Section */}
        <Column lg={16} md={8} sm={4}>
          <Tile className="chart-tile">
            <div className="chart-header">
              <h3>Premium vs Claims Analysis</h3>
              <div className="chart-controls">
                <div className="legend-toggles">
                  <Button
                    kind={visibleSeries.propertyPremiums ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => toggleSeries('propertyPremiums')}
                  >
                    Property Premiums
                  </Button>
                  <Button
                    kind={visibleSeries.propertyClaims ? 'danger' : 'ghost'}
                    size="sm"
                    onClick={() => toggleSeries('propertyClaims')}
                  >
                    Property Claims
                  </Button>
                  <Button
                    kind={visibleSeries.autoPremiums ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => toggleSeries('autoPremiums')}
                  >
                    Auto Premiums
                  </Button>
                  <Button
                    kind={visibleSeries.autoClaims ? 'danger' : 'ghost'}
                    size="sm"
                    onClick={() => toggleSeries('autoClaims')}
                  >
                    Auto Claims
                  </Button>
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
              <ResponsiveContainer width="100%" height={400}>
                {chartType === 'line' ? (
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                    <Legend />
                    {visibleSeries.propertyPremiums && (
                      <Line type="monotone" dataKey="propertyPremiums" stroke="#24a148" strokeWidth={2} name="Property Premiums" />
                    )}
                    {visibleSeries.propertyClaims && (
                      <Line type="monotone" dataKey="propertyClaims" stroke="#da1e28" strokeWidth={2} name="Property Claims" />
                    )}
                    {visibleSeries.autoPremiums && (
                      <Line type="monotone" dataKey="autoPremiums" stroke="#198038" strokeWidth={2} strokeDasharray="5 5" name="Auto Premiums" />
                    )}
                    {visibleSeries.autoClaims && (
                      <Line type="monotone" dataKey="autoClaims" stroke="#a2191f" strokeWidth={2} strokeDasharray="5 5" name="Auto Claims" />
                    )}
                  </LineChart>
                ) : (
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                    <Legend />
                    {visibleSeries.propertyPremiums && (
                      <Bar dataKey="propertyPremiums" fill="#24a148" name="Property Premiums" />
                    )}
                    {visibleSeries.propertyClaims && (
                      <Bar dataKey="propertyClaims" fill="#da1e28" name="Property Claims" />
                    )}
                    {visibleSeries.autoPremiums && (
                      <Bar dataKey="autoPremiums" fill="#198038" name="Auto Premiums" />
                    )}
                    {visibleSeries.autoClaims && (
                      <Bar dataKey="autoClaims" fill="#a2191f" name="Auto Claims" />
                    )}
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>
          </Tile>
        </Column>

        {/* High Risk Assets Section */}
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

        {/* Asset Performance Table */}
        <Column lg={16} md={8} sm={4}>
          <DataTable rows={rows} headers={headers}>
            {({
              rows,
              headers,
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
                      {headers.map((header) => (
                        <TableHeader {...getHeaderProps({ header })} key={header.key}>
                          {header.header}
                        </TableHeader>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
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
