import { useRef, useState, useEffect } from 'react';
import Coordinator from '@orbit/coordinator';

export default function useCoordinator(getSources, addStrategies) {
  const [ isInitializing, setIsInitializing ] = useState(true);
  const sourcesRef = useRef({});

  useEffect(() => {
    async function initialize() {
      const sources = getSources();
      sources.forEach((source) => {
        sourcesRef.current[source.name] = source
      });
      const coordinator = new Coordinator({ sources });
      addStrategies(coordinator);
      await coordinator.activate();
      setIsInitializing(false);
    }
    initialize();
  }, [getSources, addStrategies]);

  return [isInitializing, sourcesRef.current]
}
