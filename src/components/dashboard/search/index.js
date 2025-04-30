import React, { useState } from 'react'
import "./style.css"
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
const search = ({ search, handleChange }) => {
  return (
    <div className='search-flex'>
      <SearchRoundedIcon sx={{ color: "var(--grey)", fontSize: "1.2rem" }} />
      <input className="search-input" placeholder='search'
        type='text'
        value={search}
        onChange={(e) => handleChange(e)}
      />
    </div>
  )
}

export default search
