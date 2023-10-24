
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { APIAlertNotify, alertNotify } from '../../AppFunction';
import { verifyOTPAPI } from '../APIServices/AppAPI';
import OTPForm from './OtpForm';

const VerifyForm = ({show}) =>{
  const dispatch = useDispatch()
  
   
   
  const [otp, setOtp] = useState("")
   
 

   
   
 
  const handleHide =()=>{
    
  }
   

  const verifyOtp = async() =>{
    // try{
    //   let res = await verifyOTPAPI({userId:user.userId,token:otp})
    //   if(res.status === 200){
    //     alertNotify(res.data.message, res.status)
         
    //   }else{
    //     throw new Error(res)        
    //   }
    // }catch(error){
    //   APIAlertNotify(error)
    // }
  }
  
  return(<>
    <Modal centered show={show} onHide={handleHide} className='signup-modal'>
      <Modal.Header closeButton></Modal.Header>
        <Modal.Body className='signup-modal-padding'>
          <img src="./logo-new.svg" className="signup-logo" alt="aoi logo"/>
          <OTPForm otp={otp} handleChange={(data)=>setOtp(data)} verifyOtp={verifyOtp} userObj={{}} resendOtp={{}}/>:
        </Modal.Body>
      </Modal>
    </>)
}
export default VerifyForm;