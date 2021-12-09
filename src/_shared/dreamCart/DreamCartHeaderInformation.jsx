import React, { useState,useEffect } from 'react';
import './dreamCart.less';
import { Link } from 'react-router-dom';
const DreamCartHeaderInformation = (props,history,location) => {
   const [TermAndCondition, setTermsandcondition] = useState(false);
   useEffect(() => {
    // alert(viewValue);
    if(props.value==2){
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

               <input type="radio" 
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

export default DreamCartHeaderInformation;
