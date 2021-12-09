import React from 'react';
import './TypeHead.less';
import countries from '@/_assets/js/countries.json';
import cities from '@/_assets/js/cities.json';
export const TypeHead = ({ label, options = [], ...rest }) => {
    const nationalites=countries;
   return (
      <div className="floating-label-content">
           <Typeahead label="Nationality" className="floating-select" {...rest} 
                                    labelKey="nationality"
                                    onChange={(selected) => {
                                       setnationality(selected);
                                       className="floating-select"
                                       console.log("VALUE");
                                    }}
                                    options={nationalites}
                                    placeholder="Nationality"
                                    //selected={nationality}
                                    // renderInput={(params) =>{
                                    //    const inputProps = params.inputProps;
                                       
                                    //    return (
                                    //       <div className="floating-label-content">
                                             
                                    //          <TextField  className="floating-select" 
                                             
                                    //          inputProps={inputProps}
                                    //          {...params}
                                    //          label="Country" 
                                    //         />
                                    //       </div>
                                                                      
                                    //    );
                                    // }}
                                 />
         <label className="floating-label">{label}</label>
      </div>
   );
};
