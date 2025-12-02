import React from 'react';
import { useNavigate } from 'react-router-dom';
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
  Stack,
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
import './DashboardHome.scss';

export default function DashboardHome() {
  const navigate = useNavigate();

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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Active':
      case 'Approved':
      case 'Paid':
        return <CheckmarkFilled size={16} className="status-icon status-icon-success" />;
      case 'In Review':
      case 'Pending':
        return <WarningFilled size={16} className="status-icon status-icon-warning" />;
      case 'Denied':
      case 'Cancelled':
        return <ErrorFilled size={16} className="status-icon status-icon-error" />;
      default:
        return null;
    }
  };

  const getStatusTag = (status) => {
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
  };

  return (
    <Grid fullWidth className="dashboard-home">
      <Column lg={16} md={8} sm={4} className="dashboard-header">
        <Heading className="dashboard-title">My Dashboard</Heading>
        <p className="dashboard-subtitle">
          Welcome back! Here's an overview of your insurance policies and recent activity.
        </p>
      </Column>

      {/* Quick Actions */}
      <Column lg={16} md={8} sm={4}>
        <div className="quick-actions">
          <ClickableTile className="action-tile">
            <div className="action-icon">
              <DocumentBlank size={32} />
            </div>
            <div className="action-content">
              <h4>View Policies</h4>
              <p>Manage your active insurance policies</p>
            </div>
            <ArrowRight size={20} className="action-arrow" />
          </ClickableTile>

          <ClickableTile className="action-tile">
            <div className="action-icon">
              <Task size={32} />
            </div>
            <div className="action-content">
              <h4>File a Claim</h4>
              <p>Submit a new insurance claim</p>
            </div>
            <ArrowRight size={20} className="action-arrow" />
          </ClickableTile>

          <ClickableTile className="action-tile">
            <div className="action-icon">
              <Wallet size={32} />
            </div>
            <div className="action-content">
              <h4>Make a Payment</h4>
              <p>Pay your premium or view billing</p>
            </div>
            <ArrowRight size={20} className="action-arrow" />
          </ClickableTile>
        </div>
      </Column>

      {/* Summary Stats */}
      <Column lg={5} md={4} sm={4}>
        <Tile className="stat-tile">
          <div className="stat-content">
            <div className="stat-icon-wrapper stat-icon-primary">
              <DocumentBlank size={24} />
            </div>
            <div className="stat-details">
              <p className="stat-label">Active Policies</p>
              <h3 className="stat-value">2</h3>
              <p className="stat-change stat-change-positive">All up to date</p>
            </div>
          </div>
        </Tile>
      </Column>

      <Column lg={5} md={4} sm={4}>
        <Tile className="stat-tile">
          <div className="stat-content">
            <div className="stat-icon-wrapper stat-icon-warning">
              <Task size={24} />
            </div>
            <div className="stat-details">
              <p className="stat-label">Open Claims</p>
              <h3 className="stat-value">1</h3>
              <p className="stat-change stat-change-warning">In review</p>
            </div>
          </div>
        </Tile>
      </Column>

      <Column lg={6} md={8} sm={4}>
        <Tile className="stat-tile">
          <div className="stat-content">
            <div className="stat-icon-wrapper stat-icon-success">
              <Wallet size={24} />
            </div>
            <div className="stat-details">
              <p className="stat-label">Total Monthly Premium</p>
              <h3 className="stat-value">$213.00</h3>
              <p className="stat-change">Next payment: Feb 15, 2024</p>
            </div>
          </div>
        </Tile>
      </Column>

      {/* My Policies Section */}
      <Column lg={16} md={8} sm={4}>
        <Tile className="data-tile">
          <div className="tile-header">
            <Heading className="tile-title">My Policies</Heading>
            <Button kind="ghost" size="sm" renderIcon={ArrowRight}>
              View All
            </Button>
          </div>
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
                              <div className="status-cell">
                                {getStatusIcon(cell.value)}
                                {getStatusTag(cell.value)}
                              </div>
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

      {/* Recent Claims Section */}
      <Column lg={16} md={8} sm={4}>
        <Tile className="data-tile">
          <div className="tile-header">
            <Heading className="tile-title">Recent Claims</Heading>
            <Button kind="ghost" size="sm" renderIcon={ArrowRight}>
              View All
            </Button>
          </div>
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
                              <div className="status-cell">
                                {getStatusIcon(cell.value)}
                                {getStatusTag(cell.value)}
                              </div>
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

      {/* Insurance Cards */}
      <Column lg={16} md={8} sm={4}>
        <Tile className="insurance-cards-section">
          <Heading className="tile-title">Digital Insurance Cards</Heading>
          <p className="section-description">
            Access and download your digital insurance cards for quick reference
          </p>
          <div className="insurance-cards">
            <Tile className="insurance-card">
              <div className="card-header">
                <h4>Auto Insurance Card</h4>
                <Tag type="green">Active</Tag>
              </div>
              <div className="card-details">
                <p><strong>Policy:</strong> POL-2024-001</p>
                <p><strong>Vehicle:</strong> 2022 Honda Civic</p>
                <p><strong>Valid Until:</strong> 12/31/2024</p>
              </div>
              <div className="card-actions">
                <Button kind="tertiary" size="sm">View Card</Button>
                <Button kind="ghost" size="sm">Download PDF</Button>
              </div>
            </Tile>

            <Tile className="insurance-card">
              <div className="card-header">
                <h4>Home Insurance Card</h4>
                <Tag type="green">Active</Tag>
              </div>
              <div className="card-details">
                <p><strong>Policy:</strong> POL-2024-002</p>
                <p><strong>Property:</strong> 123 Main St, Anytown</p>
                <p><strong>Valid Until:</strong> 12/31/2024</p>
              </div>
              <div className="card-actions">
                <Button kind="tertiary" size="sm">View Card</Button>
                <Button kind="ghost" size="sm">Download PDF</Button>
              </div>
            </Tile>
          </div>
        </Tile>
      </Column>
    </Grid>
  );
}
