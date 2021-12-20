import React from 'react';
import './SelectField.less';

export const SelectField = ({ label, options = [], ...rest }) => {
   return (
      <div className="floating-label-content">
         <select className="floating-select" {...rest}>
            {options.map((item) => (
               <option key={item.label} value={item.value}>
                  {item.label}
               </option>
            ))}
         </select>
         <label className="floating-label">{label}</label>
      </div>
   );
};
