import React from 'react';
import './Textarea.less';

export const Textarea = ({ label, ...rest }) => {
   return (
      <div className="textarea-label-content">
         <textarea className="textarea-input" {...rest}></textarea>
         <label className="textarea-label">{label}</label>
      </div>
   );
};
