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
    <div>
      <div className='blogstuff'>
        <h1>{blog1.title}</h1>
        <h3>{blog1.authorF} {blog1.authorL}</h3>
        <h5>{blog1.date} {blog1.time}</h5>
        <h6>{blog1.severity}</h6>
        <p>{blog1.text}</p>
      </div>
      {/*not sure if this mapping is correct, can troubleshoot it later, still need to loop through all possible comment trees*/}
      <div className='comments'>
        {commentDisplay(blog1.comments)}
        {comments1.map((data, index) => {
          return(
            <CommentShow key={index} {...data}/>
          )
        })}
      </div>
    </div>
  )
}
