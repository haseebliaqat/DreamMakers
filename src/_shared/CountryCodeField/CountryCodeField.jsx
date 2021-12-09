import React, { useState } from 'react';
import './CountryCodeField.less';
import { COUNTRY_CODES } from './CountryCodes';
import countries from '@/_assets/js/countries.json';

export const CountryCodeField = ({ label, callback }) => {

   return (
      <div className="country-input__container">
         <div className="country-input__code">
            <div className="country-input-content">
               <select className="country-select" onChange={(e)=> callback(e.target.value, 'code')}>
                  {countries.map((c) => (
                     <option value={c.num_code} key={c.num_code}>{c.num_code}</option>
                  ))}
               </select>
               <label className="country-input">{label}</label>
            </div>
         </div>
         <div className="country-input__number">
            <div className="number-label-content">
               <input className="number-input" type="number" onChange={(e)=> callback(e.target.value, 'number')}/>
               <label className="number-label">Phone Number</label>
            </div>
         </div>
      </div>
   );
};
