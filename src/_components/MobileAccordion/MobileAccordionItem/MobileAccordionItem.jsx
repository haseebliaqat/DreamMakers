import React from 'react';
import './MobileAccordionItem.less';

import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';

export const MobileAccordionItem = ({
   title,
   iconHandler,
   open,
   childAccordion,
}) => {
   return (
      <div className="d-flex align-items-center mobile-accordion-item">
         <p className={`accordion-header`}>{title}:</p>
         <span className="icon-container" onClick={iconHandler}>
            {open ? (
               <MdKeyboardArrowUp className="react-icons" />
            ) : (
               <MdKeyboardArrowDown className="react-icons" />
            )}
         </span>
      </div>
   );
};
