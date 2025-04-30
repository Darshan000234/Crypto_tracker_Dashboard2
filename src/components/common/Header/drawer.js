import { useState } from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { Link } from 'react-router-dom';

export default function SwipeableTemporaryDrawer() {
  const[open, setOpen] =useState(false)
  
  return (
    <div>
        <Button onClick={()=> setOpen(true)}>
          <MenuRoundedIcon className='link'/>
        </Button>
        <SwipeableDrawer anchor={'right'} open={open} onClose={()=> setOpen(false)}>
         <div className='drawer-div'>
          <Link to="/"><p className='link'>Home</p></Link>
          <Link to="/compare"><p className='link'>Compare</p></Link>
          {/* <Link to="/watchlist"><p className='link'>Watchlist</p></Link> */}
          <Link to="/dashboard"><p className='link'>Dashboard</p></Link>
         </div>
        </SwipeableDrawer>
    </div>
  );
}
