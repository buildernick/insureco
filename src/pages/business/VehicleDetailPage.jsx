import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Grid,
  Column,
  Tile,
  Button,
  Heading,
  Breadcrumb,
  BreadcrumbItem,
  Tag,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@carbon/react';
import {
  ArrowLeft,
  CarFront,
  User,
  Calendar,
  Money,
  DocumentView,
  WarningAlt,
  Dashboard,
} from '@carbon/icons-react';
import { getVehicleById, getClaimsForAsset, getPaymentsForAsset } from '../../data/businessMockData';
import { formatCurrency, formatDate, formatMileage, formatVehicleName, formatVIN, getStatusTagType } from '../../utils/businessHelpers';
import './VehicleDetailPage.scss';

/**
 * VehicleDetailPage - Detailed view of a single vehicle
 * Shows vehicle information, coverage, claims, and payment history
 */
export default function VehicleDetailPage() {
  const { vehicleId } = useParams();
  const navigate = useNavigate();

  const vehicle = getVehicleById(vehicleId);
  const claims = getClaimsForAsset(vehicleId);
  const payments = getPaymentsForAsset(vehicleId);

  if (!vehicle) {
    return (
      <Grid fullWidth className="vehicle-detail-page">
        <Column lg={16} md={8} sm={4}>
          <Tile className="error-tile">
            <WarningAlt size={48} />
            <Heading>Vehicle Not Found</Heading>
            <p>The vehicle you're looking for doesn't exist or has been removed.</p>
            <Button kind="primary" onClick={() => navigate('/business/fleet')}>
              Back to Fleet
            </Button>
          </Tile>
        </Column>
      </Grid>
    );
  }

  return (
    <Grid fullWidth className="vehicle-detail-page">
      {/* Breadcrumb Navigation */}
      <Column lg={16} md={8} sm={4} className="breadcrumb-section">
        <Breadcrumb noTrailingSlash>
          <BreadcrumbItem href="/business/dashboard">Business Dashboard</BreadcrumbItem>
          <BreadcrumbItem href="/business/fleet">Fleet</BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>{formatVehicleName(vehicle)}</BreadcrumbItem>
        </Breadcrumb>
      </Column>

      {/* Header Section */}
      <Column lg={16} md={8} sm={4} className="page-header">
        <div className="header-content">
          <Button
            kind="ghost"
            onClick={() => navigate('/business/fleet')}
          >
            <ArrowLeft style={{ marginRight: '0.5rem' }} />
            Back
          </Button>
          <div className="header-title">
            <CarFront size={32} className="page-icon" />
            <div>
              <div className="title-row">
                <Heading className="page-title">{formatVehicleName(vehicle)}</Heading>
                <Tag type={getStatusTagType(vehicle.status, 'asset')} size="md">
                  {vehicle.status}
                </Tag>
              </div>
              <p className="page-subtitle">{vehicle.id} • {vehicle.licensePlate}</p>
            </div>
          </div>
        </div>
      </Column>

      {/* Quick Stats */}
      <Column lg={4} md={2} sm={2}>
        <Tile className="stat-card">
          <div className="stat-icon">
            <Money size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Monthly Premium</p>
            <h3 className="stat-value">{formatCurrency(vehicle.monthlyPremium)}</h3>
            <p className="stat-detail">{formatCurrency(vehicle.yearlyPremium)}/year</p>
          </div>
        </Tile>
      </Column>

      <Column lg={4} md={2} sm={2}>
        <Tile className="stat-card">
          <div className="stat-icon">
            <DocumentView size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Coverage Limit</p>
            <h3 className="stat-value">{formatCurrency(vehicle.coverageLimit, false)}</h3>
            <p className="stat-detail">Deductible: {formatCurrency(vehicle.deductible, false)}</p>
          </div>
        </Tile>
      </Column>

      <Column lg={4} md={2} sm={2}>
        <Tile className="stat-card">
          <div className="stat-icon">
            <Dashboard size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Current Mileage</p>
            <h3 className="stat-value">{formatMileage(vehicle.currentMileage, false)}</h3>
            <p className="stat-detail">miles</p>
          </div>
        </Tile>
      </Column>

      <Column lg={4} md={2} sm={2}>
        <Tile className="stat-card">
          <div className="stat-icon">
            <WarningAlt size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Claims</p>
            <h3 className="stat-value">{vehicle.claimsCount}</h3>
            <p className="stat-detail">{vehicle.openClaims} currently open</p>
          </div>
        </Tile>
      </Column>

      {/* Tabbed Content */}
      <Column lg={16} md={8} sm={4}>
        <Tabs>
          <TabList aria-label="Vehicle details tabs">
            <Tab>Vehicle Details</Tab>
            <Tab>Coverage Information</Tab>
            <Tab>Claims History ({claims.length})</Tab>
            <Tab>Payments ({payments.length})</Tab>
          </TabList>
          <TabPanels>
            {/* Vehicle Details Tab */}
            <TabPanel>
              <Tile className="detail-tile">
                <div className="detail-section">
                  <div className="section-header">
                    <CarFront size={20} />
                    <h4>Vehicle Information</h4>
                  </div>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <label>Make</label>
                      <p>{vehicle.make}</p>
                    </div>
                    <div className="detail-item">
                      <label>Model</label>
                      <p>{vehicle.model}</p>
                    </div>
                    <div className="detail-item">
                      <label>Year</label>
                      <p>{vehicle.year}</p>
                    </div>
                    <div className="detail-item">
                      <label>Vehicle Type</label>
                      <p>{vehicle.vehicleType}</p>
                    </div>
                    <div className="detail-item">
                      <label>VIN</label>
                      <p className="vin">{formatVIN(vehicle.vin, true)}</p>
                    </div>
                    <div className="detail-item">
                      <label>License Plate</label>
                      <p>{vehicle.licensePlate}</p>
                    </div>
                    <div className="detail-item">
                      <label>Current Mileage</label>
                      <p>{formatMileage(vehicle.currentMileage)}</p>
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <div className="section-header">
                    <User size={20} />
                    <h4>Assignment Information</h4>
                  </div>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <label>Assigned Driver</label>
                      <p>{vehicle.assignedDriver}</p>
                    </div>
                    <div className="detail-item">
                      <label>Department</label>
                      <p>{vehicle.department}</p>
                    </div>
                    {vehicle.lastKnownLocation && (
                      <>
                        <div className="detail-item">
                          <label>Last Known Location</label>
                          <p>
                            {vehicle.lastKnownLocation.lat.toFixed(4)}, {vehicle.lastKnownLocation.lng.toFixed(4)}
                          </p>
                        </div>
                        <div className="detail-item">
                          <label>Location Updated</label>
                          <p>{formatDate(vehicle.lastLocationUpdate)}</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </Tile>
            </TabPanel>

            {/* Coverage Information Tab */}
            <TabPanel>
              <Tile className="detail-tile">
                <div className="detail-section">
                  <div className="section-header">
                    <DocumentView size={20} />
                    <h4>Coverage Details</h4>
                  </div>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <label>Coverage Type</label>
                      <p>{vehicle.coverageType}</p>
                    </div>
                    <div className="detail-item">
                      <label>Coverage Limit</label>
                      <p>{formatCurrency(vehicle.coverageLimit)}</p>
                    </div>
                    <div className="detail-item">
                      <label>Deductible</label>
                      <p>{formatCurrency(vehicle.deductible)}</p>
                    </div>
                    <div className="detail-item">
                      <label>Monthly Premium</label>
                      <p>{formatCurrency(vehicle.monthlyPremium)}</p>
                    </div>
                    <div className="detail-item">
                      <label>Yearly Premium</label>
                      <p>{formatCurrency(vehicle.yearlyPremium)}</p>
                    </div>
                  </div>
                </div>
              </Tile>
            </TabPanel>

            {/* Claims History Tab */}
            <TabPanel>
              <Tile className="detail-tile">
                {claims.length > 0 ? (
                  <div className="claims-list">
                    {claims.map(claim => (
                      <div key={claim.id} className="claim-item">
                        <div className="claim-header">
                          <div>
                            <h5>{claim.claimType}</h5>
                            <p className="claim-id">{claim.id}</p>
                          </div>
                          <Tag type={getStatusTagType(claim.status, 'claim')}>
                            {claim.status}
                          </Tag>
                        </div>
                        <p className="claim-description">{claim.description}</p>
                        <div className="claim-details">
                          <div>
                            <label>Incident Date</label>
                            <p>{formatDate(claim.incidentDate)}</p>
                          </div>
                          <div>
                            <label>Claim Amount</label>
                            <p>{formatCurrency(claim.claimAmount)}</p>
                          </div>
                          {claim.approvedAmount && (
                            <div>
                              <label>Approved Amount</label>
                              <p>{formatCurrency(claim.approvedAmount)}</p>
                            </div>
                          )}
                          <div>
                            <label>Adjuster</label>
                            <p>{claim.adjuster}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <WarningAlt size={48} />
                    <p>No claims filed for this vehicle</p>
                  </div>
                )}
              </Tile>
            </TabPanel>

            {/* Payments Tab */}
            <TabPanel>
              <Tile className="detail-tile">
                {payments.length > 0 ? (
                  <div className="payments-list">
                    {payments.map(payment => (
                      <div key={payment.id} className="payment-item">
                        <div className="payment-header">
                          <div>
                            <h5>{payment.paymentType}</h5>
                            <p className="payment-id">{payment.id}</p>
                          </div>
                          <Tag type={getStatusTagType(payment.status, 'payment')}>
                            {payment.status}
                          </Tag>
                        </div>
                        <p className="payment-description">{payment.description}</p>
                        <div className="payment-details">
                          <div>
                            <label>Payment Date</label>
                            <p>{formatDate(payment.paymentDate)}</p>
                          </div>
                          <div>
                            <label>Amount</label>
                            <p>{formatCurrency(payment.amount)}</p>
                          </div>
                          <div>
                            <label>Payment Method</label>
                            <p>{payment.paymentMethod}</p>
                          </div>
                          <div>
                            <label>Confirmation</label>
                            <p>{payment.confirmationNumber}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <Money size={48} />
                    <p>No payments found for this vehicle</p>
                  </div>
                )}
              </Tile>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Column>

      {/* Action Buttons */}
      <Column lg={16} md={8} sm={4}>
        <div className="action-buttons">
          <Button kind="primary" onClick={() => navigate('/business/file-claim', { state: { assetId: vehicle.id, assetType: 'vehicle' } })}>
            File a Claim
          </Button>
          <Button kind="secondary" onClick={() => navigate('/business/make-payment', { state: { assetId: vehicle.id } })}>
            Make a Payment
          </Button>
          <Button kind="tertiary">Update Mileage</Button>
          <Button kind="tertiary">Download Policy</Button>
        </div>
      </Column>
    </Grid>
  );
}
