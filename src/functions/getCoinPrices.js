import axios from "axios";

export const getCoinPrices = async (id, days, PriceType) => {
  const now = Date.now();
  const key = `${id}_${days}_${PriceType}`;

  const localData = localStorage.getItem(`coinPrices_${key}`);
  const localTime = localStorage.getItem(`coinPricesTime_${key}`);

  if (localData && localTime && (now - parseInt(localTime) < 30000)) {
    console.log(`✅ Using fresh localStorage cached prices for ${key}`);
    return JSON.parse(localData);
  }

  try {
    console.log("Fetching price data for:", id);

    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart`,
      {
        params: {
          vs_currency: "usd",
          days: days,
          interval: "daily",
        },
      }
    );

    let result;
    if (PriceType === "market_caps") {
      result = response.data.market_caps;
    } else if (PriceType === "total_volumes") {
      result = response.data.total_volumes;
    } else {
      result = response.data.prices;
    }

    // ✅ Delete old localStorage
    localStorage.removeItem(`coinPrices_${key}`);
    localStorage.removeItem(`coinPricesTime_${key}`);

    // ✅ Save new localStorage
    localStorage.setItem(`coinPrices_${key}`, JSON.stringify(result));
    localStorage.setItem(`coinPricesTime_${key}`, now.toString());

    console.log(`✅ Fresh price data fetched and updated localStorage for ${key}`);
    return result;
  } catch (error) {
    console.error(`❌ Error fetching price data for ${id}:`, error);

    if (localData) {
      console.log(`⚡ Using expired localStorage data for ${key} as backup`);
      return JSON.parse(localData);
    } else {
      console.log(`🚨 No available data for ${key}`);
      return null;
    }
  }
};
