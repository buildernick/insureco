import { Grid, Column } from '@carbon/react';

const quickActions = [
  {
    id: 'view-policies',
    title: 'View Policies',
    description: 'Manage your active insurance policies',
  },
  {
    id: 'file-claim',
    title: 'File a Claim',
    description: 'Submit a new insurance claim',
  },
  {
    id: 'make-payment',
    title: 'Make a Payment',
    description: 'Pay your premium or view billing',
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

const openClaimStatuses = new Set(['In Review', 'Pending']);

const getMonthlyPremiumValue = (premium) => Number.parseFloat(premium.replace(/[^\d.]/g, ''));

const totalMonthlyPremium = policies.reduce(
  (total, policy) => total + getMonthlyPremiumValue(policy.premium),
  0,
);

const activePoliciesCount = policies.filter((policy) => policy.status === 'Active').length;
const openClaimsCount = claims.filter((claim) => openClaimStatuses.has(claim.status)).length;
const nextPaymentDue = policies[0]?.nextDue ?? 'N/A';

export default function DashboardHome() {
  return (
    <Grid fullWidth>
      <Column lg={16} md={8} sm={4}>
        <section>
          <h1>My Dashboard</h1>
          <p>
            This page remains intentionally unstyled for screen-sharing demos, but the dashboard data is now wired back in.
          </p>
        </section>
      </Column>

      <Column lg={5} md={4} sm={4}>
        <section>
          <h2>Quick actions</h2>
          <p>Action wiring is still disabled.</p>
          <ul>
            {quickActions.map((action) => (
              <li key={action.id}>
                <strong>{action.title}</strong>
                <div>{action.description}</div>
              </li>
            ))}
          </ul>
        </section>
      </Column>

      <Column lg={5} md={4} sm={4}>
        <section>
          <h2>Summary</h2>
          <dl>
            <div>
              <dt>Active Policies</dt>
              <dd>{activePoliciesCount}</dd>
            </div>
            <div>
              <dt>Open Claims</dt>
              <dd>{openClaimsCount}</dd>
            </div>
            <div>
              <dt>Total Monthly Premium</dt>
              <dd>${totalMonthlyPremium.toFixed(2)}</dd>
            </div>
            <div>
              <dt>Next Payment</dt>
              <dd>{nextPaymentDue}</dd>
            </div>
          </dl>
        </section>
      </Column>

      <Column lg={6} md={8} sm={4}>
        <section>
          <h2>Data sections</h2>
          <ul>
            <li>{policies.length} policies loaded</li>
            <li>{claims.length} claims loaded</li>
            <li>{insuranceCards.length} digital cards loaded</li>
          </ul>
        </section>
      </Column>

      <Column lg={16} md={8} sm={4}>
        <section>
          <h2>My Policies</h2>
          <table>
            <thead>
              <tr>
                <th>Policy ID</th>
                <th>Type</th>
                <th>Status</th>
                <th>Premium</th>
                <th>Next Payment</th>
              </tr>
            </thead>
            <tbody>
              {policies.map((policy) => (
                <tr key={policy.id}>
                  <td>{policy.id}</td>
                  <td>{policy.type}</td>
                  <td>{policy.status}</td>
                  <td>{policy.premium}</td>
                  <td>{policy.nextDue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </Column>

      <Column lg={16} md={8} sm={4}>
        <section>
          <h2>Recent Claims</h2>
          <table>
            <thead>
              <tr>
                <th>Claim ID</th>
                <th>Type</th>
                <th>Date Filed</th>
                <th>Status</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {claims.map((claim) => (
                <tr key={claim.id}>
                  <td>{claim.id}</td>
                  <td>{claim.type}</td>
                  <td>{claim.date}</td>
                  <td>{claim.status}</td>
                  <td>{claim.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </Column>

      <Column lg={16} md={8} sm={4}>
        <section>
          <h2>Digital Insurance Cards</h2>
          <ul>
            {insuranceCards.map((card) => (
              <li key={card.id}>
                <h3>{card.title}</h3>
                <p>Status: {card.status}</p>
                <p>Policy: {card.policy}</p>
                <p>
                  {card.coveredItemLabel}: {card.coveredItem}
                </p>
                <p>Valid Until: {card.validUntil}</p>
              </li>
            ))}
          </ul>
        </section>
      </Column>

      <Column lg={16} md={8} sm={4}>
        <section>
          <h2>Temporary demo state</h2>
          <p>
            The dashboard data is visible again, while page-specific styling and interactive behavior remain intentionally turned off.
          </p>
        </section>
      </Column>
    </Grid>
  );
}
