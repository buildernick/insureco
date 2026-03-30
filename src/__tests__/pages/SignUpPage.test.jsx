import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import SignUpPage from '../../pages/SignUpPage';
import { ThemeProvider } from '../../contexts/ThemeContext';

// Mock Carbon icons — they are SVG components that don't add test value
vi.mock('@carbon/icons-react', () => ({
  ArrowRight: () => <span />,
  ArrowLeft: () => <span />,
  Checkmark: () => <span />,
  Car: () => <span data-testid="icon-car" />,
  Home: () => <span data-testid="icon-home" />,
}));

// Mock useNavigate so we can assert navigation calls
const mockNavigate = vi.hoisted(() => vi.fn());
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, useNavigate: () => mockNavigate };
});

// jsdom doesn't implement window.scrollTo
Object.defineProperty(window, 'scrollTo', { value: vi.fn(), writable: true });

const renderSignUp = () =>
  render(
    <MemoryRouter>
      <ThemeProvider>
        <SignUpPage />
      </ThemeProvider>
    </MemoryRouter>
  );

// Helper: fill in all required step-1 fields
const fillPersonalInfo = async (user) => {
  await user.type(screen.getByLabelText(/first name/i), 'Jane');
  await user.type(screen.getByLabelText(/last name/i), 'Smith');
  await user.type(screen.getByLabelText(/email address/i), 'jane@example.com');
  await user.type(screen.getByLabelText(/phone number/i), '5551234567');
};

describe('SignUpPage — Step 1: Personal Information', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    localStorage.clear();
  });

  it('renders all required personal information fields', () => {
    renderSignUp();
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
  });

  it('shows the "Personal Information" heading', () => {
    renderSignUp();
    expect(screen.getByText('Personal Information')).toBeInTheDocument();
  });

  it('shows a Next button', () => {
    renderSignUp();
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
  });

  it('Next button is disabled when required fields are empty', () => {
    renderSignUp();
    expect(screen.getByRole('button', { name: /next/i })).toBeDisabled();
  });

  it('does not show a Back button on the first step', () => {
    renderSignUp();
    expect(screen.queryByRole('button', { name: /back/i })).not.toBeInTheDocument();
  });
});

describe('SignUpPage — Step navigation', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    localStorage.clear();
  });

  it('advances to step 2 after filling personal info and clicking Next', async () => {
    const user = userEvent.setup();
    renderSignUp();

    await fillPersonalInfo(user);
    await user.click(screen.getByRole('button', { name: /next/i }));

    // Step 2 is the Address step
    expect(screen.getByText('Your Address')).toBeInTheDocument();
  });

  it('shows a Back button on step 2', async () => {
    const user = userEvent.setup();
    renderSignUp();

    await fillPersonalInfo(user);
    await user.click(screen.getByRole('button', { name: /next/i }));

    expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument();
  });

  it('returns to step 1 when Back is clicked on step 2', async () => {
    const user = userEvent.setup();
    renderSignUp();

    await fillPersonalInfo(user);
    await user.click(screen.getByRole('button', { name: /next/i }));
    await user.click(screen.getByRole('button', { name: /back/i }));

    expect(screen.getByText('Personal Information')).toBeInTheDocument();
  });

  it('preserves field values when navigating back to step 1', async () => {
    const user = userEvent.setup();
    renderSignUp();

    await fillPersonalInfo(user);
    await user.click(screen.getByRole('button', { name: /next/i }));
    await user.click(screen.getByRole('button', { name: /back/i }));

    expect(screen.getByLabelText(/first name/i)).toHaveValue('Jane');
    expect(screen.getByLabelText(/last name/i)).toHaveValue('Smith');
  });
});

// Helper: navigate from step 1 through address and insurance type to reach the Car Details step
const navigateToCarDetails = async (user) => {
  // Step 1: Personal Info
  await fillPersonalInfo(user);
  await user.click(screen.getByRole('button', { name: /next/i }));

  // Step 2: Address
  await user.type(screen.getByLabelText(/street address/i), '123 Main St');
  await user.type(screen.getByLabelText(/city/i), 'Springfield');
  await user.selectOptions(screen.getByLabelText(/state/i), 'TX');
  await user.type(screen.getByLabelText(/zip/i), '12345');
  await user.click(screen.getByRole('button', { name: /next/i }));

  // Step 3: Insurance Type — pick Car
  await user.click(screen.getByRole('radio', { name: /car insurance/i }));
  await user.click(screen.getByRole('button', { name: /next/i }));
};

describe('SignUpPage — Step: Car Details (new mileage fields)', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    localStorage.clear();
  });

  it('renders the Current Mileage field', async () => {
    const user = userEvent.setup();
    renderSignUp();
    await navigateToCarDetails(user);

    expect(screen.getByLabelText(/current mileage/i)).toBeInTheDocument();
  });

  it('renders the Miles Driven Per Year field', async () => {
    const user = userEvent.setup();
    renderSignUp();
    await navigateToCarDetails(user);

    expect(screen.getByLabelText(/miles driven per year/i)).toBeInTheDocument();
  });

  it('shows "Only estimates are needed right now" hint text for Current Mileage', async () => {
    const user = userEvent.setup();
    renderSignUp();
    await navigateToCarDetails(user);

    const helperTexts = screen.getAllByText(/only estimates are needed right now/i);
    expect(helperTexts.length).toBeGreaterThanOrEqual(1);
  });

  it('shows the correct placeholder for Current Mileage', async () => {
    const user = userEvent.setup();
    renderSignUp();
    await navigateToCarDetails(user);

    expect(screen.getByPlaceholderText('e.g. 60,000 miles')).toBeInTheDocument();
  });

  it('shows the correct placeholder for Miles Driven Per Year', async () => {
    const user = userEvent.setup();
    renderSignUp();
    await navigateToCarDetails(user);

    expect(screen.getByPlaceholderText('e.g. 12,000 miles')).toBeInTheDocument();
  });

  it('accepts input in the Current Mileage field', async () => {
    const user = userEvent.setup();
    renderSignUp();
    await navigateToCarDetails(user);

    const mileageField = screen.getByLabelText(/current mileage/i);
    await user.type(mileageField, '60000');
    expect(mileageField).toHaveValue('60000');
  });

  it('accepts input in the Miles Driven Per Year field', async () => {
    const user = userEvent.setup();
    renderSignUp();
    await navigateToCarDetails(user);

    const milesPerYearField = screen.getByLabelText(/miles driven per year/i);
    await user.type(milesPerYearField, '12000');
    expect(milesPerYearField).toHaveValue('12000');
  });

  it('mileage values are shown in the Review step', async () => {
    const user = userEvent.setup();
    renderSignUp();
    await navigateToCarDetails(user);

    // Fill required car fields + new mileage fields
    await user.type(screen.getByLabelText(/^make$/i), 'Toyota');
    await user.type(screen.getByLabelText(/^model$/i), 'Corolla');
    await user.selectOptions(screen.getByLabelText(/^year$/i), '2020');
    await user.type(screen.getByLabelText(/current mileage/i), '60000');
    await user.type(screen.getByLabelText(/miles driven per year/i), '12000');
    await user.click(screen.getByRole('button', { name: /next/i }));

    // Step: Coverage — fill required fields then advance to Review
    await user.click(screen.getByLabelText(/basic/i));
    await user.selectOptions(screen.getByLabelText(/deductible/i), '500');
    await user.click(screen.getByRole('button', { name: /next/i }));

    // Now on Review step
    expect(screen.getByText(/current mileage/i)).toBeInTheDocument();
    expect(screen.getByText(/miles per year/i)).toBeInTheDocument();
  });
});
