import React from 'react';
import PropTypes from 'prop-types';
//lets talk about our app here
//show a for show report
const HomePage = () => (
   <body>
      <main>
         <div class="row">
            <div class="column left container-content2"> 
            <img src='https://cdn-icons-png.flaticon.com/512/7902/7902313.png' alt="Girl in a jacket" width="500" height="600"></img>
               </div>
            <div class="column middle">
            <div className='container-content'>
            <h1>
            Welcome to Surrounded By Crime
            Please Log in or create a new account
            </h1>
            <p>Have you ever felt that the media and police don't do enough to inform communities about crime? Have you ever wished to report a crime, not to the police, 
               but to everyone you care about? Wish there was a better way to keep yourself up to date on crime specific to your area? With “Surrounded by Crime”, now there is! 
               We believe that modern news outlets and formats are outdated.  Most news can no longer keep up with social media.  People are becoming less and less aware of the 
               crime that goes on around them due to news outlets becoming outdated.  Our project aims to keep people informed about crime and the world around them.  We plan to 
               do this by combining the power and shareability of social media with crime reporting. Surrounded by Crime is a revolutionary crime reporting, news outlet, and social 
               media all in one.  Users will be able to share location, photos, and details of crimes they witness in their community.  Not only will users be able to share about 
               crime, they will be able to see any crime that is reported in their area.  Users will also be able to comment on reported crime, sharing updates or their own first 
               hand accounts. With Surrounded by Crime you and your community will come together to keep eachother safe!
            </p>
         </div>
            </div>
            <div class="column right container-content">
            <img src='https://pngimg.com/d/thief_PNG47.png' alt="Girl in a jacket" width="500" height="600"></img>

            </div>
         </div>

      </main>
   </body>
);

HomePage.propTypes = {};

HomePage.defaultProps = {};

export default HomePage;