export default {
  attributes: {
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    email: { type: 'string' },
    website: { type: 'string' },
  },
  relationships: {
    assignee: { type: 'hasOne', model: 'user' },
  },
};
