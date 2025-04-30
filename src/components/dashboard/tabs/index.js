import React from 'react';
import { useState } from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { createTheme, ThemeProvider } from '@mui/material';
import "./style.css"
import Grid from '../grid';
import List from '../list';

export default function TabsComponent({ coins }) {
  const [value, setValue] = useState("grid");

  const handleChange = (event, newValue) => {
    setValue(newValue.toLowerCase()); // Ensure case consistency
  };

  const style = {
    color: "var(--white)",
    "& .Mui-selected": {
      color: "var(--blue) !important",
    },
    fontFamily: "Inter,sans-serif",
    fontWeight: 600,
    textTransform: "capitalize",
  };

  const theme = createTheme({ 
    palette: { 
      primary: { main: "#3a80e9" },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <TabContext value={value}>
        <div>
          <TabList onChange={handleChange} variant="fullWidth" indicatorColor="primary" textColor="primary">
            <Tab label="Grid" value="grid" sx={style} />
            <Tab label="List" value="list" sx={style} />
          </TabList>
        </div>
        <TabPanel value="grid">
          <div className="grid-flex">
            {coins.map((coin,i) => (
              <Grid coin={coin} key={i}/>
            ))}
          </div>
        </TabPanel>
        <TabPanel value="list">
          <table className='list-table'>
            {coins.map((item, i) => (
              <List coin={item} key={i} />
            ))}
          </table>
        </TabPanel>
      </TabContext>
    </ThemeProvider>
  );
}

