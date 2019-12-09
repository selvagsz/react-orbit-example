import React, { useEffect } from 'react';
import useStoreQuery from '../../../hooks/useQuery';
import Button from '../../ui/Button';
import Spinner from '../../ui/Spinner';

export default function Users() {
  let { data: users = [], isFetchingFromRemote, queryStore } = useStoreQuery({
    subscribeTo: 'user',
  });

  useEffect(() => {
    queryStore(t => t.findRecords('user'));
  }, [queryStore]);

  return (
    <div className="Page">
      <div className="Page__Header">
        <div className="Page__HeaderTitle">
          <h1 className="Page__HeaderTitleText">Users</h1>
          {isFetchingFromRemote && <Spinner />}
        </div>
        <div className="Page__HeaderActions">
          <Button>New User</Button>
        </div>
      </div>

      <div className="Page__Content">
        <table className="table-auto w-full mt-2">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1 text-left">Name</th>
              <th className="border px-2 py-1 text-left">Email</th>
              <th className="border px-2 py-1 text-left">Website</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => {
              return (
                <tr key={user.id}>
                  <td className="border px-2 py-1">{user.attributes.firstName}</td>
                  <td className="border px-2 py-1">{user.attributes.email}</td>
                  <td className="border px-2 py-1">{user.attributes.website}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
