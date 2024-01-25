import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import {
    FacebookIcon,
    FacebookShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    TwitterIcon,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton
} from "react-share";

const ShareModal = ({show,handleHide}) =>{
  const issue = useSelector((state)=> state.issueData.issueDetails)
  const shareUrl = `http://localhost:3000/details/${issue._id}`;
  const title = issue.title
  const descrption = issue.description
  const exshareUrl ="https://github.com"

  return(<>
    <Modal centered show={show} onHide={handleHide} className='signup-modal'>
      <Modal.Header closeButton></Modal.Header>
        <Modal.Body className='signup-modal-padding'>
        <div className="Demo__container">
      <div className="Demo__some-network">
        <FacebookShareButton
        title={title}
          url={shareUrl}
          descrption={descrption}
          className="Demo__some-network__share-button"
        >
          <FacebookIcon size={32} round />
        </FacebookShareButton>

        
      </div>


      <div className="Demo__some-network">
        <TwitterShareButton
          title={title}
          url={shareUrl}
          descrption={descrption}
          className="Demo__some-network__share-button"
        >
          <TwitterIcon size={32} round />
        </TwitterShareButton>
      </div>


      <div className="Demo__some-network">
        <WhatsappShareButton
          title={title}
          url={shareUrl}
          descrption={descrption}
          separator=":: "
          className="Demo__some-network__share-button"
        >
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
      </div>

      <div className="Demo__some-network">
        <LinkedinShareButton
          title={title}
          url={exshareUrl}
          descrption={descrption}
          className="Demo__some-network__share-button"
        >
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
      </div>

    </div>
        </Modal.Body>
      </Modal>
    </>)
}
export default ShareModal