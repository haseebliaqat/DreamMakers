import React, { useState } from 'react';
import './FrequentlyAskedQuestions.less';

import { SubHeader } from '@/_components/SubHeader/SubHeader';
import Accordion from '../../_components/Accordion';
import { MobileAccordion } from '../../_components/MobileAccordion/MobileAccordion';

export const FrequentlyAskedQuestions = () => {
   const [questions, setQuestions] = useState([
      {
         id: 0,
         title: 'Donation Related Questions',
         description: '',
         childs: [
            {
               id: 0,
               title: 'Questions 1',
               description:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dignissim lacus at felis sagittis, in sollicitudin augue iaculis. Mauris placerat consequat neque, sit amet placerat nisi elementum sed. Aenean sed facilisis felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dignissim lacus at felis sagittis, in sollicitudin augue iaculis. Mauris placerat consequat neque, sit amet placerat nisi elementum sed. Aenean sed facilisis felis. Lorem ipsum dolor sit amet, consectetur adipiscing eli . In dignissim lacus at felis sagittis, in sollicitudin augue iaculis. Mauris placerat consequat neque, sit amet placerat nisi elementum sed. Aenean sed facilisis felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dignissim lacus at felis sagittis, in sollicitudin augue iaculis. Mauris placerat consequat neque, sit amet placerat nisi elementum sed. Aenean sed facilisis felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dignissim lacus at felis sagittis, in sollicitudin augue iaculis. Mauris placerat consequat neque, sit amet placerat nisi elementum sed. Aenean sed facilisis felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dignissim lacus at felis sagittis, in sollicitudin augue iaculis. Mauris placerat consequat neque, sit amet placerat nisi elementum sed. Aenean sed facilisis felis. ',
            },
            {
               id: 1,
               title: 'Questions 2',
               description:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dignissim lacus at felis sagittis, in sollicitudin augue iaculis. Mauris placerat consequat neque, sit amet placerat nisi elementum sed. Aenean sed facilisis felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dignissim lacus at felis sagittis, in sollicitudin augue iaculis. Mauris placerat consequat neque, sit amet placerat nisi elementum sed. Aenean sed facilisis felis. Lorem ipsum dolor sit amet, consectetur adipiscing eli . In dignissim lacus at felis sagittis, in sollicitudin augue iaculis. Mauris placerat consequat neque, sit amet placerat nisi elementum sed. Aenean sed facilisis felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dignissim lacus at felis sagittis, in sollicitudin augue iaculis. Mauris placerat consequat neque, sit amet placerat nisi elementum sed. Aenean sed facilisis felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dignissim lacus at felis sagittis, in sollicitudin augue iaculis. Mauris placerat consequat neque, sit amet placerat nisi elementum sed. Aenean sed facilisis felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dignissim lacus at felis sagittis, in sollicitudin augue iaculis. Mauris placerat consequat neque, sit amet placerat nisi elementum sed. Aenean sed facilisis felis. ',
            },
            {
               id: 2,
               title: 'Questions 3',
               description:
                  'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit molestias eveniet libero voluptates quos, impedit blanditiis consequatur magni necessitatibus dolore soluta aut, harum tenetur voluptatibus possimus nam excepturi obcaecati quis!',
            },
         ],
      },
      {
         id: 1,
         title: 'Draw Related Questions',
         description: '',
         childs: [
            {
               id: 0,
               title: 'Questions 4',
               description:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dignissim lacus at felis sagittis, in.',
            },
            {
               id: 1,
               title: 'Questions 5',
               description:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dignissim lacus at felis sagittis, in sollicitudin augue iaculis.',
            },
            {
               id: 2,
               title: 'Questions 6',
               description:
                  'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit molestias eveniet libero voluptates quos, impedit blanditiis consequatur magni necessitatibus dolore soluta aut, harum tenetur voluptatibus possimus nam excepturi obcaecati quis!',
            },
         ],
      },
      {
         id: 2,
         title: 'Dream Coin Related Questions',
         description: '',
         childs: [
            {
               id: 0,
               title: 'Questions 7',
               description:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dignissim lacus at felis sagittis.',
            },
            {
               id: 1,
               title: 'Questions 8',
               description:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dignissim lacus at felis sagittis, in sollicitudin augue iaculis. Mauris placerat consequat neque, sit amet placerat nisi elementum sed. Aenean sed facilisis felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            },
            {
               id: 2,
               title: 'Questions 9',
               description:
                  'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit molestias eveniet libero voluptates quos, impedit blanditiis consequatur magni necessitatibus dolore soluta aut, harum tenetur voluptatibus possimus nam excepturi obcaecati quis!',
            },
         ],
      },
   ]);

   return (
      <div>
         <div className="d-md-block d-none">
            <SubHeader title="Frequently Asked Questions" />
            <div className="question-container">
               <Accordion items={questions} />
            </div>
         </div>
         <div className="d-md-none d-block">
            <div className="question-container">
               <h1 className="mobile-faq-header">Frequently Asked Question:</h1>
               <MobileAccordion items={questions} />
            </div>
         </div>
      </div>
   );
};
