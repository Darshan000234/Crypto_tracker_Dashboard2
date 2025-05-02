import React, { useState } from 'react';
import "./style.css";

const CoinInfo = ({ heading, desc }) => {
  const [flag, Setflag] = useState(false);
  
  // Log to check what 'desc' is being passed
  console.log('desc value:', desc);

  // Check if desc is defined and is a string
  const validDesc = desc && typeof desc === 'string' ? desc : 'No description available';

  const shortdesc = validDesc.slice(0, 200) + " <br/><span style='color:var(--grey)'> Read More...</span>";
  const longdesc = validDesc + " <br/><span style='color:var(--grey)'> Read Less...</span>";

  return (
    <div className='grey-wrapper'>
      <h2 className='coin-info-heading'>{heading}</h2>
      {validDesc.length > 200 ? (
        <p
          onClick={() => Setflag(!flag)}
          className='coin-info-desc'
          dangerouslySetInnerHTML={{ __html: !flag ? shortdesc : longdesc }}
        />
      ) : (
        <p className='coin-info-desc' dangerouslySetInnerHTML={{ __html: validDesc }} />
      )}
    </div>
  );
};


export default CoinInfo;
