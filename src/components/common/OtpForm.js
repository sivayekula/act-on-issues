
import React from 'react';
import Button from 'react-bootstrap/Button';
import OtpInput from 'react-otp-input';
 

const OTPForm = ({otp, handleChange, verifyOtp, userObj, resendOtp}) =>{

  return(<>
		<h1 className='signup-modal-title'>Verify OTP</h1>
		<div className='alt-login-blk pb-4'>
			<span className='font-size14 pe-2'>We have sent an OTP code to</span><Button variant="link" className='txt-btn font-size14'>{userObj&&userObj.loginas}</Button>
		</div> 
		<div className='otp-verification-input d-flex flex-column'>
			<OtpInput
				value={otp}
				onChange={handleChange}
				numInputs={4}
				renderSeparator={<span>-</span>}
				renderInput={(props) => <input {...props} />}
			/>
			<Button variant="link" className='txt-btn align-self-end mb-4 mt-4' onClick={resendOtp}>Resend OTP</Button>
		</div>
		<Button type="button" className='aoi-primary-btn full-btn' onClick={verifyOtp}>Verify OTP</Button>
	</>)
}
export default  OTPForm;