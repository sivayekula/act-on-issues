
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Carousel from 'react-bootstrap/Carousel';
import Lightbox from "yet-another-react-lightbox";
import Header from './Header';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fecthIssueDetails } from '../app/reducers/issueSlice';
import { Form } from 'react-bootstrap';
import { getComments, saveComment, saveFlagStatus, getViewCount } from './APIServices/AppAPI';
import { APIAlertNotify, alertNotify, getTime } from '../AppFunction';
import ShareModal from './common/shareModal';
import ChatChannel from './ChatChannel';
// import './App.css';


function DetailsScreen() {
    const authUser = useSelector((state)=>state.userData.user)
    const [login, setLogin]= useState(false);
	let navigate = useNavigate();
    const dispatch = useDispatch()
    const params = useParams()
    const issue = useSelector((state)=> state.issueData.issueDetails)
    const [viewCount, setViewCount]= useState(0)
    const [showShareModal, setShowShareModal] = useState(false)

    const [userComments, setUserComments]= useState([])
    const [supportCount, setSupportCount] = useState(issue?.supportCount)
    const [unsupportCount, setUnsupportCount] = useState(issue?.unsupportCount)

	const goToHome = ()=>{
		navigate("/")
	}



    const setFlagStatus= async (status)=> {
        try{
            let res = await saveFlagStatus({issueId: params.issueId, userId: authUser.userId, status})
            if(res.status === 200){
                alertNotify(res.data.message, res.status)
                setSupportCount(res.data.supportCount)
                setUnsupportCount(res.data.unsupportCount)
            }else{
                throw new Error(res)
            }
        }catch(err){
            APIAlertNotify(err)
        }
    }



    const handleCommentEvent =()=>{
        setLogin(true)
    }

    const saveViewCount= async ()=> {
        try {
            let resp= await getViewCount({issueId: params.issueId, userId: authUser.userId})
            if(resp.status === 200){
                setViewCount(resp.data.data)
            }else{
                throw new Error(resp)
            }
        }catch(err){
            console.log(err)
        }
    }
    const getUserComments= async ()=> {
        try {
            let resp= await getComments(params.issueId)
            if(resp.status === 200){
                setUserComments(resp.data.data)
            }else{
                throw new Error(resp)
            }
        }catch(err){
            console.log(err)
        }
    }

    const handleCommentSubmit= async(payload)=> {
			try{
				let res = await saveComment({
					issueId: params.issueId,
					userId: authUser._id,
					...payload
				})
				if(res.status === 200){
					alertNotify(res.data.message, res.status)
					getUserComments()
				}else{
					throw new Error(res)
				}
			}catch(err){
				APIAlertNotify(err)
			}
    }

    useEffect(()=>{
        dispatch(fecthIssueDetails(params.issueId))
        getUserComments()
        saveViewCount()
    },[])

    return (
        <div className='main-page'>
           <Header login={login} />
            {issue&&
            <div className='issue-details-blk d-flex'>
                <div className='back-icon-blk pe-3'>
                    <Nav.Link href="#" onClick={goToHome}>
                        <img
                            src="/BackIcon.svg"
                            className="uparrow-icon"
                            alt="Notifications"
                        />
                    </Nav.Link>


                </div>
                <div className='issue-details-content-blk'>
                    <h1 className='details-title'>{issue.title}</h1>
                    <div className='issue-type-icons-blk d-flex align-items-center'>
                        <div className='issue-icon-item d-flex align-items-center aoi-gap-off'>
                            <img
                                src="/UserCardIcon.svg"
                                className="issue-type-icon"
                                alt="news titconst profileData = useSelector(state => state.userData.profileData)le image"
                            />
                            <span className='issue-type-info-txt'><span>{`by ${issue.userId.name} - ${getTime(issue.created_at)}`}</span></span>
                        </div>
                        <div className='issue-icon-item d-flex align-items-center aoi-gap-off'>
                            <img
                                src="/IssueTypeIcon.svg"
                                className="issue-type-icon"
                                alt="news title image"
                            />
                            <span className='issue-type-info-txt'>{issue.categoryId?.name}</span>
                        </div>
                        <div className='issue-icon-item d-flex align-items-center aoi-gap-off'>
                            <img
                                src="/LocationCardIcon.svg"
                                className="issue-type-icon"
                                alt="news title image"
                            />
                            <span className='issue-type-info-txt'>{issue.address?.label}</span>
                        </div>
                    </div>
                    <div className='issue-full-content-blk pt-3 pb-3'>
                        {issue.description}
                    </div>
                    <div className='issue-all-images-blk'>

                     <div className='news-img-slider-blk'>
                      <Carousel>
                        {issue.images.map(item=> (
                          <Carousel.Item>
                            <img
                              className="d-block w-100"
                              src={`${process.env.REACT_APP_PROFILE_URL}/issues/${item}`}
                              alt="First slide"
                            />
                            <Carousel.Caption>
                              {/* <h5>Swatch Bharat Issue1</h5> */}
                            </Carousel.Caption>
                          </Carousel.Item>
                          ))}
                        </Carousel>
                     </div>

                    </div>
                    <div className='details-comments-blk'>
                        <div className='pt-3 d-flex align-items-center justify-content-between'>
                            <div className='left-card-actions d-flex aoi-gap-1'>
                                <div className='issue-icon-item d-flex align-items-center aoi-gap-off'>
                                    <img
                                        src="/CommentsCardIcon.svg"
                                        className="issue-type-icon"
                                        alt="news title image"
                                    />
                                    <span className='issue-type-info-txt'><span>Comments</span><span>({userComments.length})</span></span>
                                </div>
                                <div className='issue-icon-item d-flex align-items-center aoi-gap-off' onClick={()=>setFlagStatus(true)}>
                                    <img
                                        src="/FlagCardIcon.svg"
                                        className="card-flag-icon"
                                        alt="news title image"
                                    />
                                    <span className='issue-type-info-txt'><span>ISupport</span><span>({supportCount})</span></span>
                                </div>
                                <div className='issue-icon-item d-flex align-items-center aoi-gap-off' onClick={()=>setFlagStatus(false)}>
                                    <img
                                        src="/FlagCardIcon.svg"
                                        className="card-flag-icon"
                                        alt="news title image"
                                    />
                                    <span className='issue-type-info-txt'><span>UnSupport</span><span>({unsupportCount})</span></span>
                                </div>
                                <div className='issue-icon-item d-flex align-items-center aoi-gap-off'>
                                    <img
                                        src="/ViewsCardIcon.svg"
                                        className="issue-type-icon"
                                        alt="news title image"
                                    />
                                    <span className='issue-type-info-txt'><span>Views</span><span>({viewCount})</span></span>
                                </div>
                                <div className='issue-icon-item d-flex align-items-center aoi-gap-off' onClick={()=>{setShowShareModal(true)}}>
                                    <img
                                        src="/ShareCardIcon.svg"
                                        className="issue-type-icon"
                                        alt="news title image"
                                    />
                                    <span className='issue-type-info-txt'><span>Share</span></span>
                                </div>
                            </div>
                        </div>
                        <ChatChannel messages={userComments} handleCommentSubmit={handleCommentSubmit}/>
                    </div>
                </div>


            </div>}


    {/* Share modal */}
      {showShareModal&&<ShareModal show={showShareModal} handleHide={()=>{setShowShareModal(false)}}/>}

        </div>
    );
}

export default DetailsScreen;