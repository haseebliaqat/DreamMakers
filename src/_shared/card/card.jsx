import React from 'react';
import './card.less';

export const Card = ({ children, className }) => {
   return <div className={`cs-card ${className}`}>{children}</div>;
};
