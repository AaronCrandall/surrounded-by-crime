import React from 'react'
import Blog from '../../CustomClass/Blog'

export default function ReportPreview(prop) {
  var blog = new Blog();
  blog = prop;
  console.log(blog.authorF);
  return (
    <div>{/*This is where you would add the onclick effect. Takes you to the page that is the post and the comments on the post*/}
      <h3>{blog.title}</h3>
      <h4>{blog.authorF}" "{blog.AutherL}</h4>
      <h5>{blog.date} " " {blog.time}</h5>
      <h6>{blog.severity}</h6>
    </div>
  )
}
