import React from 'react'
import Comment from '../../CustomClass/Comment'

const comment = (props) => {
    
    return ( 
        <div>
            <h1>{props.getText()}</h1>
            <h3>{props.getAuthorF()}" "{props.getAutherL()}</h3>
            <h5>{props.getDate()} " " {props.getTime()}</h5>
            <p>{props.getText()}</p>
        </div>
     );
}
 
export default comment;