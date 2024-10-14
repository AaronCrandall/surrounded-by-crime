import React, { useState } from 'react'
import CommentShow from '../Comment/comment'
import Blog from '../../CustomClass/Blog'
import Comment from '../../CustomClass/Comment'
import User from '../../CustomClass/User'

export default function Report(blog) {
  const [commenting, setCommenting] = useState(false);
  const [commentingComment, setCommentingComment] = useState(false);
  const user = new User("Aaron", "Crandall", 0, 123, '1@1.com', 10);
  var blog1 = new Blog("Stabbing","Crandall","Aaron","Someone was stabbed today at 3:30pm outside of my house on 1st street. The suspect was wearing",
    "oct 3 2024","3:30pm", 0, "1st street",4)
  var comment1 = new Comment("This comment should be first",0,"Kelyn","Crandall",
    "date","time")
  var comment2 = new Comment("This comment should be last",1,"Vivian","Crandall",
    "date","time")
  var comment3 = new Comment("This comment should be second",2,"Vivian","Crandall",
    "date","time")
  var comment4 = new Comment("This comment should be third",0,"Aaron","Crandall",
    "date","time")
    comment3.addComment(comment4);
    comment1.addComment(comment3);
    blog1.addComment(comment1);
    blog1.addComment(comment2);
  var comments1 = [];
  //var blog1 = new Blog();
  //blog1 = blog;
  function commentDisplay(data){
    if(data != null)
    {
      for(var i = 0; i < data.length; i++){
        comments1.push(data[i]);
        if(data[i].comments != null){
          commentDisplay(data[i].comments);
        }
      }
    }
  }
  function makeComment(owner){
    const date = new Date();
    let fulldate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    let currentTime = date.toLocaleTimeString();
    let myForm = document.getElementById("myForm")
    let formData = new FormData(myForm);
    formData.append("authorF", user.getnameF());
    formData.append("authorL", user.getnameL());
    formData.append("date", fulldate);
    formData.append("time", currentTime);
    formData.append("authID", user.getAuthID());
    //owner.addComment(comment from form)
    //post form to database
    setCommentingComment(false);
    setCommenting(false);
  }
  return (
    <div>
      <div className='blogstuff'>
        <h1>{blog1.title}</h1>
        <h3>{blog1.authorF} {blog1.authorL}</h3>
        <h5>{blog1.date} {blog1.time}</h5>
        <h6>{blog1.severity}</h6>
        <p>{blog1.text}</p>
      </div>
      <div>
        <button onClick={() => setCommenting(true)}>New Comment</button>
      </div>
      {commenting && 
      <div>
        <h2>New Comment</h2>
          <form id="myForm" action='#' method = 'POST'>
            <div className="inputBox">
              <input type="text" name="firstName" id="firstName" placeholder="First Name" required></input>
            </div>
          </form>
          <button onClick={makeComment(blog1)}>Submit</button>
      </div>}
      {!commenting &&
      <div className='comments'>
        {commentDisplay(blog1.comments)}
        {comments1.map((data, index) => {
          return(
            <div className='individual_comment'>
              <CommentShow key={index} {...data}/>
              <button onClick={()=> setCommentingComment(true)}>New Comment</button>
              {commentingComment && <div>
                <h2>New Comment</h2>
                <form id="myForm" action='#' method = 'POST'>
                  <div className="inputBox">
                    <input type="text" name="firstName" id="firstName" placeholder="First Name" required></input>
                  </div>
                </form>
                <button onClick={makeComment(data[index])}>Submit</button>
              </div>}
            </div>
          )
        })}
      </div>}
    </div>
  )
}
