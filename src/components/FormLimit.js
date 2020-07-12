import React from 'react';
import { createLimitOrder, generateSocketData, generateLimitTrade, getLimitOrder } from '../function';
import Socket from 'socket.io-client';
import LimitTradeList from './LimitTradeList';
let Io;

function FormLimit() {

    const ENDPOINT = process.env.REACT_APP_BASE_URL;

    const [limitData, setLimitData] = React.useState({price: null, amount: null});
    const [tradeList, setTradeList] = React.useState({buy: [], sell: []})
    
    const handleChange = (e) => {
        setLimitData({...limitData, [e.target.name]: e.target.value});
    };

    const orderLimit = (order_type) => {
        if (limitData.price && limitData.amount) {
            let { price, amount } = limitData;
            let data = {price, amount, order_type, pair: 'btcusd', first_currency: 'btc', second_currency: 'usd'};
            createLimitOrder(data)
                .then(data => {
                    alert(data.message);
                })
                .catch(err => alert("Oopps, something wrong"))
        }else {
            alert(`Price and amount cannot be empty`)
        }
    };

    const getAllLimitTrades = () => {
        getLimitOrder('btcusd')
            .then(data => {
                console.log(data)
                let { buy, sell } = generateLimitTrade(data);
                setTradeList({buy, sell})

            }).catch(err => alert("Oops something wrong"))
    };

    React.useEffect(getAllLimitTrades,[])

    React.useEffect(() => {
        Io = Socket(ENDPOINT);
        Io.on('btcusd-limit', data => {
            let { buy, sell } = generateSocketData(data);
            let { order_type } = data;
            if (order_type === 'buy') {
                setTradeList(prevState => ({...prevState, buy: buy}))
            }else if (order_type === 'sell') {
                setTradeList(prevState => ({...prevState, sell: sell}))
            }else {
                setLimitData({buy: buy, sell: sell});
            }
        })
    },[ENDPOINT])


    return (
        <div style={{padding: '10px'}}>
            <h1>Limit Order</h1>
            <input placeholder="Price" name="price" onChange={handleChange} />
            <input placeholder="Amount" name="amount" onChange={handleChange} />
            <br />
            <button type="button" onClick={() => orderLimit('buy')}>Buy</button>
            <button type="button" onClick={() => orderLimit('sell')}>Sell</button>
           <div style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '30px'}}>
                <div>
                    <LimitTradeList tradeList={tradeList} />
                </div>
           </div>
        </div>
    )

};

export default FormLimit;