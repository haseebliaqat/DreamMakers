import React, { useState, useEffect} from 'react';
import './profile-card.less';
import UploadIcon from '@/_assets/icons/image-upload.svg';
import { ProfileCardButton } from '../ProfileCardButton/ProfileCardButton';
import DetailsIcon from '@/_assets/icons/details.svg';
import DonationIcon from '@/_assets/icons/donations.svg';
import CouponIcon from '@/_assets/icons/coupons.svg';
import ChangePasswordIcon from '@/_assets/icons/change-password.svg';
import DreamIcon from '@/_assets/images/dream-icon.png';
import LogoutIcon from '@/_assets/icons/logout.svg';
import { history } from '@/_helpers/history';
import { useDropzone } from "react-dropzone";
 import profilePicdefualt from '@/_assets/images/blocked-profile.jpg';
 import { accountService, alertService } from '@/_services';
 import S3 from 'react-aws-s3'
 import { picturesService } from '@/_services/pictures.service';
export const PROFILE_BUTTONS = [
   { id: 1, image: DetailsIcon, label: 'Personal Details', path: 'create-profile' },
   { id: 2, image: CouponIcon, label: 'Active Coupons', path: 'active-coupons' },
   { id: 3, image: ChangePasswordIcon, label: 'Change Password', path: 'change-password' },
   { id: 4, image: DonationIcon, label: 'Your Donations', path: 'donations' },
   { id: 5, image: DreamIcon, label: 'Dream Coins', path: 'earncoins' },
   { id: 6, image: LogoutIcon, label: 'Log out' , path: 'account/login'},
];
export const ProfileCard = () => {
   const [user, setUser] = useState(null);

   const [usersrc, setSrc] = useState(false);
   const [isAvailabel, setAvailabel] = useState(false);
   const [url, seturl] = useState(null);
   const [imgName, seturlImgName] = useState(null);
   useEffect(() => {
      if (!!localStorage.userDetails) {
          console.log(JSON.parse(localStorage.userDetails));
         setUser(JSON.parse(localStorage.userDetails));
      }

  }, []);
  const config = {
   bucketName: 'dreammakersbucket',
  dirName:'pictures',
   region: 'ap-southeast-1',
   accessKeyId: 'AKIARVPMJKFUWHUZ2KA5',
   secretAccessKey: '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'
}

  const handlePictureSelected=(event)=> {
    setAvailabel(true)
   const reactS3Client = new S3(config);
   reactS3Client.uploadFile(event.target.files[0], event.target.files[0].name)
    .then((data) => {
            console.log(data);
            // seturl(data.location);
            const params={picUrl:data.location}
            const  Userid=localStorage.getItem("user_id")
            console.log("Userid");
            console.log(Userid);
            accountService.updateProfilePicture(params,Userid).then((resp) => {
               console.log("resp==========>")
               console.log("resp==========>")
               console.log(resp)
               setAvailabel(false);
                  localStorage.setItem("user",resp.role);
                  localStorage.setItem("userDetails",JSON.stringify(resp));
                  window.location.reload();
            }).catch(error => {
               // setSubmitting(false);
                alertService.error("Email or password is incorrect.");
            });
         })
         .catch(error => {
            console.log(error);
         });
         var picture = event.target.files[0];
         var src= URL.createObjectURL(picture);
         setSrc(src);
 }
 const renderPreview=()=> {
   if(usersrc) {
     return (
      <img
      src={usersrc}
      alt="profile-img"
      className="img-fluid profile-image"
   />
     );
   } else {
     return (
      <img
      src={!!user?user.picUrl:profilePicdefualt}
      alt="profile-img"
      className="img-fluid profile-image"
   />
     );
   }
 }
 
 const SaveProfilePicture=()=> {

 }
   return (
      // console.log(user.firstName),
      <div className="profile-card">
         <div className="text-center profile-container">
            {/* <img
               src="profilePic"
               alt="profile-img"
               className="img-fluid profile-image"
            /> */}
            {renderPreview()}
            <h2 className="profile-name">{!!user?user.firstName+" "+user.lastName:""}</h2>
            <button className="btn btn-primary upload-btn"  >
               <span className="mx-2">
                  {/* <input  type="file" name="uploadfile" id="img" style={{display:"none"}} onChange={handlePictureSelected.bind(this)}/>
                  <img src={UploadIcon} alt="icon" /> */}
                  <input type="file" name="user_profile" id="img" style={{display:"none"}}  onChange={handlePictureSelected.bind(this)}/>
                  <img src={UploadIcon} alt="icon" style={{height:"19px",marginTop:"2px"}}/>
                  <label  for="img" style={{marginBottom:"0px",marginLeft:"9px"}}>Upload Picture</label>
               </span>
               {/* <span>Upload Picture</span> */}
            </button>
            {/* {isAvailabel?
                  <button className="btn btn-primary upload-btn" style={{marginLeft:"13px",fontSize:"13px"}} onClick={SaveProfilePicture}  >
                  <span className="mx-2">Save
                  </span>
               </button>:null
               } */}
            
         </div>

         <div className="btn-container">
            {PROFILE_BUTTONS.map((item) => (
               <ProfileCardButton
                  id={item.id}
                  leftIcon={item.image}
                  label={item.label}
                  path={item.path}
               />
            ))}
         </div>
      </div>
   );
};
