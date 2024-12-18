import React, { useState, useEffect } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import getUserData from '../../authUser';

export default function NavBar(){
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    user: "",
    userFirst: "",
    userLast: ""
  });
  const [userName, setUserName] = useState('')
  useEffect(() => {
    const authData = getUserData();
    authData.then(function(result) {
      if (result) {
        setUserData({
          user: result.user, userFirst: result.userFirst, userLast: result.userLast
        });
      }
    });
    return;
  }, [Object.keys(userData).length]);

  async function logOutUser() {
    localStorage.removeItem('jwt-token');
    setUserData([]);
  }

  return (
    <header>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
    <div className='header'>
    <a className="logo"><Link to="/"><img src='/logoTransparent.png' alt="logo"></img></Link></a>
    <div className='header-right'>
      { userData.user && 
      <a><Link to= '/user/1'>{userData.userFirst}'s page</Link> </a>
      }
      { !userData.user && 
      <a><Link to="/newaccount">Create New Account</Link></a>
      }
      { !userData.user && 
      <a><Link to="login">Login Here</Link></a>
      }
      { userData.user && 
      //<button onClick={() => (logOutUser())}>Log Out</button>
      <a><Link to="/" onClick={() => (logOutUser())}>Log Out</Link></a>
      }  
    </div>
  </div>
</header>
  );
}
