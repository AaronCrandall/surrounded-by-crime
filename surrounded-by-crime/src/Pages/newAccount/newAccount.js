import React from 'react'

//forms and logic to create and register a new account
export default function NewAccount() {
  return (
    <main>
    <h1 class="h1">Sign Up: </h1>
    <form className="text" action="#" method = 'POST'>

    <div className="inputBox">
            <input type="text" name="firstName" id="firstName" placeholder="First Name" required></input>
        </div>

        <div className="inputBox">
            <input type="text" name="lastName" id="lastName" placeholder="Last Name" required></input>
        </div>
        
        <div className="inputBox">
            <input type="email" name="email" id="email" placeholder="Email" required></input>
        </div>
        
        <div className="inputBox">
            <input type="password" name="password" id="password" placeholder="Password" required></input>
        </div>
        
        <div className="btn2 inputBox">
            <input type="submit" name="submit" id ="submit" value="Sign Up"></input>
        </div>
    </form>
</main>
  )
};