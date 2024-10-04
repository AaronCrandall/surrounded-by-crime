import React from 'react'
import comment from '../Comment/comment'
import Blog from '../../CustomClass/Blog'
import Comment from '../../CustomClass/Comment'

export default function Report(blog) {


  return (
    <div>
      <div className='blogstuff'>
        <h1>{blog.title()}</h1>
        <h3>{blog.getAuthorF()}" "{blog.getAutherL()}</h3>
        <h5>{blog.getDate()} " " {blog.getTime()}</h5>
        <h6>{blog.getSeverity()}</h6>
        <p>{blog.getText()}</p>
      </div>
      {/*not sure if this mapping is correct, can troubleshoot it later, still need to loop through all possible comment trees*/}
      <div className='comments'>
        {blog.getcomments().map((comment, index) => (
          <Comment key={index} {...comment} />
        ))}
      </div>
    </div>
  )
}
