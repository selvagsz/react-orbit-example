import Coordinator, { RequestStrategy, SyncStrategy } from '@orbit/coordinator';
import MemorySource from '@orbit/memory';
import JSONAPISource, { JSONAPISerializer, JSONAPIRequestProcessor } from '@orbit/jsonapi';
import schema from '../data-schema';

class CustomerRequestProcessor extends JSONAPIRequestProcessor {
  fetch(url, settings) {
    return super.fetch(...arguments)
  }
}

let memory = new MemorySource({
  schema,
});

let remote = new JSONAPISource({
  schema,
  name: 'remote',
  host: 'https://api.orbit.com',
  namespace: 'ajax',
  RequestProcessorClass: CustomerRequestProcessor,
});

const coordinator = new Coordinator({
  sources: [memory, remote],
});

// Query the remote server whenever the memory source is queried
coordinator.addStrategy(
  new RequestStrategy({
    source: 'memory',
    on: 'beforeQuery',
    target: 'remote',
    action: 'query',
    blocking: false,
  })
);

// Update the remote server whenever the memory source is updated
coordinator.addStrategy(
  new RequestStrategy({
    source: 'memory',
    on: 'beforeUpdate',
    target: 'remote',
    action: 'update',
    blocking: false,
  })
);

// Sync all changes received from the remote server to the memory source
coordinator.addStrategy(
  new SyncStrategy({
    source: 'remote',
    target: 'memory',
    blocking: false,
  })
);

export default coordinator;
