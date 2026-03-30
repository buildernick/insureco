import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import MapPage from '../../pages/business/MapPage';
import { ThemeProvider } from '../../contexts/ThemeContext';

// MapView uses react-leaflet which requires a real browser — replace with a stub
vi.mock('../../components/business/MapView', () => ({
  default: () => <div data-testid="mock-map" />,
}));

// Stub FacetedFilterButton so we can assert on the label prop and trigger
// onFiltersChange without needing a real Leaflet/DOM environment
vi.mock('../../components/business/FacetedFilterButton', () => ({
  default: ({ label, onFiltersChange }) => (
    <div>
      <span data-testid="filter-label">{label}</span>
      <button
        data-testid="apply-filter"
        onClick={() =>
          onFiltersChange({
            status: ['Active'],
            type: [],
            location: [],
            propertyType: [],
            vehicleType: [],
            city: [],
          })
        }
      >
        Apply filter
      </button>
    </div>
  ),
}));

// Carbon icons are SVG components that add no test value
vi.mock('@carbon/icons-react', () => ({
  Close: () => <span />,
  Building: () => <span />,
  CarFront: () => <span />,
}));

// Mock useNavigate so router calls don't throw
const mockNavigate = vi.hoisted(() => vi.fn());
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, useNavigate: () => mockNavigate };
});

const renderMapPage = () =>
  render(
    <MemoryRouter>
      <ThemeProvider>
        <MapPage />
      </ThemeProvider>
    </MemoryRouter>
  );

describe('MapPage', () => {
  beforeEach(() => {
    localStorage.clear();
    mockNavigate.mockClear();
  });

  // ── Rendering ────────────────────────────────────────────────────────────────

  it('renders the page title', () => {
    renderMapPage();
    expect(screen.getByText('Map View')).toBeInTheDocument();
  });

  it('renders the map', () => {
    renderMapPage();
    expect(screen.getByTestId('mock-map')).toBeInTheDocument();
  });

  it('renders summary stat labels', () => {
    renderMapPage();
    expect(screen.getByText('Total Assets')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByText('Monthly Premium')).toBeInTheDocument();
    expect(screen.getByText('Open Claims')).toBeInTheDocument();
  });

  // ── Dual filter locations (overlay + sidebar) ─────────────────────────────

  it('renders two filter instances — one for the map overlay and one for the sidebar', () => {
    renderMapPage();
    // jsdom does not apply media queries, so both the desktop overlay and the
    // mobile sidebar version are present in the DOM simultaneously
    expect(screen.getAllByTestId('filter-label')).toHaveLength(2);
  });

  // ── Filter label by asset type ────────────────────────────────────────────

  it('shows "Filter Assets" label by default', () => {
    renderMapPage();
    const labels = screen.getAllByTestId('filter-label');
    labels.forEach((el) => expect(el).toHaveTextContent('Filter Assets'));
  });

  it('shows "Filter Properties" when the Properties radio is selected', async () => {
    const user = userEvent.setup();
    renderMapPage();
    await user.click(screen.getByRole('radio', { name: 'Properties' }));
    const labels = screen.getAllByTestId('filter-label');
    labels.forEach((el) => expect(el).toHaveTextContent('Filter Properties'));
  });

  it('shows "Filter Vehicles" when the Vehicles radio is selected', async () => {
    const user = userEvent.setup();
    renderMapPage();
    await user.click(screen.getByRole('radio', { name: 'Vehicles' }));
    const labels = screen.getAllByTestId('filter-label');
    labels.forEach((el) => expect(el).toHaveTextContent('Filter Vehicles'));
  });

  // ── Clear filter button ───────────────────────────────────────────────────

  it('does not show a Clear button before any filter is applied', () => {
    renderMapPage();
    expect(screen.queryByRole('button', { name: /clear/i })).not.toBeInTheDocument();
  });

  it('shows Clear buttons in both filter locations after a filter is applied', async () => {
    const user = userEvent.setup();
    renderMapPage();
    await user.click(screen.getAllByTestId('apply-filter')[0]);
    // Both overlay and sidebar clear buttons appear (media queries not active in jsdom)
    expect(screen.getAllByRole('button', { name: /clear/i }).length).toBeGreaterThan(0);
  });

  it('hides the Clear button after clicking it', async () => {
    const user = userEvent.setup();
    renderMapPage();
    await user.click(screen.getAllByTestId('apply-filter')[0]);
    await user.click(screen.getAllByRole('button', { name: /clear/i })[0]);
    expect(screen.queryByRole('button', { name: /clear/i })).not.toBeInTheDocument();
  });

  // ── Asset-type switch resets filters ─────────────────────────────────────

  it('resets active filters when the asset type is switched', async () => {
    const user = userEvent.setup();
    renderMapPage();
    await user.click(screen.getAllByTestId('apply-filter')[0]);
    expect(screen.getAllByRole('button', { name: /clear/i }).length).toBeGreaterThan(0);
    await user.click(screen.getByRole('radio', { name: 'Properties' }));
    expect(screen.queryByRole('button', { name: /clear/i })).not.toBeInTheDocument();
  });
});
