export const employeeQueryConfig = {
  sortRegistry: {
    cn: 'cn',
    full_name: 'full_name',
    department: 'department',
    title: 'title',
    division: 'division.name',
    login: 'login',
    is_present: 'is_present',
    email: 'email',
    phone: 'phone',
    dn: 'dn',
  },

  selectRegistry: {
    division: 'division.code',
  },

  searchableFields: ['cn', 'full_name', 'department', 'title', 'login', 'email', 'phone', 'dn'],

  requiredFields: [
    'login',
    'cn',
    'full_name',
    'department',
    'title',
    'division.code',
    'is_present',
  ],
};
