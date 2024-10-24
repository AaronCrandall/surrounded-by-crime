import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import CommentShow from '../Comment/comment'
import Blog from '../../CustomClass/Blog'
import Comment from '../../CustomClass/Comment'
import User from '../../CustomClass/User'

export default function Report(blog) {
  const params = useParams();
  const [commenting, setCommenting] = useState(false);
  const [commentToDisplay, setcommentToDisplay] = useState();
  const [commentingComment, setCommentingComment] = useState(false);
  const user = new User("Aaron", "Crandall", 0, 123, 'acranda1@uncc.edu', 10);
  const [currentBlog, setCurrentBlog] = useState(new Blog());

  useEffect(() => {
    async function getBlog() {
      const blogId = params.reportid.toString();
      const response = await fetch(`http://localhost:5050/crime/blog/${blogId}`);
      if (!response.ok) {
        const message = "Error: " + response.statusText;
        return;
      }
      const blogData = await response.json();
      let blog1 = new Blog(blogData.title, blogData.authorL, blogData.authorF, blogData.text, blogData.date, blogData.time, blogData.id, blogData.location, blogData.severity, 0);
      blog1.objectID = blogData._id;
      setCurrentBlog(blog1);
    }
    getBlog();
    return;
  }, [params.reportid]);
  
  var comment1 = new Comment("This comment should be first",0,"Kelyn","Crandall",
    "date","time")
  var comment2 = new Comment("This comment should be last",1,"Vivian","Crandall",
    "date","time")
  var comment3 = new Comment("This comment should be second",2,"Vivian","Crandall",
    "date","time")
  var comment4 = new Comment("This comment should be third",3,"Aaron","Crandall",
    "date","time")
  var comments1 = [];

  comment3.addComment(comment4);
  comment1.addComment(comment3);
  // blog1.addComment(comment1);
  // blog1.addComment(comment2);
  const [comment_new, setComments_new] = useState([]);
  //var blog1 = new Blog();
  //blog1 = blog;

  function setsupdisplay(data){
    commentDisplay(data);
    console.log(comments1);
    setComments_new([comments1]);
  }

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
    console.log(comments1);
  }

  function displayWhileCommenting(index){
    setCommentingComment(true);
    setcommentToDisplay(comments1[index]);
  }

  async function updateComments(blog) {
    let response;
    try {
      response = await fetch(`http://localhost:5050/crime/new-comment`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blog),
      });
    } catch(error) {
      console.error("Error updating comments");
    }
  }

  function makeComment(owner){
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

    var comment_add = new Comment(formData.get("text"),4,user.nameF,user.nameL,fulldate,currentTime,user.id);
    owner.addComment(comment_add);
    setsupdisplay(currentBlog);
    console.log(owner);
    console.log(comment_add);
    //update component
    //post form to database

    updateComments(owner);

    setCommentingComment(false);
    setCommenting(false);
  }

  //setsupdisplay(blog1.comments);
  return (
    <div class='report'>
      <div class='container'>
        <div class="post">
          <h1>{blog1.title}</h1>
          <div class="post__user">
            <strong class="post__username">{blog1.authorF} {blog1.authorL}</strong>
            <span class="post__date"> {blog1.date} {blog1.time}</span>
            <h6>Severity: {blog1.severity}</h6>
           </div>
          <div class="post__body">{blog1.text}</div>
        </div>
        </div>
      {!commenting && !commentingComment &&
      <div>
        <button onClick={() => setCommenting(true)}>New Comment</button>
      </div>}
      {commenting &&
      <div>
        <h2>New Comment</h2>
          <form id="myForm" action='#' method = 'POST'>
            <div className="inputBox">
              <input type="text" name="text" id="text" placeholder="Comment" required></input>
            </div>
          </form>
          <button onClick={() => (makeComment(currentBlog))}>Submit</button>
      </div>}
      {!commenting && !commentingComment &&
      <div className='comments'>
        {comment_new.map((data, index) => {
          return(
            <div className='individual_comment'>
              <CommentShow key={index} {...data}/>
              <button onClick={()=> displayWhileCommenting(index)}>New Comment</button>
            </div>
          )
        })}
      </div>}
      {!commenting && commentingComment && 
      <div>
        <CommentShow {...commentToDisplay}/>
        <h2>New Comment</h2>
          <form id="myForm" action='#' method = 'POST'>
            <div className="inputBox">
              <input type="text" name="text" id="text" placeholder="Comment" required></input>
            </div>
          </form>
          <button onClick={() => (makeComment(commentToDisplay))}>Submit</button>
      </div>}
    </div>
  )
}
