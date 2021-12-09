import React from 'react';
import './SelectField.less';

export const SelectField = ({ label, options = [], ...rest }) => {
   return (
      <div className="floating-label-content">
         <select className="floating-select" {...rest}>
            <option>Alabama</option>
            <option>Boston</option>
            <option>Ohaio</option>
            <option>New York</option>
            <option>Washington</option>
         </select>
         <label className="floating-label">{label}</label>
      </div>
   );
};
