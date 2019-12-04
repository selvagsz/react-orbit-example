import React, { useEffect, useCallback } from 'react';
import useQuery from '../../../hooks/useQuery';

export default function Users() {
  let fetchUsersQuery = useCallback((t) => t.findRecords('user'), []);
  let [state, fetchUsers] = useQuery({ type: 'user', query: fetchUsersQuery });
  const { isFetchingFromRemote, results: users } = state;
  const isLoading = isFetchingFromRemote && !users.length;

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <>
      <table className="table-auto w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 py-1 text-left">Name</th>
            <th className="border px-2 py-1 text-left">Email</th>
            <th className="border px-2 py-1 text-left">Website</th>
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
            users.map(user => {
              return (
                <tr key={user.id}>
                  <td className="border px-2 py-1">{user.attributes.firstName}</td>
                  <td className="border px-2 py-1">{user.attributes.email}</td>
                  <td className="border px-2 py-1">{user.attributes.website}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </>
  );
}
