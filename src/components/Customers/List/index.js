import React, { useState, useEffect, useCallback } from 'react';
import { Link } from '@reach/router';
import useQuery from '../../../hooks/useQuery';
import CustomerListItem from './ListItem';

export default function Customers() {
  let [showQuickAdd, setShowQuickAdd] = useState(false);
  let customersQuery = useCallback((t) => t.findRecords('customer'), []);
  let [state, fetchCustomers] = useQuery({ type: 'customer', query: customersQuery });
  const { isFetchingFromRemote, results: customers } = state;
  const isLoading = isFetchingFromRemote && !customers.length;

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  return (
    <>
      <table className="table-auto w-full">
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
          {isLoading ? (
            <tr>
              <td className="text-center" colSpan="3">
                loading...
              </td>
            </tr>
          ) : (
            <>
              {customers.map(customer => {
                return (
                  <CustomerListItem
                    key={customer.id}
                    customer={customer}
                  />
                );
              })}
              {showQuickAdd && <CustomerListItem onClose={() => setShowQuickAdd(false)} />}
            </>
          )}
        </tbody>
      </table>{' '}
      {!isLoading && (
        <div className="my-10 text-center">
          <button
            className="mx-5 bg-transparent hover:bg-purple-700 text-purple-700 font-semibold hover:text-white py-2 px-4 border border-purple-700 hover:border-transparent rounded"
            onClick={() => setShowQuickAdd(true)}
          >
            Quick Add Customer
          </button>

          <Link to="/customers/new">
            <button
              className="shadow bg-purple-600 hover:bg-purple-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="button"
            >
              New Customer
            </button>
          </Link>
        </div>
      )}
    </>
  );
}
