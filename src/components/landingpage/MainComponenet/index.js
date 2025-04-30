import React from 'react'
import "./style.css"
import Button from '../../common/Button'
import iphone from '../../../assets/iphone.png'
import gradient from '../../../assets/gradient.png'
import { motion } from 'framer-motion'
import { RWebShare } from "react-web-share";
import { toast } from "react-toastify";
const MainComponent = () => {
  return (
    <div className='flex-info'>
      <div className='left-component'>
        <motion.h1 className='track-crypto-heading'
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >Track Crypto</motion.h1>
        <motion.h1 className='real-time-heading'
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >Real Time.</motion.h1>
        <p className='info-text'>Track crypto through a public api in real time. Visit the dashboard to do so!</p>
        <motion.div
          className="btn-flex"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.25, duration: 0.75 }}
        >
          <a href="/dashboard">
            <Button text={"Dashboard"} />
          </a>
          <RWebShare
            data={{
              text: "CryptoDashboard made by Avi Vashishta using React JS.",
              url: "https://crypto-dashboard-jan.netlify.app",
              title: "CryptoTracker.",
            }}
            onClick={() => toast.info("App Shared!")}
          >
            <Button text={"Share App"} outlined={true} />
          </RWebShare>
        </motion.div>
      </div>
      <div className='phone-container'>
        <motion.img src={iphone} className='iphone'
          initial={{ x: -20 }}
          animate={{ y: 20 }}
          transition={{ type: 'smooth', duration: 2, repeatType: 'mirror', repeat: Infinity }}
        />
        <img src={gradient} className='gradient' />
      </div>
    </div>
  )
}

export default MainComponent;
