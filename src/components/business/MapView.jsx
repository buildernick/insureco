import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import { Button, Tag } from '@carbon/react';
import { Building, CarFront } from '@carbon/icons-react';
import { formatCurrency, getStatusTagType } from '../../utils/businessHelpers';
import 'leaflet/dist/leaflet.css';
import './MapView.scss';

// Fix for default marker icons in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom icon for properties (building/red)
const propertyIcon = new L.DivIcon({
  className: 'custom-marker property-marker',
  html: `<div class="marker-icon">
    <svg width="24" height="24" viewBox="0 0 32 32" fill="currentColor">
      <path d="M16 2L6 12v18h8v-10h4v10h8V12L16 2zm0 2.8L24 13v15h-4V18h-8v10H8V13l8-8.2z"/>
    </svg>
  </div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// Custom icon for vehicles (car/blue)
const vehicleIcon = new L.DivIcon({
  className: 'custom-marker vehicle-marker',
  html: `<div class="marker-icon">
    <svg width="24" height="24" viewBox="0 0 32 32" fill="currentColor">
      <path d="M26 14h-2.276l-2.276-4.553A2.004 2.004 0 0019.658 8H12.34a2.004 2.004 0 00-1.789 1.106L8.277 14H6a2.002 2.002 0 00-2 2v7a2.002 2.002 0 002 2v3h2v-3h20v3h2v-3a2.002 2.002 0 002-2v-7a2.002 2.002 0 00-2-2zM12.341 10h7.317l2 4H10.343zM6 23v-7h20v7zM10 18a2 2 0 11-2 2 2.002 2.002 0 012-2zm14 0a2 2 0 11-2 2 2.002 2.002 0 012-2z"/>
    </svg>
  </div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// Custom cluster icon function for properties (red clusters)
const createPropertyClusterIcon = (cluster) => {
  const count = cluster.getChildCount();
  let sizeClass = 'marker-cluster-small';
  
  if (count >= 100) {
    sizeClass = 'marker-cluster-large';
  } else if (count >= 10) {
    sizeClass = 'marker-cluster-medium';
  }
  
  return L.divIcon({
    html: `<div><span>${count}</span></div>`,
    className: `marker-cluster marker-cluster-property ${sizeClass}`,
    iconSize: L.point(40, 40, true),
  });
};

// Custom cluster icon function for vehicles (blue clusters)
const createVehicleClusterIcon = (cluster) => {
  const count = cluster.getChildCount();
  let sizeClass = 'marker-cluster-small';
  
  if (count >= 100) {
    sizeClass = 'marker-cluster-large';
  } else if (count >= 10) {
    sizeClass = 'marker-cluster-medium';
  }
  
  return L.divIcon({
    html: `<div><span>${count}</span></div>`,
    className: `marker-cluster marker-cluster-vehicle ${sizeClass}`,
    iconSize: L.point(40, 40, true),
  });
};

// Component to fit map bounds to markers
function FitBounds({ positions }) {
  const map = useMap();

  useEffect(() => {
    if (positions.length > 0) {
      const bounds = L.latLngBounds(positions);
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 12 });
    }
  }, [positions, map]);

  return null;
}

/**
 * MapView - Reusable Leaflet map component
 * Displays properties and vehicles on an interactive map
 */
