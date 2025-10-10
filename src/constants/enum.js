export const ETenantType = {
  1: 'Family',
  2: 'Bachelor',
};
export const TenantSubCategory = {
  [ETenantType.Family]: [
    { label: 'Business Family', value: 1 },
    { label: 'Professional Family', value: 2 },
  ],
  [ETenantType.Bachelor]: [
    { label: 'Professional Bachelor', value: 1 },
    { label: 'Bachelor Students', value: 2 },
  ],
};
export const ELeadScheduleVisitType = {
  0: 'N/A',
  1: 'Property Verification',
  2: 'Tenant Visit',
  3: 'Owner Meeting',
  4: 'Channel Partner',
  5: 'Property Audit',
};

export const EVisitStatus = [
  {
    id: 12,
    label: 'Created',
  },
  {
    id: 1,
    label: 'Pending', // ok
  },
  {
    id: 2,
    label: 'Follow Up',
  },
  {
    id: 3,
    label: 'Visit in Progress',
  },
  {
    id: 4,
    label: 'Rescheduled',
  },
  {
    id: 6,
    label: 'Done', //ok
  },
  {
    id: 9,
    label: 'Owner denied',
  },
  {
    id: 10,
    label: 'Tenant denied',
  },
  {
    id: 11,
    label: 'CP denied',
  },
  {
    id: 15,
    label: 'CPRM denied',
  },
  {
    id: 16,
    label: 'Won', // ok
  },
];

export const ECustomerType = [
  {
    id: 1,
    type: 1,
    label: 'Owner',
  },
  {
    id: 2,
    type: 2,
    label: 'Tenant',
  },
  {
    id: 3,
    type: 4,
    label: 'Resale Buyer',
  },
  {
    id: 4,
    type: 5,
    label: 'Property Management Services',
  },
  {
    id: 5,
    type: 6,
    label: 'Fresh Property Buyer',
  },
  {
    id: 6,
    type: 7,
    label: 'Fresh Commercial Buyer',
  },
];

export const PropertyBHKOptions = [
  { id: 1, type: 1, label: '1 BHK' },
  { id: 2, type: 2, label: '1 + 1 BHK' },
  { id: 3, type: 3, label: '2 BHK' },
  { id: 4, type: 4, label: '2 + 1 BHK' },
  { id: 5, type: 5, label: '3 BHK' },
  { id: 6, type: 6, label: '3 + 1 BHK' },
  { id: 7, type: 7, label: '4 BHK' },
  { id: 8, type: 8, label: '4 + 1 BHK' },
  { id: 9, type: 9, label: '5 BHK' },
  { id: 10, type: 10, label: '5 + 1 BHK' },
  { id: 11, type: 0, label: 'Not Sure' },
];

export const PropertyTypeOptions = [
  { id: 1, type: 'residentialApartment', label: 'Residential Apartment' },
  { id: 2, type: 'independentVilla', label: 'Independent Villa' },
  { id: 3, type: 'builderFloor', label: 'Builder Floor' },
  { id: 4, type: 'studioApartment', label: 'Studio Apartment' },
  { id: 5, type: 'commercial', label: 'Commercial' },
];

export const PropertyFurnishOptions = [
  { id: 0, type: 0, label: 'Unfurnished' },
  { id: 1, type: 1, label: 'Furnished' },
  { id: 2, type: 2, label: 'Semi-Furnished' },
];

export const RentOutReasonOptions = [
  { id: 1, type: 1, label: 'Tenant finalized' },
  { id: 2, type: 2, label: 'Property occupied' },
  { id: 3, type: 3, label: 'Owner request' },
  { id: 4, type: 4, label: 'Deal closed through CP' },
  { id: 5, type: 5, label: 'Rented through another source' },
  { id: 6, type: 6, label: 'Other' },
];

