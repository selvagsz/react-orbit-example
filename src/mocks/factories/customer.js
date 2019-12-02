import { Factory } from 'miragejs';

export default Factory.extend({
  first_name(i) {
    return `FirstName ${i}`;
  },
  last_name(i) {
    return `lastName ${i}`;
  },
  email(i) {
    return `dummy${i}@gmail.com`;
  },
  website(i) {
    return `dummy${i}.dummy.com`;
  },
  afterCreate(customer, server) {
    customer.update({
      assignee: server.create('user'),
    });
  },
});
