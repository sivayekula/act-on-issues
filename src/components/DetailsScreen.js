
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Lightbox from "yet-another-react-lightbox";

import Header from './Header';
import { useNavigate } from 'react-router-dom';
// import './App.css';


function DetailsScreen() {
	let navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const goToHome = ()=>{
		navigate("/")
	}
  
    return (
        <div className='main-page'>
           <Header/>

            <div className='issue-details-blk d-flex'>
                <div className='back-icon-blk pe-3'>
                    <Nav.Link href="#" onClick={goToHome}>
                        <img
                            src="./BackIcon.svg"
                            className="uparrow-icon"
                            alt="Notifications"
                        />
                    </Nav.Link>

                   
                </div>
                <div className='issue-details-content-blk'>
                    <h1 className='details-title'>Issue main Title here</h1>
                    <div className='issue-type-icons-blk d-flex align-items-center'>
                        <div className='issue-icon-item d-flex align-items-center aoi-gap-off'>
                            <img
                                src="./UserCardIcon.svg"
                                className="issue-type-icon"
                                alt="news title image"
                            />
                            <span className='issue-type-info-txt'><span>by moon</span> - <span>14h ago</span></span>
                        </div>
                        <div className='issue-icon-item d-flex align-items-center aoi-gap-off'>
                            <img
                                src="./IssueTypeIcon.svg"
                                className="issue-type-icon"
                                alt="news title image"
                            />
                            <span className='issue-type-info-txt'>General</span>
                        </div>
                        <div className='issue-icon-item d-flex align-items-center aoi-gap-off'>
                            <img
                                src="./LocationCardIcon.svg"
                                className="issue-type-icon"
                                alt="news title image"
                            />
                            <span className='issue-type-info-txt'>Kukatpally, Road No 6</span>
                        </div>
                    </div>
                    <div className='issue-full-content-blk pt-3 pb-3'>
                        <p>Description text here “Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ornare tempus aliquet. Pellentesque finibus, est et iaculis suscipit, dolor nulla commodo dui, nec ultricies arcu nisl tristique eros. Morbi eros est, pulvinar eget ornare ac, ultrices eget risus. Ut lobortis pellentesque pretium. Praesent sollicitudin vestibulum iaculis. Mauris a finibus orci. Quisque ipsum nunc, efficitur sit amet blandit ut, aliquam quis dui.</p>
                        <p>Description text here “Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ornare tempus aliquet. Pellentesque finibus, est et iaculis suscipit, dolor nulla commodo dui, nec ultricies arcu nisl tristique eros. Morbi eros est, pulvinar eget ornare ac, ultrices eget risus. Ut lobortis pellentesque pretium. Praesent sollicitudin vestibulum iaculis. Mauris a finibus orci. Quisque ipsum nunc, efficitur sit amet blandit ut, aliquam quis dui.</p>
                    </div>
                    <div className='issue-all-images-blk'>
                        <div className='issue-dtls-img-blk'>
                            <img onClick={() => setOpen(true)}
                                    src="./driange-issue.jpg"
                                    className="issue-card-img issue-dtls-img"
                                    alt="news title image"
                            />
                            <span className='imgs-count'>4</span>
                        </div>

                        <Lightbox
                            open={open}
                            close={() => setOpen(false)}
                            slides={[
                                {
                                    src: "./driange-issue.jpg",
                                    alt: "image 1",
                                },
                                {
                                    src: "./Swachh-Bharat-issue1.jpg",
                                    alt: "image 2",
                                },
                                
                                
                            ]}
                        />
                    </div>
                    <div className='details-comments-blk'>
                        <div className='pt-3 d-flex align-items-center justify-content-between'>
                            <div className='left-card-actions d-flex aoi-gap-1'>
                                <div className='issue-icon-item d-flex align-items-center aoi-gap-off'>
                                    <img
                                        src="./CommentsCardIcon.svg"
                                        className="issue-type-icon"
                                        alt="news title image"
                                    />
                                    <span className='issue-type-info-txt'><span>Comments</span><span>(22)</span></span>
                                </div>
                                <div className='issue-icon-item d-flex align-items-center aoi-gap-off'>
                                    <img
                                        src="./FlagCardIcon.svg"
                                        className="card-flag-icon"
                                        alt="news title image"
                                    />
                                    <span className='issue-type-info-txt'><span>Flag</span><span>(22)</span></span>
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
                        </div>
                        <div className='add-comments-blk pt-3 pb-3'>
                            <Button variant="outline-primary" className='add-comment-btn'> 
                                <img
                                src="./PlusBlackIcon.svg"
                                className="plus-icon-btn"
                                alt="Notifications"
                                />
                                Add Comments
                            </Button>

                            {/* Show this after user login only 
                            <div className='post-comments-blk'>
                                <Form.Label><span className='comment-label'>Comment as</span><span className='ps-2 primary-text'>User Name</span></Form.Label>
                                <Form.Control as="textarea" rows={3} />
                                <Button type="submit" className='aoi-primary-btn'>Post</Button>
                            </div>*/}  

                        </div>
                        <div className='comments-list-blk'>
                            <div className="comments-container">
                                <h5 className='card-title'>Comments</h5>
                                <ul id="comments-list" className="comments-list">
                                    <li>
                                        <div className="comment-main-level">
                                        
                                            <div className="comment-avatar"><img src="./avatar2.jpg" alt=""/></div>
                                            
                                            <div className="comment-box">
                                                <div className="comment-head">
                                                    <h6 className="comment-name by-author">User Name1</h6>
                                                    <span>2 mins</span>
                                                </div>
                                                <div className="comment-content">
                                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit omnis animi et iure laudantium vitae, praesentium optio, sapiente distinctio illo?
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="comment-main-level">
                                            <div className="comment-avatar"><img src="./avatar1.png" alt=""/></div>
                                            <div className="comment-box">
                                                <div className="comment-head">
                                                    <h6 className="comment-name">User Name2</h6>
                                                    <span>5 mins</span>
                                                </div>
                                                <div className="comment-content">
                                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit omnis animi et iure laudantium vitae, praesentium optio, sapiente distinctio illo?
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                    
                
            </div>


    {/* Raise an issue modal */} 
      

        </div>
    );
}

export default DetailsScreen;