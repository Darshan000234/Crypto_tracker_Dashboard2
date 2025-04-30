import React from 'react'
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import "./style.css";
const Backtotop = () => {
    let mybutton = document.getElementById("myBtn");

    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function() {
        scrollFunction()
    };

    function scrollFunction() {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            mybutton.style.display = "flex";
        } else {
            mybutton.style.display = "none";
        }
    }

    // When the user clicks on the button, scroll to the top of the document
    function topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
  return (
    <div className='back-to-top-btn' id="myBtn" onClick={() => topFunction()}>
      <ArrowUpwardRoundedIcon style={{ color : "var(--blue)" }}/>
    </div>
  )
}

export default Backtotop
