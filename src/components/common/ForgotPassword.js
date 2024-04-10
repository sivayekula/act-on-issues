import { useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import AppConstants from '../../AppConstants';
import { APIAlertNotify, alertNotify, validateEmail, validatePhone } from '../../AppFunction';
import VALIDATION_MESSAGES from '../../MessageConstants';
import firebase from 'firebase/app';
import { findUserByNumber, signupAPI, updatePassword } from "../APIServices/AppAPI";
import {auth} from '../../firebase';
import OTPForm from "./OtpForm";
import { updateLoading, updateModal } from "../../app/reducers/userSlice";

 const ForgotPassword = ({show, handleClose})=>{
	const dispatch = useDispatch()
	const isLoading = useSelector((state)=>state.userData.isLoading)
	const [inputsData, updateInputsData]  = useState({ loginas:"",password:"",confirmPassword:""})
	const [showOtp, setShowOtp] = useState(false)
	const [otp, setOtp] = useState("")
  const [user, updateUser] = useState({})
  const [confirmationResult, setConfirmationResult] = useState(null);
	const [showPasswordReset, setShowPasswordReset] = useState(false)
	const handleChange = (e)=>{
			const {value,name} = e.target
			let isValid = true
			if(name === 'loginas'){
				if(validatePhone(value)&&value.length > AppConstants.PHONE_LENGTH){
					isValid = false   
					alertNotify(VALIDATION_MESSAGES.MAX_LENGTH_REACHED)      
				}
			}
			if(name === 'password'){
				if(value.length > AppConstants.PHONE_LENGTH){
					isValid = false   
					alertNotify(VALIDATION_MESSAGES.MAX_LENGTH_REACHED)      
				}
			}
			if(isValid)
				updateInputsData({...inputsData,[name]:value})
		}

		const handleHide = () =>{
			handleClose(AppConstants.LOGIN,false)
			reset()
		}
	
		const reset = ()=>{
			updateInputsData({loginas:"",password:""})
		}

		const verifyInput = (e)=>{
			if(!validateEmail(e.target.value)&&!validatePhone(e.target.value)){
				alertNotify(VALIDATION_MESSAGES.INVALID_INPUT)
			}
		}

		const disableButton = ()=>{
			return !((validateEmail(inputsData.loginas)||validatePhone(inputsData.loginas)))
		}

		const sendOTP = async()=>{
			try{
				dispatch(updateLoading(true))
				let res = await findUserByNumber({loginId:inputsData.loginas})
				if(res.status === 200){
					const confirmation = await auth.signInWithPhoneNumber(`+91${inputsData.loginas}`, new firebase.auth.RecaptchaVerifier('recaptcha-container', {
						size: 'invisible'}));
					setConfirmationResult(confirmation);
					updateUser(res.data.data)
					dispatch(updateLoading(false))
					alertNotify(`Code sent to this +91${inputsData.loginas} number`, 200)
					setShowOtp(true)
				} else {
					throw new Error(res)
				}
			}catch(error){
				dispatch(updateLoading(false))
				APIAlertNotify(error)
			}
		}

		const verifyOtp = async() =>{
			dispatch(updateLoading(true))
			try{
				await confirmationResult.confirm(otp);
				dispatch(updateLoading(false))
				setShowPasswordReset(true)
			}catch(error){
				console.log(error)
				dispatch(updateLoading(false))
				APIAlertNotify(error)
			}
		}

		const verifyPassword = (value, flag=false)=>{
			const valid = value.length <= 10 && value.length >= 6
			if(flag){
				return valid
			}else{
				if(!valid){
					alertNotify(VALIDATION_MESSAGES.INVALID_PASSWORD)
				}
			}
		}
		const verifyConfirmPassword = (value,flag=false) =>{
			const valid = inputsData.password === inputsData.confirmPassword
			if(flag){
				return valid
			}else{
				if(!valid){
					alertNotify(VALIDATION_MESSAGES.PASSWORD_MISMATCH)
				}
			}
		}
		
		const validateResetBtn = ()=>{
			return !((verifyPassword(inputsData.loginas,true)||verifyConfirmPassword(inputsData.loginas,true)))
		}

		const resetPassword = async()=>{
			dispatch(updateLoading(true))
			try{
				const res = await updatePassword({userId:user.userId,password:inputsData.password})
				if(res.status == 200){
					dispatch(updateLoading(false))
					alertNotify("Password updated successfully.",200)
					dispatch(updateModal({key:AppConstants.LOGIN,value:true}))
				}else{
					throw new Error(res)
				}
			}catch(error){
				dispatch(updateLoading(false))
				APIAlertNotify(error)
			}
		}
	return(
		<Modal centered show={show} onHide={handleHide} className='signup-modal'>
			<Modal.Header closeButton></Modal.Header>
			<Modal.Body className='signup-modal-padding'>
				<img src="/logo-new.svg" className="signup-logo" alt="aoi logo"/>
				{showPasswordReset?<>
					<>
						<h1 className='signup-modal-title'>Reset Password</h1>
						<div className='signup-form-blk'>
							<Form>
								<Form.Group className="mb-3" controlId="email">
									<Form.Label>Password</Form.Label>
									<Form.Control type="text" placeholder="Password" onChange={handleChange} value={inputsData.password} name="password" onBlur={verifyPassword} />
								</Form.Group>
								<Form.Group className="mb-3" controlId="email">
									<Form.Label>Confirm Password</Form.Label>
									<Form.Control type="text" placeholder="Confirm Password" onChange={handleChange} value={inputsData.confirmPassword} name="confirmPassword" onBlur={verifyConfirmPassword} />
								</Form.Group>
								<Button type="button" className='aoi-primary-btn full-btn' onClick={resetPassword} disabled={validateResetBtn()||isLoading}>Reset</Button>
							</Form>
						</div> 
					</>
				</>:
				showOtp?
					<OTPForm otp={otp} handleChange={(data)=>setOtp(data)} verifyOtp={verifyOtp} userObj={inputsData} resendOtp={sendOTP}/>:
					<>
						<h1 className='signup-modal-title'>Forgot Password</h1>
						<div className='signup-form-blk'>
							<Form>
								<Form.Group className="mb-3" controlId="email">
									<Form.Label>Phone</Form.Label>
									<Form.Control type="text" placeholder="Enter phone number" onChange={handleChange} value={inputsData.loginas} name="loginas" onBlur={verifyInput} />
								</Form.Group>
								<Button type="button" className='aoi-primary-btn full-btn' onClick={sendOTP} disabled={disableButton()||isLoading}>Send OTP</Button>
								<div className='alt-login-blk pt-2'>
									<span className='font-size14 pe-2'>Don’t have an account? </span><Button variant="link" className='txt-btn font-size14' onClick={()=>handleClose(AppConstants.SIGNUP,true)}>Signup</Button>
								</div>
								<div id="recaptcha-container"/>
								<div className='terms-and-conditions-blk font-size14 pt-2'>
									<span>By continuing, you are setting up a Act on issue account and agree to our <a href='#' className=''>User Agreement</a> and <a href='#' className=''>Privacy Policy</a>.</span>
								</div> 
							</Form>
						</div> 
					</>}
			</Modal.Body>
		</Modal>	
	)
}

export default ForgotPassword;