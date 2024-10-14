import React from 'react'
import Comment from '../../CustomClass/Comment'

const CommentShow = (props) => {
    var comment1 = new Comment();
    comment1 = props
    return ( 
        <div>
            <div>
                <h2>{comment1.authorF} {comment1.autherL}</h2>
                <h4>{comment1.date} {comment1.time}</h4>
                <p>{comment1.text}</p>
            </div>
            <div>
                <button>New Comment</button>
            </div>
        </div>
     );
}
 
export default CommentShow;