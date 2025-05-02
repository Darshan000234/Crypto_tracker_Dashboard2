export const coinObject = (data, setCoin) => {
  console.log("Coin data:", data);

  const isAPIData = data.image?.large && data.description?.en && data.market_data;

  const desc = isAPIData ? data.description.en : data.desc;
  // console.log("Description used:", desc);  // Log the desc here

  setCoin({
    id: data.id,
    name: data.name,
    symbol: data.symbol,
    image: isAPIData ? data.image.large : data.image,
    desc: desc,  // Pass the desc directly
    price_change_percentage_24h: isAPIData
      ? data.market_data.price_change_percentage_24h
      : data.price_change_percentage_24h,
    total_volume: isAPIData
      ? data.market_data.total_volume.usd
      : data.total_volume,
    current_price: isAPIData
      ? data.market_data.current_price.usd
      : data.current_price,
    market_cap: isAPIData
      ? data.market_data.market_cap.usd
      : data.market_cap,
  });
};
