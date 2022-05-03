import { render } from "@testing-library/react";
import axios from "axios";
import React, { useState, useEffect } from "react";




const constante = {
  dir : "desc"
}

const Crypto = () => {
  const [cryptos, setCryptos] = useState([]);
  const [markets, setMarkets] = useState([]);
  const [switchToggled, setSwitchToggled] = useState(false);

  const ToggleSwitch = () => {
    switchToggled ? setSwitchToggled(false) : setSwitchToggled(true);
  };

  const endpoint = "https://api.coinstats.app/public/v1/coins?skip=0&limit=10&currency=USD";
  const showData = () => {
    axios
      .get(endpoint)
      .then((res) => {
        const { coins } = res.data;
        setCryptos(coins);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    showData();
  }, []);

  const nuevo = [];
  nuevo.coins = cryptos.filter(name => (name.symbol != 'CRUNI' && name.symbol != 'YCRUVE-USDN' && name.symbol != 'A3CRV' && name.symbol != 'LUSD3CRV-F' && name.symbol != 'B-60WETH-40DAI' && name.symbol != 'BCHA' && name.symbol !='FRAX3CRV-f' && name.symbol != '3CrvCrypto2' && name.symbol != 'yvsteCrv' && name.symbol != 'YVWETH' && name.symbol != 'YVDAI' && name.symbol != 'BOT' && name.symbol != 'f6-sOHM' && name.symbol != 'usdnCrv' && name.symbol != 'alUSD3CRV-f' && name.symbol != 'eCrv' && name.symbol != 'YVUSDC' && name.symbol != 'B-stETH-STABLE' && name.symbol != 'hbtcCrv' && name.symbol != 'SAFEMOON' && name.symbol != 'SAVAX' && name.symbol != 'G-UNI' && name.symbol != 'B-50WBTC-50WETH' && name.symbol != 'fsOHM-18' && name.symbol != 'YVUSDT' && name.symbol != 'brenCrv' && name.symbol != 'musdCrv' && name.symbol != 'fTRIBE-8' && name.symbol != 'crETH' && name.symbol != 'staBAL3' && name.symbol != 'apFEI-TRIBE' && name.symbol != 'CVXCRV'));
  // nuevo.coins = cryptos.filter(name => (name.symbol != 'BTC'));
  
  const sort = (elem) => {
    
    if (constante.dir == 'asc') {
      sortDesc(elem)
      if (elem == 'symbol') {
        nameDesc(elem)
      }
      constante.dir = 'desc';
    }
    else {
      sortAsc(elem)
      if (elem == 'symbol') {
        nameAsc(elem)
      }
      constante.dir = 'asc';
    }
  }
  const sortDesc = (property) => {
    const sortedCryptos = cryptos.sort((a, b) => a[property] - b[property]
    );
    setCryptos([...sortedCryptos]);
  };
  const sortAsc = (property) => {
    const sortedCryptos = cryptos.sort((a, b) => b[property] - a[property]
    );
    setCryptos([...sortedCryptos]);
  };
  const nameDesc = () => {
    const sortedCryptos = cryptos.sort((a, b) => a.symbol.localeCompare(b.symbol)
    );
    setCryptos([...sortedCryptos]);
  };
  const nameAsc = () => {
    const sortedCryptos = cryptos.sort((a, b) => b.symbol.localeCompare(a.symbol)
    );
    setCryptos([...sortedCryptos]);
  };
  const market = async (cripto, tick) => {
    const url = 'https://api.coinstats.app/public/v1/markets?coinId=' + cripto;
    console.log(cripto)
    const ticker = tick + '/USDT'
    const response = await fetch(url);
    const data = await response.json();
    // const info = Object.values(data);
    const lista_exchange = [];
    const lista_precio = [];
    const arreglo = []
    for (var i=0; i < 10; i++) {
      var info = Object.values(data[i]);
      // console.log(info)
      if (info.length == 5) {
        var price = info[0];
        var exchange = info[1];
        var pair = info[2];
      }
      else if (info.length == 6) {
          var price = info[0];
          var exchange = info[2];
          var pair = info[3];
      }
      if (pair == ticker && (exchange == 'Binance' || exchange == 'Coinbase' || exchange == 'Kraken' || exchange == 'Kucoin' || exchange == 'Bitfinex' || exchange == 'Gate.io' || exchange == 'HuobiPro' || exchange == 'Crypto.com' || exchange == 'OKEX' || exchange == 'Bybit' || exchange == 'BitMart' || exchange == 'CoinEx' || exchange == 'Poloniex' || exchange == 'FTXUs' || exchange == 'Bittrex' || exchange == 'Bitso' || exchange == 'Liquid' || exchange == 'Coinsbit' || exchange == 'Huobi' || exchange == 'Bitstamp')) {
        if (price >= 1000) {
          price = parseInt(price);
        }
        if (price >= 100 && price < 1000) {
            price = parseFloat(price);
            price = price.toFixed(3);
            price = parseFloat(price);
        }
        if (price >= 2 && price < 100) {
            price = parseFloat(price);
            price = price.toFixed(3);
            price = parseFloat(price);
        }
        if (price >= 0.001 && price < 2) {
            price = parseFloat(price);
            price = price.toFixed(4);
            price = parseFloat(price);
        }
        if (price <= 0.001) {
            var price_str = price.toString();
            price_str = price_str.substring(0, 10);
            price = parseFloat(price_str); 
        }
        if (price <= 0.000001) {
            var price_str = price.toFixed(11);
            price = price_str; 
        }
        // console.log(pair)
        // console.log(exchange)
        // console.log(price)
        // console.log('')
        lista_exchange.push(exchange);
        lista_precio.push('$ ' + price);
        // console.log(lista_exchange)
        // console.log(lista_precio)
      }
    }
    arreglo['exchange'] = lista_exchange
    arreglo['price'] = lista_precio
    console.log(arreglo.exchange) 
    console.log(arreglo.price)
    


  }
  
  

  return (
    <>
      {/* <input value={search} onChange={searcher} type='text' placeholder='Search...' className='form-control' /> */}
      <div className="mt-2 mb-3">
        <img
          src="http://livecodestream.dev/post/a-better-approach-to-dark-mode-on-your-website/featured.jpg"
          alt="dark mode"
          height="20px"
          onClick={ToggleSwitch}
        />
      </div>
      <table
        className={
          switchToggled
            ? "table table-ligth table-hover mt-2"
            : "table table-dark table-hover mt-2"
        }
      >
        <thead>
          <tr>
            <th onClick={() => sort('rank')}>#
            </th>
            <th onClick={() => sort('symbol')}>Name</th>
            <th onClick={() => sort('price')}>Price</th>
            <th onClick={() => sort('priceChange1h')}>% 1h</th>
            <th onClick={() => sort('priceChange1d')}>% 1d</th>
            <th onClick={() => sort('priceChange1w')}>% 1w</th>
          </tr>
        </thead>
        <tbody>
          {nuevo.coins.map((result) => (
            <tr key={result.id}>
              <td>{result.rank}</td>
              <td onClick={() => market(result.id, result.symbol.toUpperCase())}>
                <img src={result.icon} height="20px" alt="Coin icon" />{" "}
                {result.symbol.toUpperCase()} 
              </td>
              <td>
                {result.price >= 10000 ? (
                  <span>{"$ " + result.price.toFixed(0)}</span>
                ) : result.price < 10000 && result.price >= 1000 ? (
                  <span>{"$ " + result.price.toFixed(1)}</span>
                ) : result.price < 1000 && result.price >= 100 ? (
                  <span>{"$ " + result.price.toFixed(2)}</span>
                ) : result.price < 100 && result.price >= 10 ? (
                  <span>{"$ " + result.price.toFixed(3)}</span>
                ) : result.price < 10 && result.price >= 0.1 ? (
                  <span>{"$ " + result.price.toFixed(4)}</span>
                ) : result.price < 0.1 && result.price >= 0.001 ? (
                  <span>{"$ " + result.price.toFixed(5)}</span>
                ) : result.price < 0.001 && result.price >= 0.00001 ? (
                  <span>{"$ " + result.price.toFixed(7)}</span>
                ) : result.price < 0.00001 && result.price >= 0.000001 ? (
                  <span>{"$ " + result.price.toFixed(8)}</span>
                ) : result.price < 0.000001 ? (
                  <span>{"$ " + result.price.toFixed(11)}</span>
                ) : (
                  <a />
                )}
              </td>
              <td>
                {result.priceChange1h < 0 ? (
                  <span className="text-danger">{result.priceChange1h}</span>
                ) : (
                  <span className="text-success">{result.priceChange1h}</span>
                )}
              </td>
              <td>
                {result.priceChange1d < 0 ? (
                  <span className="text-danger">{result.priceChange1d}</span>
                ) : (
                  <span className="text-success">{result.priceChange1d}</span>
                )}
              </td>
              <td>
                {result.priceChange1w < 0 ? (
                  <span className="text-danger">{result.priceChange1w}</span>
                ) : (
                  <span className="text-success">{result.priceChange1w}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default Crypto;
