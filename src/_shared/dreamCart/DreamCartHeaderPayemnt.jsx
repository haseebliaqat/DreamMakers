import React, { useState,useEffect } from 'react';
import './dreamCart.less';
import { useHistory } from "react-router-dom";
const DreamCartHeaderPayemnt = (props,location) => {
   const history = useHistory();
   const [TermAndCondition, setTermsandcondition] = useState(true);
   useEffect(() => {
    // alert(viewValue);
    if(props.value==3){
      setTermsandcondition(true)
    }else{
      setTermsandcondition(false)
    }
  }, []);
   const toggleChange = () => {
     
      setTermsandcondition(true)
      // const { from } = { from: { pathname: "/dream-cart-payment" } };
      // history.push(from);
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

export default DreamCartHeaderPayemnt;
