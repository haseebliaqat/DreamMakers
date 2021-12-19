   import React, { useEffect, useState } from 'react';
   import './ActiveCouponsCard.css';

   import CouponsCardBg from '../../_assets/images/CouponsCardBg.png';
   import Logo from '../../_assets/images/Logo.png';
   import { accountService, alertService } from '@/_services';
   import html2canvas from "html2canvas";
   import { jsPDF } from "jspdf";

   export const ActiveCouponsCardAdmin = (props) => {
      const [coupon_detail, setCouponsDetail] = useState([]);
      const [imgSrc, setImgSrc] = useState('');
      useEffect(() => {
         GetCoupons();
      }, [props.campaignId]);

      const GetCoupons = () => {
         let obj1 = {
            "limit": 20,
            "offset": 0,
            "order": [["id", "DESC"]],
            "where": { "id": { "$gt": 0 }, "campaignId": props.campaignId, 'status': 'active' }
         }
         alertService.clear();
         accountService.ActiveCoupons(obj1).then((resp) => {
            setCouponsDetail(resp.rows)
         }).catch(error => {
            alertService.error("Internal Server Error");
         });
      }

      const downloadPdfDocument = () => {
         const input = document.getElementById('divToDownload');
         html2canvas(input, {
            //allowTaint: true,
            //foreignObjectRendering: true,
      
            // your configurations
            //scale: 2
      }).then((canvas) => {
               canvas.getContext("webgl", {preserveDrawingBuffer: true});
               //const imgData = canvas.toDataURL('image/png');
               const imgData = canvas.toDataURL();
               setImgSrc(imgData);
               const pdf = new jsPDF();
               pdf.addImage(imgData, 'JPEG', 0, 0);
               let downloadFileName = `coupons-${coupon_detail[0].campaignId.toString().padStart(5, '0')}`;
               pdf.save(`${downloadFileName}.pdf`);
            })
      }

      function convertImgToBase64(url, eleId, outputFormat){
         var canvas = document.createElement('CANVAS');
         var ctx = canvas.getContext('2d');
         var img = new Image;
         img.crossOrigin = 'Anonymous';
         img.onload = function(){
            canvas.height = img.height;
            canvas.width = img.width;
            ctx.drawImage(img,0,0);
            var dataURL = canvas.toDataURL(outputFormat || 'image/png');
            console.log(dataURL);
            console.log(document.getElementById(eleId));
            document.getElementById(eleId).src=dataURL;
            // Clean up
            canvas = null; 
         };
         img.src = url;
      }

      // const onImgLoad = (e) => {
      //    //getDataUrl(e.target);
      //    //e.target.src = getBase64Image(e.target.src);
      //    let img = new Image();//e.target;
      //    img.crossOrigin = 'Anonymous';
      //    var canvas = document.createElement("canvas");
      //    canvas.foreignObjectRendering = true;
      //    canvas.allowTaint = true;

      //    canvas.width = img.width;
      //    canvas.height = img.height;

      //    // Copy the image contents to the canvas
      //    var ctx = canvas.getContext("2d");
      //    ctx.drawImage(img, 0, 0);

      //    // Get the data-URL formatted image
      //    // Firefox supports PNG and JPEG. You could check img.src to
      //    // guess the original format, but be aware the using "image/jpg"
      //    // will re-encode the image.
      //    var dataURL = canvas.toDataURL("image/png");
      //    e.target.src = 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAAAAklEQVR4AewaftIAAAIDSURBVO3BQa7kMAxDwUch978yZ62NAcNO40fDKiIiIiIiIiIiIiIiIiIihhLnzG+JM2ZNdOa3xIEiRililCJGebhP3GXWzB5xRtxlLipilCJGKWKUh/eZPWKP6MyaWRN7zB7xoiJGKWKUIkZ5mEd0Zk0MUsQoRYxSxCgP32c60YnOdKYTH1bEKEWMUsQoD+8T7xKd2SPOiD+kiFGKGKWIUR7uM79lOtGZTnSmE2vmDytilCJGKSIiIiICcc50ojOd6EwnOtOJu0wn9phOrJlOXFTEKEWMUsQo4pw5I/aYPaIznejMmlgznVgznThQxChFjFLEKA/nxJrpxB6zJu4Sa+aMeVERoxQxShGjiPeZM6Iza6Ize8Sa6cQe04mLihiliFGKGOXhPtOJM+ZdYs10Ys10ohMvKmKUIkYpYhTxfaYT/7EiRililCJGEefMb4k104k104k9phNrphMXFTFKEaMUMcrDfeIu8y6xZu4SLypilCJGKWKUh/eZPWKP6cQe04k10ZnOdKIza+JAEaMUMUoRozx8n+jMHtGZTqyJNbMmLipilCJGKWKUh+8za6Iza6Iza6IznVgznThQxChFjFLEKOKc6cRdphN7zBnRmU6smU68qIhRihiliFEe7jO/Zc6INdOJzpwxnThQxChFjFJERERERERERERERERERER8wD/s6E64JkA9ggAAAABJRU5ErkJggg=='//dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
         
      //    console.log(img.src);
      //    e.preventDefault(); 
         
      //    //return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
      // }

      return (
         <>
            <img src={imgSrc}></img>
            <button onClick={downloadPdfDocument}>Download Pdf</button>
            <div id="divToDownload">
               {coupon_detail.map((c) => {
                  return (
                     <div className="coupons-card5">
                        <img src={CouponsCardBg} alt="" width="100%" />
                        <div className="header5">
                           <img src={Logo} alt="" />
                        </div>
                        <div className="EL-number5">{c.qrCodes[1].code}</div>
                        <div className="EL-coupon5">coupons No.</div>
                        <div className="price5">Prize</div>
                        <div className="Trip-country5">{c.campaign.prizeTitle}</div>
                        {!props.isWinners ?
                           <div className="Qr5">
                              {
                                 c.qrCodes[1].type == 'admin' ? <img id={c.qrCodes[1].id} src={convertImgToBase64(c.qrCodes[1].url, c.qrCodes[1].id)} alt="QR" style={{ width: '51%', backgroundColor: "white" }} /> : <div></div>
                              }

                           </div>
                           :
                           null
                        }

                        <div className="dottedLine5"></div>
                        <div className="purchase-date5">Purchase On:</div>
                        <div className="date5">{c.created}</div>
                        <div className="coupon-name5">Name:</div>
                        <div className="name5">{c.account.firstName + " " + c.account.lastName}</div>
                     </div>
                  )

               })
               }
            </div>

         </>
      );
   };
