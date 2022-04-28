import axios from 'axios'
import React, { useState, useEffect } from 'react'


const Crypto = () => {
    const [ search, setSearch ] = useState("")  
    const [ cryptos, setCryptos ] = useState( [] )
    const [ switchToggled, setSwitchToggled] = useState(false);

    const ToggleSwitch = () => {
        switchToggled ? setSwitchToggled(false) : setSwitchToggled(true);
    }


    

    const endpoint = 'https://api.coinstats.app/public/v1/coins?skip=0&limit=10&currency=USD'
    const showData = () => {
        axios.get(endpoint).then( (res) => {
            setCryptos(res.data)
        })
    }
    
    useEffect( ()=> {
        showData()
    },[])

    const searcher = (e) => {
        setSearch(e.target.value)
        //console.log(e.target.value)
    }
    const results = !search ? cryptos : cryptos.filter( (val)=> val.name.toLowerCase().includes(search.toLocaleLowerCase()) )
    // const nuevo = []
    // nuevo.coins = results.coins.filter(name => (name.symbol != 'BCHA' && name.symbol !='FRAX3CRV-f' && name.symbol != '3CrvCrypto2' && name.symbol != 'yvsteCrv' && name.symbol != 'YVWETH' && name.symbol != 'YVDAI' && name.symbol != 'BOT' && name.symbol != 'f6-sOHM' && name.symbol != 'usdnCrv' && name.symbol != 'alUSD3CRV-f' && name.symbol != 'eCrv' && name.symbol != 'YVUSDC' && name.symbol != 'B-stETH-STABLE' && name.symbol != 'hbtcCrv' && name.symbol != 'SAFEMOON' && name.symbol != 'SAVAX' && name.symbol != 'G-UNI' && name.symbol != 'B-50WBTC-50WETH' && name.symbol != 'fsOHM-18' && name.symbol != 'YVUSDT' && name.symbol != 'brenCrv' && name.symbol != 'musdCrv' && name.symbol != 'fTRIBE-8' && name.symbol != 'crETH' && name.symbol != 'staBAL3' && name.symbol != 'apFEI-TRIBE' && name.symbol != 'CVXCRV'));
    
    

    return (
    <>
        
        {/* <input value={search} onChange={searcher} type='text' placeholder='Search...' className='form-control' /> */}
        <div className='mt-2 mb-3'>
            <img src='http://livecodestream.dev/post/a-better-approach-to-dark-mode-on-your-website/featured.jpg' height="20px" onClick={ToggleSwitch}/>
        </div>
        <table className={switchToggled ? 'table table-ligth table-hover mt-2' : 'table table-dark table-hover mt-2'}>
            <thead >
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>% 1h</th>
                    <th>% 1d</th>
                    <th>% 1w</th>
                </tr>
            </thead>
            <tbody>
                { results.coins.map( (result)=> (
                    <tr key={result.id}>
                        <td > 
                            {result.rank} 
                        </td>
                        <td>
                            <img src={result.icon} height="20px"/> {result.symbol.toUpperCase()}
                        </td>
                        <td>
                            { result.price >= 10000 ? (
                                <span>{'$ ' + result.price.toFixed(0)}</span>
                            ): result.price < 10000 && result.price >= 1000 ? (
                                <span>{'$ ' + result.price.toFixed(1)}</span>
                            ): result.price < 1000 && result.price >= 100 ? (
                                <span>{'$ ' + result.price.toFixed(2)}</span>
                            ): result.price < 100 && result.price >= 10 ? (
                                <span>{'$ ' + result.price.toFixed(3)}</span>
                            ): result.price < 10 && result.price >= 0.1 ? (
                                <span>{'$ ' + result.price.toFixed(4)}</span>
                            ): result.price < 0.1 && result.price >= 0.001 ? (
                                <span>{'$ ' + result.price.toFixed(5)}</span>
                            ): result.price < 0.001 && result.price >= 0.00001 ? (
                                <span>{'$ ' + result.price.toFixed(7)}</span>
                            ): result.price < 0.00001 && result.price >= 0.000001 ? (
                                <span>{'$ ' + result.price.toFixed(8)}</span>
                            ): result.price < 0.000001 ? (
                                <span>{'$ ' + result.price.toFixed(11)}</span>
                            ):(
                                <a/>
                            ) }
                        </td>
                        <td>
                            { result.priceChange1h < 0 ? (
                                <span className='text-danger'>{result.priceChange1h}</span>  
                            ):(
                                <span className='text-success'>{result.priceChange1h}</span>    
                            ) }
                        </td>
                        <td>
                            { result.priceChange1d < 0 ? (
                                <span className='text-danger'>{result.priceChange1d}</span>  
                            ):(
                                <span className='text-success'>{result.priceChange1d}</span>    
                            ) }
                        </td>
                        <td>
                            { result.priceChange1w < 0 ? (
                                <span className='text-danger'>{result.priceChange1w}</span>  
                            ):(
                                <span className='text-success'>{result.priceChange1w}</span>    
                            ) }
                        </td> 
                    </tr>
                ))}
            </tbody>
        </table>
        
    </>
    )

}
export default Crypto