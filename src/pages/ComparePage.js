import React, { useEffect, useState } from 'react';
import { debounce } from "lodash";

import Header from '../components/common/Header';
import SelectCoins from '../components/ComparePage/SelectCoins';
import SelectDays from '../components/coin/SelectDays';
import TogglePriceType from '../components/coin/PriceType';
import Loader from '../components/common/Loader';
import List from '../components/dashboard/list';
import LineChart from '../components/coin/LineChart';
import CoinInfo from '../components/coin/Coininfo';

import { getCoinData } from '../functions/getCoinData';
import { getCoinPrices } from '../functions/getCoinPrices';
import { coinObject } from '../functions/convertobject';
import { settingChartData } from '../functions/settingChartdata';

const ComparePage = () => {
  const [crypto1, setCrypto1] = useState('bitcoin');
  const [crypto2, setCrypto2] = useState('ethereum');
  const [crypto1Data, setCrypto1Data] = useState({});
  const [crypto2Data, setCrypto2Data] = useState({});
  const [days, setDays] = useState(30);
  const [priceType, setPriceType] = useState("prices");
  const [chartData, setChartData] = useState({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [crypto1, crypto2]);

  const fetchData = async () => {
    setLoading(true);
    const data1 = await getCoinData(crypto1);
    const data2 = await getCoinData(crypto2);
    if (data1) coinObject(data1, setCrypto1Data);
    if (data2) coinObject(data2, setCrypto2Data);

    const prices1 = await getCoinPrices(crypto1, days, priceType);
    const prices2 = await getCoinPrices(crypto2, days, priceType);
    if (prices1 && prices2) {
      settingChartData(setChartData, prices1, prices2);
    }
    setLoading(false);
  };

  const debouncedChangeDays = debounce(async (value) => {
    setLoading(true);
    const prices1 = await getCoinPrices(crypto1, value, priceType);
    const prices2 = await getCoinPrices(crypto2, value, priceType);
    if (prices1 && prices2) {
      settingChartData(setChartData, prices1, prices2);
    }
    setDays(value);
    setLoading(false);
  }, 500);

  const handleChangedays = (e) => {
    debouncedChangeDays(e.target.value);
  };

  const handlePriceTypeChange = async (e, newType) => {
    setLoading(true);
    const prices1 = await getCoinPrices(crypto1, days, newType);
    const prices2 = await getCoinPrices(crypto2, days, newType);
    if (prices1 && prices2) {
      settingChartData(setChartData, prices1, prices2);
    }
    setPriceType(newType);
    setLoading(false);
  };

  const handleCoinChange = (e, isCoin2) => {
    if (isCoin2) {
      setCrypto2(e.target.value);
    } else {
      setCrypto1(e.target.value);
    }
  };

  return (
    <div>
      <Header />
      {isLoading ? <Loader /> : (
        <>
          <div className='coins-days-flex'>
            <SelectCoins crypto1={crypto1} crypto2={crypto2} handleCoinChange={handleCoinChange} />
            <SelectDays days={days} handleChangedays={handleChangedays} noPTag={true} />
          </div>
          <div className='grey-wrapper' style={{ padding: "0rem 1rem" }}>
            <List coin={crypto1Data} />
          </div>
          <div className='grey-wrapper' style={{ padding: "0rem 1rem" }}>
            <List coin={crypto2Data} />
          </div>
          <div className='grey-wrapper'>
            <TogglePriceType PriceType={priceType} handlePriceTypeChange={handlePriceTypeChange} />
            <LineChart chartData={chartData} PriceType={priceType} multiAxis={true} />
          </div>
          <CoinInfo heading={crypto1Data.name} desc={crypto1Data.desc} />
          <CoinInfo heading={crypto2Data.name} desc={crypto2Data.desc} />
        </>
      )}
    </div>
  );
};

export default ComparePage;
