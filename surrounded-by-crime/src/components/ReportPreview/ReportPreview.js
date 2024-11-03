import React from 'react'
import Blog from '../../CustomClass/Blog'
import { useNavigate } from 'react-router-dom'

export default function ReportPreview(prop) {
  var blog = new Blog();
  blog = prop;
  const navigate = useNavigate();
  function redirect(id){
    navigate(`/report/${id}`);
  }
  return (
    <div class='container'>
    <div class="post">
      <h1>{blog.title}</h1>
      <div class="post__user">
        <strong class="post__username">{blog.authorF} {blog.authorL}</strong>
        <span class="post__date"> {blog.date} {blog.time}</span>
        <h6>Severity: {blog.severity}</h6>
     </div>
      <div class="post__body">{blog.text}</div>
        <div>
          <button class="commentButton" onClick={()=> redirect(blog._id)}>Go To Report</button>
        </div>
    </div>
  </div>
  )
}
