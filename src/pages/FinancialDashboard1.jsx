import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Column,
  Tile,
  Button,
  Dropdown,
} from '@carbon/react';
import { ArrowUp, ArrowDown, WarningAlt } from '@carbon/icons-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { monthlyData, assetData, calculateSummaryStats, formatCurrency, formatDate } from '../data/financialData';
import DashboardSwitcher from '../components/DashboardSwitcher';
import './FinancialDashboard1.scss';

export default function FinancialDashboard1() {
  const navigate = useNavigate();
  const [chartType, setChartType] = useState('line');
  const [showGross, setShowGross] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
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

  const filteredAssets = assetData.filter((asset) => {
    const matchesCategory = selectedCategory === 'all' || asset.category.toLowerCase() === selectedCategory;
    const normalizedSearch = searchTerm.toLowerCase();
    const matchesSearch = asset.assetName.toLowerCase().includes(normalizedSearch) ||
      asset.region.toLowerCase().includes(normalizedSearch);

    return matchesCategory && matchesSearch;
  });

  const toggleSeries = (series) => {
    setVisibleSeries(prev => ({ ...prev, [series]: !prev[series] }));
  };

  const handleAssetClick = (asset) => {
    if (asset.category === 'Property') {
      navigate(`/business/properties/${asset.id}`, { state: { asset } });
    } else {
      navigate(`/business/fleet/${asset.id}`, { state: { asset } });
    }
  };

  return (
    <div className="financial-dashboard-1">
      <Grid fullWidth>
        {/* Page Header */}
        <Column lg={16} md={8} sm={4}>
          <DashboardSwitcher />
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
                <Dropdown
                  id="chart-type-dropdown"
                  label="Chart Type"
                  items={['Line', 'Bar']}
                  selectedItem={chartType === 'line' ? 'Line' : 'Bar'}
                  onChange={({ selectedItem }) => setChartType(selectedItem.toLowerCase())}
                  size="sm"
                  hideLabel
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

        {/* Asset Performance */}
        <Column lg={16} md={8} sm={4}>
          <div className="asset-performance-section">
            <div className="asset-performance-header">
              <h2>Asset Performance</h2>
              <div className="asset-filter-controls">
                <input
                  type="search"
                  className="asset-filter-search"
                  aria-label="Search assets"
                  placeholder="Search assets..."
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
                <div className="asset-category-filters" aria-label="Filter assets by category">
                  {['all', 'property', 'auto'].map((category) => (
                    <button
                      key={category}
                      type="button"
                      className={`asset-category-filter ${selectedCategory === category ? 'asset-category-filter--active' : ''}`}
                      aria-pressed={selectedCategory === category}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category === 'all' ? 'All' : category === 'property' ? 'Property' : 'Auto'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="asset-grid">
              {filteredAssets.map((asset) => (
                <div
                  key={asset.id}
                  className={`asset-card asset-card--${asset.category.toLowerCase()}`}
                  onClick={() => handleAssetClick(asset)}
                >
                  <div className="asset-card-header">
                    <span className="asset-category">{asset.category}</span>
                    <span className="asset-region">{asset.region}</span>
                  </div>
                  <h3 className="asset-name">{asset.assetName}</h3>
                  <div className="asset-details">
                    <div className="detail-item">
                      <span className="detail-label">Premium Due</span>
                      <span className="detail-value detail-value--green">{formatCurrency(asset.premiumDue)}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Due Date</span>
                      <span className="detail-value">{formatDate(asset.dueDate)}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Total Claims</span>
                      <span className="detail-value detail-value--red">{formatCurrency(asset.totalClaims)}</span>
                    </div>
                  </div>
                  <div className="asset-card-footer">
                    <span className="view-details">View Details →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Column>
      </Grid>
    </div>
  );
}
