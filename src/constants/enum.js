export const ETenantType = {
  1: 'Family',
  2: 'Bachelor',
};
export const TenantSubCategory = {
  [ETenantType.Family]: [
    {label: 'Business Family', value: 1},
    {label: 'Professional Family', value: 2},
  ],
  [ETenantType.Bachelor]: [
    {label: 'Professional Bachelor', value: 1},
    {label: 'Bachelor Students', value: 2},
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
]