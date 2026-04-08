import {
  Grid,
  Column,
  Tile,
  Tag,
  Heading,
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from '@carbon/react';
import {
  Dashboard,
  DocumentAdd,
  Wallet,
  ArrowRight,
  Home as HomeIcon,
} from '@carbon/icons-react';
import './DashboardHome.scss';

const quickActions = [
  {
    id: 'view-policies',
    title: 'View Policies',
    description: 'Review your active coverage, payment schedule, and account details.',
    icon: Dashboard,
  },
  {
    id: 'file-claim',
    title: 'File a Claim',
    description: 'Start a new claim flow when you are ready to continue outside the demo.',
    icon: DocumentAdd,
  },
  {
    id: 'make-payment',
    title: 'Make a Payment',
    description: 'Check billing activity and premium timing for your active policies.',
    icon: Wallet,
  },
];

const policies = [
  {
    id: 'POL-2024-001',
    type: 'Auto Insurance',
    status: 'Active',
    premium: '$124.00/mo',
    nextDue: '02/15/2024',
  },
  {
    id: 'POL-2024-002',
    type: 'Home Insurance',
    status: 'Active',
    premium: '$89.00/mo',
    nextDue: '02/15/2024',
  },
];

const claims = [
  {
    id: 'CLM-2024-045',
    type: 'Auto - Minor Collision',
    date: '01/12/2024',
    status: 'In Review',
    amount: '$2,450',
  },
  {
    id: 'CLM-2023-892',
    type: 'Home - Water Damage',
    date: '11/03/2023',
    status: 'Approved',
    amount: '$5,200',
  },
  {
    id: 'CLM-2023-756',
    type: 'Auto - Windshield',
    date: '09/21/2023',
    status: 'Paid',
    amount: '$350',
  },
];

const insuranceCards = [
  {
    id: 'auto-card',
    title: 'Auto Insurance Card',
    status: 'Active',
    policy: 'POL-2024-001',
    coveredItemLabel: 'Vehicle',
    coveredItem: '2022 Honda Civic',
    validUntil: '12/31/2024',
  },
  {
    id: 'home-card',
    title: 'Home Insurance Card',
    status: 'Active',
    policy: 'POL-2024-002',
    coveredItemLabel: 'Property',
    coveredItem: '123 Main St, Anytown',
    validUntil: '12/31/2024',
  },
];

const policyHeaders = [
  { key: 'id', header: 'Policy ID' },
  { key: 'type', header: 'Type' },
  { key: 'status', header: 'Status' },
  { key: 'premium', header: 'Premium' },
  { key: 'nextDue', header: 'Next Payment' },
];

const claimHeaders = [
  { key: 'id', header: 'Claim ID' },
  { key: 'type', header: 'Type' },
  { key: 'date', header: 'Date Filed' },
  { key: 'status', header: 'Status' },
  { key: 'amount', header: 'Amount' },
];

const openClaimStatuses = new Set(['In Review', 'Pending']);

const getMonthlyPremiumValue = (premium) => Number.parseFloat(premium.replace(/[^\d.]/g, ''));

const getStatusTagType = (status) => {
  switch (status) {
    case 'Active':
    case 'Approved':
      return 'green';
    case 'In Review':
    case 'Pending':
      return 'purple';
    case 'Paid':
      return 'teal';
    default:
      return 'gray';
  }
};

const totalMonthlyPremium = policies.reduce(
  (total, policy) => total + getMonthlyPremiumValue(policy.premium),
  0,
);

const activePoliciesCount = policies.filter((policy) => policy.status === 'Active').length;
const openClaimsCount = claims.filter((claim) => openClaimStatuses.has(claim.status)).length;
const nextPaymentDue = policies[0]?.nextDue ?? 'N/A';

const policyRows = policies.map((policy) => ({
  id: policy.id,
  type: policy.type,
  status: policy.status,
  premium: policy.premium,
  nextDue: policy.nextDue,
}));

const claimRows = claims.map((claim) => ({
  id: claim.id,
  type: claim.type,
  date: claim.date,
  status: claim.status,
  amount: claim.amount,
}));

const dataSections = [
  {
    id: 'policies',
    label: 'Policies loaded',
    value: `${policies.length}`,
    detail: 'Coverage records restored',
  },
  {
    id: 'claims',
    label: 'Claims loaded',
    value: `${claims.length}`,
    detail: 'Recent claim activity available',
  },
  {
    id: 'cards',
    label: 'Digital cards loaded',
    value: `${insuranceCards.length}`,
    detail: 'Proof of coverage ready to review',
  },
];

export default function DashboardHome() {
  return (
    <Grid fullWidth className="dashboard-home">
      <Column lg={16} md={8} sm={4} className="dashboard-header">
        <div className="dashboard-header-content">
          <div className="dashboard-header-copy">
            <div className="dashboard-kicker">
              <HomeIcon size={28} className="dashboard-page-icon" />
              <Tag type="blue" size="sm">
                Personal dashboard
              </Tag>
            </div>
            <Heading className="dashboard-title">My Dashboard</Heading>
            <p className="dashboard-subtitle">
              Review your policies, claims, payments, and digital insurance cards in one place.
            </p>
          </div>
          <Tag type="warm-gray">Demo state</Tag>
        </div>
        <p className="dashboard-surface-note">
          Action wiring is still disabled for screen-sharing demos, but the page now uses the same
          admin surface styling as the rest of the application.
        </p>
      </Column>

      <Column lg={16} md={8} sm={4}>
        <div className="quick-actions">
          {quickActions.map(({ id, title, description, icon: Icon }) => (
            <Tile key={id} className="action-tile">
              <div className="action-tile-header">
                <div className="action-icon">
                  <Icon size={24} />
                </div>
                <Tag type="warm-gray" size="sm">
                  Preview only
                </Tag>
              </div>
              <div className="action-content">
                <h4>{title}</h4>
                <p>{description}</p>
              </div>
              <div className="action-footer">
                <span className="action-state-label">Available outside demo mode</span>
                <ArrowRight size={20} className="action-arrow" />
              </div>
            </Tile>
          ))}
        </div>
      </Column>

      <Column lg={4} md={4} sm={4}>
        <Tile className="stat-tile">
          <div className="stat-content">
            <div className="stat-icon-wrapper stat-icon-primary">
              <Dashboard size={20} />
            </div>
            <div className="stat-details">
              <p className="stat-label">Active Policies</p>
              <h3 className="stat-value">{activePoliciesCount}</h3>
              <p className="stat-change">{policies.length} policies on file</p>
            </div>
          </div>
        </Tile>
      </Column>

      <Column lg={4} md={4} sm={4}>
        <Tile className="stat-tile">
          <div className="stat-content">
            <div className="stat-icon-wrapper stat-icon-warning">
              <DocumentAdd size={20} />
            </div>
            <div className="stat-details">
              <p className="stat-label">Open Claims</p>
              <h3 className="stat-value">{openClaimsCount}</h3>
              <p className="stat-change">{claims.length} total claims tracked</p>
            </div>
          </div>
        </Tile>
      </Column>

      <Column lg={4} md={4} sm={4}>
        <Tile className="stat-tile">
          <div className="stat-content">
            <div className="stat-icon-wrapper stat-icon-success">
              <Wallet size={20} />
            </div>
            <div className="stat-details">
              <p className="stat-label">Total Monthly Premium</p>
              <h3 className="stat-value">${totalMonthlyPremium.toFixed(2)}</h3>
              <p className="stat-change">Combined active premium</p>
            </div>
          </div>
        </Tile>
      </Column>

      <Column lg={4} md={4} sm={4}>
        <Tile className="stat-tile">
          <div className="stat-content">
            <div className="stat-icon-wrapper stat-icon-secondary">
              <ArrowRight size={20} />
            </div>
            <div className="stat-details">
              <p className="stat-label">Next Payment</p>
              <h3 className="stat-value">{nextPaymentDue}</h3>
              <p className="stat-change">AutoPay schedule on file</p>
            </div>
          </div>
        </Tile>
      </Column>

      <Column lg={16} md={8} sm={4}>
        <Tile className="data-tile">
          <div className="tile-header">
            <div className="tile-heading-group">
              <Heading className="tile-title">Connected Data</Heading>
              <p className="section-description">
                Restored account modules styled to match other admin surfaces in the application.
              </p>
            </div>
            <Tag type="blue" size="sm">
              Synced
            </Tag>
          </div>
          <ul className="dashboard-data-overview">
            {dataSections.map((section) => (
              <li key={section.id} className="dashboard-data-point">
                <div>
                  <p className="dashboard-data-label">{section.label}</p>
                  <p className="dashboard-data-detail">{section.detail}</p>
                </div>
                <span className="dashboard-data-value">{section.value}</span>
              </li>
            ))}
          </ul>
        </Tile>
      </Column>

      <Column lg={16} md={8} sm={4}>
        <Tile className="data-tile">
          <div className="tile-header">
            <Heading className="tile-title">My Policies</Heading>
            <Tag type="green" size="sm">
              {activePoliciesCount} active
            </Tag>
          </div>
          <DataTable rows={policyRows} headers={policyHeaders}>
            {({ rows, headers, getHeaderProps, getRowProps, getTableProps }) => (
              <Table {...getTableProps()} aria-label="My Policies">
                <TableHead>
                  <TableRow>
                    {headers.map((header) => {
                      const { key, ...headerProps } = getHeaderProps({ header });
                      return (
                        <TableHeader key={key} {...headerProps}>
                          {header.header}
                        </TableHeader>
                      );
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => {
                    const { key, ...rowProps } = getRowProps({ row });
                    return (
                      <TableRow key={key} {...rowProps}>
                        {row.cells.map((cell) => (
                          <TableCell key={cell.id}>
                            {cell.info.header === 'status' ? (
                              <Tag type={getStatusTagType(cell.value)}>{cell.value}</Tag>
                            ) : (
                              cell.value
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </DataTable>
        </Tile>
      </Column>

      <Column lg={16} md={8} sm={4}>
        <Tile className="data-tile">
          <div className="tile-header">
            <Heading className="tile-title">Recent Claims</Heading>
            <Tag type="purple" size="sm">
              {openClaimsCount} open
            </Tag>
          </div>
          <DataTable rows={claimRows} headers={claimHeaders}>
            {({ rows, headers, getHeaderProps, getRowProps, getTableProps }) => (
              <Table {...getTableProps()} aria-label="Recent Claims">
                <TableHead>
                  <TableRow>
                    {headers.map((header) => {
                      const { key, ...headerProps } = getHeaderProps({ header });
                      return (
                        <TableHeader key={key} {...headerProps}>
                          {header.header}
                        </TableHeader>
                      );
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => {
                    const { key, ...rowProps } = getRowProps({ row });
                    return (
                      <TableRow key={key} {...rowProps}>
                        {row.cells.map((cell) => (
                          <TableCell key={cell.id}>
                            {cell.info.header === 'status' ? (
                              <Tag type={getStatusTagType(cell.value)}>{cell.value}</Tag>
                            ) : (
                              cell.value
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </DataTable>
        </Tile>
      </Column>

      <Column lg={16} md={8} sm={4}>
        <Tile className="insurance-cards-section">
          <div className="tile-header">
            <div className="tile-heading-group">
              <Heading className="tile-title">Digital Insurance Cards</Heading>
              <p className="section-description">
                Download-ready proof of insurance for each active policy on your account.
              </p>
            </div>
            <Tag type="green" size="sm">
              {insuranceCards.length} ready
            </Tag>
          </div>
          <div className="insurance-cards">
            {insuranceCards.map((card) => (
              <Tile key={card.id} className="insurance-card">
                <div className="card-header">
                  <h4>{card.title}</h4>
                  <Tag type={getStatusTagType(card.status)} size="sm">
                    {card.status}
                  </Tag>
                </div>
                <div className="card-details">
                  <div className="card-detail-row">
                    <span className="card-detail-label">Policy</span>
                    <span className="card-detail-value">{card.policy}</span>
                  </div>
                  <div className="card-detail-row">
                    <span className="card-detail-label">{card.coveredItemLabel}</span>
                    <span className="card-detail-value">{card.coveredItem}</span>
                  </div>
                  <div className="card-detail-row">
                    <span className="card-detail-label">Valid until</span>
                    <span className="card-detail-value">{card.validUntil}</span>
                  </div>
                </div>
              </Tile>
            ))}
          </div>
        </Tile>
      </Column>

      <Column lg={16} md={8} sm={4}>
        <Tile className="data-tile dashboard-demo-note">
          <div className="tile-header">
            <Heading className="tile-title">Temporary Demo State</Heading>
            <Tag type="warm-gray" size="sm">
              Actions off
            </Tag>
          </div>
          <p className="section-description">
            The dashboard now follows the project design system. Interactive flows remain intentionally disabled for demos.
          </p>
        </Tile>
      </Column>
    </Grid>
  );
}
