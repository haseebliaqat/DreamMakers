import React from 'react';
import styled from 'styled-components';

import SendArrowIcon from '@/_assets/icons/send-arrow.svg';

const Button = styled.button`
   display: inline-block;
   padding: 0.4rem 0.9rem;
   margin: 0.5rem 0;
   border-radius: 13px;
   background: #fff;
   border: 1px solid #f1f1f1;
   box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
   font-size: 1.3rem;
   color: #104a8e;
`;

export const SendButton = ({ label = 'Send' }) => {
   return (
      <Button>
         <span className="d-inline-block mr-2">
            <img src={SendArrowIcon} alt="send-icon" />
         </span>
         {label}
      </Button>
   );
};
