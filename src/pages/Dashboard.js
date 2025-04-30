import React, { useEffect, useState } from 'react'
import Header from '../components/common/Header'
import TabsComponent from '../components/dashboard/tabs'
import Search from '../components/dashboard/search'
import PaginationComponent from '../components/dashboard/pagging';
import Loader from '../components/common/Loader';
import Backtotop from '../components/common/BackToTop';
import { get100Coin } from '../functions/get100Coin';

const DashboardPage = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [paginatedCoins, setPaginatedCoins] = useState([]);

  // useEffect(() => {
  //   // Get 100 Coins
  //   getData();
  // }, []);
  useEffect(() => {
    getData();
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
    // console.log(e.target.value);
  };
  var filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.trim().toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.trim().toLowerCase())
  );
  const getData = async () => {
    const mycoin = await get100Coin();
    console.log(mycoin);
    if(mycoin){
      setCoins(mycoin);
      setPaginatedCoins(mycoin.slice(0, 10));
      setLoading(false);
    }
  }
  const handlePageChange = (event, value) => {
    setPage(value);
    // Value = new page number
    var previousindex = (value - 1) * 10;
    setPaginatedCoins(coins.slice(previousindex, previousindex + 10));
  };
  return (
    <div>
      <Header/>
      <Backtotop />
      {loading ? (
        <Loader />
      ) : (
        <>
          <Search search={search} handleChange={handleChange} />
          <TabsComponent
            coins={search ? filteredCoins : paginatedCoins}
            setSearch={setSearch}
          />
          {!search && (
            <PaginationComponent
              page={page}
              handlePageChange={handlePageChange}
            />
          )}
        </>
      )}
      
    </div>
  )
}

export default DashboardPage
