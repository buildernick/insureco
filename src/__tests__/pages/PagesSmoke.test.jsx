import { render } from '@testing-library/react';
import { vi, describe, it, expect, beforeAll } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '../../contexts/ThemeContext';

import AboutPage from '../../pages/AboutPage';
import LoginPage from '../../pages/LoginPage';
import SignUpConfirmationPage from '../../pages/SignUpConfirmationPage';
import FinancialDashboardOptions from '../../pages/FinancialDashboardOptions';
import FinancialDashboard1 from '../../pages/FinancialDashboard1';
import FinancialDashboard2 from '../../pages/FinancialDashboard2';
import FinancialDashboard3 from '../../pages/FinancialDashboard3';
import BusinessComingSoon from '../../pages/business/BusinessComingSoon';
import BusinessDashboard from '../../pages/business/BusinessDashboard';
import FleetPage from '../../pages/business/FleetPage';
import PropertiesPage from '../../pages/business/PropertiesPage';
import LandingPage from '../../pages/LandingPage';
import DashboardHome from '../../pages/DashboardHome';

beforeAll(() => {
  globalThis.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
  Object.defineProperty(window, 'scrollTo', { value: vi.fn(), writable: true });
  window.matchMedia =
    window.matchMedia ||
    (() => ({
      matches: false,
      addListener() {},
      removeListener() {},
      addEventListener() {},
      removeEventListener() {},
    }));
});

const pages = {
  AboutPage,
  LoginPage,
  SignUpConfirmationPage,
  FinancialDashboardOptions,
  FinancialDashboard1,
  FinancialDashboard2,
  FinancialDashboard3,
  BusinessComingSoon,
  BusinessDashboard,
  FleetPage,
  PropertiesPage,
  LandingPage,
  DashboardHome,
};

describe('page smoke renders', () => {
  Object.entries(pages).forEach(([name, Page]) => {
    it(`${name} renders without crashing`, () => {
      const { container } = render(
        <MemoryRouter initialEntries={[{ pathname: '/', state: { confirmationNumber: 'INS-123' } }]}>
          <ThemeProvider>
            <Page />
          </ThemeProvider>
        </MemoryRouter>
      );
      expect(container.firstChild).not.toBeNull();
    });
  });
});
