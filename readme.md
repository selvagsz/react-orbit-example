## React Orbit example


## API

```js
import { useQuery } from 'react-orbit';

export default function Customer() {
  let { data: customers, isFetchingFromRemote, queryStore } = useQuery({
    subscribeTo: 'customer',
  });

  useEffect(() => {
    queryStore(t => t.findRecords('customer'));
  }, [queryStore]);

  return (
    <>
      {customers.map((customer) => <CustomerListItem customer={customer}>)}
    </>
  );
}
```

```js
import { useRemoteQuery } from 'react-orbit';

export default function Customer() {
  let { data: customers, isFetchingFromRemote, queryStore } = useQuery({
    subscribeTo: 'customer',
  });

  useEffect(() => {
    queryStore(t => t.findRecords('customer'));
  }, [queryStore]);

  return (
    <>
      {customers.map((customer) => <CustomerListItem customer={customer}>)}
    </>
  );
}
```
