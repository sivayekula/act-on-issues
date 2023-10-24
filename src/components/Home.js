import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';
import '../App.css';
import Header from './Header';
import { useDispatch, useSelector } from 'react-redux';
import { fecthIssues, fecthTrendingNews } from '../app/reducers/issueSlice';
import AppConstants from '../AppConstants';

function Home() {
  const dispatch = useDispatch()
  const trendingNews = useSelector(state=>state.issueData.trendingNews)
  const issues = useSelector(state=>state.issueData.issues)
  const [startDate, setStartDate] = useState(new Date());
  const navigate = useNavigate()

  const gotoDetails = () =>{
    navigate("/details")
  }

  useEffect(()=>{
    dispatch(fecthTrendingNews())
    dispatch(fecthIssues())
  },[])

  console.log(issues,"issues")
  return (
    <div className='main-page'>
      <Header/>
      <div className='main-body-wrapper'>
           <div className='aoi-gap-1 d-flex'>
                <div className='left-news-list-main-blk d-flex flex-column aoi-gap-1'>
                    {/* Trending news card */} 
                    <div className='news-card'>
                      <h5 className='card-title'>Trending / Issues</h5>
                      <div className='d-flex aoi-gap-1 news-list-items-blk'>
                        {trendingNews.map(news=>(
                          <div className='d-flex aoi-gap-off align-items-center news-list-item'>
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
                    {/* General news card 
                    <div className='news-card'>
                      <h5 className='card-title'>General Issues</h5>
                      <div className='d-flex aoi-gap-1 news-list-items-blk'>
                          <div className='d-flex aoi-gap-off align-items-center news-list-item'>
                              <a href='#' className='news-link'>
                                <div className='news-img-blk'>
                                  <img
                                      src="./news1.jpg"
                                      className="news-img"
                                      alt="news title image"
                                    />
                                </div>
                                <div className='news-content-blk'>
                                    <h3 className='news-title'>News1 Trending title content here</h3>
                                    <p className='news-content'>Description text dummy text her dsds</p>
                                </div>
                              </a>
                          </div>
                          <div className='d-flex aoi-gap-off align-items-center news-list-item'>
                            <a href='#' className='news-link'>
                                <div className='news-img-blk'>
                                  <img
                                      src="./NoImage.png"
                                      className="news-img"
                                      alt="news title image"
                                    />
                                </div>
                                <div className='news-content-blk'>
                                    <h3 className='news-title'>News2 Trending title</h3>
                                    <p className='news-content'>Description text dummy text her dsds</p>
                                </div>
                              </a>
                          </div>
                          <div className='d-flex aoi-gap-off align-items-center news-list-item'>
                              <a href='#' className='news-link'>
                                <div className='news-img-blk'>
                                  <img
                                      src="./driange-issue.jpg"
                                      className="news-img"
                                      alt="news title image"
                                    />
                                </div>
                                <div className='news-content-blk'>
                                    <h3 className='news-title'>News3 Trending title here</h3>
                                    <p className='news-content'>Description text dummy text her dsds</p>
                                </div>
                              </a>
                          </div>
                          <div className='d-flex aoi-gap-off align-items-center news-list-item'>
                              <a href='#' className='news-link'>
                                <div className='news-img-blk'>
                                  <img
                                      src="./Swachh-Bharat-issue1.jpg"
                                      className="news-img"
                                      alt="news title image"
                                    />
                                </div>
                                <div className='news-content-blk'>
                                    <h3 className='news-title'>News4 Trending title here</h3>
                                    <p className='news-content'>Description text dummy text her dsds</p>
                                </div>
                              </a>
                          </div>
                          <div className='d-flex aoi-gap-off align-items-center news-list-item'>
                              <a href='#' className='news-link'>
                                <div className='news-img-blk'>
                                  <img
                                      src="./news1.jpg"
                                      className="news-img"
                                      alt="news title image"
                                    />
                                </div>
                                <div className='news-content-blk'>
                                    <h3 className='news-title'>News4 Trending here</h3>
                                    <p className='news-content'>Description text dummy text her dsds</p>
                                </div>
                              </a>
                          </div>
                          
                      </div>
                    </div> */}
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
                          placeholder="Search…"
                          aria-label="Search…"
                          aria-describedby="basic-addon1"
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
                            <Dropdown className="mobile-filter-dropdown">
                              <Dropdown.Toggle id="dropdown-autoclose-outside">
                                All
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Item>All</Dropdown.Item>
                                <Dropdown.Item>Open</Dropdown.Item>
                                <Dropdown.Item>Closed</Dropdown.Item>
                                <Dropdown.Item>Myposts</Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </Dropdown.Item>
                          <Dropdown.Item className="mobile-filter-drop-item">
                            <label className='font-weight-500'>Location</label>
                            <Dropdown className="mobile-filter-dropdown" autoClose="outside">
                              <Dropdown.Toggle id="dropdown-autoclose-outside">
                                All
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Item className="mobile-filter-drop-item">
                                  <InputGroup className="">
                                    <Form.Control
                                      placeholder="Search…"
                                      aria-label="Search…"
                                      aria-describedby="basic-addon1"/>
                                    <InputGroup.Text id="basic-addon1"><img
                                      src="./LocationPinIcon.svg"
                                      className="issue-search-icon"
                                      alt="Aoi search"/></InputGroup.Text>
                                  </InputGroup>
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </Dropdown.Item>
                          <Dropdown.Item className="mobile-filter-drop-item">
                            <label className='font-weight-500'>Area</label>
                            <Dropdown className="mobile-filter-dropdown" autoClose="outside">
                              <Dropdown.Toggle id="dropdown-autoclose-outside">
                                All
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item className="mobile-filter-drop-item">
                                  <InputGroup className="">
                                    <Form.Control
                                      placeholder="Search…"
                                      aria-label="Search…"
                                      aria-describedby="basic-addon1"/>
                                    <InputGroup.Text id="basic-addon1"><img
                                      src="./LocationPinIcon.svg"
                                      className="issue-search-icon"
                                      alt="Aoi search"/></InputGroup.Text>
                                  </InputGroup>
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
                            <DatePicker showIcon selected={startDate} onChange={(date) => setStartDate(date)} />
                          </Dropdown.Item>
                          <div className="mob-filters-btns-blk">
                            <Button type="submit" className='aoi-primary-btn full-btn'>Apply</Button>
                            <Button type="submit" className='aoi-secondary-btn full-btn'>Clear</Button>
                          </div>  
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                  
                   {/* Filters block */} 
                   <div className='issues-filter-blk pt-2 pb-2 d-flex aoi-gap-1 hide-on-mobile'>
                    {/* <div className='filter-item-blk d-flex font-size14'>
                      <label className='font-weight-500'>Status:</label>
                      <Form.Select aria-label="Default select example" className='filter-select' >
                        <option>All</option>
                        <option value="1" selected>Open</option>
                        <option value="2">Closed</option>
                        <option value="3">My Posts</option>
                      </Form.Select>
                    </div> */}

                    <div className='status-filter-item-blk d-flex font-size14'>
                      <label className='font-weight-500'>Status:</label>
                      <NavDropdown autoClose="outside" title="All" id="basic-nav-dropdown" className='loc-filter-dropdown ps-2'>
                        <NavDropdown.Item className=''>All</NavDropdown.Item>
                        <NavDropdown.Item className=''>Open</NavDropdown.Item>
                        <NavDropdown.Item className=''>Closed</NavDropdown.Item>
                        <NavDropdown.Item className=''>My Posts</NavDropdown.Item>
                      </NavDropdown>
                    </div>

                    <div className='filter-item-blk d-flex font-size14'>
                      <label className='font-weight-500'>Location:</label>
                      <NavDropdown autoClose="outside" title="All" id="basic-nav-dropdown" className='loc-filter-dropdown ps-2'>
                        <NavDropdown.Item className='issue-search-blk filter-input-blk'>
                        <InputGroup className="">
                            
                            <Form.Control
                              placeholder="Search…"
                              aria-label="Search…"
                              aria-describedby="basic-addon1"
                            />
                            <InputGroup.Text id="basic-addon1"><img
                              src="./LocationPinIcon.svg"
                              className="issue-search-icon"
                              alt="Aoi search"
                            /></InputGroup.Text>
                          </InputGroup>
                        
                        </NavDropdown.Item>
                        
                      </NavDropdown>
                    </div>
                    <div className='filter-item-blk d-flex font-size14'>
                      <label className='font-weight-500'>Area:</label>
                      <NavDropdown autoClose="outside" title="All" id="basic-nav-dropdown" className='loc-filter-dropdown ps-2'>
                        <NavDropdown.Item className='issue-search-blk filter-input-blk'>
                        <InputGroup className="">
                            
                            <Form.Control
                              placeholder="Search…"
                              aria-label="Search…"
                              aria-describedby="basic-addon1"
                            />
                            <InputGroup.Text id="basic-addon1"><img
                              src="./LocationPinIcon.svg"
                              className="issue-search-icon"
                              alt="Aoi search"
                            /></InputGroup.Text>
                          </InputGroup>
                        </NavDropdown.Item>
                      </NavDropdown>
                    </div>
                    <div className='filter-item-blk datepicker-filter-blk d-flex font-size14'>
                      <label className='font-weight-500'>Date:</label>
                      <NavDropdown autoClose="outside" title="All" id="basic-nav-dropdown" className='loc-filter-dropdown ps-2'>
                        <NavDropdown.Item className='datepicker-input-blk d-flex'>
                          <Form.Label className='font-size14 black-text'>Start Date</Form.Label>
                          <DatePicker showIcon selected={startDate} onChange={(date) => setStartDate(date)} />
                        </NavDropdown.Item>
                        <NavDropdown.Item className='datepicker-input-blk d-flex'>
                          <Form.Label className='font-size14 black-text'>End Date</Form.Label> 
                          <DatePicker showIcon selected={startDate} onChange={(date) => setStartDate(date)} />
                        </NavDropdown.Item>
                      </NavDropdown>
                    </div>
                  </div>

                  {/* Issues card */} 
                  <div className='issues-cards-list-blk d-flex flex-column aoi-gap-1'>
                    {issues.map(issue=> (
                      <div className='news-card issue-info-card'>
                            <div className='d-flex aoi-gap-1 p-3' onClick={gotoDetails}>
                              <div className='left-issue-card-info-blk'>
                                <h3 className='news-title'>{issue.title}</h3>
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
                                <div className='right-card-actions'>
                                <Button variant="link" className='txt-btn'>Acknowledge</Button>
                                </div>
                            </div>
                      </div> ))}
                  </div>

                </div>

                <div className='right-news-slider-main-blk d-flex flex-column aoi-gap-1'>
                     <div className='news-img-slider-blk'>
                      <Carousel>
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
                      <Carousel>
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