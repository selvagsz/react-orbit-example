import React, { useState, useEffect } from 'react';
import { Link } from '@reach/router';
import useQuery from '../../../hooks/useQuery';
import CustomerListItem from './ListItem';

export default function Customers() {
  let [showQuickAdd, setShowQuickAdd] = useState(false);
  let [state, doFetch] = useQuery({ type: 'customer', query: t => t.findRecords('customer') });
  const { isFetchingFromRemote, results: customers } = state;
  const isLoading = isFetchingFromRemote && !customers.length;

  useEffect(() => {
    doFetch(t => t.findRecords('customer'));
  }, [doFetch]);

  return (
    <>
      <table className="table-auto w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 py-1 text-left">Name</th>
            <th className="border px-2 py-1 text-left">Email</th>
            <th className="border px-2 py-1 text-left">Website</th>
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
                  <tr className="hover:bg-gray-100" key={customer.id}>
                    <td className="border px-2 py-2">
                      {customer.attributes.firstName} {customer.attributes.lastName}
                    </td>
                    <td className="border px-2 py-2">{customer.attributes.email}</td>
                    <td className="border px-2 py-2">{customer.attributes.website}</td>
                    <td className="border px-2 py-2">
                      <button
                        className="text-xs px-2 bg-transparent hover:bg-purple-700 text-purple-700 font-semibold hover:text-white border border-purple-700 hover:border-transparent rounded"
                        onClick={() => setShowQuickAdd(true)}
                      >
                        edit
                      </button>
                      <button
                        className="text-xs px-2 bg-transparent hover:bg-purple-700 text-purple-700 ml-2 font-semibold hover:text-white border border-purple-700 hover:border-transparent rounded"
                        onClick={() => setShowQuickAdd(true)}
                      >
                        delete
                      </button>
                    </td>
                  </tr>
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
