import axios from "axios";
import React, { useState, useEffect, useRef  } from "react";
import { useNavigate } from "react-router-dom";

const constante = {
  dir: "desc",
};

let tema = 'dark';



const Crypto = () => {
  const [cryptos, setCryptos] = useState([]);
  const [ search, setSearch ] = useState("") 
  // const [theme, setTheme] = useState(localStorage.getItem('theme'));
  let [switchToggled, setSwitchToggled] = useState(tema);
  let [switchImage, setSwitchImage] = useState([]);

  // dark = true
  // light = false

  const ref = useRef(null);

  const navigate = useNavigate();

  // let star = "https://images.vexels.com/media/users/3/136916/isolated/lists/aa21eb60437133bf4f4be189636a187a-star-favorite-outline-icon.png"
  // 
  // let outline = 
  // console.log(tema);


  let ToggleSwitch = () => {
    switchToggled ? setSwitchToggled(false) : setSwitchToggled(true);
    if (switchToggled) {
      tema = 'light';
      localStorage.setItem('theme', 'dark')
      const span = ref.current
      span.className = 'table table-light table-hover mt-2'
      // console.log(span.className);
      // console.log(tema)
    }
    else if ( ! switchToggled) {
      tema = 'dark';
      localStorage.setItem('theme', 'light')
      const span = ref.current
      span.className = 'table table-dark table-hover mt-2'
      // console.log(span.className);
      // console.log(tema)
    }
  };


  let ToggleImage = () => {
    switchImage ? setSwitchImage(false) : setSwitchImage(true);

  };



  // console.log(tema)
  if (tema == 'light') {
    // console.log('LIGHT')
    switchToggled = false;
    // console.log(switchToggled)
  }
  else if (tema == 'dark') {
    // console.log('DARK')
    switchToggled = true;
    // ToggleSwitch();
    // console.log(switchToggled)
  }



  const endpoint =
    "https://api.coinstats.app/public/v1/coins?skip=0&limit=500&currency=USD";
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
  nuevo.coins = cryptos.filter(
    (name) =>
      name.symbol != "CRUNI" &&
      name.symbol != "YCRUVE-USDN" &&
      name.symbol != "a3Crv" &&
      name.symbol != "LUSD3CRV-F" &&
      name.symbol != "B-60WETH-40DAI" &&
      name.symbol != "BCHA" &&
      name.symbol != "FRAX3CRV-f" &&
      name.symbol != "3CrvCrypto2" &&
      name.symbol != "yvsteCrv" &&
      name.symbol != "YVWETH" &&
      name.symbol != "YVDAI" &&
      name.symbol != "BOT" &&
      name.symbol != "f6-sOHM" &&
      name.symbol != "usdnCrv" &&
      name.symbol != "alUSD3CRV-f" &&
      name.symbol != "eCrv" &&
      name.symbol != "YVUSDC" &&
      name.symbol != "B-stETH-STABLE" &&
      name.symbol != "hbtcCrv" &&
      name.symbol != "SAFEMOON" &&
      name.symbol != "SAVAX" &&
      name.symbol != "G-UNI" &&
      name.symbol != "B-50WBTC-50WETH" &&
      name.symbol != "fsOHM-18" &&
      name.symbol != "YVUSDT" &&
      name.symbol != "brenCrv" &&
      name.symbol != "musdCrv" &&
      name.symbol != "fTRIBE-8" &&
      name.symbol != "crETH" &&
      name.symbol != "staBAL3" &&
      name.symbol != "apFEI-TRIBE" &&
      name.symbol != "CVXCRV" &&
      name.symbol != "BLUNA" &&
      name.symbol != "BURST" &&
      name.symbol != "CRUNI" &&
      name.symbol != "yvUSDC" &&
      name.symbol != "MIMATIC" &&
      name.symbol != "fDAI-6" &&
      name.symbol != "B-50USDC-50WETH" &&
      name.symbol != "LUSD3CRV-f" &&
      name.symbol != "f6-USDC" &&
      name.symbol != "SIGNA" &&
      name.symbol != "B-80BAL-20WETH" &&
      name.symbol != "crUNI" &&
      name.symbol != "FLEXUSD"
  );
  nuevo.tema = tema
  // setTheme(nuevo.tema)
  // console.log(nuevo.tema)
  // console.log('\n')
  // console.log(nuevo.coins)

  const searcher = (e) => {
    setSearch(e.target.value.toUpperCase())
  }
  const results = !search ? nuevo.coins : nuevo.coins.filter( (val)=> (val.symbol.toUpperCase().includes(search)) )
  
  // console.log(results)

  const sort = (elem) => {
    if (constante.dir == "asc") {
      sortDesc(elem);
      if (elem == "symbol") {
        nameDesc(elem);
      }
      constante.dir = "desc";
    } else {
      sortAsc(elem);
      if (elem == "symbol") {
        nameAsc(elem);
      }
      constante.dir = "asc";
    }
  };
  const sortDesc = (property) => {
    const sortedCryptos = cryptos.sort((a, b) => a[property] - b[property]);
    setCryptos([...sortedCryptos]);
  };
  const sortAsc = (property) => {
    const sortedCryptos = cryptos.sort((a, b) => b[property] - a[property]);
    setCryptos([...sortedCryptos]);
  };
  const nameDesc = () => {
    const sortedCryptos = cryptos.sort((a, b) =>
      a.symbol.localeCompare(b.symbol)
    );
    setCryptos([...sortedCryptos]);
  };
  const nameAsc = () => {
    const sortedCryptos = cryptos.sort((a, b) =>
      b.symbol.localeCompare(a.symbol)
    );
    setCryptos([...sortedCryptos]);
  };
  

  const seeExchanges = (crypto, tick, tema, cap, vol, icon) => {
    // console.log(crypto, tick, tema, cap, vol)
    // console.log(icon);
    const icono = icon.slice(35,-4);
    // console.log(icono)
    navigate(`/${crypto}/${tick}/${tema}/${cap}/${vol}/${icono}`);
  };

  return (
    <><div>
      
      <table className="table">
        <tbody>
          <tr>
            <th style={{ width: 50}}>
              <img src="/logo512.png" height="65px"></img>
            </th>
            <th style={{ alignItems: 'left', justifyContent: 'left', textAlign:"left" }}>
              <tr style={{ fontSize: 30}}>ValorCriptoBot</tr>
              <tr style={{ fontStyle: 'italic', fontSize: 15}}>Follow us on {' '}
                  <a href='https://twitter.com/ValorCriptoBot' style={{textDecoration: 'none'}} target="_blank">
                    Twitter</a>
              </tr>
            </th>
            <th className="mt-2 mb-3" style={{ textAlign : "right", marginTop: "10%" }}>
                  <img
                    src="http://livecodestream.dev/post/a-better-approach-to-dark-mode-on-your-website/featured.jpg"
                    alt="dark mode"
                    height="20px"
                    onClick={ToggleSwitch}
                  />
            </th>
          </tr>
        </tbody>
      </table>
    
      <input value={search} onChange={searcher} type='text' placeholder='Search...' className='form-control'/>
      <table ref={ ref }
        className={
          switchToggled
            ? "table table-dark table-hover mt-2"
            : "table table-light table-hover mt-2"
        }
      >
        <thead>
          <tr  style={{ textAlign:"center" }}>
            {/* <th>FAV</th> */}
            <th onClick={() => sort("rank")}>#</th>
            <th onClick={() => sort("symbol")}>Name</th>
            <th onClick={() => sort("price")}>Price</th>
            <th onClick={() => sort("priceChange1h")}>% 1h</th>
            <th onClick={() => sort("priceChange1d")}>% 1d</th>
            <th onClick={() => sort("priceChange1w")}>% 1w</th>
          </tr>
        </thead>
        <tbody  style={{ textAlign:"center" }}>
          {results.map((result) => (
            <tr key={result.id}>
              {/* <td>
                  <img
                    src={
                      switchImage
                        ? "https://images.vexels.com/media/users/3/136916/isolated/lists/aa21eb60437133bf4f4be189636a187a-star-favorite-outline-icon.png"
                        : "https://images.vexels.com/media/users/3/134121/isolated/lists/5ff73adb05d7f1fe47dd49bb1b08affa-star-cartoon-icon-50.png"
                    }
                    height="18px"
                    onClick={ToggleImage}
                  />
              </td> */}
              <td>{result.rank}</td>
              <td
                /* onClick={() => market(result.id, result.symbol.toUpperCase())} */
                onClick={() => seeExchanges(result.id, result.symbol, nuevo.tema, result.marketCap, result.volume, result.icon)}
              >
                <img src={result.icon} height="20px"/>&nbsp;
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
      </div>
    </>
  );
};
export default Crypto;
