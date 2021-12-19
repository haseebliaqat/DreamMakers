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

      const downloadPdfDocument =()  =>{
         var data = document.getElementById("divToDownload");
         //$("pdfOpenHide").attr("hidden", true);
         // To disable the scroll
         data.style.overflow = "inherit";
         data.style.maxHeight = "inherit";
   
          html2canvas(data, {
            scrollY: -window.scrollY,
            scale: 1
         }).then(
            canvas => {
               const contentDataURL = canvas.toDataURL("image/png", 1.0);
               // enabling the scroll
               data.style.overflow = "scroll";
               data.style.maxHeight = "150px";
   
               let pdf = new jsPDF("l", "mm", "a4"); // A4 size page of PDF
   
               let imgWidth = 300;
               let pageHeight = pdf.internal.pageSize.height;
               let imgHeight = (canvas.height * imgWidth) / canvas.width;
               let heightLeft = imgHeight;
               let position = 0;
   
               pdf.addImage(contentDataURL, "PNG", 0, position, imgWidth, imgHeight);
               heightLeft -= pageHeight;
   
               while (heightLeft >= 0) {
                  position = heightLeft - imgHeight;
                  pdf.addPage();
                  pdf.addImage(contentDataURL, "PNG", 0, position, imgWidth, imgHeight);
                  heightLeft -= pageHeight;
               }
               let downloadFileName = `coupons-${coupon_detail[0].campaignId.toString().padStart(5, '0')}`;
               pdf.save(`${downloadFileName}.pdf`);
               window.open(
                  pdf.output("bloburl", {
                     filename: downloadFileName + '.pdf'
                  }),
                  "_blank"
               );
               
            }
         );
      }

      return (
         <>
            <img src={imgSrc}></img>
            <button onClick={downloadPdfDocument}>Download Pdf</button>
            <div id="divToDownload" >
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
