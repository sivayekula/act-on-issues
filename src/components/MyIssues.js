import React, {useEffect, useState} from "react";
import Button from 'react-bootstrap/Button';
import { getTime, APIAlertNotify } from '../AppFunction';
import { useDispatch, useSelector } from "react-redux";
import { getMyIssues } from './APIServices/AppAPI';
import { useNavigate } from 'react-router-dom';
import Header from './Header';


function MyIssues() {
	const navigate = useNavigate()
    const authUser = useSelector((state)=>state.userData.user)
    const [issues, setIssues] = useState([])

	const gotoURl = () => {
		navigate("/")
	}

	const gotoDetails = (issueId) =>{
        navigate(`/details/${issueId}`)
    }

    const getIssues= async ()=> {
        if(authUser?.userId){
        try{
            let res= await getMyIssues(authUser.userId) 
            if(res.status === 200){
                setIssues(res.data.data.data)
            } else {
                throw new Error(res)
            }
        }catch(err) {
            console.log(err)
            APIAlertNotify(err)
        }}
    }
    
      useEffect(()=>{
        getIssues()
      },[authUser])
	return (
		<div className='main-page'>
			<Header />
            <div className='main-body-wrapper'>
            {/* <div className='left-news-list-main-blk d-flex flex-column aoi-gap-1'></div> */}
            <div className='center-issues-cards-main-blk'>
				{/* Issues card */} 
                <div className='issues-cards-list-blk d-flex flex-column aoi-gap-1'>
                    {issues.map(issue=>{
                      return(
                        <div className='news-card issue-info-card' key={issue._id}>
                            <div className='d-flex aoi-gap-1 p-3' onClick={()=>{gotoDetails(issue._id)}}>
                              <div className='left-issue-card-info-blk'>
                                <h3 className='news-title'>{issue.title}</h3>
                                <div className='issue-type-icons-blk d-flex align-items-center'>
                                    <div className='issue-icon-item d-flex align-items-center aoi-gap-off'>
                                        <img
                                            src="./UserCardIcon.svg"
                                            className="issue-type-icon"
                                            alt="news title image"
                                        />
                                        <span className='issue-type-info-txt'>
                                          <span>
                                          { 
                                            getTime(issue.created_at)
                                          }
                                          </span>
                                        </span>
                                    </div>
                                    <div className='issue-icon-item d-flex align-items-center aoi-gap-off'>
                                        <img
                                            src="./IssueTypeIcon.svg"
                                            className="issue-type-icon"
                                            alt="news title image"
                                        />
                                        <span className='issue-type-info-txt'>{issue.categories?.name}</span>
                                    </div>
                                    <div className='issue-icon-item d-flex align-items-center aoi-gap-off'>
                                        <img
                                            src="./LocationCardIcon.svg"
                                            className="issue-type-icon"
                                            alt="news title image"
                                        />
                                        <span className='issue-type-info-txt'>{issue.address?.label}</span>
                                    </div>
                                </div>
                                <div className='issue-card-description-blk'>
                                  <p className='issue-card-description'>{issue.description}</p>
                                </div>
                                
                              </div>
                              <div className='right-issue-img-blk'>
                                <img
                                    src={process.env.REACT_APP_PROFILE_URL+"/issues/"+issue.images[0]}
                                    className="issue-card-img"
                                    alt="news title image"
                                  />
                              </div>
                            </div>
                            {/* <div className='issue-card-acions-blk d-flex align-items-center justify-content-between'>
                                <div className='left-card-actions d-flex aoi-gap-1'>
                                    <div className='issue-icon-item d-flex align-items-center aoi-gap-off'>
                                        <img
                                            src="./CommentsCardIcon.svg"
                                            className="issue-type-icon"
                                            alt="news title image"
                                        />
                                        <span className='issue-type-info-txt'><span>Comments</span><span>({issue.commentsCount})</span></span>
                                    </div>
                                    <div className='issue-icon-item d-flex align-items-center aoi-gap-off'>
                                        <img
                                            src="./FlagCardIcon.svg"
                                            className="card-flag-icon"
                                            alt="news title image"
                                        />
                                        <span className='issue-type-info-txt'><span>Flag</span><span>({issue.flagsCount})</span></span>
                                    </div>
                                    <div className='issue-icon-item d-flex align-items-center aoi-gap-off'>
                                        <img
                                            src="./ShareCardIcon.svg"
                                            className="issue-type-icon"
                                            alt="news title image"
                                        />
                                        <span className='issue-type-info-txt'><span>Share</span><span>(22)</span></span>
                                    </div>
                                    <div className='issue-icon-item d-flex align-items-center aoi-gap-off'>
                                        <img
                                            src="./ViewsCardIcon.svg"
                                            className="issue-type-icon"
                                            alt="news title image"
                                        />
                                        <span className='issue-type-info-txt'><span>Views</span><span>(22)</span></span>
                                    </div>
                                </div>
                                <div className='right-card-actions'>
                                <Button variant="link" className='txt-btn'>Acknowledge</Button>
                                </div>
                            </div> */}
                      </div> 
                      )
                    })}
                  </div>
                  </div>
                  </div>
			</div>
    );
}

export default MyIssues;