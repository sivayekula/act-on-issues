import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import NavDropdown from 'react-bootstrap/NavDropdown';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import GooglePlacesAutocomplete,{getLatLng, geocodeByAddress}  from 'react-google-places-autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import AppConstants, { GENERAL_ISSUES } from '../AppConstants';
import { getTime } from '../AppFunction';
import { fecthIssues, fecthTrendingNews } from '../app/reducers/issueSlice';
import Header from './Header';
import moment from 'moment-timezone';



function Home() {
  const dispatch = useDispatch()
  const authUser = useSelector((state)=>state.userData.user)
  const trendingNews = useSelector(state=>state.issueData.trendingNews)
  const data = useSelector(state=>state.issueData.issues)
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndtDate] = useState("");
  const [status, setStatus] = useState("Open");
  const [locFilter, updateLocFilter] = useState(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [latLng, setLatLng] = useState(null)
  const [issues, setIssues] = useState(data)
  const [searchKey, setSearchKey] = useState("")
  const [login, setLogin]= useState(false);
  const navigate = useNavigate()

  const handlePlace = (value)=>{
    geocodeByAddress(value.label)
    .then(results => getLatLng(results[0]))
    .then(({ lat, lng }) =>{
      updateLocFilter({...value, lat_lng:{lat:lat, lng:lng}})
      setLatLng({lat:lat, lng:lng})
      setDropdownOpen(false)
    });    
  }

  const gotoDetails = (issueId) =>{
    if(authUser){
      navigate(`/details/${issueId}`)
    }else{
      setLogin(true)
    }
  }

  useEffect(()=>{
    dispatch(fecthTrendingNews())
  },[])

  useEffect(()=>{
    setIssues(data)
  },[data])

  useEffect(()=>{
    let params = `status=${status}`
    if(latLng){
      params = `${params}&lat=${latLng.lat}&lng=${latLng.lng}`
    }
    if(startDate&&endDate){
      params = `${params}&startDate=${moment(startDate).format("YYYY-MM-DD")}&endDate=${moment(endDate).format("YYYY-MM-DD")}`
    }
     
    dispatch(fecthIssues(params))
     
  },[status, locFilter])

  const handleDateFilters = () =>{
    let params = `status=${status}&startDate=${moment(startDate).format("YYYY-MM-DD")}&endDate=${moment(endDate).format("YYYY-MM-DD")}`
    if(latLng){
      params = `${params}&lat=${latLng.lat}&lng=${latLng.lng}`
    }
    dispatch(fecthIssues(params))
    setShowDatePicker(false)
  }

  const handleClearBtn = (mobFlag=false)=>{
    if(mobFlag){
      setStatus("All")
      updateLocFilter(null)
      setLatLng(null)
    }else{
      let params = `status=${status}`
      if(latLng){
        params = `${params}&lat=${latLng.lat}&lng=${latLng.lng}`
      }
      dispatch(fecthIssues(params))
      
    }
    setStartDate("");
    setEndtDate("")
    setShowDatePicker(false)
  }

  const handleSearch = (e)=>{
    setSearchKey(e.target.value)
    let dumyList = data.filter(issue=>(issue.title.toLowerCase().includes(e.target.value.toLowerCase())))
    setIssues(dumyList)
  }
  
  return (
    <div className='main-page'>
      <Header login={login}/>
      <div className='main-body-wrapper'>
           <div className='aoi-gap-1 d-flex'>
                <div className='left-news-list-main-blk d-flex flex-column aoi-gap-1'>
                    {/* Trending news card */} 
                    <div className='news-card'>
                      <h5 className='card-title'>Trending / Issues</h5>
                      <div className='d-flex aoi-gap-1 news-list-items-blk'>
                        {trendingNews.slice(0, 5).map((news,ind)=>(
                          <div className='d-flex aoi-gap-off align-items-center news-list-item' key={ind}>
                            <a href={AppConstants.TRENDING_NEWS_URL} className='news-link' target="_blank">
                              <div className='news-img-blk'>
                                <img
                                  src={news.img}
                                  className="news-img"
                                  alt={news.heading}/>
                                </div>
                                <div className='news-content-blk'>
                                  <h3 className='news-title'>{news.heading}</h3>
                                  <p className='news-content'>{news.content}</p>
                                </div>
                              </a>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* General news card */}
                    <div className='news-card'>
                      <h5 className='card-title'>General Issues</h5>
                      <div className='d-flex aoi-gap-1 news-list-items-blk'>
                      {GENERAL_ISSUES.slice(0, 5).map( (isue, indx)=> (
                          <div className='d-flex aoi-gap-off align-items-center news-list-item' key={indx}>
                              <a href='#' className='news-link'>
                                <div className='news-content-blk'>
                                    <h3 className='news-title' >{isue}</h3>
                                </div>
                              </a>
                          </div> ))}                       
                      </div>
                    </div> 
                </div>
                <div className='center-issues-cards-main-blk'>
                  {/* Header Search block */} 
                  <div className='issues-header-blk d-flex align-items-center justify-content-between'>
                    <h5 className='card-title'>Recently Posted Issues</h5>
                    <div className='issue-search-blk'>
                      <InputGroup className="">
                        <InputGroup.Text id="basic-addon1"><img
                          src="./SearchIcon.svg"
                          className="issue-search-icon"
                          alt="Aoi search"
                        /></InputGroup.Text>
                        <Form.Control
                          placeholder="Search By Title…"
                          aria-label="Search By Title…"
                          aria-describedby="basic-addon1"
                          onChange={handleSearch}
                          value={searchKey}
                        />
                      </InputGroup>
                    </div>

                    <div className="hide-on-web show-on-mobile">
                      <Dropdown align="start" autoClose="outside">
                        <Dropdown.Toggle id="dropdown-basic" className='icon-dropdown notificaation-dropdown filter-dropdown-mobile'>
                          <img
                            src="./FilterIcon.svg"
                            className="d-inline-block align-top"
                            alt="Notifications"/>
                        </Dropdown.Toggle>

                        <Dropdown.Menu className='mobile-filter-dropdown-blk'>
                          <Dropdown.Item className="mobile-filter-drop-item">
                            <label className='font-weight-500'>Status</label>
                            <Dropdown className="mobile-filter-dropdown" onSelect={(eventKey)=>setStatus(eventKey)}>
                              <Dropdown.Toggle id="dropdown-autoclose-outside" >
                                {status}
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Item eventKey="All">All</Dropdown.Item>
                                <Dropdown.Item eventKey="Open">Open</Dropdown.Item>
                                <Dropdown.Item eventKey="Resolved">Resolved</Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </Dropdown.Item>
                          <Dropdown.Item className="mobile-filter-drop-item">
                            <label className='font-weight-500'>Location</label>
                            <Dropdown className="mobile-filter-dropdown">
                              <Dropdown.Toggle id="dropdown-autoclose-outside">
                                {locFilter?locFilter.label:"All"}
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item className="mobile-filter-drop-item">
                                <GooglePlacesAutocomplete
                                  apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
                                  selectProps={{
                                    value:locFilter,
                                    onChange: handlePlace,
                                    GooglePlacesDetailsQuery:{ fields: "geometry" },
                                    placeholder:"Search",
                                  }}                     
                                /> 
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </Dropdown.Item>
                          <Dropdown.Item className="mobile-filter-drop-item datepicker-input-blk">
                            <label className='font-weight-500'>Start Date</label>
                            <DatePicker showIcon selected={startDate} onChange={(date) => setStartDate(date)} />
                          </Dropdown.Item>
                          <Dropdown.Item className="mobile-filter-drop-item datepicker-input-blk">
                            <label className='font-weight-500'>End Date</label>
                            <DatePicker showIcon selected={endDate} onChange={(date) => setEndtDate(date)} />
                          </Dropdown.Item>
                          <div className="mob-filters-btns-blk">
                            <Button type="submit" className='aoi-primary-btn full-btn' onClick={handleDateFilters} disabled={startDate==""||endDate==''}>Apply</Button>
                            <Button type="submit" className='aoi-secondary-btn full-btn' onClick={()=>handleClearBtn(true)}>Clear</Button>
                          </div>  
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                  
                   {/* Filters block */} 
                   <div className='issues-filter-blk pt-2 pb-2 d-flex aoi-gap-1 hide-on-mobile'>
                    <div className='status-filter-item-blk d-flex font-size14'>
                      <label className='font-weight-500'>Status:</label>
                      <NavDropdown autoClose title={status} onSelect={(eventKey)=>setStatus(eventKey)}
                      id="basic-nav-dropdown" className='loc-filter-dropdown ps-2'>
                        <NavDropdown.Item eventKey="All" >All</NavDropdown.Item>
                        <NavDropdown.Item eventKey="Open">Open</NavDropdown.Item>
                        <NavDropdown.Item eventKey="Resolved">Resolved</NavDropdown.Item>
                      </NavDropdown>
                    </div>

                    <div className='filter-item-blk d-flex font-size14'>
                      <label className='font-weight-500'>Location:</label>
                      <NavDropdown autoClose="outside" show={dropdownOpen} title={locFilter?locFilter.label:"All"} id="basic-nav-dropdown" className='loc-filter-dropdown ps-2' onToggle={()=>setDropdownOpen(true)}>
                        <NavDropdown.Item className='filter-input-blk'>
                        <GooglePlacesAutocomplete
                          apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
                          selectProps={{
                            value:locFilter,
                            onChange: handlePlace,
                            GooglePlacesDetailsQuery:{ fields: "geometry" },
                            placeholder:"Search",
                          }}                     
                        /> 
                        </NavDropdown.Item>
                        <div className="mob-filters-btns-blk">
                          <Button className='aoi-secondary-btn date-picker-btns' onClick={()=>{updateLocFilter(null);setLatLng(null);setDropdownOpen(false)}}>Clear</Button>
                        </div>
                      </NavDropdown>
                    </div>
                  
                    <div className='filter-item-blk datepicker-filter-blk d-flex font-size14'>
                      <label className='font-weight-500'>Date:</label>
                      <NavDropdown autoClose="outside" show={showDatePicker} title={startDate&&endDate?`${moment(startDate).format("DD-MM-YY")} to ${moment(endDate).format("DD-MM-YY")}`:"All"} 
                        onToggle={()=>setShowDatePicker(true)}
                        id="basic-nav-dropdown" className='loc-filter-dropdown ps-2'>
                        <NavDropdown.Item className='datepicker-input-blk d-flex'>
                          <Form.Label className='font-size14 black-text'>Start Date</Form.Label>
                          <DatePicker showIcon selected={startDate} onChange={(date) => setStartDate(date)} />
                        </NavDropdown.Item>
                        <NavDropdown.Item className='datepicker-input-blk d-flex'>
                          <Form.Label className='font-size14 black-text'>End Date</Form.Label> 
                          <DatePicker showIcon selected={endDate} onChange={(date) => setEndtDate(date)} />
                        </NavDropdown.Item>
                        <div className="mob-filters-btns-blk">
                            <Button className='aoi-primary-btn date-picker-btns' onClick={handleDateFilters} disabled={startDate==""||endDate==''}>Apply</Button>
                            <Button className='aoi-secondary-btn date-picker-btns' onClick={handleClearBtn}>Clear</Button>
                          </div> 
                      </NavDropdown>
                    </div>
                  </div>

                  {/* Issues card */} 
                  <div className='issues-cards-list-blk d-flex flex-column aoi-gap-1'>
                    {issues.map(issue=>{
                      return(
                        <div className='news-card issue-info-card' key={issue._id} onClick={()=>{gotoDetails(issue._id)}}>
                            <div className='d-flex aoi-gap-1 p-3'>
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
                                            issue.userId.name
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
                                        <span className='issue-type-info-txt'>{issue.categoryId.name}</span>
                                    </div>
                                    <div className='issue-icon-item d-flex align-items-center aoi-gap-off'>
                                        <img
                                            src="./LocationCardIcon.svg"
                                            className="issue-type-icon"
                                            alt="news title image"
                                        />
                                        <span className='issue-type-info-txt'>{issue.address.label}</span>
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
                            <div className='issue-card-acions-blk d-flex align-items-center justify-content-between'>
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
                                        <span className='issue-type-info-txt'><span>ISupport</span><span>({issue.flagsCount})</span></span>
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
                            </div>
                      </div> 
                      )
                    })}
                  </div>

                </div>

                <div className='right-news-slider-main-blk d-flex flex-column aoi-gap-1'>
                     <div className='news-img-slider-blk'>
                      <Carousel interval={null}>
                          <Carousel.Item>
                            <img
                              className="d-block w-100"
                              src="./Swachh-Bharat-issue1.jpg"
                              alt="First slide"
                            />
                            <Carousel.Caption>
                              <h5>Swatch Bharat Issue1</h5>
                            </Carousel.Caption>
                          </Carousel.Item>
                          <Carousel.Item>  
                            <img
                              className="d-block w-100"
                              src="./water-issue.jpg"
                              alt="Second slide"
                            />
                            <Carousel.Caption>
                              <h5>Swatch Bharat Issue2</h5>
                            </Carousel.Caption>
                          </Carousel.Item>
                        </Carousel>
                     </div>
                     <div className='news-img-slider-blk'>
                      <Carousel interval={null}>
                          <Carousel.Item>
                            <img
                              className="d-block w-100"
                              src="./water-issue.jpg"
                              alt="First slide"
                            />
                            <Carousel.Caption>
                              <h5>General Issue1</h5>
                            </Carousel.Caption>
                          </Carousel.Item>
                          <Carousel.Item>  
                            <img
                              className="d-block w-100"
                              src="./Swachh-Bharat-issue1.jpg"
                              alt="Second slide"
                            />
                            <Carousel.Caption>
                              <h5>General Issue1</h5>
                            </Carousel.Caption>
                          </Carousel.Item>
                        </Carousel>
                     </div>
                </div>
            </div> 
      </div>
      <div className='scroll-to-top-blk'>
          <Button type="submit" className='aoi-primary-btn aoi-icon-btn'>
            <img
                src="./UpArrow.svg"
                className="uparrow-icon"
                alt="Notifications"
              />
          </Button>
      </div>

      

      

    </div>
  );
}

export default Home;