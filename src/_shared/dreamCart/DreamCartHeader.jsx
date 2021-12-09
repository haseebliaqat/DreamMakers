import React, { useState,useEffect } from 'react';
import './dreamCart.less';
const DreamCartHeader = (props,history,location) => {
   const [TermAndCondition, setTermsandcondition] = useState(false);
   useEffect(() => {
      if(props.value=="1"){
         setTermsandcondition(true)
      }
    // alert(viewValue);
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
                     // defaultChecked={TermAndCondition}
                     onChange={toggleChange}
        />
            </div>
            <div className="mt-2 dreamCart-tags">{props.name}</div>
         </div>
      </>
   );
};

export default DreamCartHeader;
