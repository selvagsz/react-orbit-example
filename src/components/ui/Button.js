import React from 'react';

export default function Button({ children, outlined, ...otherProps }) {
  return (
    <button
      className={
        `Button ${outlined ? 'Button--outlined' : ''}`
      }
      {...otherProps}
    >
      {children}
    </button>
  );
}
