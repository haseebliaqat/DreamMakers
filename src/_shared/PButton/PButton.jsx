import React from 'react';
import './PButton.less';

export const PButton = ({ label, ...rest }) => (
   <button className="btn btn-primary p-btn" {...rest}>
      {label}
   </button>
);
