import React from 'react'
import ReportPreview from '../../components/ReportPreview/ReportPreview'
import Blog from '../../CustomClass/Blog'
import User from '../../CustomClass/User'
import Comment from '../../CustomClass/Comment';

//make a list of reports than give each report its own report preview
export default function UserPage() {
  var blogs = [];
  var user = new User("Aaron", "Crandall", 0, 123, "acranda1@uncc.edu")
  var blog1 = new Blog("Stabbing","Crandall","Aaron","Someone was stabbed today at 3:30pm outside of my house on 1st street. The suspect was wearing",
    "oct 3 2024","3:30pm", 0, "1st street",4)
  var blog2 = new Blog("Robbery","Crandall","Aaron","Someone Robbed my house on 1st street around 3:15pm. The suspect was wearing",
    "oct 3 2024","3:15pm", 1, "1st street",3)
  var comment1 = new Comment("I really think that you dont know what you are talking about!",0,"Kelyn","Crandall",
    "date","time")
  var comment2 = new Comment("I really think that you dont know what you are talking about!",1,"Vivian","Crandall",
    "date","time")
  var comment3 = new Comment("Oh no that sounds terrible, I also live on that street. What did they look like?",2,"Vivian","Crandall",
    "date","time")
  var comment4 = new Comment("They were wearing a white Tshirt and had blonde hair",0,"Aaron","Crandall",
    "date","time")
  blog1.addComment(comment1);
  blog1.addComment(comment2);
  comment3.addComment(comment4);
  blog2.addComment(comment3); 
  //blog = code to fill blog in from database, gets blogs relevant to the user based on preferences
  //user = code to get user data
  return (
    <div>
      <div className='UserInfo'>
        <h1>{user.getNameF()} ' ' {user.getnameL()}</h1>
      </div>
      <div className='search'>
        {/* move the searchbar here*/}
      </div>
      <div className='ReportPreviews'>
        {/*still need to test these mapping functions*/ /*make the report previews buttons to go to the report*/}
        {blogs.map((data, index) => (
          <ReportPreview key={index} {...data}/>
        ))}
      </div>
    </div>
  )
}
