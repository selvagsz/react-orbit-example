import React from 'react';
import { Router } from '@reach/router';
import NavLink from './components/ui/NavLink';
import Customers from './components/Customers/List';
import CustomersNew from './components/Customers/New';
import Users from './components/Users/List';

export default function App() {
  return (
    <div className="App container mx-auto px-4 font-sans font-normal">
      <header>
        <nav>
          <div className="py-4 flex-shrink-0 flex items-center">
            <NavLink to="/customers">
              <button className="py-2 px-4 font-medium text-gray-900 text-center">Customers</button>
            </NavLink>
            <NavLink to="/users">
              <button className="py-2 px-4 font-medium text-gray-900 text-cente">Users</button>
            </NavLink>
          </div>
        </nav>
      </header>

      <main>
        <Router>
          <Customers path="/customers" />
          <CustomersNew path="/customers/new" />
          <Users path="/users" />
        </Router>
      </main>
    </div>
  );
}
