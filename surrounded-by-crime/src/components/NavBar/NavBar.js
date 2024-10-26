import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

export default function NavBar(){
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    async function getUserData() {
      if (localStorage.getItem('jwt-token') !== null) {
        const token = localStorage.getItem('jwt-token');
        await fetch("http://localhost:5050/crime/auth-user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'jwt-token': token
            }
        })
        .then((res) => res.json())
        .then((data) => {
            setUserData([data.user, data.userName]);
        })
        console.log(userData);
      }
    }
    getUserData();
    return;
  }, [userData.length]);

  async function logOutUser() {
    localStorage.removeItem('jwt-token');
    setUserData([]);
  }

  return (
      <header>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      <div className='header'>
        <a className="logo"><Link to="/"><img src='logoTransparent.png' alt="logo"></img></Link></a>
        <div className='header-right'>
          { userData.length > 0 && 
          <a><Link to= '/user/{user.id}'>{userData[1]}'s page</Link> </a>
          }
          <a><Link to="/newaccount">Create New Account</Link></a>
          { userData.length === 0 && 
          <a><Link to="login">Login Here</Link></a>
          }
          { userData.length > 0 && 
          <button onClick={() => (logOutUser())}>Log Out</button>
          }
          <div className="search-container">
            <form action="/">
              <input type="text" placeholder="Search.." name="search"></input>
              <button type="submit"><i className="fa fa-search"></i></button>
            </form>
          </div>
        </div>
      </div>
    </header>
  );
}
