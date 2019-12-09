import React, { useState } from 'react';
import { navigate } from '@reach/router';
import useStore from '../../hooks/useStore';

export default function CustomersNew() {
  let store = useStore();
  let [inputs, setInputValue] = useState({});

  function handleInputChange(e) {
    setInputValue({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className="Page">
      <div className="Page__Header">
        <div className="Page__HeaderTitle">
          <h1 className="Page__HeaderTitleText">
            New Customer
          </h1>
        </div>
      </div>
      <div className="Page__Content">
        <form className="w-full max-w-sm">
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="firstName"
              >
                First Name
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                autoFocus={true}
                id="firstName"
                name="firstName"
                value={inputs.firstName}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="lastName"
              >
                Last Name
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="lastName"
                name="lastName"
                value={inputs.lastName}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="email"
              >
                Email
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="email"
                name="email"
                value={inputs.email}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="website"
              >
                Website
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="website"
                name="website"
                value={inputs.website}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="md:flex md:items-center">
            <div className="md:w-1/3" />
            <div className="md:w-2/3">
              <button
                className="shadow bg-purple-600 hover:bg-purple-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="button"
                onClick={() => {
                  store.memory.update(t =>
                    t.addRecord({
                      type: 'customer',
                      attributes: inputs,
                    })
                  );
                  navigate('/customers');
                }}
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
