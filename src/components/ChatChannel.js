import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { getComments, saveComment } from './APIServices/AppAPI';
import { useParams } from 'react-router-dom';
import { APIAlertNotify, alertNotify, getTime } from '../AppFunction';
import { useSelector } from 'react-redux';

 

const MessageList = ({ messages, onReplyClick }) => {
	const defaultURl = "./ProfilePicGrey.svg"
  return (
    <div className="comments-container">
        <h5 className='card-title'>Comments</h5>
        <ul id="comments-list" className="comments-list">
      {messages.map((message, index) => {
				let URL = message.userId.profile_pic?`${process.env.REACT_APP_PROFILE_URL}/users/${message.userId.profile_pic}`:defaultURl
				return(
        <li key={index}>
        <div className="comment-main-level">
        <div className="comment-avatar"><img src={URL} alt=""/></div>
        <div className="comment-box">
            <div className="comment-head">
                <h6 className="comment-name by-author">
                    {message.userId.name}  
                </h6>
                <span>  
                    {getTime(message.created_at)}
                </span>
						<span style={{float: "right", cursor: "pointer", paddingLeft: "60px"}} onClick={()=>onReplyClick(message)}><span style={{fontSize: "10px"}}>Reply</span></span>

            </div>
            {message.commentId &&
						<div style={{color: 'white', backgroundColor: "gray"}} className="comment-content">{message.commentId.comment}</div>}
						<div className="comment-content">{message.comment}</div>
            
        </div>
    </div>
        </li>
      )})}
      </ul>
    </div>
  )
};
 

const ChatChannel = ({messages, handleCommentSubmit}) => {
   
		const [comment, setComment]= useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);

  const handleReplyClick = (msg) => {
    setSelectedMessage(msg);
  };

  const handleSubmit=()=>{
    const payload= {
      comment,
      ...(selectedMessage&&{replyTo:selectedMessage._id})
    }
    handleCommentSubmit(payload)
    setComment("")
    setSelectedMessage(null)
  }
  


  return (
    <div className='comments-list-blk'>
    {messages.length>0?
      <MessageList messages={messages} onReplyClick={handleReplyClick} />:
      <div className="comments-container">
        <h5 className='card-title'>No comments added</h5>
      </div>}
      {selectedMessage !== null && (
			<div>
				<p>Replying to: {selectedMessage.comment} <i onClick={()=> setSelectedMessage(null)}><img
                                src="/UserCardIcon.svg"
                                className="issue-type-icon"
                                alt="news title image"
                            /></i></p>
			</div>)}
			<div className='add-comments-blk pt-3 pb-3'>
				<div className='post-comments-blk'>
					<Form.Control as="textarea" name="comment" rows={2} 
					onChange={(e)=>{setComment(e.target.value)}} value={comment}
					/>
					<Button type="button" className='aoi-primary-btn' 
					onClick={handleSubmit} 
					style={{marginTop:"5px"}}>Post</Button>
				</div> 
			</div>
    </div>
  );
};

export default ChatChannel;
