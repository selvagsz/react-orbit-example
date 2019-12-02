import { Server, Model, JSONAPISerializer, belongsTo } from 'miragejs';
import CustomerFactory from './factories/customer';
import UserFactory from './factories/user';

const ApplicationSerializer = JSONAPISerializer.extend({
  alwaysIncludeLinkageData: true,
  typeKeyForModel(model) {
    return model.modelName;
  },

  keyForAttribute(key) {
    return key;
  },
});

const server = new Server({
  models: {
    user: Model,
    customer: Model.extend({
      assignee: belongsTo('user'),
    }),
  },

  serializers: {
    application: ApplicationSerializer,
  },

  seeds(server) {
    server.createList('user', 1);
    server.createList('customer', 1);
  },

  factories: {
    customer: CustomerFactory,
    user: UserFactory,
  },

  routes() {
    this.urlPrefix = 'https://api.orbit.com';
    this.namespace = 'ajax';
    this.timing = 1000; // default

    this.get('/customers');
    this.get('/customers/:id');
    this.patch('/customers/:id');
    this.delete('/customers/:id');
    this.post('/customers');

    this.get('/users');
    this.get('/users/:id');

    this.passthrough();
  },
});

export default server;
