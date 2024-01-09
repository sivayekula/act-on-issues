import 'bootstrap/dist/css/bootstrap.min.css';
import jwt from 'jwt-decode';
import React, { useEffect } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "yet-another-react-lightbox/styles.css";
import './App.css';
import { fetchCategories, setUserData } from './app/reducers/userSlice';
import DetailsScreen from './components/DetailsScreen';
import Home from './components/Home';
import Profile from './components/Profile'; 
import MyIssues from './components/MyIssues';

export default function App() {
  const dispatch = useDispatch()

  const authToken = localStorage.getItem("token")
  useEffect(()=>{
    if(authToken){
      const userData = jwt(authToken)
      dispatch(setUserData(userData))
    }
    dispatch(fetchCategories())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[authToken])

  const handleIdle = () => {
    // Handle actions when the user is idle (e.g., log out)
    console.log('User is idle. Implement your logic here.');
  };
  
  return (
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:issueId" element={<DetailsScreen />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/myissues" element={<MyIssues />} />
      </Routes>
    </BrowserRouter>
  );
}
 
 
