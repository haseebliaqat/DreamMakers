import React, { useState,useEffect } from 'react';
import './dreamCart.less';
import { useHistory } from "react-router-dom";
const DreamCartHeaderConformation = (props,location) => {
   const [TermAndCondition, setTermsandcondition] = useState(false);
   useEffect(() => {
      if(props.value==4){
         setTermsandcondition(true)
       }else{
         setTermsandcondition(false)
       }
  }, []);
   const toggleChange = () => {
      setTermsandcondition(true)
    }
   return (
      <>
         <div className="dreamCartProcess">
            <div className="dreamCartProcess__circle" style={{border:"none"}}>
               {/* <div className=""></div> */}
               <input  type="radio" 
                     className="dreamCartProcess"
                     checked={TermAndCondition}
                     onChange={toggleChange}
                     style={{WebkitAppearance:"radio"}}
        />
            </div>
            <div className="mt-2 dreamCart-tags">{props.name}</div>
         </div>
      </>
   );
};

export default DreamCartHeaderConformation;
