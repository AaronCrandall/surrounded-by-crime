import React from 'react'
import Blog from '../../CustomClass/Blog'

export default function ReportPreview(blog) {
  return (
    <div>
      <h3>{blog.getTitle()}</h3>
      <h4>{blog.getAuthorF()}" "{blog.getAutherL()}</h4>
      <h5>{blog.getDate()} " " {blog.getTime()}</h5>
      <h6>{blog.getSeverity()}</h6>
    </div>
  )
}
