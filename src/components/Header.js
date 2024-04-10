import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Row from 'react-bootstrap/Row';
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AppConstants from '../AppConstants';
import { clearSession, setUserData, updateModal, updateStack } from '../app/reducers/userSlice';
import Login from './common/Login';
import RaiseIssue from './common/RaiseIssue';
import Signup from './common/Signup';
import ForgotPassword from './common/ForgotPassword';

const Header = () => {
  const {user:authUser, showModal:showForm} = useSelector((state)=>state.userData)
  const dispatch = useDispatch()
  // const formObj = {signup:false,login:false,raiseIssue:false,forgotPassword:false}
  // const [showForm, setShowForm] = useState({...formObj})
  
  const handleShow = (type,value)=> {
    dispatch(updateModal({key:type, value:value}))
  }

  let navigate = useNavigate()
  
  const gotoURl = (url)=>{
    navigate(url)
  }

  const logOut = () =>{
    localStorage.removeItem("token")
    dispatch(clearSession())
    navigate('/')
  }

  const handleIssueRaiseEvent =()=>{
    dispatch(updateStack([AppConstants.RAISE_ISSUE]))
    if(authUser){
      handleShow(AppConstants.RAISE_ISSUE,true)
    }else{
      handleShow(AppConstants.LOGIN, true)
    }
  }
   
  return (
    <>
    <Toaster/>
      <header>
        <div className='top-header'>
          <Navbar className="justify-content-between primary-menu-bar" fixed="top">
            <Container fluid>
              <Navbar.Brand onClick={()=>gotoURl("/")}>
                <img
                  src="/logo-new.svg"
                  className="align-top logo-header hide-on-mobile"
                  alt="Act on issues"
                />
                <img
                  src="/logo-icon.jpeg"
                  className="align-top logo-header hide-on-web show-on-mobile"
                  alt="Act on issues"
                />
              </Navbar.Brand>
            
              <Row>
                <Col className='d-flex aoi-gap-off'>
                  <Dropdown align="start" >
                    <Dropdown.Toggle id="dropdown-basic" className='icon-dropdown notificaation-dropdown'>
                      <img
                        src="/NotificationIcon.svg"
                        className="d-inline-block align-top"
                        alt="Notifications"
                      />
                      <span className='notification-badge'>3</span>
                    </Dropdown.Toggle>

                    <Dropdown.Menu className='notification-drop-menu thing-scrollbar' >
                      <Dropdown.Item>
                        <div className='notification-list-item'>
                          <div className='d-flex justify-content-between'>
                            <div className='notification-title card-title-font-size'>
                              <span>Notification title</span>
                            </div>
                            <div className='notification-time font-size14'>
                              <span className=' grey-text'>2hr ago</span>
                            </div>
                          </div>
                          <div className='notification-description'>
                            <span>Notification Description</span>
                          </div>
                          </div> 
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <div className='notification-list-item'>
                            <div className='d-flex justify-content-between'>
                              <div className='notification-title card-title-font-size'>
                                  <span>Notification title</span>
                              </div>
                              <div className='notification-time font-size14'>
                                <span className=' grey-text'>2hr ago</span>
                              </div>
                            </div>
                            <div className='notification-description'>
                                <span>Notification Description</span>
                            </div>
                          </div> 
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <div className='notification-list-item'>
                            <div className='d-flex justify-content-between'>
                              <div className='notification-title card-title-font-size'>
                                  <span>Notification title</span>
                              </div>
                              <div className='notification-time font-size14'>
                                <span className=' grey-text'>2hr ago</span>
                              </div>
                            </div>
                            <div className='notification-description'>
                                <span>Notification Description</span>
                            </div>
                          </div> 
                      </Dropdown.Item>
                  
                    </Dropdown.Menu>
                  </Dropdown>
                   
                  {authUser?
                  <Dropdown align="start" >
                    <Dropdown.Toggle id="dropdown-basic" className='icon-dropdown profile-dropdown'>
                    <img
                        src="/ProfilePicDefaultIcon.svg"
                        className="d-inline-block align-top profile-defulat-icon"
                        alt="Aoi Proifle"
                      />
                    </Dropdown.Toggle>
                    <Dropdown.Menu className='profile-dropdown-menu thing-scrollbar' >
                      <Dropdown.Item className='d-flex align-items-center' onClick={()=>gotoURl("/profile")}> 
                        <img
                          src="/ProfileLineIcon.svg"
                          className="d-inline-block pe-2"
                          alt="Aoi Proifle"
                        />
                        <span>Profile</span>
                      </Dropdown.Item>
                      <Dropdown.Item className='d-flex align-items-center' onClick={()=>gotoURl("/myissues")}> 
                        <img
                          src="/ProfileLineIcon.svg"
                          className="d-inline-block pe-2"
                          alt="Aoi Proifle"
                        />
                        <span>My Issues</span>
                      </Dropdown.Item>
                      <Dropdown.Item className='d-flex align-items-center' onClick={logOut}> 
                        <img
                          src="/LogoutIcon.svg"
                          className="d-inline-block pe-2"
                          alt="Aoi Proifle"
                        />
                        <span>Logout</span>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>:<>
                  <Button type="submit" className='aoi-secondary-btn' onClick={()=>handleShow(AppConstants.LOGIN,true)}>Login</Button>
                  <Button type="submit" className='aoi-primary-btn' onClick={()=>handleShow(AppConstants.SIGNUP,true)}>Sign Up</Button>
                   </>}

                </Col>
              </Row>
            </Container>
          </Navbar>
      </div>
      <div className='secondary-header'>
        <Navbar collapseOnSelect expand="xl" data-bs-theme="dark" className='secondary-menu-bar'>
          <Container fluid>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />  
              <Navbar.Offcanvas id="responsive-navbar-nav">
                <Offcanvas.Header closeButton>
                  <img
                    src="/logo-new.svg"
                    className="d-inline-block align-top logo-header"
                    alt="Act on issues"
                  />
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="me-auto">
                    <Nav.Link onClick={()=>{gotoURl("/")}}>Home</Nav.Link>
                    <Nav.Link href="#features">About Us</Nav.Link>
                    <Nav.Link href="#pricing">How it Works</Nav.Link>
                    <Nav.Link onClick={handleIssueRaiseEvent}>Raise an Issue</Nav.Link>
                    <Nav.Link href="#pricing">Address an Issue</Nav.Link>
                    <Nav.Link href="#pricing">My Community</Nav.Link>
                    <Nav.Link href="#pricing">Expert Advice</Nav.Link>
                    <Nav.Link href="#pricing">Support Us</Nav.Link>    
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
              <Nav className='social-icons-blk'>
                <Nav.Link href="#"><img src="/Pinterest.svg" className="" alt="React Bootstrap logo"/></Nav.Link>
                <Nav.Link href="#"><img src="/Twitter.svg" className="" alt="React Bootstrap logo"/></Nav.Link>
                <Nav.Link href="#"><img src="/Youtube.svg" className="" alt="React Bootstrap logo"/></Nav.Link>
                <Nav.Link href="#"><img src="/Instagram.svg" className="" alt="React Bootstrap logo"/></Nav.Link>
                <Nav.Link href="#"><img src="/Facebook.svg" className="" alt="React Bootstrap logo"/></Nav.Link>
              </Nav>
            </Container>
          </Navbar>
      </div>
    </header>
    <Signup show={showForm.signup} handleClose={handleShow}/>
    <Login show={showForm.login} handleClose={handleShow}/>
    <RaiseIssue show={showForm.raiseIssue} handleClose={handleShow}/>
    <ForgotPassword show={showForm.forgotPassword} handleClose={handleShow}/>
    </>
  )
};

export default Header;