import React from 'react';
import './DownloadButton.less';

import DownloadIcon from '@/_assets/icons/button-download.svg';

export const DownloadButton = ({ label, ...rest }) => (
   <button className="btn btn-download" {...rest}>
      <span className="d-inline-block">{label}</span>
      <span className="d-inline-block ml-4">
         <img src={DownloadIcon} alt="download-img" />
      </span>
   </button>
);
