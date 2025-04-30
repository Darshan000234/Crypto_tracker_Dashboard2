import axios from "axios";

let cachedData = null;
let lastFetchTime = 0;

export const get100Coin = async () => {
  const now = Date.now();

  const localData = localStorage.getItem("coinsData");
  const localTime = localStorage.getItem("coinsDataTime");

  if (localData && localTime && (now - parseInt(localTime) < 30000)) {
    console.log("✅ Using fresh localStorage data");
    return JSON.parse(localData);
  }

  if (cachedData && now - lastFetchTime < 30000) {
    console.log("✅ Using fresh in-memory data");
    return cachedData;
  }

  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 100,
          page: 1,
          sparkline: false,
        },
      }
    );

    cachedData = response.data;
    lastFetchTime = now;

    // ✅ Delete old localStorage
    localStorage.removeItem("coinsData");
    localStorage.removeItem("coinsDataTime");

    // ✅ Save new localStorage
    localStorage.setItem("coinsData", JSON.stringify(response.data));
    localStorage.setItem("coinsDataTime", now.toString());

    console.log("✅ Fresh data fetched and updated localStorage");
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching 100 coins:", error);

    if (localData) {
      console.log("⚡ Using expired localStorage data as backup");
      return JSON.parse(localData);
    } else if (cachedData) {
      console.log("⚡ Using expired in-memory data as backup");
      return cachedData;
    } else {
      console.log("🚨 No data available");
      return [];
    }
  }
};
