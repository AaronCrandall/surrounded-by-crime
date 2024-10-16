import React, {useState} from 'react'
import ReportPreview from '../../components/ReportPreview/ReportPreview'
import Blog from '../../CustomClass/Blog'
import User from '../../CustomClass/User'
import Comment from '../../CustomClass/Comment';

//make a list of reports than give each report its own report preview
export default function UserPage() {
  const [reporting, setReporting] = useState(false);
  var blogs = [];
  var user = new User("Aaron", "Crandall", 0, 123, "acranda1@uncc.edu")
  var blog1 = new Blog("Stabbing","Crandall","Aaron","Someone was stabbed today at 3:30pm outside of my house on 1st street. The suspect was wearing",
    "oct 3 2024","3:30pm", 0, "1st street",4)
  var blog2 = new Blog("Robbery","Crandall","Aaron","Someone Robbed my house on 1st street around 3:15pm. The suspect was wearing",
    "oct 3 2024","3:15pm", 1, "1st street",3)
  var comment1 = new Comment("I really think that you dont know what you are talking about!",0,"Kelyn","Crandall",
    "date","time")
  var comment2 = new Comment("I really think that you dont know what you are talking about!",1,"Vivian","Crandall",
    "date","time")
  var comment3 = new Comment("Oh no that sounds terrible, I also live on that street. What did they look like?",2,"Vivian","Crandall",
    "date","time")
  var comment4 = new Comment("They were wearing a white T-shirt and had blonde hair",0,"Aaron","Crandall",
    "date","time")
  blog1.addComment(comment1);
  blog1.addComment(comment2);
  comment3.addComment(comment4);
  blog2.addComment(comment3);
  blogs.push(blog1, blog2); 
  function makeReport(){
    var location = 0; //need to find out how to get location
    const date = new Date();
    let fulldate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    let currentTime = date.toLocaleTimeString();
    let myForm = document.getElementById("myForm")
    let formData = new FormData(myForm);
    formData.append("authorF", user.nameF);
    formData.append("authorL", user.nameL);
    formData.append("date", fulldate);
    formData.append("time", currentTime);
    formData.append("authID", user.id);
    formData.append("location", location)
    var blog_new = new Blog(formData.get("title"),user.nameF,user.nameF,formData.get("text"),fulldate,currentTime,2,location,formData.get("severity"),user.id);
    //push to database
    //reload databse
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
        <h1>{user.getnameF()} {user.getnameL()}</h1>
        {!reporting && <button onClick={() => newBlog()}>New Blog</button>}
      </div>
      <div className='search'>
        {/* move the searchbar here*/}
      </div>
      {!reporting && <div className='ReportPreviews'>
        {/*make the report previews buttons to go to the report*/}
        {blogs.map((data, index) => { return (
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
              {// need to do numbers 1-5 <input type="text" name="text" id="text" placeholder="Report" required></input>}
              }
            </div>
          </form>
          <button onClick={() => (makeReport())}>Submit</button>
      </div>}
    </div>
  )
}
