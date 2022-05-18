import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const constante = {
  dir: "desc",
};

// console.log(tema);
var os = navigator.userAgent;
// console.log(os)

if (os.includes('iPhone')) {
  var sistema = 'ios';
  // console.log(sistema)
}
else if (os.includes('Android')) {
  var sistema = 'android';
  // console.log(sistema)
}
else if(navigator.userAgent.indexOf("Chrome") > -1 ||
  navigator.userAgent.indexOf("Safari") > -1 ||
  navigator.userAgent.indexOf("Opera") > -1 ||
  navigator.userAgent.indexOf("Firefox") > -1 ||
  navigator.userAgent.indexOf("MSIE") > -1) {
    var sistema = 'web'
    // console.log(sistema);
}
// console.log(window.navigator.appCodeName);
// console.log(window.navigator.appName);
// console.log(window.navigator.appVersion);
// console.log(window.navigator.platform);
// if (os.includes('Windows')) {
//   var sistema = 'windows';
//   console.log(sistema)
// }
// if (os.includes('iPhone')) {
//   var sistema = 'ios';
//   console.log(sistema)
// }
// if (os.includes('Android')) {
//   var sistema = 'android';
//   console.log(sistema)
// }


export const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [markets, setMarkets] = useState([]);
  const [id, setId] = useState([]);
  const [imagen, setImagen] = useState([]);
  const [url2, setUrl2] = useState();
  const [font, setFont] = useState([]);


  const params = useParams();
  
  // console.log(params)


  


  // console.log(font)
  
  let cap = parseInt(params.marketCap).toLocaleString();
  let vol = parseInt(params.volume).toLocaleString()



  const ref = useRef(null);
  const span = ref.current

  if (params.tema == 'light') {
    var theme = true;
  }
  if (params.tema == 'dark') {
    var theme = false;
  }
  const [switchToggled, setSwitchToggled] = useState(theme);


  var arreglo = []
  var j = 0;
  var color = ''


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


      
      // if (params.name == 'binance-coin') {
      //   setBnb("https://api.coingecko.com/api/v3/coins/binancecoin")
      // }
      // else {
      //   setBnb("https://api.coingecko.com/api/v3/coins/" + params.name)
      // }
      // let url2 = "https://api.coingecko.com/api/v3/coins/" + params.name;
      // console.log(url2)

      if (params.name == 'binance-coin') {
        let url2 = "https://api.coingecko.com/api/v3/coins/binancecoin";
        let response2 = await fetch(url2);
        let data2 = await response2.json();
        let large = data2.image.large
        let inicio = large.indexOf("images");
        let fin = large.indexOf("/large")
        let nuevo = parseInt(large.slice(inicio + 7, fin));
        setId(nuevo);
      }
      else if (params.name != 'binance-coin') {
        let url2 = "https://api.coingecko.com/api/v3/coins/" + params.name;
        let response2 = await fetch(url2);
        let data2 = await response2.json();
        let large = data2.image.large
        let inicio = large.indexOf("images");
        let fin = large.indexOf("/large")
        let nuevo = parseInt(large.slice(inicio + 7, fin));
        setId(nuevo);
      }

      // let response2 = await fetch(url2);
      // let data2 = await response2.json();
      // let large = data2.image.large
      // let inicio = large.indexOf("images");
      // let fin = large.indexOf("/large")
      // let nuevo = parseInt(large.slice(inicio + 7, fin));
      // console.log(nuevo)
      // setId(nuevo);


      // let url3 = "https://api.coinstats.app/public/v1/coins/" + params.name;
      // // console.log(url3)
      // let response3 = await fetch(url3);
      // let data3 = await response3.json();
      // let info3 = Object.values(data3);
      // let img = info3[0].icon;
      // // console.log(img)
      // setImagen(img);
      let img = 'https://static.coinstats.app/coins/' + params.icono + '.png'
      setImagen(img);
      // console.log(imagen)





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
        response = await fetch(url);
        data = await response.json();
        info = Object.values(data);
        aux = info;
      }
      const ticker = params.symbol + "/USDT";
      
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

          if ((pair == ticker) &&
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
              exchange == "LBank" ||
              exchange == "PancakeSwapV2" ||
              exchange == "UniswapV3")
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
                  if (sistema == 'web') {
                    link = 'https://www.binance.com/en/trade/' + params.symbol + '_USDT';
                  }
                  if (sistema == 'ios') {
                    link = "https://app.appsflyer.com/id1436799971?pid=CRM&c=www.binance.com";
                  }
                  if (sistema == 'android') {
                    link = "https://play.google.com/store/apps/details?id=com.binance.dev&referrer=af_tranid%3D3VE0YvlvLHBLt61qrU75Eg%26pid%3DCRM%26c%3Dwww.binance.com";
                  }
              }
              if (exchange == 'FTXUs' || exchange == "FTX" ) {
                  if (sistema == 'web') {
                    link = 'https://ftx.us/trade/' + params.symbol + '/USD';
                  }
                  if (sistema == 'ios') {
                    link = "https://apps.apple.com/us/app/ftx-pro/id1512374471";
                  }
                  if (sistema == 'android') {
                    link = "https://play.google.com/store/apps/details?id=com.ftxmobile.ftx";
                  }
              }
              if (exchange == 'Coinbase') {
                  if (sistema == 'web') {
                    link = 'https://pro.coinbase.com/trade/' + params.symbol + '-USD';
                  }
                  if (sistema == 'ios') {
                      link = "https://apps.apple.com/us/app/coinbase-buy-bitcoin-ether/id886427730";
                  }
                  if (sistema == 'android') {
                      link = "https://play.google.com/store/apps/details?id=com.coinbase.android&hl=es_AR&gl=US";
                  }
              }
              if (exchange == 'Crypto.com') {
                  if (sistema == 'web') {
                    link = 'https://crypto.com/exchange/trade/spot/' + params.symbol + '_USDT';
                  }
                  if (sistema == 'ios') {
                      link = "https://apps.apple.com/us/app/id1262148500";
                  }
                  if (sistema == 'android') {
                      link = "https://play.google.com/store/apps/details?id=co.mona.android";
                  }
              }
              if (exchange == 'OKEX') {
                  if (sistema == 'web') {
                    link = 'https://www.okx.com/trade-spot/' + params.symbol.toLowerCase() + '-usdt';
                  }
                  if (sistema == 'ios') {
                      link = "https://apps.apple.com/us/app/okex-bitcoin-cryptocurrency/id1327268470";
                  }
                  if (sistema == 'android') {
                      link = "https://play.google.com/store/apps/details?id=com.okinc.okex.gp";
                  }
              }
              if (exchange == 'BitMart') {
                  if (sistema == 'web') {
                    link = 'https://www.bitmart.com/trade/en?symbol=' + params.symbol + '_USDT&layout=basic';
                  }
                  if (sistema == 'ios') {
                      link = "https://apps.apple.com/us/app/bitmart-trade-btc-eth-shib/id1396382871";
                  }
                  if (sistema == 'android') {
                      link = "https://play.google.com/store/apps/details?id=com.bitmart.bitmarket&hl=es_AR&gl=US";
                  }
              }
              if (exchange == 'Kucoin') {
                  if (sistema == 'web') {
                    link = 'https://www.kucoin.com/trade/' + params.symbol + '-USDT?spm=kcWeb.B5markets.tradeList.1';
                  }
                  if (sistema == 'ios') {
                      link = "https://apps.apple.com/us/app/kucoin-buy-cryptocurrency/id1378956601";
                  }
                  if (sistema == 'android') {
                      link = "https://play.google.com/store/apps/details?id=com.kubi.kucoin&hl=es_AR&gl=US";
                  }
              }
              if (exchange == 'Coinsbit') {
                  if (sistema == 'web') {
                    link = 'https://coinsbit.io/trade/' + params.symbol + '_USD';
                  }
                  if (sistema == 'ios') {
                      link = "https://apps.apple.com/ec/app/coinsbit-india/id1584564100";
                  }
                  if (sistema == 'android') {
                      link = "https://play.google.com/store/apps/details?id=com.coinsbit.coinsbit&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1";
                  }
              }
              if (exchange == 'Bybit') {
                  if (sistema == 'web') {
                    link = 'https://www.bybit.com/en-US/trade/spot/' + params.symbol + '/USDT';
                  }
                  if (sistema == 'ios') {
                      link = "https://apps.apple.com/us/app/bybit-app/id1488296980";
                  }
                  if (sistema == 'android') {
                      link = "https://play.google.com/store/apps/details?id=com.bybit.app";
                  } 
              }
              if (exchange == 'Gate.io') {
                  if (sistema == 'web') {
                    link = 'https://www.gate.io/trade/' + params.symbol + '_USDT';
                  }
                    if (sistema == 'ios') {
                      link = "https://apps.apple.com/us/app/gate-io-%E8%B4%AD%E4%B9%B0btc-eth-shib/id1294998195";
                  }
                  if (sistema == 'android') {
                      link = "https://play.google.com/store/apps/details?id=com.gateio.gateio ";
                  }
              }
              if (exchange == 'CoinEx') {
                  if (sistema == 'web') {
                    link = 'https://www.coinex.com/exchange/' + params.symbol.toLowerCase() + '-usdt';
                  }
                  if (sistema == 'ios') {
                      link = "https://www.coinex.com/download";
                  }
                  if (sistema == 'android') {
                      link = "https://play.google.com/store/apps/details?id=com.coinex.trade.play";
                  }
              }
              if (exchange == 'Kraken') {
                  if (sistema == 'web') {
                    link = 'https://www.kraken.com/prices?quote=USD';
                  }
                  if (sistema == 'ios') {
                      link = "https://apps.apple.com/us/app/id1481947260?_branch_match_id=966097753062494553&utm_source=kraken.com&utm_campaign=homepage%2Bhero&utm_medium=kraken%2Binternal&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXzy5KzE7N00ssKNDLyczL1s%2FIz03VzUgtytfNzC8GAFoVMsAlAAAA";
                  }
                  if (sistema == 'android') {
                      link = "https://play.google.com/store/apps/details?id=com.kraken.invest.app&_branch_match_id=966097753062494553&utm_source=kraken.com&utm_campaign=homepage%2Bhero&utm_medium=kraken%2Binternal&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXzy5KzE7N00ssKNDLyczL1s%2FIz03VzUgtytdNzEspys9MAQB1gCO%2FKQAAAA%3D%3D";
                  }
              }
              if (exchange == 'Poloniex') {
                  if (sistema == 'web') {
                    link = 'https://poloniex.com/exchange/USDT_' + params.symbol;
                  }
                  if (sistema == 'ios') {
                      link = "https://apps.apple.com/us/app/poloniex/id1234141021";
                  }
                  if (sistema == 'android') {
                      link = "https://play.google.com/store/apps/details?id=com.plunien.poloniex";
                  }
              }
              if (exchange == 'Bittrex') {
                  if (sistema == 'web') {
                    link = 'https://global.bittrex.com/Market/Index?MarketName=USD-' + params.symbol;
                  }
                  if (sistema == 'ios') {
                      link = "https://apps.apple.com/app/id1465314783";
                  }
                  if (sistema == 'android') {
                      link = "https://play.google.com/store/apps/details?id=com.bittrex.trade";
                  }
              }
              if (exchange == 'Liquid') {
                  if (sistema == 'web') {
                    link = 'https://app.liquid.com/exchange/' + params.symbol + 'USD';
                  }
                  if (sistema == 'ios') {
                      link = "https://apps.apple.com/app/liquid-pro/id1443975079?ls=1";
                  }
                  if (sistema == 'android') {
                      link = "https://play.google.com/store/apps/details?id=com.quoine.liquid";
                  }
              }
              if (exchange == 'Bitstamp') {
                  if (sistema == 'web') {
                    link = 'https://www.bitstamp.net/markets/' + params.symbol.toLowerCase() + '/usd/';
                  }
                  if (sistema == 'ios') {
                      link = "https://apps.apple.com/us/app/bitstamp/id1406825640";
                  }
                  if (sistema == 'android') {
                      link = "https://play.google.com/store/apps/details?id=net.bitstamp.app";
                  }
              }
              if (exchange == 'Bitso') {
                  if (sistema == 'web') {
                    link = 'https://bitso.com/market/' + params.symbol.toLowerCase() + '/usd';
                  }
                  if (sistema == 'ios') {
                      link = "https://apps.apple.com/us/app/bitso/id1292836438?l=es&ls=1";
                  }
                  if (sistema == 'android') {
                      link = "https://play.google.com/store/apps/details?id=com.bitso.wallet";
                  }
              }
              if (exchange == 'Bitfinex') {
                  if (sistema == 'web') {
                    link = 'https://trading.bitfinex.com/t/' + params.symbol + ':USD?type=exchange';
                  }
                  if (sistema == 'ios') {
                      link = "https://apps.apple.com/us/app/bitfinex/id1436383182?ls=1";
                  }
                  if (sistema == 'android') {
                      link = "https://play.google.com/store/apps/details?id=com.bitfinex.mobileapp&hl=en";
                  }
              }
              if (exchange == 'HuobiPro') {
                  if (sistema == 'web') {
                    link = 'https://www.huobi.com/en-us/exchange/' + params.symbol.toLowerCase() + '_usdt/';
                  }
                  if (sistema == 'ios') {
                      link = "https://apps.apple.com/us/app/huobi-buy-bitcoin-luna-gmt/id1023263342";
                  }
                  if (sistema == 'android') {
                      link = "https://play.google.com/store/apps/details?id=pro.huobi";
                  }
              }
              if (exchange == 'Hotbit') {
                  if (sistema == 'web') {
                    link = 'https://www.hotbit.io/exchange?symbol=' + params.symbol + '_USDT';
                  }
                  if (sistema == 'ios') {
                      link = "https://apps.apple.com/ca/app/hotbit-global/id1568969341";
                  }
                  if (sistema == 'android') {
                      link = "https://play.google.com/store/apps/details?id=io.hotbit.shouyi&hl=es_AR&gl=US";
                  }
              }
              if (exchange == 'Bitrue') {
                  if (sistema == 'web') {
                    link = 'https://www.bitrue.com/trade/klima_usdt' + params.symbol.toLowerCase() + '_usdt';
                  }
                  if (sistema == 'ios') {
                      link = "https://apps.apple.com/app/bitrue/id1435877386";
                  }
                  if (sistema == 'android') {
                      link = "https://play.google.com/store/apps/details?id=com.bitrue.currency.exchange";
                  }
              }
              if (exchange == 'LBank') {
                  if (sistema == 'web') {
                    link = 'https://www.lbank.info/exchange/' + params.symbol.toLowerCase() + '/usdt';
                  }
                  if (sistema == 'ios') {
                      link = "https://apps.apple.com/app/id1437346368";
                  }
                  if (sistema == 'android') {
                      link = "https://play.google.com/store/apps/details?id=com.superchain.lbankgoogle";
                  }
              }
              if (exchange == 'PancakeSwapV2') {
                  if (sistema == 'web') {
                    link = 'https://pancakeswap.finance/swap';
                  }
                  if (sistema == 'ios') {
                      link = "https://pancakeswap.finance/swap";
                  }
                  if (sistema == 'android') {
                      link = "https://pancakeswap.finance/swap";
                  }
              }
              if (exchange == 'UniswapV3') {
                  if (sistema == 'web') {
                    link = 'https://app.uniswap.org/#/swap?chain=mainnet';
                  }
                  if (sistema == 'ios') {
                      link = "https://app.uniswap.org/#/swap?chain=mainnet";
                  }
                  if (sistema == 'android') {
                      link = "https://app.uniswap.org/#/swap?chain=mainnet";
                  }
              }





              
              // console.log(link)
              
              if (params.tema == 'light') {
                color = '#000000'
              }
              if (params.tema == 'dark') {
                color = '#FFFFFF'
              }


              // console.log(color)

              j += 1;
              arreglo.push({
                num: j,
                exchanges: exchange,
                precios: price,
                links: link,
                color: color
              });
              // console.log(arreglo)
            }
      }
      setMarkets(arreglo)
      // setMarkets({ num: lista_num, exchanges: lista_exchange, precios: lista_precio });
    })();
  }, []);

  const nav = useNavigate();
  // const panel = "/es/monedas/" + params.name + "?chart=7_days#panel";
  let src = "https://www.coingecko.com/coins/" + id + "/sparkline";
  // console.log(src)
  // console.log(markets)

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

      <tr className="class" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
          <img src={imagen} height="30" style={{marginBottom: '0.5%'}}></img>&nbsp;&nbsp;
          <h3>{params.name.toUpperCase()}</h3>
      </tr>
      <table className={switchToggled
            ? "table table-ligth table-hover mt-2"
            : "table table-dark table-hover mt-2"}>
          <thead>
          <tr>
              <th style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign:"center", fontSize: 15 }}>Market Cap:  
                  <span>&nbsp;${cap}</span>
              </th>
              <th style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign:"center", fontSize: 15 }}>Volume (24h):
                  <span>&nbsp;${vol}</span>
              </th>
              <th style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign:"center", fontSize: 15 }}> Last 7 days: 
              &nbsp;&nbsp;<a >
                      <img loading="lazy" width="150" height="50" src={src}></img>
                  </a>
              </th>
          </tr>
          </thead>
      </table>
      <table className={switchToggled
            ? "table table-ligth table-hover mt-2"
            : "table table-dark table-hover mt-2"}>
          <thead>
          <br></br>
          <tr style={{ textAlign:"center" }}>
            <th onClick={() => sort("exchanges")}>EXCHANGE
            </th>
            <th onClick={() => sort("precios")}>PRICE</th>
          </tr>
          </thead>
          <tbody>
            {markets.map((result) => (
              <tr key={result.num}  style={{ textAlign:"center" }}>
                  <td>
                    <a href={result.links} style={{textDecoration: 'none', color: result.color }} target="_blank">{result.exchanges}</a>
                  </td>
                  <td>
                    $ {result.precios}
                  </td>
              </tr>
            ))}
          </tbody>
      </table>
    </>

  );
  


};
