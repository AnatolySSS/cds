export const courtQueryConfig = {
  sortRegistry: {
    name: 'name',
    type: 'type.name',
    region: 'region.name',
    cassRegion: 'cassDistrict.name',
    site: 'site',
    serverNumbers: 'serverNumbers',
  },

  selectRegistry: {
    type: 'type.code',
    region: 'region.code',
    cassRegion: 'cassDistrict.code',
  },

  searchableFields: ['name', 'site'],

  requiredFields: ['name', 'serverNumbers', 'type.code', 'region.code', 'cassDistrict.code'],

  integerFields: ['serverNumbers'],
};
