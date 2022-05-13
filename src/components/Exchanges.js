import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const constante = {
  dir: "desc",
};


export const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [markets, setMarkets] = useState([]);
  const params = useParams();
  
  console.log(params)

  if (params.tema == 'light') {
    var theme = true;
  }
  if (params.tema == 'dark') {
    var theme = false;
  }
  const [switchToggled, setSwitchToggled] = useState(theme);


  var arreglo = []
  var j = 0;



  const sort = (elem) => {
    if (constante.dir == "asc") {
      sortDesc(elem);
      if (elem == "exchanges") {
        nameDesc(elem);
      }
      constante.dir = "desc";
    } else {
      sortAsc(elem);
      if (elem == "exchanges") {
        nameAsc(elem);
      }
      constante.dir = "asc";
    }
  };
  const sortDesc = (property) => {
    const sortedMarkets = markets.sort((a, b) => a[property] - b[property]);
    setMarkets([...sortedMarkets]);
  };
  const sortAsc = (property) => {
    const sortedMarkets = markets.sort((a, b) => b[property] - a[property]);
    setMarkets([...sortedMarkets]);
  };
  const nameDesc = () => {
    const sortedMarkets = markets.sort((a, b) =>
      a.exchanges.localeCompare(b.exchanges)
    );
    setMarkets([...sortedMarkets]);
  };
  const nameAsc = () => {
    const sortedMarkets = markets.sort((a, b) =>
      b.exchanges.localeCompare(a.exchanges)
    );
    setMarkets([...sortedMarkets]);
  };


  
  useEffect(() => {
    
    (async () => {
      let aux = '';
      // const url =
      //   "https://api.coinstats.app/public/v1/markets?coinId=" + params.name;
      // const response = await fetch(url);
      // const data = await response.json();
      // console.log({ exchanges: data });
      let url = "https://api.coinstats.app/public/v1/markets?coinId=" + params.name;
      // console.log(url);
      let response = await fetch(url);
      let data = await response.json();
      // console.log({ data });
      let info = Object.values(data);
      // console.log(info)
      

      if (info == '') {
        // console.log('ERROR')
        url = "https://api.coinstats.app/public/v1/markets?coinId=" + params.symbol.toLocaleLowerCase();
        // console.log(url)
        response = await fetch(url);
        data = await response.json();
        // console.log({ data });
        info = Object.values(data);
        aux = info;
        // console.log(info)
      }
      const ticker = params.symbol + "/USDT";
      const ticker2 = params.symbol + "/USD";
      // console.log(ticker)
      // console.log(ticker2)
      
      // console.log(aux);
      if (aux == '') {
        aux = info;
      }
      // console.log(aux);

      
      for (var i = 0; i < aux.length; i++) {
          var market = Object.values(data[i]);
          // console.log(market)
          if (market.length == 5) {
              var price = market[0];
              var exchange = market[1];
              var pair = market[2];
          } else if (market.length == 6) {
              var price = market[0];
              var exchange = market[2];
              var pair = market[3];
          }
          // console.log(pair)
          // console.log(exchange)
          // console.log(price)

          if ((pair == ticker || pair == ticker2) &&
            (exchange == "Binance" ||
              exchange == "Coinbase" ||
              exchange == "Kraken" ||
              exchange == "Kucoin" ||
              exchange == "Bitfinex" ||
              exchange == "Gate.io" ||
              exchange == "HuobiPro" ||
              exchange == "Crypto.com" ||
              exchange == "OKEX" ||
              exchange == "Bybit" ||
              exchange == "BitMart" ||
              exchange == "CoinEx" ||
              exchange == "Poloniex" ||
              exchange == "FTXUs" ||
              exchange == "FTX" ||
              exchange == "Bittrex" ||
              exchange == "Bitso" ||
              exchange == "Liquid" ||
              exchange == "Coinsbit" ||
              exchange == "Huobi" ||
              exchange == "Bitstamp" ||
              exchange == "Hotbit" ||
              exchange == "Bitrue" ||
              exchange == "LBank")
              ) 
            {
              // console.log(exchange)
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
              var link = 0;
              if (exchange == 'Binance') {
                link = 'https://www.binance.com/en/trade/' + params.symbol + '_USDT';
              }
              if (exchange == 'FTXUs' || exchange == "FTX" ) {
                link = 'https://ftx.us/trade/' + params.symbol + '/USD';
              }
              if (exchange == 'Coinbase') {
                link = 'https://pro.coinbase.com/trade/' + params.symbol + '-USD';
              }
              if (exchange == 'Crypto.com') {
                link = 'https://crypto.com/exchange/trade/spot/' + params.symbol + '_USDT';
              }
              if (exchange == 'OKEX') {
                link = 'https://www.okx.com/trade-spot/' + params.symbol.toLowerCase() + '-usdt';
              }
              if (exchange == 'BitMart') {
                link = 'https://www.bitmart.com/trade/en?symbol=' + params.symbol + '_USDT&layout=basic';
              }
              if (exchange == 'Kucoin') {
                link = 'https://www.kucoin.com/trade/' + params.symbol + '-USDT?spm=kcWeb.B5markets.tradeList.1';
              }
              if (exchange == 'Coinsbit') {
                link = 'https://coinsbit.io/trade/' + params.symbol + '_USD';
              }
              if (exchange == 'Bybit') {
                link = 'https://www.bybit.com/en-US/trade/spot/' + params.symbol + '/USDT';
              }
              if (exchange == 'Gate.io') {
                link = 'https://www.gate.io/trade/' + params.symbol + '_USDT';
              }
              if (exchange == 'CoinEx') {
                link = 'https://www.coinex.com/exchange/' + params.symbol.toLowerCase() + '-usdt';
              }
              if (exchange == 'Kraken') {
                link = 'https://www.kraken.com/prices?quote=USD';
              }
              if (exchange == 'Poloniex') {
                link = 'https://poloniex.com/exchange/USDT_' + params.symbol;
              }
              if (exchange == 'Bittrex') {
                link = 'https://global.bittrex.com/Market/Index?MarketName=USD-' + params.symbol;
              }
              if (exchange == 'Liquid') {
                link = 'https://app.liquid.com/exchange/' + params.symbol + 'USD';
              }
              if (exchange == 'Bitstamp') {
                link = 'https://www.bitstamp.net/markets/' + params.symbol.toLowerCase() + '/usd/';
              }
              if (exchange == 'Bitso') {
                link = 'https://bitso.com/market/' + params.symbol.toLowerCase() + '/usd';
              }
              if (exchange == 'Bitfinex') {
                link = 'https://trading.bitfinex.com/t/' + params.symbol + ':USD?type=exchange';
              }
              if (exchange == 'HuobiPro') {
                link = 'https://www.huobi.com/en-us/exchange/' + params.symbol.toLowerCase() + '_usdt/';
              }
              if (exchange == 'Hotbit') {
                link = 'https://www.hotbit.io/exchange?symbol=' + params.symbol + '_USDT';
              }
              if (exchange == 'Bitrue') {
                link = 'https://www.bitrue.com/trade/klima_usdt' + params.symbol.toLowerCase() + '_usdt';
              }
              if (exchange == 'LBank') {
                link = 'https://www.lbank.info/exchange/' + params.symbol.toLowerCase() + '/usdt';
              }
              
              
              j += 1;
              arreglo.push({
                num: j,
                exchanges: exchange,
                precios: price,
                links: link
              });
              
            }
      }
      setMarkets(arreglo)
      // setMarkets({ num: lista_num, exchanges: lista_exchange, precios: lista_precio });
    })();
  }, []);

  const nav = useNavigate();

  return (
    <>
      <table className="table">
        <tbody>
          <tr>
            <th>
              <button onClick={() => nav("/")}>BACK</button>
            </th>
          </tr>
        </tbody>
      </table>

      <tr className="class" style={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: "1%"}}>
        <h3>{params.name.toUpperCase()}</h3>
      </tr>

      <table className={switchToggled
            ? "table table-ligth table-hover mt-2"
            : "table table-dark table-hover mt-2"}>
          <thead>
          
          <tr style={{ textAlign:"center" }}>
            <th onClick={() => sort("exchanges")}>EXCHANGE
            </th>
            <th onClick={() => sort("precios")}>PRICE</th>
          </tr>
          </thead>
          <tbody>
            {markets.map((result) => (
              <tr key={result.num}  style={{ textAlign:"center" }}>
                  <td> <a href={result.links} style={{textDecoration: 'none'}} target="_blank">{result.exchanges}</a></td>
                  <td>$ {result.precios}</td>
              </tr>
            ))}
          </tbody>
      </table>
    </>

  );
  


};