export default function MapView({ properties = [], vehicles = [], selectedAssetType = 'all' }) {
  const navigate = useNavigate();

  // Determine which assets to show
  const showProperties = selectedAssetType === 'all' || selectedAssetType === 'properties';
  const showVehicles = selectedAssetType === 'all' || selectedAssetType === 'vehicles';

  // Collect all marker positions for bounds fitting (memoized to prevent recalculation)
  const allPositions = useMemo(() => {
    const positions = [];

    if (showProperties) {
      properties.forEach(prop => {
        if (prop.lat && prop.lng) {
          positions.push([prop.lat, prop.lng]);
        }
      });
    }

    if (showVehicles) {
      vehicles.forEach(vehicle => {
        if (vehicle.lastKnownLocation?.lat && vehicle.lastKnownLocation?.lng) {
          positions.push([vehicle.lastKnownLocation.lat, vehicle.lastKnownLocation.lng]);
        }
      });
    }

    return positions;
  }, [properties, vehicles, showProperties, showVehicles]);

  // Default center (California)
  const defaultCenter = [37.5, -121.5];
  const defaultZoom = 7;

  return (
    // Key on parent div forces React to create new DOM element when selectedAssetType changes
    // This prevents "Map container is already initialized" error in React Strict Mode
    <div key={`map-container-${selectedAssetType}`} className="map-view-container">
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        className="leaflet-map"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Fit bounds to all markers */}
        <FitBounds positions={allPositions} />

        {/* Property Markers with Clustering (Red) */}
        {showProperties && (
          <MarkerClusterGroup 
            chunkedLoading
            iconCreateFunction={createPropertyClusterIcon}
            spiderfyOnMaxZoom={true}
            showCoverageOnHover={false}
            zoomToBoundsOnClick={true}
            maxClusterRadius={80}
          >
            {properties.map((property) => {
              if (!property.lat || !property.lng) return null;

              return (
                <Marker
                  key={property.id}
                  position={[property.lat, property.lng]}
                  icon={propertyIcon}
                >
                  <Popup className="custom-popup">
                    <div className="popup-content">
                      <h4 className="popup-title">{property.name}</h4>
                      <p className="popup-address">{property.address}</p>
                      <div className="popup-details">
                        <div className="popup-row">
                          <span className="popup-label">Type:</span>
                          <span className="popup-value">{property.propertyType}</span>
                        </div>
                        <div className="popup-row">
                          <span className="popup-label">Status:</span>
                          <Tag type={getStatusTagType(property.status)} size="sm">
                            {property.status}
                          </Tag>
                        </div>
                        <div className="popup-row">
                          <span className="popup-label">Monthly Premium:</span>
                          <span className="popup-value popup-premium">
                            {formatCurrency(property.monthlyPremium)}
                          </span>
                        </div>
                        {property.openClaims > 0 && (
                          <div className="popup-row">
                            <span className="popup-label">Open Claims:</span>
                            <span className="popup-value popup-claims">{property.openClaims}</span>
                          </div>
                        )}
                      </div>
                      <Button
                        kind="primary"
                        size="sm"
                        className="popup-button"
                        onClick={() => navigate(`/business/properties/${property.id}`)}
                      >
                        View Details
                      </Button>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MarkerClusterGroup>
        )}

        {/* Vehicle Markers with Clustering (Blue) */}
        {showVehicles && (
          <MarkerClusterGroup 
            chunkedLoading
            iconCreateFunction={createVehicleClusterIcon}
            spiderfyOnMaxZoom={true}
            showCoverageOnHover={false}
            zoomToBoundsOnClick={true}
            maxClusterRadius={80}
          >
            {vehicles.map((vehicle) => {
              if (!vehicle.lastKnownLocation?.lat || !vehicle.lastKnownLocation?.lng) return null;

              return (
                <Marker
                  key={vehicle.id}
                  position={[vehicle.lastKnownLocation.lat, vehicle.lastKnownLocation.lng]}
                  icon={vehicleIcon}
                >
                  <Popup className="custom-popup">
                    <div className="popup-content">
                      <h4 className="popup-title">
                        {vehicle.year} {vehicle.make} {vehicle.model}
                      </h4>
                      <p className="popup-address">{vehicle.licensePlate}</p>
                      <div className="popup-details">
                        <div className="popup-row">
                          <span className="popup-label">Type:</span>
                          <span className="popup-value">{vehicle.vehicleType}</span>
                        </div>
                        <div className="popup-row">
                          <span className="popup-label">Driver:</span>
                          <span className="popup-value">{vehicle.assignedDriver}</span>
                        </div>
                        <div className="popup-row">
                          <span className="popup-label">Status:</span>
                          <Tag type={getStatusTagType(vehicle.status)} size="sm">
                            {vehicle.status}
                          </Tag>
                        </div>
                        <div className="popup-row">
                          <span className="popup-label">Monthly Premium:</span>
                          <span className="popup-value popup-premium">
                            {formatCurrency(vehicle.monthlyPremium)}
                          </span>
                        </div>
                        {vehicle.openClaims > 0 && (
                          <div className="popup-row">
                            <span className="popup-label">Open Claims:</span>
                            <span className="popup-value popup-claims">{vehicle.openClaims}</span>
                          </div>
                        )}
                      </div>
                      <Button
                        kind="primary"
                        size="sm"
                        className="popup-button"
                        onClick={() => navigate(`/business/fleet/${vehicle.id}`)}
                      >
                        View Details
                      </Button>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MarkerClusterGroup>
        )}
      </MapContainer>
    </div>
  );
}
