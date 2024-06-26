
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import AppConstants, { FILE_ACCEPTED_FORMATS } from '../../AppConstants';
import { APIAlertNotify, alertNotify, convertBase64 } from '../../AppFunction';
import { createIssue } from '../APIServices/AppAPI';
import { useDispatch, useSelector } from 'react-redux';
import SelectBox from './UI/SelectBox';
import GooglePlacesAutocomplete,{getLatLng, geocodeByAddress} from 'react-google-places-autocomplete';
import VALIDATION_MESSAGES from '../../MessageConstants';
import { fecthIssues } from '../../app/reducers/issueSlice';

const RaiseIssue = ({show, handleClose}) =>{
  const categories = useSelector((state) => state.userData.categories)
  const emptyObj = {title:"", description:"", category:"", address:"",images:[], other:'',isSwathyaBharat:false}
  const [issueObj, setIsueObj] = useState({...emptyObj})
  const dispatch = useDispatch()
  const handleHide = () =>{
    handleClose(AppConstants.RAISE_ISSUE,false)
    setIsueObj({...emptyObj})
  }
  
  const handleChange = (e) =>{
    let {value, name} = e.target
    setIsueObj({...issueObj,[name]:value,...(name==='category'&&{other:''})})
  }

  const handlePlace = (value) =>{
    geocodeByAddress(value.label)
    .then(results => getLatLng(results[0]))
    .then(({ lat, lng }) =>{
      setIsueObj({...issueObj,address:{...value, lat_lng:{lat:lat, lng:lng}}})
    });
  }

  const getValidate = () =>{
    let valid = false    
    if(issueObj.title.length>=10 &&
      issueObj.description.length>=15 &&
      issueObj.address!=="" &&
      (issueObj.isSwathyaBharat||issueObj.category.length>1) &&
      // issueObj.images.length>0 &&
      showOther(true)
    ){
      valid = true
    }
    return !valid
  }


  const submitIssue = async()=>{
    try{
      let res = await createIssue(issueObj)
      if(res.status === 200){
        alertNotify(res.data.message, res.status)
        dispatch(fecthIssues())
        handleHide()
      }else{
        throw new Error(res)
      }
    }catch(error){
      APIAlertNotify(error)
    }
  }

  const getCategoryValues = () =>{
    return categories.map(cat=>({label:cat.name,value:cat._id}))
  }

  const handleFiles = async(e)=>{
		const files = e.target.files
    const no_of_files = issueObj.images.length + files.length
    if(no_of_files < 4){
      let imgs = []
      for (const key in files) {
        if(!isNaN(key)){
          const format = files[key].name.split(".")[1]
          if(FILE_ACCEPTED_FORMATS.includes(format)){
            const base64 = await convertBase64(files[key])
            imgs.push(base64)
          }else{
            alertNotify("Please select png, jpg or jpeg files only")
          }
        }
      }
      const tmpImgs = [...issueObj.images, ...imgs]
      setIsueObj({...issueObj, images:tmpImgs})
    }else{
      alertNotify(VALIDATION_MESSAGES.MAX_FILES_MESSAGE)
    }
	}

  const showOther = (flag=false) =>{
    const selCat = categories.filter(cat=>cat._id === issueObj.category)
    let result = false
    if(flag){
      if(!issueObj.isSwathyaBharat){
        if(selCat.length>0){
          if(selCat[0].name === 'Other'){
            result = issueObj.other.length > 3
          }else{
            result = true
          }
        }
      }else{
        result = true
      }
    }else{
      result =  selCat.length>0&&selCat[0].name === 'Other'
    }
    return result
  }

  const removeImg = (imgInd)=>{
    const tmpImgs = issueObj.images.filter((img,ind)=>ind!==imgInd)
    setIsueObj({...issueObj, images:tmpImgs})
  }

   

  return(<>
    <Modal centered show={show} onHide={handleHide} className='signup-modal raise-issue-modal'>
        <Modal.Header closeButton className='aoi-modal-header'>
          <h1 className='aoi-modal-title'>Raise an Issue</h1> 
        </Modal.Header>
        <Modal.Body className='signup-modal-padding'>
          <div className='signup-form-blk'>
              <Form>                
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Title <span className='required'>*</span></Form.Label>
                  <Form.Control type="text" placeholder="Enter Post Title" name="title" value={issueObj.title} onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Description <span className='required'>*</span></Form.Label>
                  <Form.Control as="textarea" rows={3} name="description" value={issueObj.description} onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Location <span className='required'>*</span></Form.Label>
                  <GooglePlacesAutocomplete
                    apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
                    selectProps={{
                      value:issueObj.address,
                      onChange: handlePlace,
                      GooglePlacesDetailsQuery:{ fields: "geometry" },
                      placeholder:"Search",
                    }}                     
                  />
                </Form.Group>
                <Form.Check
                  inline
                  label="Swachh Bharat"
                  name="isSwathyaBharat"
                  type='checkbox'
                  checked={issueObj.isSwathyaBharat}
                  onChange={()=>{setIsueObj({...issueObj, isSwathyaBharat:!issueObj.isSwathyaBharat,category:""})}}/>
                <SelectBox 
                  label="Category" 
                  isRequired={!issueObj.isSwathyaBharat} 
                  value={issueObj.category} 
                  data={getCategoryValues()}
                  name="category" 
                  onChange={handleChange}
                  disabled={issueObj.isSwathyaBharat}
                  placeholder="-Select-"/>
                {showOther()&&
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Other <span className='required'>*</span></Form.Label>
                  <Form.Control type="text" name="other" value={issueObj.other} onChange={handleChange}/>
                </Form.Group>
                }
                
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Images</Form.Label>
                  <Form.Control type="file" 
                    accept= '.png, .jpeg, .jpg'
                    onChange={handleFiles} 
                    value=""
                    multiple />
                </Form.Group>
                {issueObj.images.length>0&&
                <Form.Group className="mb-3">
                  {issueObj.images.map((file,ind)=>(
                    <div className='news-img-blk img-align' key={file}>
                      <button type="button" class="close" aria-label="Close" onClick={()=>removeImg(ind)}>
                        <span aria-hidden="true">&times;</span>
                      </button>
                      <img
                        src={file}
                        className="news-img"
                        alt="Issue proofs"/>
                    </div>
                  ))}
								</Form.Group>}
                <Button type="button" className='aoi-primary-btn full-btn' onClick={submitIssue} disabled={getValidate()}>Raise an Issue</Button>
              </Form>
          </div>

        </Modal.Body>             

    </Modal>
    </>)
}
export default RaiseIssue;