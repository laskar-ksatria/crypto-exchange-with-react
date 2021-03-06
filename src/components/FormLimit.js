import React from 'react';
import { createLimitOrder, generateSocketData, generateLimitTrade, getLimitOrder} from '../function';
import Socket from 'socket.io-client';
import LimitTradeList from './LimitTradeList';
import { priceContext } from '../views/Main'
import MyLimit from './MyLimit';
let Io;

function FormLimit() {

    const ENDPOINT = 'http://45.76.191.49';

    const { marketPrice } = React.useContext(priceContext)

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
                    console.log(data);
                })
                .catch(err => alert("Oopps, something wrong"))
        }else {
            alert(`Price and amount cannot be empty`)
        }
    };

    const getAllLimitTrades = () => {
        getLimitOrder('btcusd')
            .then(data => {
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
                setTradeList(prevState => ({...prevState, buy: buy.sort(function(a, b){return a.price - b.price})}))
            }else if (order_type === 'sell') {
                setTradeList(prevState => ({...prevState, sell: sell.sort(function(a, b){return a.price - b.price})}))
            }else if (order_type === 'all'){
                setTradeList({buy: buy, sell: sell});
            }
        })

    },[ENDPOINT])

    return (
        <div style={{padding: '10px'}}>
            <h1>Limit Order</h1>
            <input placeholder="Price" name="price" onChange={handleChange} />
            <input placeholder="Amount" name="amount" onChange={handleChange} />
            <br />
           <div style={{marginTop: '10px'}}>
                <button style={{width: '60px', height: '25px' ,cursor: 'pointer', background: 'green', color: 'white'}} type="button" onClick={() => orderLimit('buy')}>Buy</button>
                <button style={{width: '60px', height: '25px' ,cursor: 'pointer', background: 'red', color: 'yellow'}} type="button" onClick={() => orderLimit('sell')}>Sell</button>
           </div>
           <div style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '30px'}}>
                <div>
                    <LimitTradeList tradeList={tradeList} />
                </div>
           </div>
           <MyLimit />
        </div>
    )

};

export default FormLimit;