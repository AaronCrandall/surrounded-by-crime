import React from 'react'
import { Link } from 'react-router-dom';

export default function NavBar(){
  return (
      <header>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      <div className='header'>
        <a className="logo"><Link to="/"><img src='logoTransparent.png' alt="logo"></img></Link></a>
        <div className='header-right'>
          <a><Link to= '/user/{user.id}'>user.name's page</Link> </a>
          <a><Link to="/newaccount">Create New Account</Link></a>
          <a><Link to="login">Login Here</Link></a>
          <a><Link to='/'>Log Out</Link></a>
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
