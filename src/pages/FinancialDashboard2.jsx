import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Column,
  Tile,
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
import { ArrowUp, ArrowDown, Analytics } from '@carbon/icons-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { monthlyData, assetData, calculateSummaryStats, formatCurrency, formatDate } from '../data/financialData';
import './FinancialDashboard2.scss';

export default function FinancialDashboard2() {
  const navigate = useNavigate();
  const [chartType, setChartType] = useState('line');
  const [visibleSeries, setVisibleSeries] = useState({
    propertyPremiums: true,
    propertyClaims: true,
    autoPremiums: true,
    autoClaims: true,
  });

  const stats = calculateSummaryStats();

  // Table headers
  const headers = [
    { key: 'assetName', header: 'Asset Name' },
    { key: 'category', header: 'Category' },
    { key: 'premiumDue', header: 'Premium Due' },
    { key: 'dueDate', header: 'Due Date' },
    { key: 'totalClaims', header: 'Total Claims' },
    { key: 'region', header: 'Region' },
  ];

  // Format table rows with enhanced styling
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
    <div className="financial-dashboard-2">
      <Grid fullWidth>
        {/* Modern Header with Badge */}
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

        {/* Modern KPI Grid with Enhanced Cards */}
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

        {/* Compact Stats Row */}
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
            <div className="stat-mini-label">Avg Premium</div>
            <div className="stat-mini-value">{formatCurrency(stats.totalOwed / 12)}</div>
          </div>
        </Column>

        {/* Modern Chart with Enhanced UI */}
        <Column lg={16} md={8} sm={4}>
          <div className="chart-card-modern">
            <div className="chart-card-header">
              <div className="chart-title-section">
                <h3>Financial Trends</h3>
                <p className="chart-subtitle">Monthly premium and claims comparison</p>
              </div>
              <div className="chart-controls-modern">
                <div className="series-toggles">
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
                <div className="chart-type-toggle">
                  <Toggle
                    id="chart-type-toggle-2"
                    labelA="Line"
                    labelB="Bar"
                    toggled={chartType === 'bar'}
                    onToggle={(checked) => setChartType(checked ? 'bar' : 'line')}
                    size="sm"
                  />
                </div>
              </div>
            </div>

            <div className="chart-visualization">
              <ResponsiveContainer width="100%" height={450}>
                {chartType === 'line' ? (
                  <AreaChart data={monthlyData}>
                    <defs>
                      <linearGradient id="propertyPremiumsGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#24a148" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#24a148" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="propertyClaimsGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#da1e28" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#da1e28" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="month" tick={{ fill: '#525252' }} />
                    <YAxis tick={{ fill: '#525252' }} />
                    <Tooltip 
                      formatter={(value) => formatCurrency(value)}
                      contentStyle={{ borderRadius: '8px', border: '1px solid #e0e0e0' }}
                    />
                    <Legend />
                    {visibleSeries.propertyPremiums && (
                      <Area 
                        type="monotone" 
                        dataKey="propertyPremiums" 
                        stroke="#24a148" 
                        strokeWidth={3}
                        fill="url(#propertyPremiumsGradient)" 
                        name="Property Premiums" 
                      />
                    )}
                    {visibleSeries.propertyClaims && (
                      <Area 
                        type="monotone" 
                        dataKey="propertyClaims" 
                        stroke="#da1e28" 
                        strokeWidth={3}
                        fill="url(#propertyClaimsGradient)" 
                        name="Property Claims" 
                      />
                    )}
                    {visibleSeries.autoPremiums && (
                      <Line 
                        type="monotone" 
                        dataKey="autoPremiums" 
                        stroke="#198038" 
                        strokeWidth={2} 
                        strokeDasharray="5 5" 
                        name="Auto Premiums" 
                        dot={{ r: 4 }}
                      />
                    )}
                    {visibleSeries.autoClaims && (
                      <Line 
                        type="monotone" 
                        dataKey="autoClaims" 
                        stroke="#a2191f" 
                        strokeWidth={2} 
                        strokeDasharray="5 5" 
                        name="Auto Claims" 
                        dot={{ r: 4 }}
                      />
                    )}
                  </AreaChart>
                ) : (
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="month" tick={{ fill: '#525252' }} />
                    <YAxis tick={{ fill: '#525252' }} />
                    <Tooltip 
                      formatter={(value) => formatCurrency(value)}
                      contentStyle={{ borderRadius: '8px', border: '1px solid #e0e0e0' }}
                    />
                    <Legend />
                    {visibleSeries.propertyPremiums && (
                      <Bar dataKey="propertyPremiums" fill="#24a148" name="Property Premiums" radius={[8, 8, 0, 0]} />
                    )}
                    {visibleSeries.propertyClaims && (
                      <Bar dataKey="propertyClaims" fill="#da1e28" name="Property Claims" radius={[8, 8, 0, 0]} />
                    )}
                    {visibleSeries.autoPremiums && (
                      <Bar dataKey="autoPremiums" fill="#198038" name="Auto Premiums" radius={[8, 8, 0, 0]} />
                    )}
                    {visibleSeries.autoClaims && (
                      <Bar dataKey="autoClaims" fill="#a2191f" name="Auto Claims" radius={[8, 8, 0, 0]} />
                    )}
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>
        </Column>

        {/* Modern Table */}
        <Column lg={16} md={8} sm={4}>
          <div className="table-card-modern">
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
