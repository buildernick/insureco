import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Finance, Analytics, Building, Car, Money, ArrowUp } from '@carbon/icons-react';
import { GaugeChart, LineChart, GroupedBarChart } from '@carbon/charts-react';
import '@carbon/charts/styles.css';
import { monthlyData, assetData, calculateSummaryStats, formatCurrency, formatDate } from '../data/financialData';
import './FinancialDashboard3.scss';

const CHART_COLORS = {
  'Property Premiums': '#24a148',
  'Property Claims': '#da1e28',
  'Auto Premiums': '#42be65',
  'Auto Claims': '#fa4d56',
};

const SERIES_CONFIG = [
  { key: 'propertyPremiums', label: 'Property Premiums', colorClass: 'green' },
  { key: 'propertyClaims', label: 'Property Claims', colorClass: 'red' },
  { key: 'autoPremiums', label: 'Auto Premiums', colorClass: 'green' },
  { key: 'autoClaims', label: 'Auto Claims', colorClass: 'red' },
];

export default function FinancialDashboard3() {
  const navigate = useNavigate();
  const [chartType, setChartType] = useState('line');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleSeries, setVisibleSeries] = useState({
    propertyPremiums: true,
    propertyClaims: true,
    autoPremiums: true,
    autoClaims: true,
  });

  const stats = calculateSummaryStats();
  const lossRatioValue = parseFloat(stats.lossRatio);

  const gaugeData = [{ group: 'Loss Ratio', value: lossRatioValue }];
  const gaugeOptions = {
    gauge: {
      type: 'semi',
      alignment: 'center',
      status: lossRatioValue > 70 ? 'danger' : lossRatioValue > 55 ? 'warning' : 'success',
    },
    height: '180px',
    theme: 'g100',
    legend: { enabled: false },
    toolbar: { enabled: false },
  };

  const chartData = useMemo(() => {
    return monthlyData.flatMap(month =>
      SERIES_CONFIG
        .filter(s => visibleSeries[s.key])
        .map(s => ({ group: s.label, date: month.month, value: month[s.key] }))
    );
  }, [visibleSeries]);

  const chartOptions = {
    axes: {
      left: { mapsTo: 'value' },
      bottom: { mapsTo: 'date', scaleType: 'labels' },
    },
    height: '420px',
    theme: 'g100',
    curve: 'curveMonotoneX',
    color: { scale: CHART_COLORS },
    tooltip: { valueFormatter: (v) => formatCurrency(v) },
    grid: { x: { enabled: false } },
  };

  const filteredAssets = useMemo(() => {
    return assetData.filter(asset => {
      const matchesCategory = selectedCategory === 'all' || asset.category.toLowerCase() === selectedCategory;
      const matchesSearch = asset.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.region.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  const toggleSeries = (key) => {
    setVisibleSeries(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAssetClick = (asset) => {
    if (asset.category === 'Property') {
      navigate(`/business/properties/${asset.id}`, { state: { asset } });
    } else {
      navigate(`/business/fleet/${asset.id}`, { state: { asset } });
    }
  };

  return (
    <div className="financial-dashboard-3">
      {/* Hero Header */}
      <div className="hero-header">
        <div className="hero-background"></div>
        <div className="hero-content">
          <h1 className="hero-title">Financial Command Center</h1>
          <p className="hero-subtitle">Real-time portfolio analytics at your fingertips</p>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="kpi-section">
        <div className="kpi-grid">
          <div className="kpi-card-wild kpi-card-wild--large kpi-card-wild--premium">
            <div className="card-glow"></div>
            <div className="card-content">
              <div className="card-icon-wrapper">
                <Finance size={32} />
              </div>
              <div className="card-label">Total Premiums</div>
              <div className="card-value">{formatCurrency(stats.totalOwed)}</div>
              <div className="card-trend">
                <span className="trend-badge trend-badge--up">
                  <ArrowUp size={12} /> 8.2%
                </span>
                <span className="trend-text">vs last year</span>
              </div>
            </div>
          </div>

          <div className="kpi-card-wild kpi-card-wild--large kpi-card-wild--claims">
            <div className="card-glow"></div>
            <div className="card-content">
              <div className="card-icon-wrapper">
                <Analytics size={32} />
              </div>
              <div className="card-label">Total Claims</div>
              <div className="card-value">{formatCurrency(stats.totalClaimed)}</div>
              <div className="card-trend">
                <span className="trend-badge trend-badge--down">
                  <ArrowUp size={12} /> 12.5%
                </span>
                <span className="trend-text">vs last year</span>
              </div>
            </div>
          </div>

          <div className="kpi-card-wild kpi-card-wild--radial">
            <div className="card-content">
              <div className="card-label">Loss Ratio</div>
              <GaugeChart data={gaugeData} options={gaugeOptions} />
              <div className="radial-label">{stats.lossRatio}%</div>
            </div>
          </div>

          <div className="kpi-card-wild kpi-card-wild--property">
            <div className="card-content">
              <div className="card-icon-wrapper">
                <Building size={28} />
              </div>
              <div className="card-label">Property</div>
              <div className="card-split">
                <div className="split-item">
                  <span className="split-label">Premiums</span>
                  <span className="split-value split-value--green">{formatCurrency(stats.propertyPremiums)}</span>
                </div>
                <div className="split-divider"></div>
                <div className="split-item">
                  <span className="split-label">Claims</span>
                  <span className="split-value split-value--red">{formatCurrency(stats.propertyClaims)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="kpi-card-wild kpi-card-wild--auto">
            <div className="card-content">
              <div className="card-icon-wrapper">
                <Car size={28} />
              </div>
              <div className="card-label">Auto</div>
              <div className="card-split">
                <div className="split-item">
                  <span className="split-label">Premiums</span>
                  <span className="split-value split-value--green">{formatCurrency(stats.autoPremiums)}</span>
                </div>
                <div className="split-divider"></div>
                <div className="split-item">
                  <span className="split-label">Claims</span>
                  <span className="split-value split-value--red">{formatCurrency(stats.autoClaims)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="kpi-card-wild kpi-card-wild--net">
            <div className="card-content">
              <div className="card-icon-wrapper">
                <Money size={28} />
              </div>
              <div className="card-label">Net Revenue</div>
              <div className="card-value card-value--lg">{formatCurrency(stats.totalOwed - stats.totalClaimed)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="chart-section-wild">
        <div className="section-header">
          <h2>Financial Trends</h2>
          <div className="chart-controls-wild">
            <div className="series-chips">
              {SERIES_CONFIG.map(s => (
                <button
                  key={s.key}
                  className={`chip ${visibleSeries[s.key] ? `chip--active chip--${s.colorClass}` : 'chip--inactive'}`}
                  onClick={() => toggleSeries(s.key)}
                >
                  {s.label}
                </button>
              ))}
            </div>
            <div className="chart-toggle-wild">
              <button
                className={`toggle-btn ${chartType === 'line' ? 'toggle-btn--active' : ''}`}
                onClick={() => setChartType('line')}
              >
                Line
              </button>
              <button
                className={`toggle-btn ${chartType === 'bar' ? 'toggle-btn--active' : ''}`}
                onClick={() => setChartType('bar')}
              >
                Bar
              </button>
            </div>
          </div>
        </div>

        <div className="chart-container-wild">
          {chartType === 'line' ? (
            <LineChart data={chartData} options={chartOptions} />
          ) : (
            <GroupedBarChart data={chartData} options={chartOptions} />
          )}
        </div>
      </div>

      {/* Asset Grid Section */}
      <div className="table-section-wild">
        <div className="section-header">
          <h2>Asset Performance</h2>
          <div className="table-controls">
            <input
              type="text"
              className="search-input-wild"
              placeholder="Search assets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="category-filters">
              {['all', 'property', 'auto'].map(cat => (
                <button
                  key={cat}
                  className={`filter-btn ${selectedCategory === cat ? 'filter-btn--active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
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
    </div>
  );
}
