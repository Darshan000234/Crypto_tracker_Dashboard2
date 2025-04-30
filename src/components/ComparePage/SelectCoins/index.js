import React, { useEffect, useState } from 'react'
import { get100Coin } from '../../../functions/get100Coin';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import "./style.css";
const SelectCoins = ({crypto1,crypto2,handleCoinChange}) => {
   
    const [Allcoins,setAllcoins] = useState([])      
    const styles = {
        height: "2.5rem",
        color: "var(--white)",
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--white)",
        },
        "& .MuiSvgIcon-root": {
            color: "var(--white)",
        },
        "&:hover": {
            "&& fieldset": {
                borderColor: "#3a80e9",
            },
        },
    };

    useEffect(() => {
        getData();
    }, [])
    async function getData() {
        const mycoin = await get100Coin();
        console.log(mycoin);
        setAllcoins(mycoin);
    }
    return (
        <div className='coins-flex'>
            <p>Crypto 1</p>
            <Select
                sx={styles}
                value={crypto1}
                label="Crypto 1"
                onChange={(e)=>handleCoinChange(e,false)}
            >
                {Allcoins.filter((item)=>item.id!=crypto2).map((coin,i) => (
                    <MenuItem value={coin.id} key={i}>{coin.name}</MenuItem>
                ))}
            </Select>
            <p>Crypto 2</p>
            <Select
                sx={styles}
                value={crypto2}
                label="Crypto 2"
                onChange={(e)=>handleCoinChange(e,true)}
            >
                {Allcoins.filter((item)=>item.id!=crypto1).map((coin,i) => (
                    <MenuItem value={coin.id} key={i}>{coin.name}</MenuItem>
                ))}
            </Select>
        </div>
    )
}

export default SelectCoins
