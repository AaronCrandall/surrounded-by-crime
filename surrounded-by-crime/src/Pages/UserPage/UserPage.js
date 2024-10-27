import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import ReportPreview from '../../components/ReportPreview/ReportPreview'
import Blog from '../../CustomClass/Blog'
import User from '../../CustomClass/User'
import getUserData from '../../authUser';

//make a list of reports than give each report its own report preview
export default function UserPage() {
  const [reporting, setReporting] = useState(false);
  // var user = new User("Aaron", "Crandall", 0, 123, "acranda1@uncc.edu")
  // const [reportArray, setReportArray] = useState([blog1, blog2]);
  const [reportArray, setReportArray] = useState([]);
  const [userData, setUserData] = useState({
    user: "",
    userFirst: "",
    userLast: ""
  });
  const navigate = useNavigate();

  // Get all blogs
  useEffect(() => {
    async function getBlogs() {
      const response = await fetch(`http://localhost:5050/crime/all-blogs`);
      if (!response.ok) {
        const message = `Error: ${response.statusText}`;
        console.error(message);
        return;
      }
      const blogs = await response.json();
      setReportArray(blogs);
    }
    const authData = getUserData();
    authData.then(function(result) {
      if (result) {
        setUserData({
          user: result.user, 
          userFirst: result.userFirst, 
          userLast: result.userLast
        });
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

  function makeReport(){
    var location = 0; //need to find out how to get location
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
    formData.append("location", location)
    var blog_new = new Blog(formData.get("title"),userData.userLast,userData.userFirst,formData.get("text"),fulldate,currentTime,2,location,formData.get("severity"),userData.user);
    //push to database\
    uploadBlog(blog_new);
    setReportArray([...reportArray, blog_new]);
    setReporting(false);
  }

  function newBlog(){
    setReporting(true);
  }

  //blog = code to fill blog in from database, gets blogs relevant to the user based on preferences
  //user = code to get user data

  return (
    <div>
      <div className='UserInfo'>
        <h1>{userData.userFirst} {userData.userLast}</h1>
        {!reporting && <button onClick={() => newBlog()}>New Blog</button>}
      </div>
      <div className='search'>
        {/* move the searchbar here*/}
      </div>
      {!reporting && <div className='ReportPreviews'>
        {/*make the report previews buttons to go to the report*/}
        {reportArray.map((data, index) => { return (
          <ReportPreview key={index} {...data}/>
        );})}
      </div>}
      {reporting && 
      <div>
        <h2>New Comment</h2>
          <form id="myForm" action='#' method = 'POST'>
            <div className="inputBox">
              <input type="text" name="title" id="title" placeholder="Title" required></input>
              <input type="text" name="text" id="text" placeholder="Report" required></input>
              <input type="number" name="severity" min="1" max="5" id="severity" placeholder="Severity 1-5" required></input>
            </div>
          </form>
          <button onClick={() => (makeReport())}>Submit</button>
      </div>}
    </div>
  )
}
