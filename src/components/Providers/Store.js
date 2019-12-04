import React, { useState, useEffect } from 'react';
import OrbitContext from '../../contexts/orbit';

export default function Store({ memorySource, remoteSource, children }) {
  let [value] = useState({
    memory: memorySource,
    remote: remoteSource,
  });

  useEffect(() => {
    function skipTaskOnRequestQueue(e) {
      console.log('Request task error on memory source, Skipping', e);
      return memorySource.requestQueue.skip();
    }

    function handleTransform(t) {
      let recordTypes = t.operations.map(o => o.record.type);
      let recordTypesWithIds = t.operations.map(o => `${o.record.type}:${o.record.id}`);
      let uniqueRecordEvents = [...new Set(recordTypes.concat(recordTypesWithIds))];
      uniqueRecordEvents.forEach(recordEvent => {
        console.log(`emitting change event for ${recordEvent}`);
        memorySource.emit(`change:${recordEvent}`, t);
      });
    }

    memorySource.requestQueue.on('fail', skipTaskOnRequestQueue);
    memorySource.on('transform', handleTransform);

    return () => {
      memorySource.requestQueue.off('fail', skipTaskOnRequestQueue);
      memorySource.off('transform', handleTransform);
    }
  }, [memorySource]);

  return <OrbitContext.Provider value={value}>{children}</OrbitContext.Provider>;
}
