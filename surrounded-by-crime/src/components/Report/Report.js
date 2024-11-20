import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import CommentShow from '../Comment/comment'
import Blog from '../../CustomClass/Blog'
import Comment from '../../CustomClass/Comment'
import User from '../../CustomClass/User'
import getUserData from '../../authUser';
import getUserLatLong from '../../getCoords';

export default function Report(blog) {
  var comments1 = [];

  const history = window.history;
  const params = useParams();
  const [hookforcommments, setHookForComments] = useState([]);
  const [commenting, setCommenting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [commentToDisplay, setcommentToDisplay] = useState();
  const [commentingComment, setCommentingComment] = useState(false);
  const [userData, setUserData] = useState({
    user: "",
    userFirst: "",
    userLast: "",
    userCoords: {}
  });
  // const user = new User("Aaron", "Crandall", 0, 123, 'acranda1@uncc.edu', 10);
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
      let new_blog = new Blog(blogData.title, blogData.authorL, blogData.authorF, blogData.text, blogData.date, blogData.time, blogData.id, blogData.location, blogData.severity, 0);
      new_blog.objectID = blogData._id;
      new_blog.comments = blogData.comments;
      setCurrentBlog(new_blog);
      comments1 = [];
      commentOrdering(new_blog.comments);
      setHookForComments(comments1);
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
    getBlog();
    return;
  }, [params.reportid, Object.keys(userData).length]);

  function setsupdisplay(data){
    
  }

  function commentOrdering(data){
    if(data != null)
    {
      for(var i = 0; i < data.length; i++){
        comments1.push(data[i]);
        if(data[i].comments != null){
          commentOrdering(data[i].comments);
        }
      }
    }
  }

  function displayWhileCommenting(index){
    setCurrentIndex(index);
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

  async function testFilter() {
    
  }

  function makeComment(owner){
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

    var comment_add = new Comment(
      formData.get("text"),
      4,
      userData.userFirst,
      userData.userLast,
      fulldate,
      currentTime,
      userData.user
    );

    if (currentIndex !== null) {
      let commentToUpdate = hookforcommments[currentIndex];
      commentToUpdate.comments.push(comment_add);
      hookforcommments[currentIndex] = commentToUpdate;
      setHookForComments(hookforcommments);
      updateComments(currentBlog);
      setCurrentIndex(null);
      setCommentingComment(false);
      setCommenting(false);
      history.go()
    } else {
      owner.addComment(comment_add);
      updateComments(owner);
      setCommentingComment(false); //might not need this and the next line??
      setCommenting(false);
      history.go();
    }
  }

  //setsupdisplay(blog1.comments);
  return (
    <div class='report'>
      <div class='container'>
        <div class="post">
          <h1>{currentBlog.title}</h1>
          <div class="post__user">
            <strong class="post__username">{currentBlog.authorF} {currentBlog.authorL}</strong>
            <span class="post__date"> {currentBlog.date} {currentBlog.time}</span>
            <h6>Severity: {currentBlog.severity}</h6>
           </div>
          <div class="post__body">{currentBlog.text}</div>
          {!commenting && !commentingComment &&
            <div>
              <button class="commentButton" onClick={() => setCommenting(true)}>New Comment</button>
            </div>}
        </div>
        </div>
      
      {commenting &&
      <div>
          <form class="commentBox" id="myForm" action='' method = 'POST'>
          <h2 class="h1">New Comment</h2>
            <div className="inputBox">
              <input type="text" name="text" id="text" placeholder="Comment" required></input>
            </div>
          <button class="submit" onClick={() => (makeComment(currentBlog))}>Submit</button>
          </form>
      </div>}
      {!commenting && !commentingComment &&
      <div className='comments'>
        {hookforcommments.map((data, index) => {
          return(
            (
              <div class="dialogbox">
                <CommentShow key={index} {...data}/>
                <div class="body">
                  <span class="tip tip-up"></span>
                  <div class="message">
                     <strong class="name">{data.authorF} {data.authorL}</strong>
                      <span class="post__date"> {data.date} {data.time}</span>
                      <div>
                        {data.text}
                      </div>
                      <div class="a">
                      <form>
                        <button onClick={()=> displayWhileCommenting(index)} class='replyButton'>Reply</button>
                      </form>
                      </div>
                  </div>
                </div>
              </div>
            )
          )
        })}
      </div>}
      {!commenting && commentingComment && 
      <div>
          <form class="commentBox" id="myForm" action='' method = 'POST'>
          <h2 class="h1">Reply to a Comment</h2>
            <div className="inputBox">
              <input type="text" name="text" id="text" placeholder="Comment" required></input>
            </div>
            <button onClick={() => (makeComment(commentToDisplay))} class="submit">Submit</button>
          </form>
      </div>}
    </div>
  )
}