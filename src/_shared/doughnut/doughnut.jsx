import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
   display: flex;
   justify-content: center;
   flex-direction: column;
   align-items: center;
`;

const DoughnutContainer = styled.div`
   border: ${(props) => `7px solid ${props.color || '#edb200'}`};
   border-radius: 150px;
   height: 150px;
   width: 150px;
   color: ${(props) => props.color || '#EDB200'};
   display: flex;
   align-items: center;
   justify-content: center;
   flex-direction: column;

   @media only screen and (max-width: 767px) {
      height: 120px;
      width: 120px;
   }
`;

const Title = styled.h5`
   font-weight: 300;
   margin-bottom: 0;
`;

const Value = styled.h2`
   font-weight: 400;
   @media only screen and (max-width: 767px) {
      font-size: 1.6rem;
   }
`;

const Footer = styled.p`
   font-weight: 300;
   color: #808080;
   font-size: 20px;
   margin-top: 5px;

   @media only screen and (max-width: 767px) {
      font-size: 14px;
   }
`;

export const Doughnut = ({ color, value, title, footerTitle }) => {
   return (
      <Container>
         <DoughnutContainer color={color}>
            {title && <Title>{title}</Title>}
            <Value>{value}</Value>
         </DoughnutContainer>
         <Footer>{footerTitle}</Footer>
      </Container>
   );
};
