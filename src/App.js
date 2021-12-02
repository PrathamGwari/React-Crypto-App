import Coin from './components/Coin';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import InfoPanel from './components/InfoPanel';
import MyAreaChart from './components/MyAreaChart';

function App() {
  const [coinData, setCoinData] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCoin, setSelectedCoin] = useState({});
  

  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=250&page=1&sparkline=false';
  const fetchCoinData = async ()=>{
    const response = await axios.get(url);
    setCoinData(response.data);
  }  
  useEffect(()=>{
    fetchCoinData();
  }, [])

  const handler = (e)=>{
    setSearch(e.target.value);
  }

  const filteredCoinData = coinData.filter(coin=>{
    return coin.name.toLowerCase().includes(search.toLowerCase());
  })

  return (
    <>
      <div className="row expanded-view" id="panel-container">
        
        {/* coin panel */}
        <div className="col-md-12 my-5 px-5" id="left-panel">
          <div className="row mx-3 bg-white coin-main-panel">

            {/* search bar */}
            <div className="container px-5 py-2">
              <center><input type="text" className="mt-4 my-search-bar box-shadow" placeholder="Search Coin" onChange={handler}/></center>
            </div>
            
            {/* coin list */}
            <div id="coin-panel" className="my-2">
              {
                filteredCoinData.map(coin => {
                  return <Coin key={coin.id} id = {coin.id} setSelectedCoin={setSelectedCoin} img = {coin.image} name={coin.name} price={coin.current_price} change={coin.market_cap_change_percentage_24h}/>
                })
              }
            </div>
          </div>
        </div>
        
        {/* right panel */}
        <div className="col-md-0" id="right-panel">
          <div className="container bg-white my-5 pt-3 shadow" id="right-panel">
            <div className="container">

              {/* basic info panel */}
              <InfoPanel selectedCoin={selectedCoin} />
              
              {/* graph of the selected coin */}
              <div className="row mt-5 mb-2">
                <MyAreaChart selectedCoin={selectedCoin} x={200} y={300}></MyAreaChart>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
