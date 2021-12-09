import React, { useState,useEffect } from 'react';
import './dreamCart.less';
import { useHistory } from "react-router-dom";
const DreamCartHeaderBilling = (props,location) => {
   const history = useHistory();
   const [TermAndCondition, setTermsandcondition] = useState(false);
   useEffect(() => {
    if(props.value==1){
      setTermsandcondition(true)
    }else{
      setTermsandcondition(false)
    }
  }, []);
   const toggleChange = () => {
      //setTermsandcondition(true)
    }
    
   return (
      <>
         <div className="dreamCartProcess">
            <div className="dreamCartProcess__circle" style={{border:"none"}}>
               {/* <div className=""></div> */}
               <input  type="radio" 
                     className="dreamCartProcess"
                    // defaultChecked={TermAndCondition}
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

export default DreamCartHeaderBilling;
