import React from 'react'
import CommentShow from '../Comment/comment'
import Blog from '../../CustomClass/Blog'
import Comment from '../../CustomClass/Comment'

export default function Report(blog) {
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
  return (
    <div class="report">

      <div class='container'>
        <div class="post">
          <h1>{blog1.title}</h1>
          <div class="post__user">
            <strong class="post__username">{blog1.authorF} {blog1.authorL}</strong>
            <span class="post__date"> {blog1.date} {blog1.time}</span>
            <h6>Severity: {blog1.severity}</h6>
           </div>
          <div class="post__body">{blog1.text}</div>
          <form>
            <button action="/" class='commentButton'>Add a Comment</button>
          </form>
        </div>

            {/*not sure if this mapping is correct, can troubleshoot it later, still need to loop through all possible comment trees*/}
        {/*<div>
        {commentDisplay(blog1.comments)}
        {comments1.map((data, index) => {
          return(
            <CommentShow key={index} {...data}/>
          )
        })}
      </div>*/}

      <div>
        {commentDisplay(blog1.comments)}
        {comments1.map(comment => {
          return(
              <div class="dialogbox">
                <div class="body">
                  <span class="tip tip-up"></span>
                  <div class="message">
                    <strong class="name">{comment.authorF} {comment.authorL}</strong>
                    <span class="post__date"> {comment.date} {comment.time}</span>
                    <div>
                      {comment.text}
                    </div>
                    <div class="a">
                    <form>
                    <button action="/" class='replyButton'>Reply</button>
                  </form>
                  </div>
                  </div>
                </div>
              </div>
          )
        })}
      </div>

      </div>
    </div>
  )
}
