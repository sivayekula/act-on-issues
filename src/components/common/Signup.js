
import jwt from 'jwt-decode';
import React, { useState } from 'react';
import firebase from 'firebase/app';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import AppConstants from '../../AppConstants';
import textValidator, { APIAlertNotify, alertNotify, validateEmail, validatePhone } from '../../AppFunction';
import VALIDATION_MESSAGES from '../../MessageConstants';
import { setUserData } from '../../app/reducers/userSlice';
import { signupAPI, verifyOTPAPI } from '../APIServices/AppAPI';
import OTPForm from './OtpForm';
import {auth} from '../../firebase';

const Signup = ({show, handleClose}) =>{
  const dispatch = useDispatch()
  const infoObj = {username:"", loginas:"",password:""}
  const [inputsData, updateInputsData]  = useState({...infoObj})
  const [showOtp, setShowOtp] = useState(false)
	const [otp, setOtp] = useState("")
  const [user, updateUser] = useState({})
  const [verificationCode, setVerificationCode] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);

  const handleChange = (e)=>{
    const {value,name} = e.target
    let isValid = true
    if(name === 'username'){
      isValid = textValidator(value)
      if(!isValid){
        alertNotify(VALIDATION_MESSAGES.INVALID_INPUT)
      }
      if(value.length > AppConstants.USERNAME_LENGTH){
        isValid = false   
        alertNotify(VALIDATION_MESSAGES.MAX_LENGTH_REACHED)      
      }
    }
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

  const verifyEmail = (e)=>{
    if(!validateEmail(e.target.value)&&!validatePhone(e.target.value)){
      alertNotify(VALIDATION_MESSAGES.INVALID_INPUT)
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

  const disableButton = ()=>{
    let loginasValid = validateEmail(inputsData.loginas)||validatePhone(inputsData.loginas)
    const passwordValid = verifyPassword(inputsData.password, true)
    return !(textValidator(inputsData.username) && loginasValid && passwordValid)
  }
  const handleHide = () =>{
    handleClose(AppConstants.SIGNUP,false)
    reset()
  }

  const reset = ()=>{
    updateInputsData({...infoObj})
    setShowOtp(false)
    setOtp("")
  }
console.log(inputsData)
  const handleSignup= async()=> {
    try{
      if(validateEmail(inputsData.loginas)){
        const confirmation = await auth.createUserWithEmailAndPassword(inputsData.loginas, inputsData.password);
        setConfirmationResult(confirmation);
        alertNotify("Code sent to your email", 200)
        setShowOtp(true)
      }else{
        const confirmation = await auth.signInWithPhoneNumber(`+91${inputsData.loginas}`, new firebase.auth.RecaptchaVerifier('recaptcha-container',{size: "invisible",}));
        setConfirmationResult(confirmation);
        alertNotify("Code sent to your mobile number", 200)
        setShowOtp(true)

      }
      // let res = await signupAPI({name:inputsData.username,loginId:inputsData.loginas,password:inputsData.password})
      // if(res.status === 200){
      //   updateUser(res.data.data)
              // }else{
      //   throw new Error(res)        
      // }
    }catch(error){
      console.log(error)
      APIAlertNotify(error)
    }
    
  }

  console.log(confirmationResult)
  

  const verifyOtp = async() =>{
    try{
      let res = await verifyOTPAPI({userId:user.userId,token:otp})
      if(res.status === 200){
        alertNotify(res.data.message, res.status)
        localStorage.setItem("token",res.data.data)
        dispatch(setUserData(jwt(res.data.data)))
        handleHide()
      }else{
        throw new Error(res)        
      }
    }catch(error){
      APIAlertNotify(error)
    }
  }
  
  return(<>
    <Modal centered show={show} onHide={handleHide} className='signup-modal'>
      <Modal.Header closeButton></Modal.Header>
        <Modal.Body className='signup-modal-padding'>
          <img src="/logo-new.svg" className="signup-logo" alt="aoi logo"/>
          {showOtp?
					<OTPForm otp={otp} handleChange={(data)=>setOtp(data)} verifyOtp={verifyOtp} userObj={inputsData} resendOtp={handleSignup}/>:
					<>
            <h1 className='signup-modal-title'>Signup</h1>
            <div className='signup-form-blk'>
              <Form>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>Name </Form.Label>
                  <Form.Control type="text" placeholder="Enter user name" onChange={handleChange} value={inputsData.username} name="username"/>
                </Form.Group>  
                <Form.Group className="mb-3" controlId="loginas">
                  <Form.Label>Email or Phone</Form.Label>
                  <Form.Control type="text" placeholder="Enter email or phone number" onChange={handleChange} value={inputsData.loginas} onBlur={verifyEmail} name="loginas"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Set your password" onChange={handleChange} value={inputsData.password} onBlur={(e)=>{verifyPassword(e.target.value)}} name="password"/>
                </Form.Group>
                <div id="recaptcha-container"/>
                <Button type="button" className='aoi-primary-btn full-btn' disabled={disableButton()} onClick={handleSignup}>Signup</Button>
                <div className='alt-login-blk pt-2'>
                  <span className='font-size14 pe-2'>Already have an account?</span><Button variant="link" className='txt-btn font-size14' onClick={()=>handleClose(AppConstants.LOGIN,true)}>Login</Button>
                </div> 
                <div className='terms-and-conditions-blk font-size14 pt-2'>
                  <span>By continuing, you are setting up a Act on issue account and agree to our <a href='#' className=''>User Agreement</a> and <a href='#' className=''>Privacy Policy</a>.</span>
                </div> 
              </Form>
            </div> 
          </>}
        </Modal.Body>
      </Modal>
    </>)
}
export default Signup;