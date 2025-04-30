import React, { useState } from 'react'
import "./style.css";

const CoinInfo = ({heading,desc}) => {
  const[flag,Setflag] = useState(false);
  const shortdesc = desc.slice(0, 200) +  " <br/><span style='color:var(--grey)'> Read More...</span>";
  const longdesc = desc + " <br/><span style='color:var(--grey)'> Read Less...</span>";
  return (
    <div className='grey-wrapper'>
      <h2 className='coin-info-heading'>{heading}</h2>
      {desc.length > 200 ? <p 
        onClick={() => Setflag(!flag)}
        className='coin-info-desc' 
        dangerouslySetInnerHTML={{__html: !flag ? shortdesc : longdesc}}
      /> : <p className='coin-info-desc' dangerouslySetInnerHTML={{__html: desc}}/>}
    </div>
  )
}

export default CoinInfo
