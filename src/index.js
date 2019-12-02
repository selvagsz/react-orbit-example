import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './mocks/server';
import Root from './Root';
import StoreProvider from './components/Providers/Store';
import coordinator from './data-strategies';

function App() {
  let [isInitializing, setIsInitializing] = useState(true);
  useEffect(() => {
    async function activateCoordinator() {
      await coordinator.activate();
      setIsInitializing(false);
    }
    activateCoordinator();
  });
  return (
    <StoreProvider
      memorySource={coordinator.getSource('memory')}
      remoteSource={coordinator.getSource('remote')}
    >
      {isInitializing ? 'loading...' : <Root />}
    </StoreProvider>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
