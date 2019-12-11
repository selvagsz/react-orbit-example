import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import './mocks/server';
import Root from './Root';
import StoreProvider from './components/Providers/Store';
import MemorySource from '@orbit/memory';
import JSONAPISource from '@orbit/jsonapi';
import { RequestStrategy, SyncStrategy } from '@orbit/coordinator';
import schema from './schema';

function App() {
  return (
    <StoreProvider
      getSources={() => {
        return [
          new MemorySource({
            schema,
            name: 'memory'
          }),
          new JSONAPISource({
            schema,
            name: 'remote',
            host: 'https://api.orbit.com',
            namespace: 'ajax',
          })
        ];
      }}
      addStrategies={(coordinator) => {
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
      }}
    >
      <Root />
    </StoreProvider>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
