import React, { useState } from 'react';
import './TextField.less';

import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';

export const TextField = ({
   label,
   type = 'text',
   showPasswordIcon,
   ...rest
}) => {
   const [showPassword, setShowPassword] = useState(false);
   return (
      <div className="did-floating-label-content">
         <input
            className="did-floating-input"
            type={showPasswordIcon && showPassword ? 'text' : type}
            {...rest}
         />
         <label className="did-floating-label">{label}</label>
         {showPasswordIcon && (
            <span
               className="icon-position"
               onClick={() => {
                  setShowPassword(!showPassword);
               }}
            >
               {showPassword ? (
                  <AiFillEye className="password-icon" />
               ) : (
                  <AiFillEyeInvisible className="password-icon" />
               )}
            </span>
         )}
      </div>
   );
};
