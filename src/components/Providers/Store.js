import React, { useEffect } from 'react';
import OrbitContext from '../../contexts/orbit';
import useOrbitCoordinator from '../../hooks/useOrbitCoordinator';

export default function Store({ getSources, addStrategies, children }) {
  const [isInitializing, sources] = useOrbitCoordinator(getSources, addStrategies)

  useEffect(() => {
    const memorySource = sources.memory;

    function skipTaskOnRequestQueue(e) {
      console.log('Request task error on memory source, Skipping', e);
      return memorySource.requestQueue.skip();
    }

    function handleTransform(t) {
      let recordTypes = t.operations.flatMap(o => [o.record.type, `${o.record.type}:${o.record.id}`]);
      let uniqueRecordEvents = [...new Set(recordTypes)];
      uniqueRecordEvents.forEach(recordEvent => {
        console.log(`emitting change event for ${recordEvent}`);
        memorySource.emit(recordEvent, t);
      });
    }

    if (memorySource) {
      memorySource.requestQueue.on('fail', skipTaskOnRequestQueue);
      memorySource.on('transform', handleTransform);
      return () => {
        memorySource.requestQueue.off('fail', skipTaskOnRequestQueue);
        memorySource.off('transform', handleTransform);
      }
    }
  }, [sources.memory]);

  if (isInitializing) {
    return null;
  }
  return <OrbitContext.Provider value={sources}>{children}</OrbitContext.Provider>;
}
