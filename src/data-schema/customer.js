export default {
  attributes: {
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    email: { type: 'string' },
    website: { type: 'string' },
  },
  relationships: {
    user: { type: 'hasOne', model: 'user' },
  },
};
