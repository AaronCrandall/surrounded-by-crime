import React from 'react';
import PropTypes from 'prop-types';
//forms and backend checking for logging in

const LogIn = () => (
<main>
<h1 class="h1">Log In: </h1>
<form action="#" method = 'POST'>
    
    <div class="inputBox">
        <input type="email" name="email" id="email" placeholder="Email" required></input>
    </div>
    
    <div class="inputBox">
        <input type="password" name="password" id="password" placeholder="Password" required></input>
    </div>
    
    <div class="btn2 inputBox">
        <input type="submit" name="submit" id ="submit" value="Log In"></input>
    </div>

</form>
</main>
);

LogIn.propTypes = {};

LogIn.defaultProps = {};

export default LogIn;
