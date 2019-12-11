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


/*
 export default {
   @attr('string') firstName,
   @attr('string') lastName,
   @attr('string') email,
   @attr('string') website,

   @hasOne('user') user,
 }
*/
