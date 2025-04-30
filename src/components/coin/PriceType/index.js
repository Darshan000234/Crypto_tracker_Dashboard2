import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState } from 'react';
import "./style.css";

export default function TogglePriceType({PriceType,handlePriceTypeChange}) {

  return (
    <div className='toggle-prices'>
      <ToggleButtonGroup
        value={PriceType}
        exclusive
        onChange={handlePriceTypeChange}
        sx={{
          "& .Mui-selected": {
            color: "var(--blue) !important",
          },
          borderColor: "var(--blue)",
          border: "unset !important",
          "& .MuiToggleButtonGroup-grouped": {
            border: "1px solid var(--blue)!important",
            borderColor: "unset",
            color: "var(--blue) !important ",
          },
          "& .MuiToggleButton-standard": {
            color: "var(--blue) !important",
          },
        }}
      >
        <ToggleButton value="prices" className='.toggle-btn'>
          Price
        </ToggleButton>
        <ToggleButton value="market_caps" className='.toggle-btn'>
          Market Cap
        </ToggleButton>
        <ToggleButton value="total_volumes" className='.toggle-btn'>
          Total Volume
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}
