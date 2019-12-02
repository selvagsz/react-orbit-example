import { Factory } from 'miragejs';

export default Factory.extend({
  first_name(i) {
    return `Sales Person First ${i}`;
  },
  last_name(i) {
    return `Sales Person Last ${i}`;
  },
  email(i) {
    return `sales_person${i}@gmail.com`;
  },
  website(i) {
    return `sp${i}.dummy.com`;
  },
  role() {
    return 'user';
  },
});
