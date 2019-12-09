import React from 'react';
import { Router } from '@reach/router';
import NavLink from './components/ui/NavLink';
import Customers from './components/Customers/List';
import CustomersNew from './components/Customers/New';
import Users from './components/Users/List';

export default function App() {
  return (
    <div className="App">
      <header className="Header">
        <div className="Header__Brand">
          React Orbit
        </div>
        <nav className="Header__Nav">
          <NavLink
            to="/customers"
            className="Header__NavLink"
            activeClassName="Header__NavLink--active"
          >
            Customers
          </NavLink>
          <NavLink
            to="/users"
            className="Header__NavLink"
            activeClassName="Header__NavLink--active"
          >
            Users
          </NavLink>
        </nav>
      </header>

      <main className="MainContent">
        <Router>
          <Customers path="/customers" />
          <CustomersNew path="/customers/new" />
          <Users path="/users" />
        </Router>
      </main>
    </div>
  );
}
