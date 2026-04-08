import {
  Grid,
  Column,
  Tile,
  ClickableTile,
  Button,
  Tag,
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  Heading,
} from '@carbon/react';
import {
  DocumentBlank,
  Wallet,
  Task,
  ArrowRight,
  CheckmarkFilled,
  ErrorFilled,
  WarningFilled,
} from '@carbon/icons-react';

const quickActions = [
  {
    title: 'View Policies',
    description: 'Manage your active insurance policies',
    icon: DocumentBlank,
  },
  {
    title: 'File a Claim',
    description: 'Submit a new insurance claim',
    icon: Task,
  },
  {
    title: 'Make a Payment',
    description: 'Pay your premium or view billing',
    icon: Wallet,
  },
];

const summaryCards = [
  {
    title: 'Active Policies',
    value: '2',
    detail: 'All up to date',
    icon: DocumentBlank,
  },
  {
    title: 'Open Claims',
    value: '1',
    detail: 'In review',
    icon: Task,
  },
  {
    title: 'Total Monthly Premium',
    value: '$213.00',
    detail: 'Next payment: Feb 15, 2024',
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

function getStatusIcon(status) {
  switch (status) {
    case 'Active':
    case 'Approved':
    case 'Paid':
      return <CheckmarkFilled size={16} />;
    case 'In Review':
    case 'Pending':
      return <WarningFilled size={16} />;
    case 'Denied':
    case 'Cancelled':
      return <ErrorFilled size={16} />;
    default:
      return null;
  }
}

function getStatusTag(status) {
  switch (status) {
    case 'Active':
    case 'Approved':
    case 'Paid':
      return <Tag type="green">{status}</Tag>;
    case 'In Review':
    case 'Pending':
      return <Tag type="blue">{status}</Tag>;
    case 'Denied':
    case 'Cancelled':
      return <Tag type="red">{status}</Tag>;
    default:
      return <Tag type="gray">{status}</Tag>;
  }
}

function SectionHeader({ title }) {
  return <Heading>{title}</Heading>;
}

export default function DashboardHome() {
  return (
    <Grid fullWidth>
      <Column lg={16} md={8} sm={4}>
        <h1>My Dashboard</h1>
        <p>
          Welcome back! Here&apos;s an overview of your insurance policies and
          recent activity.
        </p>
      </Column>

      <Column lg={16} md={8} sm={4}>
        <SectionHeader title="Quick Actions" />
        <Grid fullWidth>
          {quickActions.map((action) => {
            const Icon = action.icon;

            return (
              <Column key={action.title} lg={5} md={4} sm={4}>
                <ClickableTile>
                  <Icon size={32} />
                  <h4>{action.title}</h4>
                  <p>{action.description}</p>
                  <ArrowRight size={20} />
                </ClickableTile>
              </Column>
            );
          })}
        </Grid>
      </Column>

      {summaryCards.map((card, index) => {
        const Icon = card.icon;
        const lgSpan = index < 2 ? 5 : 6;
        const mdSpan = index < 2 ? 4 : 8;

        return (
          <Column key={card.title} lg={lgSpan} md={mdSpan} sm={4}>
            <Tile>
              <Icon size={24} />
              <p>{card.title}</p>
              <h3>{card.value}</h3>
              <p>{card.detail}</p>
            </Tile>
          </Column>
        );
      })}

      <Column lg={16} md={8} sm={4}>
        <Tile>
          <Grid fullWidth>
            <Column lg={12} md={6} sm={4}>
              <SectionHeader title="My Policies" />
            </Column>
            <Column lg={4} md={2} sm={4}>
              <Button kind="ghost" size="sm" renderIcon={ArrowRight}>
                View All
              </Button>
            </Column>
          </Grid>
          <DataTable rows={policies} headers={policyHeaders} isSortable>
            {({ rows, headers, getHeaderProps, getRowProps, getTableProps }) => (
              <Table {...getTableProps()}>
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
                              <>
                                {getStatusIcon(cell.value)} {getStatusTag(cell.value)}
                              </>
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
        <Tile>
          <Grid fullWidth>
            <Column lg={12} md={6} sm={4}>
              <SectionHeader title="Recent Claims" />
            </Column>
            <Column lg={4} md={2} sm={4}>
              <Button kind="ghost" size="sm" renderIcon={ArrowRight}>
                View All
              </Button>
            </Column>
          </Grid>
          <DataTable rows={claims} headers={claimHeaders} isSortable>
            {({ rows, headers, getHeaderProps, getRowProps, getTableProps }) => (
              <Table {...getTableProps()}>
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
                              <>
                                {getStatusIcon(cell.value)} {getStatusTag(cell.value)}
                              </>
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
        <Tile>
          <SectionHeader title="Digital Insurance Cards" />
          <p>
            Access and download your digital insurance cards for quick reference.
          </p>
          <Grid fullWidth>
            <Column lg={8} md={4} sm={4}>
              <Tile>
                <h4>Auto Insurance Card</h4>
                <Tag type="green">Active</Tag>
                <p>
                  <strong>Policy:</strong> POL-2024-001
                </p>
                <p>
                  <strong>Vehicle:</strong> 2022 Honda Civic
                </p>
                <p>
                  <strong>Valid Until:</strong> 12/31/2024
                </p>
                <Button kind="tertiary" size="sm">
                  View Card
                </Button>
                <Button kind="ghost" size="sm">
                  Download PDF
                </Button>
              </Tile>
            </Column>

            <Column lg={8} md={4} sm={4}>
              <Tile>
                <h4>Home Insurance Card</h4>
                <Tag type="green">Active</Tag>
                <p>
                  <strong>Policy:</strong> POL-2024-002
                </p>
                <p>
                  <strong>Property:</strong> 123 Main St, Anytown
                </p>
                <p>
                  <strong>Valid Until:</strong> 12/31/2024
                </p>
                <Button kind="tertiary" size="sm">
                  View Card
                </Button>
                <Button kind="ghost" size="sm">
                  Download PDF
                </Button>
              </Tile>
            </Column>
          </Grid>
        </Tile>
      </Column>
    </Grid>
  );
}
