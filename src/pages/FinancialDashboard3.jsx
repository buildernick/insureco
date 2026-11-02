import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts';
import { monthlyData, assetData, calculateSummaryStats, formatCurrency, formatDate } from '../data/financialData';
import './FinancialDashboard3.scss';

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

  // Radial chart data for loss ratio
  const radialData = [
    {
      name: 'Loss Ratio',
      value: parseFloat(stats.lossRatio),
      fill: parseFloat(stats.lossRatio) > 60 ? '#da1e28' : '#24a148',
    },
  ];

  // Filter assets based on category and search
  const filteredAssets = assetData.filter(asset => {
    const matchesCategory = selectedCategory === 'all' || asset.category.toLowerCase() === selectedCategory;
    const matchesSearch = asset.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.region.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleSeries = (series) => {
    setVisibleSeries(prev => ({ ...prev, [series]: !prev[series] }));
  };

  const handleAssetClick = (asset) => {
    // Navigate to existing property or vehicle pages based on category
    if (asset.category === 'Property') {
      // Navigate to business property detail page
      navigate(`/business/properties/${asset.id}`, { state: { asset } });
    } else {
      // Navigate to business fleet vehicle detail page
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

      {/* Unique KPI Layout */}
      <div className="kpi-section">
        <div className="kpi-grid">
          {/* Main Premium Card */}
          <div className="kpi-card-wild kpi-card-wild--large kpi-card-wild--premium">
            <div className="card-glow"></div>
            <div className="card-content">
              <div className="card-icon">💰</div>
              <div className="card-label">Total Premiums</div>
              <div className="card-value">{formatCurrency(stats.totalOwed)}</div>
              <div className="card-trend">
                <span className="trend-badge trend-badge--up">↑ 8.2%</span>
                <span className="trend-text">vs last year</span>
              </div>
            </div>
          </div>

          {/* Main Claims Card */}
          <div className="kpi-card-wild kpi-card-wild--large kpi-card-wild--claims">
            <div className="card-glow"></div>
            <div className="card-content">
              <div className="card-icon">📊</div>
              <div className="card-label">Total Claims</div>
              <div className="card-value">{formatCurrency(stats.totalClaimed)}</div>
              <div className="card-trend">
                <span className="trend-badge trend-badge--down">↑ 12.5%</span>
                <span className="trend-text">vs last year</span>
              </div>
            </div>
          </div>

          {/* Loss Ratio Radial */}
          <div className="kpi-card-wild kpi-card-wild--radial">
            <div className="card-content">
              <div className="card-label">Loss Ratio</div>
              <ResponsiveContainer width="100%" height={120}>
                <RadialBarChart 
                  cx="50%" 
                  cy="50%" 
                  innerRadius="60%" 
                  outerRadius="90%" 
                  data={radialData}
                  startAngle={180}
                  endAngle={0}
                >
                  <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                  <RadialBar 
                    background 
                    dataKey="value" 
                    cornerRadius={10}
                  />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="radial-value">{stats.lossRatio}%</div>
            </div>
          </div>

          {/* Property Card */}
          <div className="kpi-card-wild kpi-card-wild--property">
            <div className="card-content">
              <div className="card-icon">🏢</div>
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

          {/* Auto Card */}
          <div className="kpi-card-wild kpi-card-wild--auto">
            <div className="card-content">
              <div className="card-icon">🚗</div>
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

          {/* Net Revenue */}
          <div className="kpi-card-wild kpi-card-wild--net">
            <div className="card-content">
              <div className="card-icon">💵</div>
              <div className="card-label">Net Revenue</div>
              <div className="card-value">{formatCurrency(stats.totalOwed - stats.totalClaimed)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Section with Wild Design */}
      <div className="chart-section-wild">
        <div className="section-header">
          <h2>Financial Trends</h2>
          <div className="chart-controls-wild">
            <div className="series-chips">
              <button 
                className={`chip ${visibleSeries.propertyPremiums ? 'chip--active chip--green' : 'chip--inactive'}`}
                onClick={() => toggleSeries('propertyPremiums')}
              >
                Property Premiums
              </button>
              <button 
                className={`chip ${visibleSeries.propertyClaims ? 'chip--active chip--red' : 'chip--inactive'}`}
                onClick={() => toggleSeries('propertyClaims')}
              >
                Property Claims
              </button>
              <button 
                className={`chip ${visibleSeries.autoPremiums ? 'chip--active chip--green' : 'chip--inactive'}`}
                onClick={() => toggleSeries('autoPremiums')}
              >
                Auto Premiums
              </button>
              <button 
                className={`chip ${visibleSeries.autoClaims ? 'chip--active chip--red' : 'chip--inactive'}`}
                onClick={() => toggleSeries('autoClaims')}
              >
                Auto Claims
              </button>
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
          <ResponsiveContainer width="100%" height={450}>
            {chartType === 'line' ? (
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.2} />
                <XAxis dataKey="month" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip 
                  formatter={(value) => formatCurrency(value)}
                  contentStyle={{ 
                    background: 'rgba(22, 22, 22, 0.95)', 
                    border: 'none',
                    borderRadius: '12px',
                    color: '#fff'
                  }}
                />
                <Legend />
                {visibleSeries.propertyPremiums && (
                  <Line type="monotone" dataKey="propertyPremiums" stroke="#24a148" strokeWidth={3} name="Property Premiums" dot={{ r: 5 }} />
                )}
                {visibleSeries.propertyClaims && (
                  <Line type="monotone" dataKey="propertyClaims" stroke="#da1e28" strokeWidth={3} name="Property Claims" dot={{ r: 5 }} />
                )}
                {visibleSeries.autoPremiums && (
                  <Line type="monotone" dataKey="autoPremiums" stroke="#42be65" strokeWidth={2} strokeDasharray="8 8" name="Auto Premiums" />
                )}
                {visibleSeries.autoClaims && (
                  <Line type="monotone" dataKey="autoClaims" stroke="#fa4d56" strokeWidth={2} strokeDasharray="8 8" name="Auto Claims" />
                )}
              </LineChart>
            ) : (
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.2} />
                <XAxis dataKey="month" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip 
                  formatter={(value) => formatCurrency(value)}
                  contentStyle={{ 
                    background: 'rgba(22, 22, 22, 0.95)', 
                    border: 'none',
                    borderRadius: '12px',
                    color: '#fff'
                  }}
                />
                <Legend />
                {visibleSeries.propertyPremiums && (
                  <Bar dataKey="propertyPremiums" fill="#24a148" name="Property Premiums" radius={[8, 8, 0, 0]} />
                )}
                {visibleSeries.propertyClaims && (
                  <Bar dataKey="propertyClaims" fill="#da1e28" name="Property Claims" radius={[8, 8, 0, 0]} />
                )}
                {visibleSeries.autoPremiums && (
                  <Bar dataKey="autoPremiums" fill="#42be65" name="Auto Premiums" radius={[8, 8, 0, 0]} />
                )}
                {visibleSeries.autoClaims && (
                  <Bar dataKey="autoClaims" fill="#fa4d56" name="Auto Claims" radius={[8, 8, 0, 0]} />
                )}
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* Wild Table Section */}
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
              <button 
                className={`filter-btn ${selectedCategory === 'all' ? 'filter-btn--active' : ''}`}
                onClick={() => setSelectedCategory('all')}
              >
                All
              </button>
              <button 
                className={`filter-btn ${selectedCategory === 'property' ? 'filter-btn--active' : ''}`}
                onClick={() => setSelectedCategory('property')}
              >
                Property
              </button>
              <button 
                className={`filter-btn ${selectedCategory === 'auto' ? 'filter-btn--active' : ''}`}
                onClick={() => setSelectedCategory('auto')}
              >
                Auto
              </button>
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
