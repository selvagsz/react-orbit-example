## React Orbit example


## API

```ts
import { useQuery } from 'react-orbit';

interface RecordIdentity {
  type: string
  id: string|number
}

interface RecordsIdentity {
  type: string
}

export default function Customers() {
  let {
    data: customers = [],
    isLoading,
    error,
    queryStore
  } = useQuery(RecordIdentity|RecordsIdentity, equalityFn?);

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
