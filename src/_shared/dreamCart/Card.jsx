import React, { useEffect, useState } from 'react';
import './dreamCart.less';
import { TextField } from '@/_shared/TextField/TextField';
import { Link } from 'react-router-dom';
import Bottle from '../../_assets/dreamCart/Picture1.png';
import Delete from '../../_assets/dreamCart/delete.png';
import Minus from '../../_assets/dreamCart/minus.png';
import Plus from '../../_assets/dreamCart/plus.png';
import * as moment from "moment";
import { accountService, alertService } from '@/_services';
const Card = ({count,setCount}) => {
   const [campaign, setCampaignData] = useState(null);
   const [endAmount, SetEndAmount] = useState(localStorage.getItem("selected_campaign_cash_paid"));
   const [campaignPrice, setCampaignprice ]= useState(null);
   const [user, setUser] = useState(null);
   const [Discount, setDiscount] = useState(localStorage.getItem("discount_code")!=""?localStorage.getItem("discount_code"):null);
   const [Redeem, setRedeem] = useState(0);
   const [is_apply_redeem, setIsApplyRedeem] = useState(false);
   const [is_apply_discount, setIsApplyDiscount] = useState(false);
   const [apply_discount, setAppyDiscount] = useState(0);
   const [apply_discount_percebtage, setAppyPercentage] = useState(!!localStorage.getItem("discount_percentage")?localStorage.getItem("discount_percentage"):0);
   const [apply_discount_percebtage_dream_coin, setAppyPercentageDreamCoin] = useState(!!localStorage.getItem("discount_percentage_dream_coin")?localStorage.getItem("discount_percentage_dream_coin"):0);
  // const [apply_discount, setApplyDiscount] = useState(localStorage.getItem("selected_campaign_discount_amount")!=""?localStorage.getItem("selected_campaign_discount_value"):null);
   
   const [TotalCouponPrice, setTotalCouponPrice] = useState(0);
   const [TotalTransactionFees, setTotalTransactionFees] = useState(1);
   
   useEffect(() => {
      if (!!localStorage.userDetails) {            
         setUser(JSON.parse(localStorage.userDetails));
         
      }
      if (!!localStorage.SeletedCampaign) {
     setCampaignData(JSON.parse(localStorage.SeletedCampaign));
               console.log("haseeb");
              var SelectedCampaignJSON=JSON.parse(localStorage.SeletedCampaign);
              if(SelectedCampaignJSON.count==undefined){
                 SelectedCampaignJSON.count=1;
                 setCount(SelectedCampaignJSON.count);
              }else{
                setCount(SelectedCampaignJSON.count);
              }
              setTotalCouponPrice((SelectedCampaignJSON.couponPrice)), 
              console.log(SelectedCampaignJSON.count);
              localStorage.setItem("SeletedCampaign",JSON.stringify(SelectedCampaignJSON));
        }
        const timer = setTimeout(() => {
         // GetAllWinners();
         setRedeem(!!user?user.dreamCoins:0),[
            console.log("heloo==>>>>>>>>>>>>>>"),
            console.log(Redeem)
         ]
       }, 1000);
   }, [       
   localStorage.setItem("selected_campaign_actual_price",!!campaign?campaign.couponPrice:""),//
   localStorage.setItem("selected_campaign_id",!!campaign?campaign.id:""),//
   localStorage.setItem("selected_campaign_actual_amount",!!campaign?parseFloat((campaign.couponPrice*count)+1):""),//
   localStorage.setItem("selected_campaign_cash_paid",!!campaign?parseFloat(((campaign.couponPrice*count)+1)-localStorage.getItem("selected_campaign_discount_amount")):""),//
   localStorage.setItem("dream_coins",!!campaign?parseFloat((campaign.couponPrice*count)):""),
   localStorage.setItem("item_count_value",count),
   localStorage.setItem("is_card_show",false),


]);
// const GetAllWinners =()=> {
//    console.log("-=============>"+!!user?user.id:"")
//    let obj1 = {
//       "limit": 5,
//       "offset": 0,
//       "order": [["id", "DESC"]],
//       "where":{"id":{"$gt":0},"accountId":!!user?user.id:"" }
//   }
//    alertService.clear();
//    accountService.AvailabelBalance(obj1).then((resp) => {
//       console.log("resp.rows")
//       console.log(resp.rows)
//       var myJson= resp.rows;
//       console.log("myJson")
//       console.log(myJson)
//       localStorage.setItem("avalaible_balance",myJson[0].balance)
//       localStorage.setItem("avalaible_dreamcoin",myJson[0].currencyValue)

//    }).catch(error => {
//        alertService.error("Internal Server Error");
//    });
//  }

   const incrementHandler = () => {
      setCount(count + 1), 

      console.log("haseeb");
      var SelectedCampaignJSON=JSON.parse(localStorage.SeletedCampaign);
      SelectedCampaignJSON.count=count+1;
      console.log(SelectedCampaignJSON.count);
      localStorage.setItem("SeletedCampaign",JSON.stringify(SelectedCampaignJSON));
      [
         localStorage.setItem("selected_campaign_actual_amount",!!campaign?parseFloat((campaign.couponPrice*count)):""),
         localStorage.setItem("selected_campaign_cash_paid",!!campaign?parseFloat(((campaign.couponPrice*count)+TotalTransactionFees)-localStorage.getItem("selected_campaign_discount_amount")):""),
         localStorage.setItem("dream_coins",!!campaign?parseFloat((campaign.couponPrice*count)):""),
         localStorage.setItem("item_count_value",count),
         ]
   };
   const decrementHandler = () => {
      if(count!=1){
         setCount(count - 1), 
         console.log("haseeb");
         var SelectedCampaignJSON=JSON.parse(localStorage.SeletedCampaign);
         SelectedCampaignJSON.count=count-1;
         localStorage.setItem("SeletedCampaign",JSON.stringify(SelectedCampaignJSON));
         [
            localStorage.setItem("selected_campaign_actual_amount",!!campaign?parseFloat((campaign.couponPrice*count)-1):""),
            localStorage.setItem("selected_campaign_cash_paid",!!campaign?parseFloat((campaign.couponPrice*count-1)-localStorage.getItem("selected_campaign_discount_amount")):""),
            localStorage.setItem("dream_coins",!!campaign?parseFloat((campaign.couponPrice*count)):""),
            localStorage.setItem("item_count_value",count),
          ]}
   };

   function ApplyNewDiscount() {
      console.log("haseeb");
         setCount(count), 
         console.log("haseeb");
         var SelectedCampaignJSON=JSON.parse(localStorage.SeletedCampaign);
         SelectedCampaignJSON.count=count;
         localStorage.setItem("SeletedCampaign",JSON.stringify(SelectedCampaignJSON));
         [
            localStorage.setItem("selected_campaign_actual_amount",!!campaign?parseFloat((campaign.couponPrice*count)):""),
            localStorage.setItem("selected_campaign_cash_paid",!!campaign?parseFloat((campaign.couponPrice*count)-localStorage.getItem("selected_campaign_discount_amount")):""),
            localStorage.setItem("dream_coins",!!campaign?parseFloat((campaign.couponPrice*count)):""),
            localStorage.setItem("item_count_value",count),
          ]
   
   };
   function saveDataClear(){
      localStorage.setItem("SeletedCampaign","");
      localStorage.setItem("selected_campaign_actual_amount","");
      localStorage.setItem("selected_campaign_cash_paid","");
      localStorage.setItem("item_count_value","");
      localStorage.setItem("selected_campaign_id","");
      localStorage.setItem("selected_campaign_discount_amount","0");
      localStorage.setItem("selected_campaign_actual_price","");
      localStorage.setItem("SeletedCampaign","");
      localStorage.setItem("purchase_detail","");
      localStorage.setItem("dream_coins","");
  }
  const  DiscountField=(event)=> {
      setDiscount(event.target.value)
      localStorage.setItem("discount_code",event.target.value);
  }
 const  RedeemField=(event)=> {
   setRedeem(event.target.value)
  }
  
  
   const  ApplyDiscount=()=> {
      if(Discount!=null){
         setIsApplyDiscount(true)
         console.log("apply"+Discount)
         let obj1 = {
            "limit": 5,
            "offset": 0,
            "order": [["id", "DESC"]],
            "where":{"id":{"$gt":0},"code":Discount }
        }
         alertService.clear();
         accountService.DiscountList(obj1).then((resp) => {
            if(resp.rows!=""){
               var myJson= resp.rows;
               const ExpireyDate = moment(myJson[0].expiry).format("MM/DD/YYYY");
               console.log(ExpireyDate);
                  var today = new Date();
                  console.log("haseeb1");
                  var ActualAmount = localStorage.getItem("selected_campaign_cash_paid");
                  var DiscountPercentage =myJson[0].discount.replace("%","") / 100;
                  localStorage.setItem("discount_percentage",DiscountPercentage);
                  setAppyPercentage(DiscountPercentage);
                  var TotalDiscount =(ActualAmount * (DiscountPercentage))
                  localStorage.setItem("selected_campaign_discount_amount",TotalDiscount);
                  console.log("haseeb2");
                  setAppyDiscount(apply_discount)
                        console.log("TotalDiscount")
                     console.log(TotalDiscount)
                  SetEndAmount(...TotalDiscount)
                  // ApplyNewDiscount()
                  // if(today>=ExpireyDate){
     
   
                  // }else{
                  //    console.log("Expire");
                  // }
            }else{
               console.log("Invalid Code");
            }
            
         }).catch(error => {
             alertService.error("Internal Server Error");
         });
      }else{
         alert("Please enter dicount Code")
         }
      
    }
    const  ApplyRedeem=()=> {
      var ActualAmount = localStorage.getItem("selected_campaign_cash_paid");
      var DiscountPercentage =localStorage.getItem("avalaible_dreamcoin");
      localStorage.setItem("discount_percentage_dream_coin",DiscountPercentage);
      setAppyPercentageDreamCoin(DiscountPercentage);
      var TotalDiscount =(ActualAmount -DiscountPercentage)
      console.log("TotalDiscount")
      console.log(TotalDiscount)
      setIsApplyRedeem(true)
      // localStorage.setItem("selected_campaign_discount_amount",TotalDiscount);
      // console.log("haseeb2");
      // setAppyDiscount(apply_discount)
      
    }

 
    
   return (
         <div className="container boxShadow mb-3 mt-1 containerMedium">
            <div className="row d-flex justify-content-between cardBox">
               <div className="col-7 col-sm-7 col-md-7 col-lg-5">
                  <div className="d-flex justify-content-between detamCartLeft">
                     <div className="count-DreamCart">1.</div>
                     <div className="Product-DreamCart ">
                        {/* <img src={Bottle}  alt="bottle" className="bottle-img" style={{width:'85px', height:'205px', borderRadius:'50%', marginRight:'10px', margin:'10px'}} /> */}
                        <img  src={campaign?.prizeImage} alt="bottle" className="bottle-img" style={{width:'85px', height:'205px', borderRadius:'50%', marginRight:'10px', margin:'10px'}} />
                     </div>
                     <div className="Product-deatils-DreamCart">
                        <div className="maldivs-trip">{!!campaign?campaign.title:""}</div>
                        <p>Enter to win</p>
                        <p className="dream-paragraph">
                           you will received <b>{!!campaign?parseFloat((campaign.couponPrice*count)):"0"} dream coins</b> for this
                           purchase
                        </p>
                        <p className="dream-paragraph">
                           In partnership with <b>ABC Tours</b>
                        </p>
                        <Link to={{ pathname: `/`}} >
                                        
                        {/* <p className="d-flex align-items-center">
                           <img src={Delete} alt="delete" />
                           <span onClick={(e) => saveDataClear()} className="ml-1 dream-paragraph">Remove</span>
                        </p> */}
                         </Link> 
                     </div>
                  </div>
               </div>
               <div className="col-5 col-sm-5 col-md-4">
                  <div className="AlignRight">
                     <div className="maldivs-trip text-center ">AED {TotalCouponPrice}</div>
                     <div className="productCount-dreamCart mt-4 mb-2">
                        {count!=0?<button
                           className="decrementBtn"
                           onClick={decrementHandler}
                        >
                           <img
                              src={Minus}
                              alt="Decrement"
                              className="cart-btn"
                           />
                        </button>:<button
                           className="decrementBtn"
                        >
                           <img
                              src={Minus}
                              alt="Decrement"
                              className="cart-btn"
                           />
                        </button>}
                        <div className="dreamXCart-counter">{count}</div>
                        <button
                           className="incrementBtn"
                           onClick={incrementHandler}
                        >
                           <img
                              src={Plus}
                              alt="increment"
                              className="cart-btn"
                           />
                        </button>
                     </div>
                     <p className="text-center PurchaseEntries">
                        1 Purchase equals to 1 entry
                     </p>
                  </div>
               </div>
            </div>
            <div className="row">
               <div className="col-sm-9 col-md-8 pl-5">
                  <p className="pl-4 fontSizeNote">
                     Note: Every Product you purchase will be donated and
                     channeled through your partners to help less fortunate.
                  </p>
               </div>
            </div>
            <div className="row d-flex justify-content-between align-items-center cardBox pb-2">
               <div className="col-8 col-sm-8 col-md-10">
                  <div className="d-flex align-items-center">
                     <div className="count-DreamCart">2.</div>

                     <div className="Product-deatils-DreamCart pl-4">
                        <div className="maldivs-trip ">Transaction fee</div>
                     </div>
                  </div>
               </div>
               <div className="col-4 col-sm-4 col-md-2">
                  <div className=" AlignRight">
                     <div className="maldivs-trip">AED {TotalTransactionFees}</div>
                  </div>
               </div>
            </div>
            <div className="horizonatl-line pb-2"></div>
            <div className="row d-flex  cardBox pb-4">
               <div className="col-8 col-sm-4 col-md-4 text-center order1">
                  <div className=" d-flex align-items-center justify-content-center alignLeft">
                     <div className="maldivs-trip totalFee">
                        Total <span className="font400">(Inc VAT)</span>
                     </div>
                  </div>
               </div>
               <div className="horizonatl-line pb-2 order4"></div>
               <div className="col-12 col-sm-5 col-md-5 inputContainer order3">
                  {is_apply_discount?<TextField
                     type="text"
                     className="form-control"
                     placeholder="Discount code"
                     onChange={DiscountField}
                     value={Discount}
                     disabled = {true}
                  />:<TextField
                     type="text"
                     className="form-control"
                     placeholder="Discount code"
                     onChange={DiscountField}
                     value={Discount}
                  />}
                  {is_apply_discount?null:<button className="btn buttonApply" onClick={ApplyDiscount} >Apply</button>}
                 
                  {is_apply_redeem?
                  <TextField
                  type="text"
                  className="form-control"
                  placeholder="Redeem Coins"
                  onChange={RedeemField}
                  value={Redeem+" Dream Coins Redeemed Successfully"}
                  disabled = {true}
               />
                  :<TextField
                  type="text"
                  className="form-control"
                  placeholder="Redeem Coins"
                  onChange={RedeemField}
                  value={Redeem+" Dream Coins available"}
                  disabled = {true}
               />} 
                  {Redeem!=0?is_apply_redeem?null:<button className="btn buttonApply1" onClick={ApplyRedeem} style={{top:"69px", color: "#1663be"}}>Redeem</button>:null}
                  {} 
                  <p>*10 Dream Coind are equal to 10 fills</p>
               </div>
               <div className="col-4 col-sm-3 col-md-3 ml-auto order2">
                  <div className=" AlignRight">
                     <div className="maldivs-trip">AED {apply_discount_percebtage!=""?
                     is_apply_redeem?localStorage.getItem("selected_campaign_actual_amount")-(localStorage.getItem("selected_campaign_actual_amount")*apply_discount_percebtage-Redeem).toFixed(2)
                     :localStorage.getItem("selected_campaign_actual_amount")-(localStorage.getItem("selected_campaign_actual_amount")*apply_discount_percebtage).toFixed(2):
                     !!campaign?parseFloat((campaign.couponPrice*count)+1).toFixed(2):0}</div>
                     {/* <div className="maldivs-trip">AED {apply_discount}</div> */}
                  </div>
               </div>
            </div>
         </div>
   );
};

export default Card;
