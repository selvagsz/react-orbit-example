import React, { useEffect } from 'react';
import { Link } from '@reach/router';
import useStoreQuery from '../../../hooks/useQuery';
import Button from '../../ui/Button'
import Spinner from '../../ui/Spinner'

let counter = 0;

export default function Customers() {
  let { data: customers = [], isFetchingFromRemote, queryStore } = useStoreQuery({
    subscribeTo: 'customer',
  });

  useEffect(() => {
    queryStore(t => t.findRecords('customer'));
  }, [queryStore]);

  console.log(++counter)
  return (
    <div className="Page">
      <div className="Page__Header">
        <div className="Page__HeaderTitle">
          <h1 className="Page__HeaderTitleText">
            Customers
          </h1>
          {isFetchingFromRemote && <Spinner />}
        </div>
        <div className="Page__HeaderActions">
          <Button>
            <Link to="/customers/new">New Customer</Link>
          </Button>
        </div>
      </div>
      <div className="Page__Content">
        <table className="table-auto w-full mt-2">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1 text-left">Name</th>
              <th className="border px-2 py-1 text-left">Email</th>
              <th className="border px-2 py-1 text-left">Website</th>
              <th className="border px-2 py-1 text-left">Assignee</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {customers.map(customer => {
              return (
                <tr key={customer.id}>
                  <td className="border px-2 py-1 text-left">{customer.attributes.firstName} {customer.attributes.lastName}</td>
                  <td className="border px-2 py-1 text-left">{customer.attributes.email}</td>
                  <td className="border px-2 py-1 text-left">{customer.attributes.website}</td>
                  <td className="border px-2 py-1 text-left">--</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
