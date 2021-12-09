import React from 'react';
import './AccordionItem.less';

import MinusIcon from '@/_assets/icons/minus.svg';
import PlusIcon from '@/_assets/icons/plus.svg';

export const AccordionItem = ({
   title,
   iconHandler,
   showMinusIcon,
   smallFont,
}) => {
   return (
      <div className="d-flex align-items-center accordion-item">
         <span className="icon-container" onClick={iconHandler}>
            {showMinusIcon ? (
               <img src={MinusIcon} alt="plus-icon" className="img-fluid" />
            ) : (
               <img src={PlusIcon} alt="plus-icon" className="img-fluid" />
            )}
         </span>
         <p className={`accordion-header ${smallFont ? 'sm-font' : 'lg-font'}`}>
            {title}
         </p>
      </div>
   );
};
