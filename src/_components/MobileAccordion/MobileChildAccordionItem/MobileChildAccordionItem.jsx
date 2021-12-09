import React from 'react';
import './MobileChildAccordionItem.less';

import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';

export const MobileChildAccordionItem = ({
   title,
   iconHandler,
   description,
   open,
}) => {
   return (
      <div className="mobile-child-accordion-item">
         <div className="d-flex align-items-center justify-content-between">
            <p className={`accordion-child-header`}>{title}:</p>
            <span className="icon-container" onClick={iconHandler}>
               {open ? (
                  <MdKeyboardArrowUp className="react-child-icons" />
               ) : (
                  <MdKeyboardArrowDown className="react-child-icons" />
               )}
            </span>
         </div>
         {open && <p className="accordion-child-description">{description}</p>}
      </div>
   );
};
