export const financialOrganizationQueryConfig = {
  sortRegistry: {
    shortName: 'shortName',
    fullName: 'fullName',
    inn: 'inn',
    ogrn: 'ogrn',
    actualAddress: 'actualAddress',
    legalAddress: 'legalAddress',
    phone: 'phone',
    email: 'email',
    activityType: 'activityType.name',
    registrationDate: 'registrationDate',
    terminationDate: 'terminationDate',
    terminationDecisionNumber: 'terminationDecisionNumber',
    externalId: 'externalId',
  },

  selectRegistry: {
    activityType: 'activityType.code',
  },

  searchableFields: [
    'shortName',
    'fullName',
    'inn',
    'ogrn',
    'actualAddress',
    'legalAddress',
    'phone',
    'email',
    'terminationDecisionNumber',
    'externalId',
  ],

  requiredFields: ['shortName', 'inn', 'externalId', 'activityType.code'],
};
