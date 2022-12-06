import React from 'react';
export default function (props) {
  return (
    <img
      {...props}
      style={{
        boxSizing: 'border-box',
        overflow: 'hidden',
        width: '100%',
        height: '100%',
        display: 'block',
        margin: 'auto',
      }}
    />
  );
}
