import React from 'react';
import styled from 'styled-components';

import CardImage from '@/_assets/images/card-image.png';
import {
   H5Heading,
   H6Heading,
} from '../HeadingsOrParagraphs/HeadingsOrParagraphs';

const CardContainer = styled.div`
   display: flex;
   align-items: flex-start;
   max-height: 150px;
   margin-top: 20px;

   @media only screen and (max-width: 767px) {
      margin-top: 20px;
   }
`;

const ImageContainer = styled.div`
   width: 100px;
   height: 100px;

   @media only screen and (max-width: 767px) {
      width: 140px;
      height: 140px;
      margin-left:7px
   }
`;

const ReadMoreBtn = styled.span`
   display: inline-block;
   font-weight: 500;
   font-size: 14px;
   color: #edb200;

   @media only screen and (max-width: 767px) {
      font-size: 16px;
   }
`;

const CardHeading = styled.h5`
   font-weight: ${({ fontWeight }) => fontWeight || '500'};
   text-align: left;
   color: ${({ color }) => color || '#104a8e'};
   margin: 0;
   font-size: ${({ fontSize }) => `${fontSize}px`};
   text-align: ${({ textAlign }) => textAlign || 'left'};

   @media only screen and (max-width: 767px) {
      font-size: 28px;
   }
`;

export const DonationCard = ({ image = CardImage, title, subTitle }) => {
   return (
      <CardContainer>
         <ImageContainer>
            <img src={image} alt="card-image" className="img-fluid" />
         </ImageContainer>
         <div className="d-flex justify-content-between flex-column h-100">
            <div>
               <CardHeading fontWeight="600" fontSize="18">
                  {title}
               </CardHeading>
               <H6Heading fontSize="16">{subTitle}</H6Heading>
            </div>
            <ReadMoreBtn>Read more</ReadMoreBtn>
         </div>
      </CardContainer>
   );
};
