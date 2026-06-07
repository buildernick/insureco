import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import MapPage from '../../pages/business/MapPage';
import { ThemeProvider } from '../../contexts/ThemeContext';

// Mock Carbon icons
vi.mock('@carbon/icons-react', () => ({
  Building: () => <span />,
  CarFront: () => <span />,
  Close: () => <span />,
  Filter: () => <span data-testid="icon-filter" />,
  ChevronDown: () => <span />,
  ChevronRight: () => <span />,
}));

// Mock MapView — it relies on browser APIs not available in jsdom
vi.mock('../../components/business/MapView', () => ({
  default: () => <div data-testid="map-view" />,
}));

// Mock useNavigate
const mockNavigate = vi.hoisted(() => vi.fn());
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, useNavigate: () => mockNavigate };
});

beforeEach(() => {
  localStorage.clear();
});

const renderMapPage = () =>
  render(
    <MemoryRouter>
      <ThemeProvider>
        <MapPage />
      </ThemeProvider>
    </MemoryRouter>
  );

describe('MapPage layout', () => {
  it('renders the Filters section before the Asset Type radio buttons', () => {
    renderMapPage();

    const filtersHeading = screen.getByRole('heading', { name: /filters/i });
    const assetTypeLegend = screen.getByText(/asset type/i);

    // Compare DOM position: filters should appear before the asset type group
    const position = filtersHeading.compareDocumentPosition(assetTypeLegend);
    // DOCUMENT_POSITION_FOLLOWING (4) means assetTypeLegend comes after filtersHeading
    expect(position & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('renders the filter toggle button', () => {
    renderMapPage();
    expect(screen.getByRole('button', { name: /filter assets/i })).toBeInTheDocument();
  });

  it('renders all three asset type radio options', () => {
    renderMapPage();
    expect(screen.getByLabelText(/all assets/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/properties/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/vehicles/i)).toBeInTheDocument();
  });

  it('renders summary stats tile', () => {
    renderMapPage();
    expect(screen.getByRole('heading', { name: /summary/i })).toBeInTheDocument();
    expect(screen.getByText(/total assets/i)).toBeInTheDocument();
    expect(screen.getByText(/monthly premium/i)).toBeInTheDocument();
    expect(screen.getByText(/open claims/i)).toBeInTheDocument();
  });

  it('renders the map', () => {
    renderMapPage();
    expect(screen.getByTestId('map-view')).toBeInTheDocument();
  });
});

describe('MapPage filter interactions', () => {
  it('does not show clear button when no filters are active', () => {
    renderMapPage();
    expect(screen.queryByRole('button', { name: /^clear \(/i })).not.toBeInTheDocument();
  });

  it('shows clear button after selecting a filter option', async () => {
    const user = userEvent.setup();
    renderMapPage();

    // Open the filter panel
    await user.click(screen.getByRole('button', { name: /filter assets/i }));

    // Click the Status category to reveal its options
    await user.click(screen.getByRole('button', { name: /status/i }));

    // Select the first checkbox option
    const checkboxes = screen.getAllByRole('checkbox');
    await user.click(checkboxes[0]);

    expect(screen.getByRole('button', { name: /^clear \(/i })).toBeInTheDocument();
  });

  it('clears all active filters when the clear button is clicked', async () => {
    const user = userEvent.setup();
    renderMapPage();

    await user.click(screen.getByRole('button', { name: /filter assets/i }));
    await user.click(screen.getByRole('button', { name: /status/i }));

    const checkboxes = screen.getAllByRole('checkbox');
    await user.click(checkboxes[0]);

    const clearBtn = screen.getByRole('button', { name: /^clear \(/i });
    await user.click(clearBtn);

    expect(screen.queryByRole('button', { name: /^clear \(/i })).not.toBeInTheDocument();
  });

  it('updates filter label when switching to Properties asset type', async () => {
    const user = userEvent.setup();
    renderMapPage();

    await user.click(screen.getByLabelText(/properties/i));

    expect(screen.getByRole('button', { name: /filter properties/i })).toBeInTheDocument();
  });

  it('updates filter label when switching to Vehicles asset type', async () => {
    const user = userEvent.setup();
    renderMapPage();

    await user.click(screen.getByLabelText(/vehicles/i));

    expect(screen.getByRole('button', { name: /filter vehicles/i })).toBeInTheDocument();
  });

  it('clears active filters when the asset type changes', async () => {
    const user = userEvent.setup();
    renderMapPage();

    // Apply a filter
    await user.click(screen.getByRole('button', { name: /filter assets/i }));
    await user.click(screen.getByRole('button', { name: /status/i }));
    const checkboxes = screen.getAllByRole('checkbox');
    await user.click(checkboxes[0]);
    expect(screen.getByRole('button', { name: /^clear \(/i })).toBeInTheDocument();

    // Switch asset type — filters should be cleared
    await user.click(screen.getByLabelText(/vehicles/i));
    expect(screen.queryByRole('button', { name: /^clear \(/i })).not.toBeInTheDocument();
  });
});
