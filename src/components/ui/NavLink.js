import React from 'react';
import { Link } from '@reach/router';

const isPartiallyActive = ({ isPartiallyCurrent }) => {
  return isPartiallyCurrent ? { className: 'border-b-4 border-purple-700' } : null;
};

export default function NavLink(props) {
  return <Link getProps={isPartiallyActive} {...props} />;
}
