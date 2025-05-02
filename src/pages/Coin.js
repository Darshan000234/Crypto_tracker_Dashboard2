import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { debounce } from "lodash";

import Header from '../components/common/Header';
import Loader from '../components/common/Loader';
import List from '../components/dashboard/list';
import CoinInfo from '../components/coin/Coininfo';
import LineChart from '../components/coin/LineChart';
import SelectDays from '../components/coin/SelectDays';
import TogglePriceType from '../components/coin/PriceType';

import { getCoinData } from '../functions/getCoinData';
import { getCoinPrices } from '../functions/getCoinPrices';
import { coinObject } from '../functions/convertobject';
import { settingChartData } from '../functions/settingChartdata';

const Coin = () => {
  const { id } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [coinData, setCoinData] = useState();
  const [days, setDays] = useState(30);
  const [chartData, setChartData] = useState({});
  const [priceType, setPriceType] = useState('prices');

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  const fetchData = async () => {
    setLoading(true);
    const data = await getCoinData(id);
    if (data) {
      coinObject(data, setCoinData);
      const prices = await getCoinPrices(id, days, priceType);
      if (prices) {
        settingChartData(setChartData, prices);
      }
    }
    setLoading(false);
  };

  const debouncedChangeDays = debounce(async (value) => {
    setLoading(true);
    const prices = await getCoinPrices(id, value, priceType);
    if (prices) {
      settingChartData(setChartData, prices);
    }
    setDays(value);
    setLoading(false);
  }, 500);

  const handleChangedays = (e) => {
    debouncedChangeDays(e.target.value);
  };

  const handlePriceTypeChange = async (e, newType) => {
    setLoading(true);
    const prices = await getCoinPrices(id, days, newType);
    if (prices) {
      settingChartData(setChartData, prices);
    }
    setPriceType(newType);
    setLoading(false);
  };
  return (
    <div>
      <Header />
      {isLoading ? <Loader /> : (
        <>
          <div className='grey-wrapper' style={{ padding: "0rem 1rem" }}>
            <List coin={coinData} />
          </div>
          <div className='grey-wrapper'>
            <SelectDays days={days} handleChangedays={handleChangedays} />
            <TogglePriceType PriceType={priceType} handlePriceTypeChange={handlePriceTypeChange} />
            <LineChart chartData={chartData} PriceType={priceType} />
          </div>
          <CoinInfo heading={coinData.name} desc={coinData.desc} />
        </>
      )}
    </div>
  );
};
export default Coin;
