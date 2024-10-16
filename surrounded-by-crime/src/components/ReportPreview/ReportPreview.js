import React from 'react'
import Blog from '../../CustomClass/Blog'

export default function ReportPreview(prop) {
  var blog = new Blog();
  blog = prop;
  return (
    <div>{/*This is where you would add the onclick effect. Takes you to the page that is the post and the comments on the post*/}
      <h2>{blog.title}</h2>
      <h3>{blog.authorF} {blog.authorL}</h3>
      <h4>{blog.date} {blog.time}</h4>
      <h5>{blog.location}</h5>
      <h6>{blog.severity}</h6>
    </div>
  )
}
