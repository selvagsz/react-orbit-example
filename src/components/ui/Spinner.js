import React from 'react';

export default function Button({ children, outlined, ...otherProps }) {
  return (
    <div className="Spinner">
      <div className="shaft1"></div>
      <div className="shaft2"></div>
      <div className="shaft3"></div>
      <div className="shaft4"></div>
      <div className="shaft5"></div>
    </div>
  );
}
