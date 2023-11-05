
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Lightbox from "yet-another-react-lightbox";
import Header from './Header';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fecthIssueDetails } from '../app/reducers/issueSlice';
import { Form } from 'react-bootstrap';
import { getComments, saveComment } from './APIServices/AppAPI';
import { APIAlertNotify, alertNotify, getTime } from '../AppFunction';
// import './App.css';


function DetailsScreen() {
    const authUser = useSelector((state)=>state.userData.user)
    const [login, setLogin]= useState(false);
	let navigate = useNavigate();
    const dispatch = useDispatch()
    const params = useParams()
    const issue = useSelector((state)=> state.issueData.issueDetails)
	const [open, setOpen] = useState(false);
     
    const [comment, setComment]= useState("");
    const [userComments, setUserComments]= useState([])


	const goToHome = ()=>{
		navigate("/")
	}

    const handleSubmit= ()=> {
        try{
            let res = saveComment({issueId: params.issueId, userId: authUser._id, comment})
            if(res.status === 200){
                alertNotify(res.data.message, res.status)      
            }else{
                throw new Error(res)        
            }
        }catch(err){
            APIAlertNotify(err)
        }
    }

    const getUserComments= async ()=> {
        let resp= await getComments(params.issueId)
        setUserComments(resp.data.data)
    }

    const handleCommentEvent =()=>{
        setLogin(true)    
    }
    useEffect(()=>{
        dispatch(fecthIssueDetails(params.issueId))
        getUserComments()
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
                                alt="news title image"
                            />
                            <span className='issue-type-info-txt'><span>{ getTime(issue.created_at)}</span></span>
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
                        <div className='issue-dtls-img-blk'>
                            <img onClick={() => setOpen(true)}
                                    src={`${process.env.REACT_APP_PROFILE_URL}/issues/${issue.images[0]}`}
                                    className="issue-card-img issue-dtls-img"
                                    alt="news title image"
                            />
                            <span className='imgs-count'>{issue.images.length}</span>
                        </div>

                        <Lightbox
                            open={open}
                            close={() => setOpen(false)}
                            slides={
                                issue.images.map((img,ind)=>({
                                    src: `${process.env.REACT_APP_PROFILE_URL}/issues/${img}`,
                                    alt: `Image ${ind}`,
                                    
                                }))
                            }
                        />
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
                                <div className='issue-icon-item d-flex align-items-center aoi-gap-off'>
                                    <img
                                        src="/FlagCardIcon.svg"
                                        className="card-flag-icon"
                                        alt="news title image"
                                    />
                                    <span className='issue-type-info-txt'><span>Flag</span><span>(22)</span></span>
                                </div>
                                <div className='issue-icon-item d-flex align-items-center aoi-gap-off'>
                                    <img
                                        src="/ShareCardIcon.svg"
                                        className="issue-type-icon"
                                        alt="news title image"
                                    />
                                    <span className='issue-type-info-txt'><span>Share</span><span>(22)</span></span>
                                </div>
                                <div className='issue-icon-item d-flex align-items-center aoi-gap-off'>
                                    <img
                                        src="/ViewsCardIcon.svg"
                                        className="issue-type-icon"
                                        alt="news title image"
                                    />
                                    <span className='issue-type-info-txt'><span>Views</span><span>(22)</span></span>
                                </div>
                            </div>
                        </div>
                        <div className='add-comments-blk pt-3 pb-3'>
                            {authUser ? 
                                <div className='post-comments-blk'>
                                    <Form.Label><span className='comment-label'>Comment as</span><span className='ps-2 primary-text'>{authUser.name}</span></Form.Label>
                                    <Form.Control as="textarea" name="comment" rows={2} onChange={(e)=>{setComment(e.target.value)}} value={comment}/>
                                    <Button type="button" className='aoi-primary-btn' onClick={handleSubmit} style={{marginTop:"5px"}}>Post</Button>
                                </div> :
                                <Button variant="outline-primary" className='add-comment-btn' onClick={handleCommentEvent}> 
                                    <img
                                        src="/PlusBlackIcon.svg"
                                        className="plus-icon-btn"
                                        alt="Notifications"
                                    />
                                        Add Comments
                                </Button> 
                            }

                        </div>
                        <div className='comments-list-blk'>
                            <div className="comments-container">
                                <h5 className='card-title'>Comments</h5>
                                <ul id="comments-list" className="comments-list">
                                {userComments.map(coment=>(
                                    <li>
                                        <div className="comment-main-level">
                                        
                                            <div className="comment-avatar"><img src="/avatar2.jpg" alt=""/></div>
                                            
                                            <div className="comment-box">
                                                <div className="comment-head">
                                                    <h6 className="comment-name by-author">{coment.userId.name}</h6>
                                                    <span>{getTime(coment.created_at)}</span>
                                                </div>
                                                <div className="comment-content">{coment.comment}</div>
                                            </div>
                                        </div>
                                    </li> ))}
                                   
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                    
                
            </div>}


    {/* Raise an issue modal */} 
      

        </div>
    );
}

export default DetailsScreen;