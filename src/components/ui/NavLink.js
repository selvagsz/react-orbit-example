import React from 'react';
import { Link } from '@reach/router';

export default function NavLink({ activeClassName = 'active', className, children, ...otherProps }) {
  return (
    <Link
      getProps={({ isPartiallyCurrent }) => {
        return { className: `${className} ${isPartiallyCurrent ? activeClassName : '' }` };
      }}
      {...otherProps}
    >
      {children}
    </Link>
  );
}
