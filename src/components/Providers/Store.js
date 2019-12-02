import React, { useState, useEffect } from 'react';
import OrbitContext from '../../contexts/orbit';

export default function Store({ memorySource, remoteSource, children }) {
  let [value] = useState({
    memory: memorySource,
    remote: remoteSource,
  });

  useEffect(() => {
    function handleTransform(t) {
      let recordTypes = t.operations.map(o => o.record.type);
      let uniqueRecordTypes = [...new Set(recordTypes)];
      uniqueRecordTypes.forEach(recordType => {
        console.log(`emitting change event for ${recordType}`);
        memorySource.emit(`change:${recordType}`, t);
      });
    }
    memorySource.on('transform', handleTransform);
    return () => memorySource.off('transform', handleTransform);
  }, [memorySource]);

  return <OrbitContext.Provider value={value}>{children}</OrbitContext.Provider>;
}
