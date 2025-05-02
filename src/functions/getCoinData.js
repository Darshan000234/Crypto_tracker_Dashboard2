import axios from "axios";

const coinDataCache = {};
const maxCachedCoins = 5;
const cacheExpiryTime = 30000; // 30 seconds

export const getCoinData = async (id) => {
  const now = Date.now();
  const normalizedId = id.toLowerCase(); // Normalize the id to lowercase for comparison

  // Step 1: Check localStorage for fresh data
  const localData = localStorage.getItem(`coinData_${normalizedId}`);
  const localTime = localStorage.getItem(`coinDataTime_${normalizedId}`);

  if (localData && localTime && (now - parseInt(localTime) < cacheExpiryTime)) {
    console.log(`✅ Using fresh localStorage data for ${normalizedId}`);
    return JSON.parse(localData);
  }

  // Step 2: Check in-memory cache for fresh data
  if (coinDataCache[normalizedId] && (now - coinDataCache[normalizedId].lastFetchTime < cacheExpiryTime)) {
    console.log(`✅ Using fresh in-memory cache data for ${normalizedId}`);
    return coinDataCache[normalizedId].data;
  }

  // Step 3: Check if similar coin data exists (first part of the id matches)
  const similarCoinId = Object.keys(coinDataCache).find((key) => {
    return key.toLowerCase().startsWith(normalizedId.split("-")[0]);
  });

  if (similarCoinId) {
    console.log(`✅ Found similar coin with ID ${similarCoinId}. Returning cached data.`);
    return coinDataCache[similarCoinId].data;
  }

  // Step 4: Look for the coin in the static localStorage data array (for example, for "chainlink")
  const staticCoinData = JSON.parse(localStorage.getItem('coinsData'));
  if (staticCoinData) {
    const staticCoin = staticCoinData.find(coin => coin.id.toLowerCase() === normalizedId);
    if (staticCoin) {
      console.log(`✅ Found static coin data for ${normalizedId} in localStorage.`);
      return staticCoin;
    }
  }

  // Step 5: Fetch fresh data from API if neither localStorage nor in-memory data is fresh
  try {
    console.log(`🔄 Fetching fresh data for ${id} from API...`);
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${normalizedId}`
    );

    // Before saving new data, remove the previous data from localStorage if exists
    localStorage.removeItem(`coinData_${normalizedId}`);
    localStorage.removeItem(`coinDataTime_${normalizedId}`);

    // Save new data to in-memory cache
    coinDataCache[normalizedId] = {
      data: response.data,
      lastFetchTime: now,
    };

    // Save new data to localStorage
    localStorage.setItem(`coinData_${normalizedId}`, JSON.stringify(response.data));
    localStorage.setItem(`coinDataTime_${normalizedId}`, now.toString());

    console.log(`✅ Fresh data fetched and updated localStorage for ${normalizedId}`);
    return response.data;
  } catch (error) {
    console.error(`❌ Error fetching data for ${id}:`, error);

    // Fallback to static coin data if available
    if (staticCoinData) {
      const staticCoin = staticCoinData.find(coin => coin.id.toLowerCase() === normalizedId);
      if (staticCoin) {
        console.log(`⚡ Using static localStorage data for ${normalizedId} as backup`);
        return staticCoin;
      }
    }

    // Fallback to localStorage or in-memory cache if data fetch fails
    if (localData) {
      console.log(`⚡ Using expired localStorage data for ${normalizedId} as backup`);
      return JSON.parse(localData);
    } else if (coinDataCache[normalizedId]) {
      console.log(`⚡ Using expired in-memory data for ${normalizedId} as backup`);
      return coinDataCache[normalizedId].data;
    } else {
      console.log(`🚨 Coin ${normalizedId} not found in both localStorage and in-memory cache`);
      return null;
    }
  }
};
