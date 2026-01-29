/**
 * Business Insurance Helper Functions
 * 
 * Utility functions for formatting, calculations, and business logic
 * used throughout the Business Insurance module.
 */

// =============================================================================
// CURRENCY FORMATTING
// =============================================================================

/**
 * Format a number as US currency
 * @param {number} amount - The amount to format
 * @param {boolean} showCents - Whether to show cents (default: true)
 * @returns {string} Formatted currency string (e.g., "$1,234.56")
 */
export function formatCurrency(amount, showCents = true) {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return '$0.00';
  }

  const options = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: showCents ? 2 : 0,
    maximumFractionDigits: showCents ? 2 : 0,
  };

  return new Intl.NumberFormat('en-US', options).format(amount);
}

/**
 * Format a number as currency without dollar sign
 * @param {number} amount - The amount to format
 * @returns {string} Formatted number string (e.g., "1,234.56")
 */
export function formatNumber(amount) {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return '0';
  }

  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

// =============================================================================
// DATE FORMATTING
// =============================================================================

/**
 * Format a date for DatePickerInput (mm/dd/yyyy format only, no time)
 * @param {string|Date} dateInput - Date to format (can be Date object or string)
 * @returns {string} Formatted date string (mm/dd/yyyy) or empty string if invalid
 */
export function formatDateForInput(dateInput) {
  // Handle empty/null values
  if (!dateInput) return '';

  // Convert string to Date if needed
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;

  // Validate the date
  if (isNaN(date.getTime())) {
    return '';
  }

  // Format as mm/dd/yyyy without time
  const month = String(date.getMonth() + 1).padStart(2, '0');  // 01-12
  const day = String(date.getDate()).padStart(2, '0');          // 01-31
  const year = date.getFullYear();                               // 2025

  return `${month}/${day}/${year}`;  // Returns: "12/01/2025"
}

/**
 * Format a date string or Date object
 * @param {string|Date} dateInput - Date to format
 * @param {string} format - Format type: 'short', 'long', 'medium' (default: 'medium')
 * @returns {string} Formatted date string
 */
export function formatDate(dateInput, format = 'medium') {
  if (!dateInput) return 'N/A';

  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;

  if (isNaN(date.getTime())) {
    return 'Invalid Date';
  }

  const formats = {
    short: { month: 'numeric', day: 'numeric', year: '2-digit' }, // 3/15/24
    medium: { month: '2-digit', day: '2-digit', year: 'numeric' }, // 03/15/2024
    long: { month: 'long', day: 'numeric', year: 'numeric' }, // March 15, 2024
  };

  return new Intl.DateTimeFormat('en-US', formats[format] || formats.medium).format(date);
}

/**
 * Format date and time
 * @param {string|Date} dateInput - Date to format
 * @returns {string} Formatted date and time string
 */
