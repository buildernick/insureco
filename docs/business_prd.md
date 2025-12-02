# Product Requirements Document (PRD)
## InsureCo — Business Insurance Expansion

### **Document Purpose**
InsureCo currently provides individual car and property insurance. This project introduces support for **Business Insurance**, including fleet management, commercial property portfolios, and enterprise-focused claims and billing flows. This PRD describes the business dashboard, data models, mapping features, claims/payment flows, and all required UI/UX elements. It is intended to extend the existing application without replacing any individual insurance features.

---

# **1. Goals & Objectives**

### **Primary Goal**
Enable business customers to manage their entire portfolio of insured **vehicles**, **properties**, and **claims** from a unified dashboard.

### **Secondary Goals**
- Allow business admins to file claims and make payments tied to business assets.
- Introduce geospatial mapping for properties and vehicles.
- Maintain UI consistency with the existing individual signup and claims flows.

---

# **2. Users & Personas**
### **Business Owner / Admin**
- Needs visibility into all insured business assets.
- Files claims on behalf of the business.
- Oversees payments and billing.

### **Operations Manager / Fleet Manager**
- Monitors vehicle health, mileage, location, and claim status.
- Tracks property status and open claims.

### **Accounting / Finance**
- Handles invoices, payments, and financial reporting.

---

# **3. Scope Overview**
This release includes:

1. **New Business Dashboard Page**  
   - Properties table  
   - Fleet vehicles table  
   - Quick actions and navigation

2. **Mapping Dashboard**  
   - Interactive maps for properties and vehicles  
   - Hover and click interactions

3. **Business File-a-Claim Flow**  
   - Multi-step flow modeled off the existing signup flow

4. **Business Make-a-Payment Flow**

5. **Asset Detail Pages**  
   - Property detail page  
   - Vehicle detail page

6. **Backend support** for business accounts and assets

---

# **4. Business Dashboard Requirements**

## **4.1 Navigation Changes**
- Add a top-level section: **Business**
- Sub-navigation:
  - Overview (Dashboard)
  - Properties
  - Fleet
  - Claims
  - Payments/Billing
  - Map View

---

## **4.2 Dashboard Layout**

### **A. Properties Table**
Columns:
- Property Name
- Address
- Monthly Premium
- Last Inspection Date (optional but useful)
- Number of Claims
- Open Claims (click → filtered claims list)
- Status (Active, Suspended, Pending Renewal)
- Actions (View, File Claim, View Payments)

Interactions:
- Click row → Property Detail Page  
- Sorting & filtering should be available

---

### **B. Fleet Vehicles Table**
Columns:
- Vehicle (Make, Model)
- Year
- VIN
- License Plate
- Current/Last Mileage Reading
- Monthly Premium
- Claims Count
- Open Claims
- Status (Active, In Repair, Out of Service)
- Actions (View, File Claim)

Interactions:
- Click row → Vehicle Detail Page  
- Sorting & filtering required

---

### **C. Global Dashboard Actions**
- **Add New Property**
- **Add New Vehicle**
- **File Claim**
- **Make Payment**

---

# **5. Mapping Dashboard Requirements**

### **General Features**
- New page or tab: **Map View**
- Toggle options:
  - Properties
  - Fleet Vehicles
  - Both

### **Properties Tooltip Fields**
- Property Name  
- Address  
- Premium  
- # of Claims / Open Claims  

### **Vehicle Tooltip Fields**
- Make, Model, Year  
- Last Known Location  
- Current/Last Mileage Reading  
- Status  

### **Click Interaction**
- Slide-out panel or modal with:
  - Quick actions  
  - Summary data  
  - Link to detail page  

### **Other Requirements**
- Cluster overlapping markers  
- Ensure smooth performance with large portfolios  

---

# **6. File-a-Claim Flow**

Modeled after the existing InsureCo signup flow (multi-step, linear, wizard-style).

### **Step 1: Select Asset**
- Choose between Property or Vehicle
- List displays all assets with search/filter

### **Step 2: Incident Details**
Fields include:
- Date of incident  
- Type of incident (dropdown: Fire, Theft, Collision, Water Damage, etc.)  
- Description  
- Upload photos or documents  

### **Step 3: Coverage Verification**
- Show deductible  
- Coverage limits  
- Exclusions  

### **Step 4: Submit Claim**
- Confirmation screen  
- Redirect to Claim Detail

---

# **7. Make-a-Payment Flow**

Also modeled off the signup flow style.

### **Step 1: Select Asset or Invoice**
- Pay for specific asset OR  
- Apply a payment to overall business account balance

### **Step 2: Payment Details**
- Amount due  
- Minimum payment allowed  
- Outstanding balance  
- Optional: split payments across assets

### **Step 3: Payment Method**
- Choose saved payment method  
- Add new card/bank

### **Step 4: Review & Confirm**

---

# **8. Asset Detail Pages**

## **8.1 Property Detail Page**
Includes:
- Address  
- Premium, Deductible, Coverage Type  
- Claims List  
- Payment History  
- Location pin  
- Document uploads (inspection reports, leases)

---

## **8.2 Vehicle Detail Page**
Includes:
- Make/Model/Year  
- VIN  
- License Plate  
- Mileage (current + history)  
- Claims history  
- Payment history  
- Location history (if telematics exist)  
- Maintenance log (optional future enhancement)

---

# **9. Data Requirements**

### **Property Data**
- Name / Label  
- Address  
- Monthly premium  
- Coverage details  
- Claim references  
- Latitude / Longitude  

### **Vehicle Data**
- Make / Model / Year  
- VIN  
- License plate  
- Mileage  
- Coverage details  
- Claim references  
- Last known location  

### **Business Account**
- Business name  
- Business ID  
- Contact info  
- Payment methods  
- List of all assets  

---

# **10. API / Backend Requirements (High-Level)**

Endpoints required or modified:
- `GET /business/{id}/dashboard`
- `GET /business/{id}/properties`
- `GET /business/{id}/vehicles`
- `POST /business/{id}/claims`
- `POST /business/{id}/payments`
- `GET /assets/{id}` (generic asset lookup)

Backend needs:
- Support for storing lat/long  
- Mileage update handler  
- Claims must reference both property and vehicle asset types  

---

# **11. Non-Functional Requirements**
- UI consistent with existing InsureCo patterns  
- Responsive across mobile/web  
- Tables must support sorting, filtering, pagination  
- Map interactions must remain performant  
- Secure handling of claims/payment data  

---

# **12. Suggested Enhancements (Optional)**

### **1. Roles & Permissions**
Admin, Finance, Fleet Manager roles with permissions.

### **2. Bulk Actions**
- Bulk asset import  
- Bulk mileage update  
- Bulk claim creation after major events  

### **3. Notifications**
- Claim status changes  
- Overdue payments  
- Mileage thresholds  

### **4. Reporting/Analytics**
- Claims over time  
- Total monthly premiums  
- Fleet mileage trends  
- Property risk heatmaps  

### **5. Import/Export**
- CSV import for fleets/properties  
- PDF export for reports  

---

# **13. Summary**
This PRD defines the full set of requirements for adding **Business Insurance** to the InsureCo platform. It includes dashboards, asset tables, mapping functionality, structured flows for claims and payments, detailed asset pages, and backend requirements. It is ready for design, engineering planning, or input into Builder.io Fusion.

