import React, {useEffect, useState} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import GooglePlacesAutocomplete,{geocodeByAddress, getLatLng} from 'react-google-places-autocomplete';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { FILE_ACCEPTED_FORMATS } from "../AppConstants";
import { APIAlertNotify, alertNotify, convertBase64 } from "../AppFunction";
import Header from './Header';
import { updateProfileData } from "./APIServices/AppAPI";
import { fetchProfileDetails, setProfileData } from "../app/reducers/userSlice";
import VerifyForm from "./common/verifyForm";


function Profile() {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const profileData = useSelector(state => state.userData.profileData)
	
	const [proImg, setProImg] = useState("./ProfilePicGrey.svg")
	const [idFiles, setIdFiles] = useState(null)
	const [profile, updateProfile] = useState({...profileData})
	const [emailEdit, updateEmailEdit] = useState(false)
	const [modileEdit, updateMobileEdit] = useState(false)
	const [verifyForm, setVerifyForm] = useState(false)
	const gotoURl = () => {
		navigate("/")
	}

	const handleChange = (e) => {
		let {value, name} = e.target
		updateProfile({...profile,[name]:value})
	}

	const handlePlace = (value) =>{
		geocodeByAddress(value.label)
		.then(results => getLatLng(results[0]))
		.then(({ lat, lng }) =>{
		updateProfile({...profile,address:{...value, lat_lng:{lat:lat, lng:lng}}})})
	}

	const makePayload = (flag=false)=>{
		let payload = {}
		if(profileData.name !== profile.name){
			payload.name = profile.name
		}
		if(proImg&& proImg.includes("base64")){
			payload.profile_pic = proImg
		}
		if(profileData.gender !== profile.gender){
			payload.gender = profile.gender
		}
		if(profileData.address?.label !== profile.address?.label){
			payload.address = profile.address
		}
		if(idFiles&&idFiles.includes("base64")){
			payload.identity_proof = idFiles
		}
		if(flag){
			return Object.keys(payload).length == 0
		}else{
			return payload
		}
	}

	const handleSubmit = async () =>{
		const payload = makePayload()
		try{
			const res = await updateProfileData(payload)
			if(res.status === 200){
				alertNotify(res.data.message, res.status)
				dispatch(setProfileData(res.data.data))
			}else{
				throw new Error(res)
			}
		}catch(error){
			APIAlertNotify(error)
		}

	}

	const handleFiles = async(e)=>{
		const files = e.target.files
		const name = e.target.name
		for (const key in files) {
			if(!isNaN(key)){
				const format = files[key].name.split(".")[1]
				if(FILE_ACCEPTED_FORMATS.includes(format)){
					const base64 = await convertBase64(files[key])
					if(name === 'profile_pic'){
						setProImg(base64)
					}else{
						setIdFiles(base64)
					}
				}else{
					alertNotify("Please select png, jpg or jpeg files only")
				}
			}
		}
	}

	const updateEmail = ()=>{

	}

	const verifyOtp = async(otp) =>{
    // try{
    //   let res = await verifyOTPAPI({userId:profileData._id,token:otp})
    //   if(res.status === 200){
    //     alertNotify(res.data.message, res.status)
    //     updateEmail()
    //   }else{
    //     throw new Error(res)        
    //   }
    // }catch(error){
    //   APIAlertNotify(error)
    // }
  }

	useEffect(()=>{
		if(localStorage.getItem("token")){
			dispatch(fetchProfileDetails())
		}else{
			gotoURl()
		}
	},[])

	useEffect(()=>{ 
		updateProfile({...profileData})
		if(profileData?.profile_pic){
			setProImg(process.env.REACT_APP_PROFILE_URL+"/users/"+profileData?.profile_pic)
		}
		if(profileData?.identity_proof){
			setIdFiles(process.env.REACT_APP_PROFILE_URL+"/users/"+profileData?.identity_proof)
		}
	},[profileData])

	return (
		<div className='main-page'>
			<Header />
				<div className='issue-details-blk profile-main-blk'>
					<div className='issue-details-content-blk'>
						<h5 className='card-title mb-3'>My Profile</h5>
						<div className='profile-pic-upload-blk mb-4'>
							<img
								src={proImg}
								className="profile-pic-inprofile"
								alt="Profile"
								/>
							<div className='upload-btn-blk'>
								<div className='upload-cam-icon-btn'>
									<img
										src="./CameraIcon.svg"
										className="profile-cam-icon"
										alt="Profile"
										/>
									<Form.Control className='profile-pic-upload' type="file" onChange={handleFiles} 
										name="profile_pic"
										accept= '.png, .jpeg, .jpg'/>
								</div>
							</div>    
						</div>
						<div className='profile-form-blk'>
							<Form>
								<Form.Group className="mb-3" controlId="username">
									<Form.Label>User Name</Form.Label>
									<Form.Control type="text" placeholder="Enter user name"  value={profile.name} name="name" onChange={handleChange}/>
								</Form.Group>
								<Form.Group className="mb-3" controlId="email" >
									<Form.Label>Email</Form.Label>
									<Form.Control type="text" placeholder="Enter email" value={profile.email} name="email" disabled={true} onChange={handleChange}/>
									{/* <div className="form-actions-btns-blk d-flex">
										{emailEdit?
										<div>
											<Button className="icon-btn" onClick={()=>{updateEmailEdit(false)}}><img src="./CloseRedIcon.svg" className="form-edit-icon" alt="Cancel" /></Button>
											<Button className="icon-btn" ><img src="./TickIcon.svg" className="form-edit-icon" alt="Save" /></Button>
										</div>:
										<Button className="icon-btn" onClick={()=>{updateEmailEdit(true)}}><img src="./EditIcon.svg" className="form-edit-icon" alt="Edit Email" /></Button>}
									</div> */}
								</Form.Group>
								<Form.Group className="mb-3" controlId="phone">
									<Form.Label>Phone</Form.Label>
									<Form.Control type="text" placeholder="Enter phone number" value={profile.mobile} name="mobile" disabled onChange={handleChange}/>
								</Form.Group>
								<Form.Group className="mb-3" controlId="gender">
									<Form.Label>Gender</Form.Label>
									<div className="mb-3">
										<Form.Check
											inline
											label="Male"
											name="gender"
											type='radio'
											id='radio1'
											checked={profile.gender === "male"}
											onChange={()=>{updateProfile({...profile,"gender":"male"})}}/>
										<Form.Check
											inline
											label="Female"
											name="gender"
											type='radio'
											id='radio1'
											checked={profile.gender === "female"}
											onChange={()=>{updateProfile({...profile,"gender":"female"})}}/>
										<Form.Check
											inline
											label="Other"
											name="gender"
											type='radio'
											id='radio1'
											checked={profile.gender === "other"}
											onChange={()=>{updateProfile({...profile,"gender":"other"})}}/>
									</div>
								</Form.Group>
								<Form.Group className="mb-3" controlId="address">
									<Form.Label>Address</Form.Label>
									<GooglePlacesAutocomplete
										apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
										selectProps={{
											value:profile.address,
											onChange: handlePlace,
											GooglePlacesDetailsQuery:{ fields: "geometry" },
											placeholder:"Enter Address",
										}}
									/>
								</Form.Group>
								<Form.Group className="mb-3" controlId="id_proof">
									<Form.Label>Id Proof</Form.Label>
									<Form.Control 
										type="file" 
										onChange={handleFiles} 
										accept= '.png, .jpeg, .jpg'
										name="identity_proof"/>
								</Form.Group>
								{idFiles&&
								<Form.Group className="mb-3">
									<div className='news-img-blk'>
									<img
										src={idFiles}
										className="news-img"
										alt="ID Proof"
										/>
									</div>
								</Form.Group>}

								<div className='profile-form-btns-blk d-flex justify-content-end gap-3'>
									<Button type="button" className='aoi-secondary-btn box-btn' onClick={gotoURl}>Cancel</Button>
									<Button type="button" className='aoi-primary-btn' onClick={handleSubmit} disabled={makePayload(true)}>Save</Button>
								</div>
							</Form>
						</div>
					</div>
				</div>
				<VerifyForm show={verifyForm} verifyOtp={verifyOtp}/>
			</div>
    );
}

export default Profile;