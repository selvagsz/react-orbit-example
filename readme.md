## React Orbit example


## API

```js
import { useQuery } from 'react-orbit';

export default function Customer() {
  let memoizedQueryBuilder = useCallback((t) => t.findRecords('customer'))
  let [state, fetchCustomers] = useQuery({
    type: 'customer',
    query: memoizedQueryBuilder
  });

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers])
}


import { useCacheQuery } from 'react-orbit';

export default function Customer() {
  let memoizedQueryBuilder = useCallback((t) => t.findRecords('customer'))
  let [state, fetchCustomers] = useCacheQuery({
    type: 'customer',
    query: memoizedQueryBuilder
  });

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers])
}

import { useRemoteQuery } from 'react-orbit';

export default function Customer() {
  let memoizedQueryBuilder = useCallback((t) => t.findRecords('customer'))
  let [state, fetchCustomers] = useRemoteQuery({
    type: 'customer',
    query: memoizedQueryBuilder
  });

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers])
}

```
