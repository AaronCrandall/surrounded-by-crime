import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import ReportPreview from '../../components/ReportPreview/ReportPreview'
import Blog from '../../CustomClass/Blog'
import User from '../../CustomClass/User'
import getUserData from '../../authUser';
import addPreferences from '../../addPrefs';
import getUserLatLong from '../../getCoords';

//make a list of reports than give each report its own report preview
export default function UserPage() {
  const [refresh, setRefresh] = useState(false);
  const [isfiltered, setIsFiltered] = useState(false);
  const [filteredArray, setFilteredArray] = useState([]);
  const [preferences, setPreferences] = useState(false);
  const [filters, setFilters] = useState({
    distance: "5",
    time: "1"
  });
  const [reporting, setReporting] = useState(false);
  const [reportArray, setReportArray] = useState([]);
  const [userData, setUserData] = useState({
    user: "",
    userFirst: "",
    userLast: "",//adding distance preference and time preference to our user data
  });
  const navigate = useNavigate();

  // Get all blogs
  useEffect(() => {
    async function getBlogs() {
      if (userData.time) {
        const response = await fetch(`http://localhost:5050/crime/all-blogs`, {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            time: userData.time,
            distance: userData.distance,
            location: userData.location
          })
        });
        if (!response.ok) {
          const message = `Error: ${response.statusText}`;
          console.error(message);
          return;
        }
        const blogs = await response.json();
        setReportArray(blogs);
      } else {
        const response = await fetch(`http://localhost:5050/crime/all-blogs`, {method: "POST"});
        if (!response.ok) {
          const message = `Error: ${response.statusText}`;
          console.error(message);
          return;
        }
        const blogs = await response.json();
        setReportArray(blogs);
      }
    }
    const authData = getUserData();
    authData.then(function(result) {
      if (result) {
        if (result.time) {
          setUserData({
            user: result.user, 
            userFirst: result.userFirst, 
            userLast: result.userLast,
            distance: result.distance,
            time: result.time,
            location: result.location
          });
        } else {
          setUserData({
            user: result.user, 
            userFirst: result.userFirst, 
            userLast: result.userLast
          });
        }
      }
    });
    getBlogs();
    return;
  }, [reportArray.length, Object.keys(userData).length]);
  
  async function uploadBlog(blog) {
    const newBlog = blog;
    const response = await fetch("http://localhost:5050/crime/new-blog", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(blog)}
    )
  };
  function refresher(){
    let y = localStorage.getItem("reload");
    if(y == 1){
      localStorage.setItem("reload", 2);
      window.location.reload();
    }
  }
  function makeReport(){
    // var location = 0; //need to find out how to get location
    const date = new Date();
    let fulldate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    let currentTime = date.toLocaleTimeString();
    let myForm = document.getElementById("myForm")
    let formData = new FormData(myForm);
    formData.append("authorF", userData.userFirst);
    formData.append("authorL", userData.userLast);
    formData.append("date", fulldate);
    formData.append("time", currentTime);
    formData.append("authID", userData.user);
    // formData.append("location", location)

    let coordinates = {};
    const coordData = getUserLatLong();
    coordData.then(function(result) {
      if (result) {
        var blog_new = new Blog(formData.get("title"),userData.userLast,userData.userFirst,formData.get("text"),fulldate,currentTime,2,{latitude: result.latitude, longitude: result.longitude},formData.get("severity"),userData.user);
        //push to database\
        uploadBlog(blog_new);
        setReportArray([...reportArray, blog_new]);
      }
    });
    
    setReporting(false);
  }

  function newBlog(){
    setReporting(true);
  }

  function updatePreferences(value) {
    return setFilters((prev) => {
      return {...prev, ...value};
    });
  }

  //need to be able to grab the preferences from the drop down menus
  function settingPreferences(){
    const coordData = getUserLatLong();
    coordData.then(function(result) {
      if (result) {
        // {latitude: result.lat, longitude: result.long}
        //push to database\
        addPreferences(filters, result);
      }
    });
    setPreferences(false);
    //let timepref = dropdown
    //let distpref = dropdown
    //update server with new distance and time preferences.
  }
  //Filters through the reports based on what is typed in the search bar at the time of clicking the button
  function searchFilter(){
    const inputElement = document.getElementById("search");
    let count = 0;
    let text = inputElement.value;
    text = text.toUpperCase();
    const results = [];
    for(let i = 0; i < reportArray.length; i++){
      let string = reportArray[i].title.toUpperCase();
      let array = string.split("")
      for(let j = 0; j < text.length; j++){
        if(array[j] === text[j]){
          count++;
        }
      }
      if(count === text.length){
        results.push(reportArray[i]);
      }
      count = 0;
    }
    setFilteredArray(results);
    setIsFiltered(true);
  }
  //refresh();


  return (
    <div>
      {!refresh && <button onClick={refresher()} hidden></button>}
    {preferences && <div>
      <h1 class="h1"> Please, select your preferred distance:</h1>
      {/*drop down bar goes here for distance preferences in miles, options like 5,10,25,100??  */
      <div class="dropdown">
        <select class="option" id="distance" onChange={(e) => updatePreferences({distance: e.target.value})}>
          <option value="5">5 miles</option>
          <option value="10">10 miles</option>
          <option value="25">25 miles</option>
          <option value="100">100 miles</option>
        </select>
      </div>
      }
      <h1 class="h1">Please, select how old you would like the posts to be:</h1>
      {/*drop down bar goes here for distance preferences in miles, options like 5,10,25,100??  */
      <div class="dropdown">
      <select class="option" id="date" onChange={(e) => updatePreferences({time: e.target.value})}>
        <option value="1hour">1 hour</option>
        <option value="10">10 hours</option>
        <option value="24">1 day</option>
        <option value="168">1 week</option>
      </select>
    </div>
      }
      <div class="btn2 inputBox">
        <input onClick={()=> settingPreferences()} type="submit" name="setPreferences" id ="setPreferences" value="Submit"></input>
      </div>
      </div>}

    {!preferences && <div>
      <div>
        <div className='UserInfo'>
          <h1 class="h1">{userData.userFirst} {userData.userLast}</h1>
          <div class="btn2 inputBox">
          {!reporting && <input onClick={() => newBlog()}type="submit" name="newBlog" id ="newBlog" value="New Blog"></input>}
          </div>
        </div>
        <div class="btn22 inputBox">
          <input onClick={()=> setPreferences(true)} type="submit" name="preferences" id ="preferences" value="Set Preferences"></input>{/*This is the button to be able to adjust preferences*/}
        </div>
        <div className='search-container'>
          <form>
            <input id="search" type="text" placeholder="Search.." name="search"></input>
            <button type="button" onClick={() => searchFilter()}><i className="fa fa-search"></i></button>
          </form>
        </div>
        {!reporting && !isfiltered && <div className='ReportPreviews'>
          {/*make the report previews buttons to go to the report*/}
          {reportArray.map((data, index) => { return (
            <ReportPreview key={index} {...data}/>
          );})}
        </div>}
        {!reporting && isfiltered && <div className='ReportPreviews'>
          {/*make the report previews buttons to go to the report*/}
          {filteredArray.map((data, index) => { return (
            <ReportPreview key={index} {...data}/>
          );})}
        </div>}
        {reporting && 
        <div>
          <div class='container'>
          <div class="post">
            <form id="myForm" action='#' method = 'POST'>
            <h2 class="h1">New Report</h2>
              <div className="inputBox">
                <input type="text" name="title" id="title" placeholder="Title" required></input>
              </div>
              <div className="inputBox">
                <input type="text" name="text" id="text" placeholder="Report" required></input>
              </div>
              <div className="inputBox">
                <input type="number" name="severity" min="1" max="5" id="severity" placeholder="Severity 1-5" required></input>
              </div>
              <div class="btn2 inputBox">
                <input onClick={() => (makeReport())} type="submit" name="SubmitBlog" id ="SubmitBlog" value="Submit"></input>
              </div>
            </form>
            </div>
            </div>
        </div>}
      </div>
    </div>}
    </div>
  )
}
