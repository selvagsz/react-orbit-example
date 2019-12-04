import React, { useState, useEffect, useCallback } from 'react';
import useFormInput from '../../../hooks/useFormInput';
import useStore from '../../../hooks/useStore';
import useQuery from '../../../hooks/useQuery';

export default function ListItem({
  isNew = false,
  customer = { type: 'customer', attributes: {} },
  onClose = () => {},
}) {
  let [inputs, setInputValues, handleInputChange] = useFormInput(customer);
  let [isEdit, setIsEdit] = useState(isNew);
  let { memory } = useStore();
  let customerAssigneeQuery = useCallback((t) => t.findRecord(customer.relationships.user.data), [customer.relationships.user.data]);
  let [state, fetchCustomerAssignee] = useQuery({
    type: `user:${customer.relationships.user.data.id}`,
    query: customerAssigneeQuery,
    initialState: {},
  });
  const { results: assignee } = state;

  useEffect(() => {
    fetchCustomerAssignee()
  }, [fetchCustomerAssignee])


  return (
    <tr>
      <td className="border px-2 py-1">
        {isEdit ? (
          <>
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 mr-1 px-2 py-1 rounded w-1/3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="firstName"
              name="firstName"
              autoFocus={true}
              placeholder="first name"
              value={inputs.firstName}
              onChange={handleInputChange}
            />
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-1/3 px-2 py-1 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="lastName"
              name="lastName"
              placeholder="last name"
              value={inputs.lastName}
              onChange={handleInputChange}
            />
          </>
        ) : (
          <span>
            {customer.attributes.firstName} {customer.attributes.lastName}{' '}
          </span>
        )}
      </td>
      <td className="border px-2 py-1">
        {isEdit ? (
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full px-2 py-1 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="email"
            name="email"
            placeholder="email"
            value={inputs.email}
            onChange={handleInputChange}
          />
        ) : (
          <span>{customer.attributes.email}</span>
        )}
      </td>

      <td className="border px-2 py-1">
        {isEdit ? (
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded px-2 py-1 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="website"
            name="website"
            placeholder="website"
            value={inputs.website}
            onChange={handleInputChange}
          />
        ) : (
          <span>{customer.attributes.website}</span>
        )}
      </td>
      <td className="border px-2 py-1">
        {!assignee.attributes ? 'loading...' :
        <span>{assignee.attributes.firstName}</span>}
      </td>
      <td className="border px-2 py-1">
        {isEdit ? (
          <>
            <button
              className="text-xs px-2 bg-transparent hover:bg-purple-700 text-purple-700 font-semibold hover:text-white py-1 px-2 border border-purple-700 hover:border-transparent rounded"
              onClick={async () => {
                if (customer.id) {
                  await memory.update(t =>
                    t.updateRecord({
                      type: 'customer',
                      id: customer.id,
                      attributes: inputs,
                    })
                  );
                } else {
                  await memory.update(t =>
                    t.addRecord({
                      type: 'customer',
                      attributes: inputs,
                    })
                  );
                }
                setIsEdit(false);
                onClose();
              }}
            >
              Save
            </button>
            <button
              className="text-xs px-2 ml-2 bg-transparent hover:bg-purple-700 text-purple-700 font-semibold hover:text-white py-1 px-2 border border-purple-700 hover:border-transparent rounded"
              onClick={() => {
                setIsEdit(false);
                onClose();
              }}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              className="text-xs px-2 bg-transparent hover:bg-purple-700 text-purple-700 font-semibold hover:text-white border border-purple-700 hover:border-transparent rounded"
              onClick={() => {
                setInputValues(customer.attributes);
                setIsEdit(true);
              }}
            >
              edit
            </button>
            <button
              className="text-xs px-2 bg-transparent hover:bg-purple-700 text-purple-700 ml-2 font-semibold hover:text-white border border-purple-700 hover:border-transparent rounded"
              onClick={() => {
                if (window.confirm('Are you sure?')) {
                  memory.update(t => t.removeRecord(customer));
                }
              }}
            >
              delete
            </button>
          </>
        )}
      </td>
    </tr>
  );
}
