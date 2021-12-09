import React, { useState } from 'react';
import { Paragraph } from '../../_shared/HeadingsOrParagraphs/HeadingsOrParagraphs';
import { MobileAccordionItem } from './MobileAccordionItem/MobileAccordionItem';
import { MobileChildAccordionItem } from './MobileChildAccordionItem/MobileChildAccordionItem';

export const MobileAccordion = ({ items }) => {
   const [activeItem, setActiveItem] = useState(0);
   const [activeChildItem, setActiveChildItem] = useState(0);

   const activeItemHandler = (id) => {
      setActiveItem((preState) => (preState === id ? null : id));
      setActiveChildItem(null);
   };

   const activeChildItemHandler = (id) => {
      setActiveChildItem((preState) => (preState === id ? null : id));
   };

   return (
      <div>
         {items &&
            items.map((item) => (
               <div key={item.id}>
                  <MobileAccordionItem
                     title={item.title}
                     iconHandler={() => {
                        activeItemHandler(item.id);
                     }}
                     open={item.id === activeItem}
                  />
                  {item.id === activeItem && (
                     <div className="ml-4">
                        {item.childs.map((item) => (
                           <div key={item.id}>
                              <MobileChildAccordionItem
                                 title={item.title}
                                 description={item.description}
                                 iconHandler={() => {
                                    activeChildItemHandler(item.id);
                                 }}
                                 open={item.id === activeChildItem}
                              />
                           </div>
                        ))}
                     </div>
                  )}
               </div>
            ))}
      </div>
   );
};
