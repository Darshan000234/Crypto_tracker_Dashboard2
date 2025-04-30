import React from 'react';
import {Link} from 'react-router-dom';
import SwipeableTemporaryDrawer from './drawer';
import "./style.css";
import Button from '../Button';
function Header() {
  return (
    <div className='navbar'>
      <h1 className='logo'>CryptoTracker <span style={{color:'var(--blue)'}}>.</span></h1>
      <div className='links'>
        <Link to="/"><p className='link'>Home</p></Link>
        <Link to="/compare"><p className='link'>Compare</p></Link>
        {/* <Link to="/watchlist"><p className='link'>Watchlist</p></Link> */}
        <Link to="/dashboard"><Button text={"Dashboard"}
            onClick={()=>console.log("btn checked")}/></Link>
      </div>
      <div className='mobile-drawer'>
        <SwipeableTemporaryDrawer/>
      </div>
    </div>
  )
}

export default Header