export function formatDateTime(dateInput) {
  if (!dateInput) return 'N/A';

  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;

  if (isNaN(date.getTime())) {
    return 'Invalid Date';
  }

  return new Intl.DateTimeFormat('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date);
}

/**
 * Calculate days between two dates
 * @param {string|Date} startDate - Start date
 * @param {string|Date} endDate - End date (default: today)
 * @returns {number} Number of days between dates
 */
export function daysBetween(startDate, endDate = new Date()) {
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
  const end = typeof endDate === 'string' ? new Date(endDate) : endDate;

  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
}

/**
 * Check if a date is in the past
 * @param {string|Date} dateInput - Date to check
 * @returns {boolean} True if date is in the past
 */
export function isDatePast(dateInput) {
  if (!dateInput) return false;

  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  return date < new Date();
}

// =============================================================================
// MILEAGE FORMATTING
// =============================================================================

/**
 * Format mileage with commas and unit
 * @param {number} miles - Mileage value
 * @param {boolean} showUnit - Whether to include "mi" (default: true)
 * @returns {string} Formatted mileage (e.g., "45,230 mi")
 */
export function formatMileage(miles, showUnit = true) {
  if (miles === null || miles === undefined || isNaN(miles)) {
    return showUnit ? '0 mi' : '0';
  }

  const formatted = new Intl.NumberFormat('en-US').format(miles);
  return showUnit ? `${formatted} mi` : formatted;
}

// =============================================================================
// STATUS CONFIGURATIONS
// =============================================================================

/**
 * Get status configuration for display
 * @param {string} status - Status value
 * @param {string} context - Context: 'asset', 'claim', 'payment'
 * @returns {Object} Configuration object with type, icon, and color
 */
export function getStatusConfig(status, context = 'asset') {
  const configs = {
    asset: {
      'Active': { type: 'green', icon: 'checkmark', label: 'Active' },
      'Pending Renewal': { type: 'blue', icon: 'warning', label: 'Pending Renewal' },
      'In Repair': { type: 'yellow', icon: 'warning', label: 'In Repair' },
      'Out of Service': { type: 'red', icon: 'error', label: 'Out of Service' },
      'Suspended': { type: 'red', icon: 'error', label: 'Suspended' },
    },
    claim: {
      'In Review': { type: 'blue', icon: 'pending', label: 'In Review' },
      'Approved': { type: 'green', icon: 'checkmark', label: 'Approved' },
      'Paid': { type: 'green', icon: 'checkmark', label: 'Paid' },
      'Denied': { type: 'red', icon: 'error', label: 'Denied' },
      'Cancelled': { type: 'gray', icon: 'cancel', label: 'Cancelled' },
    },
    payment: {
      'Completed': { type: 'green', icon: 'checkmark', label: 'Completed' },
      'Pending': { type: 'blue', icon: 'pending', label: 'Pending' },
      'Failed': { type: 'red', icon: 'error', label: 'Failed' },
      'Cancelled': { type: 'gray', icon: 'cancel', label: 'Cancelled' },
    },
  };

  const contextConfig = configs[context] || configs.asset;
  return contextConfig[status] || { type: 'gray', icon: 'unknown', label: status };
}

/**
 * Get Carbon Tag type from status
 * @param {string} status - Status value
 * @param {string} context - Context: 'asset', 'claim', 'payment'
 * @returns {string} Carbon Tag type ('green', 'blue', 'red', 'gray', etc.)
 */
export function getStatusTagType(status, context = 'asset') {
  const config = getStatusConfig(status, context);
  return config.type;
}

// =============================================================================
// ASSET TYPE DETECTION
// =============================================================================

/**
 * Determine asset type from asset ID
 * @param {string} assetId - Asset ID (e.g., 'PROP-2024-001' or 'VEH-2024-001')
 * @returns {string} Asset type: 'property' or 'vehicle'
 */
export function getAssetType(assetId) {
  if (!assetId) return null;

  if (assetId.startsWith('PROP-')) {
    return 'property';
  } else if (assetId.startsWith('VEH-')) {
    return 'vehicle';
  }

  return null;
}

/**
 * Get display name for asset type
 * @param {string} type - Asset type: 'property' or 'vehicle'
 * @returns {string} Display name
 */
export function getAssetTypeLabel(type) {
  const labels = {
    property: 'Property',
    vehicle: 'Vehicle',
  };

  return labels[type] || type;
}

// =============================================================================
// COVERAGE CALCULATIONS
// =============================================================================

/**
 * Calculate coverage percentage
 * @param {number} claimAmount - Claim amount
 * @param {number} coverageLimit - Coverage limit
 * @returns {number} Percentage (0-100)
 */
export function calculateCoveragePercentage(claimAmount, coverageLimit) {
  if (!claimAmount || !coverageLimit || coverageLimit === 0) {
    return 0;
  }

  return Math.min((claimAmount / coverageLimit) * 100, 100);
}

/**
 * Calculate out-of-pocket cost
 * @param {number} claimAmount - Total claim amount
 * @param {number} deductible - Deductible amount
 * @param {number} approvedAmount - Approved claim amount (optional)
 * @returns {number} Out-of-pocket cost
 */
export function calculateOutOfPocket(claimAmount, deductible, approvedAmount = null) {
  const actualAmount = approvedAmount !== null ? approvedAmount : claimAmount;

  if (!actualAmount || !deductible) {
    return 0;
  }

  // Out-of-pocket is the deductible (assuming claim is covered)
  return Math.min(deductible, actualAmount);
}

/**
 * Calculate insurance payout
 * @param {number} approvedAmount - Approved claim amount
 * @param {number} deductible - Deductible amount
 * @returns {number} Insurance payout amount
 */
export function calculateInsurancePayout(approvedAmount, deductible) {
  if (!approvedAmount || approvedAmount <= 0) {
    return 0;
  }

  const payout = approvedAmount - (deductible || 0);
  return Math.max(payout, 0);
}

// =============================================================================
// ADDRESS FORMATTING
// =============================================================================

/**
 * Format a full address object
 * @param {Object} asset - Asset object with address fields
 * @returns {string} Formatted address
 */
export function formatAddress(asset) {
  if (!asset) return 'N/A';

  const parts = [];

  if (asset.address) {
    return asset.address;
  }

  // Build address from parts
  if (asset.street) parts.push(asset.street);
  
  const cityStateZip = [];
  if (asset.city) cityStateZip.push(asset.city);
  if (asset.state) cityStateZip.push(asset.state);
  if (asset.zipCode) cityStateZip.push(asset.zipCode);

  if (cityStateZip.length > 0) {
    parts.push(cityStateZip.join(', '));
  }

  return parts.join(', ') || 'N/A';
}

/**
 * Format city, state, zip
 * @param {string} city - City name
 * @param {string} state - State abbreviation
 * @param {string} zipCode - Zip code
 * @returns {string} Formatted city, state zip
 */
export function formatCityStateZip(city, state, zipCode) {
  const parts = [];
  if (city) parts.push(city);
  if (state) parts.push(state);
  if (zipCode) parts.push(zipCode);

  return parts.join(', ') || 'N/A';
}

// =============================================================================
// VEHICLE FORMATTING
// =============================================================================

/**
 * Format vehicle name (Year Make Model)
 * @param {Object} vehicle - Vehicle object
 * @returns {string} Formatted vehicle name
 */
export function formatVehicleName(vehicle) {
  if (!vehicle) return 'N/A';

  const parts = [];
  if (vehicle.year) parts.push(vehicle.year);
  if (vehicle.make) parts.push(vehicle.make);
  if (vehicle.model) parts.push(vehicle.model);

  return parts.join(' ') || 'Unknown Vehicle';
}

/**
 * Format VIN for display (show first 8 and last 4 characters)
 * @param {string} vin - Vehicle Identification Number
 * @param {boolean} showFull - Whether to show full VIN (default: false)
 * @returns {string} Formatted VIN
 */
export function formatVIN(vin, showFull = false) {
  if (!vin) return 'N/A';

  if (showFull || vin.length < 12) {
    return vin;
  }

  // Show first 8 and last 4 with ellipsis
  return `${vin.slice(0, 8)}...${vin.slice(-4)}`;
}

// =============================================================================
// PERCENTAGE FORMATTING
// =============================================================================

/**
 * Format a number as percentage
 * @param {number} value - Value to format (0-100)
 * @param {number} decimals - Number of decimal places (default: 0)
 * @returns {string} Formatted percentage
 */
export function formatPercentage(value, decimals = 0) {
  if (value === null || value === undefined || isNaN(value)) {
    return '0%';
  }

  return `${value.toFixed(decimals)}%`;
}

/**
 * Format occupancy rate
 * @param {string|number} occupancy - Occupancy value (e.g., "85%" or 0.85)
 * @returns {string} Formatted occupancy
 */
export function formatOccupancy(occupancy) {
  if (!occupancy) return 'N/A';

  if (typeof occupancy === 'string') {
    return occupancy;
  }

  if (typeof occupancy === 'number') {
    // Assume decimal (0.85) or percentage (85)
    const percent = occupancy <= 1 ? occupancy * 100 : occupancy;
    return `${percent.toFixed(0)}%`;
  }

  return 'N/A';
}

// =============================================================================
// SORTING HELPERS
// =============================================================================

/**
 * Sort array by date field
 * @param {Array} array - Array to sort
 * @param {string} dateField - Field name containing date
 * @param {string} direction - 'asc' or 'desc' (default: 'desc')
 * @returns {Array} Sorted array
 */
export function sortByDate(array, dateField, direction = 'desc') {
  return [...array].sort((a, b) => {
    const dateA = new Date(a[dateField]);
    const dateB = new Date(b[dateField]);

    if (direction === 'asc') {
      return dateA - dateB;
    }

    return dateB - dateA;
  });
}

/**
 * Sort array by numeric field
 * @param {Array} array - Array to sort
 * @param {string} numericField - Field name containing number
 * @param {string} direction - 'asc' or 'desc' (default: 'asc')
 * @returns {Array} Sorted array
 */
export function sortByNumber(array, numericField, direction = 'asc') {
  return [...array].sort((a, b) => {
    const numA = a[numericField] || 0;
    const numB = b[numericField] || 0;

    if (direction === 'asc') {
      return numA - numB;
    }

    return numB - numA;
  });
}

// =============================================================================
// VALIDATION HELPERS
// =============================================================================

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid
 */
export function isValidEmail(email) {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number (US format)
 * @param {string} phone - Phone to validate
 * @returns {boolean} True if valid
 */
export function isValidPhone(phone) {
  if (!phone) return false;
  // Accept various US phone formats
  const phoneRegex = /^[\d\s\-\(\)]+$/;
  const digitsOnly = phone.replace(/\D/g, '');
  return phoneRegex.test(phone) && digitsOnly.length === 10;
}

/**
 * Validate VIN (17 characters, alphanumeric)
 * @param {string} vin - VIN to validate
 * @returns {boolean} True if valid
 */
export function isValidVIN(vin) {
  if (!vin) return false;
  return /^[A-HJ-NPR-Z0-9]{17}$/i.test(vin);
}

/**
 * Validate zip code (US 5 or 9 digit)
 * @param {string} zipCode - Zip code to validate
 * @returns {boolean} True if valid
 */
export function isValidZipCode(zipCode) {
  if (!zipCode) return false;
  return /^\d{5}(-\d{4})?$/.test(zipCode);
}

// =============================================================================
// SEARCH/FILTER HELPERS
// =============================================================================

/**
 * Filter array by search query (searches multiple fields)
 * @param {Array} array - Array to filter
 * @param {string} query - Search query
 * @param {Array} fields - Fields to search in
 * @returns {Array} Filtered array
 */
export function searchByFields(array, query, fields) {
  if (!query || query.trim() === '') {
    return array;
  }

  const lowerQuery = query.toLowerCase();

  return array.filter(item => {
    return fields.some(field => {
      const value = item[field];
      if (value === null || value === undefined) return false;
      return String(value).toLowerCase().includes(lowerQuery);
    });
  });
}

/**
 * Filter array by status
 * @param {Array} array - Array to filter
 * @param {string} status - Status to filter by (or 'all')
 * @returns {Array} Filtered array
 */
export function filterByStatus(array, status) {
  if (!status || status === 'all') {
    return array;
  }

  return array.filter(item => item.status === status);
}

// =============================================================================
// EXPORT ALL
// =============================================================================

export default {
  // Currency
  formatCurrency,
  formatNumber,

  // Dates
  formatDateForInput,
  formatDate,
  formatDateTime,
  daysBetween,
  isDatePast,

  // Mileage
  formatMileage,

  // Status
  getStatusConfig,
  getStatusTagType,

  // Asset
  getAssetType,
  getAssetTypeLabel,

  // Coverage
  calculateCoveragePercentage,
  calculateOutOfPocket,
  calculateInsurancePayout,

  // Address
  formatAddress,
  formatCityStateZip,

  // Vehicle
  formatVehicleName,
  formatVIN,

  // Percentage
  formatPercentage,
  formatOccupancy,

  // Sorting
  sortByDate,
  sortByNumber,

  // Validation
  isValidEmail,
  isValidPhone,
  isValidVIN,
  isValidZipCode,

  // Search/Filter
  searchByFields,
  filterByStatus,
};
