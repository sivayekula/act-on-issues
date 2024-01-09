
import jwt from 'jwt-decode';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import AppConstants from '../../AppConstants';
import { APIAlertNotify, alertNotify, validateEmail, validatePhone } from '../../AppFunction';
import VALIDATION_MESSAGES from '../../MessageConstants';
import { setUserData, updateStack } from '../../app/reducers/userSlice';
import { loginAPI } from '../APIServices/AppAPI';

const Login = ({show, handleClose}) =>{
  const dispatch = useDispatch()
  const stack = useSelector(state=>state.userData.stack)
  const [inputsData, updateInputsData]  = useState({ loginas:"",password:""})
   

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

  const verifyInput = (e)=>{
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
    const passwordValid = verifyPassword(inputsData.password, true)
    return !((validateEmail(inputsData.loginas)||validatePhone(inputsData.loginas))&&passwordValid)
  }

	const handleHide = () =>{
    handleClose(AppConstants.LOGIN,false)
    reset()
  }

	const reset = ()=>{
    updateInputsData({loginas:"",password:""})
  }

  const handleLogin = async()=>{
    try{
      let res = await loginAPI({loginId:inputsData.loginas,password:inputsData.password})
      if(res.status === 200){
        alertNotify(res.data.message, res.status)
        await localStorage.setItem("token",res.data.data)
        const token = jwt(res.data.data)
        dispatch(setUserData(token))
        handleHide()
        if(stack.length>0){
          handleClose(stack[0], true)
          const tmpStack = stack.filter(item=> item !== stack[0])
          dispatch(updateStack(tmpStack))
        }
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
          <h1 className='signup-modal-title'>Login</h1>
          <div className='signup-form-blk'>
            <Form>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Phone</Form.Label>
                <Form.Control type="text" placeholder="Enter phone number" onChange={handleChange} value={inputsData.loginas} name="loginas" onBlur={verifyInput} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter password" onChange={handleChange} value={inputsData.password} name="password" onBlur={(e)=>verifyPassword(e.target.value)} />
              </Form.Group>
              <Button type="button" className='aoi-primary-btn full-btn' onClick={handleLogin} disabled={disableButton()}>Login</Button>
              <div className='alt-login-blk pt-2'>
                <span className='font-size14 pe-2'>Don’t have an account? </span><Button variant="link" className='txt-btn font-size14' onClick={()=>handleClose(AppConstants.SIGNUP,true)}>Signup</Button>
              </div>
              <div className='terms-and-conditions-blk font-size14 pt-2'>
                <span>By continuing, you are setting up a Act on issue account and agree to our <a href='#' className=''>User Agreement</a> and <a href='#' className=''>Privacy Policy</a>.</span>
              </div> 
            </Form>
          </div> 
        </Modal.Body>
      </Modal>
    </>)
}
export default  Login;