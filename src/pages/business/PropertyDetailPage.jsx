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
  Building,
  Location,
  Calendar,
  Money,
  DocumentView,
  WarningAlt,
} from '@carbon/icons-react';
import { getPropertyById, getClaimsForAsset, getPaymentsForAsset } from '../../data/businessMockData';
import { formatCurrency, formatDate, getStatusTagType } from '../../utils/businessHelpers';
import './PropertyDetailPage.scss';

/**
 * PropertyDetailPage - Detailed view of a single property
 * Shows property information, coverage, claims, and payment history
 */
export default function PropertyDetailPage() {
  const { propertyId } = useParams();
  const navigate = useNavigate();

  const property = getPropertyById(propertyId);
  const claims = getClaimsForAsset(propertyId);
  const payments = getPaymentsForAsset(propertyId);

  if (!property) {
    return (
      <Grid fullWidth className="property-detail-page">
        <Column lg={16} md={8} sm={4}>
          <Tile className="error-tile">
            <WarningAlt size={48} />
            <Heading>Property Not Found</Heading>
            <p>The property you're looking for doesn't exist or has been removed.</p>
            <Button kind="primary" onClick={() => navigate('/business/properties')}>
              Back to Properties
            </Button>
          </Tile>
        </Column>
      </Grid>
    );
  }

  return (
    <Grid fullWidth className="property-detail-page">
      {/* Breadcrumb Navigation */}
      <Column lg={16} md={8} sm={4} className="breadcrumb-section">
        <Breadcrumb noTrailingSlash>
          <BreadcrumbItem href="/business/dashboard">Business Dashboard</BreadcrumbItem>
          <BreadcrumbItem href="/business/properties">Properties</BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>{property.name}</BreadcrumbItem>
        </Breadcrumb>
      </Column>

      {/* Header Section */}
      <Column lg={16} md={8} sm={4} className="page-header">
        <div className="header-content">
          <Button
            kind="ghost"
            renderIcon={ArrowLeft}
            iconDescription="Back"
            onClick={() => navigate('/business/properties')}
          >
            Back
          </Button>
          <div className="header-title">
            <Building size={32} className="page-icon" />
            <div>
              <div className="title-row">
                <Heading className="page-title">{property.name}</Heading>
                <Tag type={getStatusTagType(property.status, 'asset')} size="md">
                  {property.status}
                </Tag>
              </div>
              <p className="page-subtitle">{property.id}</p>
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
            <h3 className="stat-value">{formatCurrency(property.monthlyPremium)}</h3>
            <p className="stat-detail">{formatCurrency(property.yearlyPremium)}/year</p>
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
            <h3 className="stat-value">{formatCurrency(property.coverageLimit, false)}</h3>
            <p className="stat-detail">Deductible: {formatCurrency(property.deductible, false)}</p>
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
            <h3 className="stat-value">{property.claimsCount}</h3>
            <p className="stat-detail">{property.openClaims} currently open</p>
          </div>
        </Tile>
      </Column>

      <Column lg={4} md={2} sm={2}>
        <Tile className="stat-card">
          <div className="stat-icon">
            <Calendar size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Next Inspection</p>
            <h3 className="stat-value">{formatDate(property.nextInspectionDate, 'short')}</h3>
            <p className="stat-detail">Last: {formatDate(property.lastInspectionDate, 'short')}</p>
          </div>
        </Tile>
      </Column>

      {/* Tabbed Content */}
      <Column lg={16} md={8} sm={4}>
        <Tabs>
          <TabList aria-label="Property details tabs">
            <Tab>Property Details</Tab>
            <Tab>Coverage Information</Tab>
            <Tab>Claims History ({claims.length})</Tab>
            <Tab>Payments ({payments.length})</Tab>
          </TabList>
          <TabPanels>
            {/* Property Details Tab */}
            <TabPanel>
              <Tile className="detail-tile">
                <div className="detail-section">
                  <div className="section-header">
                    <Location size={20} />
                    <h4>Location & Address</h4>
                  </div>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <label>Address</label>
                      <p>{property.address}</p>
                    </div>
                    <div className="detail-item">
                      <label>City</label>
                      <p>{property.city}</p>
                    </div>
                    <div className="detail-item">
                      <label>State</label>
                      <p>{property.state}</p>
                    </div>
                    <div className="detail-item">
                      <label>Zip Code</label>
                      <p>{property.zipCode}</p>
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <div className="section-header">
                    <Building size={20} />
                    <h4>Building Information</h4>
                  </div>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <label>Property Type</label>
                      <p>{property.propertyType}</p>
                    </div>
                    <div className="detail-item">
                      <label>Building Class</label>
                      <p>{property.buildingClass}</p>
                    </div>
                    <div className="detail-item">
                      <label>Square Feet</label>
                      <p>{property.squareFeet?.toLocaleString()} sq ft</p>
                    </div>
                    <div className="detail-item">
                      <label>Year Built</label>
                      <p>{property.yearBuilt}</p>
                    </div>
                    <div className="detail-item">
                      <label>Number of Stories</label>
                      <p>{property.stories}</p>
                    </div>
                    <div className="detail-item">
                      <label>Occupancy Rate</label>
                      <p>{property.occupancy}</p>
                    </div>
                    <div className="detail-item">
                      <label>Parking</label>
                      <p>{property.parking}</p>
                    </div>
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
                      <p>{property.coverageType}</p>
                    </div>
                    <div className="detail-item">
                      <label>Coverage Limit</label>
                      <p>{formatCurrency(property.coverageLimit)}</p>
                    </div>
                    <div className="detail-item">
                      <label>Deductible</label>
                      <p>{formatCurrency(property.deductible)}</p>
                    </div>
                    <div className="detail-item">
                      <label>Monthly Premium</label>
                      <p>{formatCurrency(property.monthlyPremium)}</p>
                    </div>
                    <div className="detail-item">
                      <label>Yearly Premium</label>
                      <p>{formatCurrency(property.yearlyPremium)}</p>
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <div className="section-header">
                    <Calendar size={20} />
                    <h4>Inspection Schedule</h4>
                  </div>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <label>Last Inspection</label>
                      <p>{formatDate(property.lastInspectionDate)}</p>
                    </div>
                    <div className="detail-item">
                      <label>Next Inspection</label>
                      <p>{formatDate(property.nextInspectionDate)}</p>
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
                    <p>No claims filed for this property</p>
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
                    <p>No payments found for this property</p>
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
          <Button kind="primary" onClick={() => navigate('/business/file-claim', { state: { assetId: property.id, assetType: 'property' } })}>
            File a Claim
          </Button>
          <Button kind="secondary" onClick={() => navigate('/business/make-payment', { state: { assetId: property.id } })}>
            Make a Payment
          </Button>
          <Button kind="tertiary">Request Inspection</Button>
          <Button kind="tertiary">Download Policy</Button>
        </div>
      </Column>
    </Grid>
  );
}
