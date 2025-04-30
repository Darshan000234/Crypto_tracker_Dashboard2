import axios from "axios";

const coinDataCache = {};
const maxCachedCoins = 5;

export const getCoinData = async (id) => {
  const now = Date.now();

  const localData = localStorage.getItem(`coinData_${id}`);
  const localTime = localStorage.getItem(`coinDataTime_${id}`);

  if (localData && localTime && (now - parseInt(localTime) < 30000)) {
    console.log(`✅ Using fresh localStorage data for ${id}`);
    return JSON.parse(localData);
  }

  if (coinDataCache[id] && (now - coinDataCache[id].lastFetchTime < 30000)) {
    console.log(`✅ Using fresh in-memory data for ${id}`);
    return coinDataCache[id].data;
  }

  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}`
    );

    coinDataCache[id] = {
      data: response.data,
      lastFetchTime: now,
    };

    if (Object.keys(coinDataCache).length > maxCachedCoins) {
      const oldestCoinKey = Object.keys(coinDataCache).reduce((oldest, key) => {
        return coinDataCache[key].lastFetchTime < coinDataCache[oldest].lastFetchTime
          ? key
          : oldest;
      }, Object.keys(coinDataCache)[0]);
      delete coinDataCache[oldestCoinKey];
      console.log(`⚡ Cache size exceeded, removed oldest coin data: ${oldestCoinKey}`);
    }

    // ✅ Delete old localStorage for this coin
    localStorage.removeItem(`coinData_${id}`);
    localStorage.removeItem(`coinDataTime_${id}`);

    // ✅ Save new localStorage
    localStorage.setItem(`coinData_${id}`, JSON.stringify(response.data));
    localStorage.setItem(`coinDataTime_${id}`, now.toString());

    console.log(`✅ Fresh data fetched and updated localStorage for ${id}`);
    return response.data;
  } catch (error) {
    console.error(`❌ Error fetching data for ${id}:`, error);

    if (localData) {
      console.log(`⚡ Using expired localStorage data for ${id} as backup`);
      return JSON.parse(localData);
    } else if (coinDataCache[id]) {
      console.log(`⚡ Using expired in-memory data for ${id} as backup`);
      return coinDataCache[id].data;
    } else {
      console.log(`🚨 Coin ${id} not found in both localStorage and in-memory cache`);
      return null;
    }
  }
};
