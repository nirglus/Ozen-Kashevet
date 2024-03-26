import React, { useContext, useEffect, useState} from 'react'
import { UserContext } from '../../managers/userManager';
import './UserProfile.css';
import { CiCircleMore } from 'react-icons/ci'
import { FaCog, FaEdit} from 'react-icons/fa';
import { APIBaseUrl } from '../../config/baseUrl';
import axios from 'axios';
import { MdModeEditOutline } from "react-icons/md";
import logo from '../../assets/img/Anonimos.png'
import TherapistSchedule from '../../components/TherapistSchedule/TherapistSchedule';
import { GrSecure } from "react-icons/gr";

export default function UserProfile() {
  const { user, token , getUser }=useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [ imageUrl, setImageUrl] = useState({});
  const [ image, setImage ] = useState(null);

  const date = new Date(user.birth_date);
  const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

  const handleItemClick = () => {
    setIsOpen(false); 
};

// const navigateEdit = ()=>{
//   navigate("/profile_edit")
// };

const handleUpload = async () => {
  try {
    const formData = new FormData();
    formData.append("userImage", image);
    const newImage = await axios.post(
      `${APIBaseUrl}/users/image/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
      }
    );
    // location.reload();
    getUser()
  } catch (error) {
    console.error("Error uploading image:", error);
    alert("Error uploading user image.");
  }
};

const handleImageChange = (e) => {
  setImage(e.target.files[0]);
  console.log(image);
};

useEffect(()=>{
  if(image){
    handleUpload()
  }
},[image])
console.log(user);
  return (
    <div>
    <div className="profile">
      <div className='menu-div'>
      <CiCircleMore className="menu-btn" style={{width:"2rem", height:"2rem"}}
      onMouseEnter={() => setIsOpen(true)} 
      onMouseLeave={() => setIsOpen(false)}
      />
      </div>
      <h1 className='font-bold flex items-center text-center justify-center'><GrSecure />Your information is secured</h1>
      <div>
      {user.profileImg ? (
                <div className="ProfileImageContainer">
                <input
                  type="file"
                  id={"imageProfile"}
                  name="image"
                  onChange={handleImageChange}
                />
                <MdModeEditOutline
                  className="MdModeEditOutline"
                  onClick={handleUpload}
                />
                <img src={user.profileImg} alt="Profile Image" className="profile-image"/>
              </div>
            ) : (
              <div className="ProfileImageContainer">
              <input
                type="file"
                id={"imageProfile"}
                name="image"
                onChange={handleImageChange}
              />
              <MdModeEditOutline
                className="MdModeEditOutline"
                onClick={handleUpload}
              />
              <img src={logo} alt="Default Profile Image" className="profile-image"/>   
            </div>
            )}
    <div className="profile-details">
        <h1><b>Username:</b> {user.user_name}</h1>
        <p><b>Bio:</b> {user.bio} </p>
        <p><b>Birthdate:</b>  {formattedDate}</p>
        <p><b>Gender:</b> {user.gender}</p>
    </div>
            </div>
            </div>
            {user.role === "therapist" && (
              <TherapistSchedule user={user}/>
            )}

    </div>
  )
}
