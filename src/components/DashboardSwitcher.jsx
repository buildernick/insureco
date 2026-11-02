import { useNavigate, useLocation } from 'react-router-dom';
import { ContentSwitcher, Switch } from '@carbon/react';
import './DashboardSwitcher.scss';

const DASHBOARDS = [
  { path: '/financial-dashboard-1', label: 'Conservative' },
  { path: '/financial-dashboard-2', label: 'Modern Sleek' },
  { path: '/financial-dashboard-3', label: 'Wild Creative' },
];

export default function DashboardSwitcher() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const selectedIndex = DASHBOARDS.findIndex(d => d.path === pathname);

  return (
    <div className="dashboard-switcher">
      <span className="dashboard-switcher__label">Dashboard Style:</span>
      <ContentSwitcher
        selectedIndex={selectedIndex}
        onChange={({ index }) => navigate(DASHBOARDS[index].path)}
        size="sm"
      >
        {DASHBOARDS.map(d => (
          <Switch key={d.path} name={d.path} text={d.label} />
        ))}
      </ContentSwitcher>
    </div>
  );
}
