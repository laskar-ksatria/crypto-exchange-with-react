import React from 'react';
import MarketTradeList from './MarketTradeList';
import MyMarket from './MyMarket'
import { orderMarket } from './functions'

//Context
import { priceContext } from '../views/Main'

function FormMarket() {

    let { marketPrice } = React.useContext(priceContext);

    const [amount, setAmount] = React.useState("");

    const handleChange = e => {
        setAmount(e.target.value);
    };

    const sendOrder = (order_type) => {
        let data = { amount: amount.trim(), price: marketPrice, first_currency: 'btc', second_currency: 'usd', order_type, pair: 'btcusd'}
        orderMarket(data)
    }

    return (
        <div>
            <h1>Market Trade</h1>
            <input placeholder="Amount" onChange={handleChange} />
            <br />
           <div style={{marginTop: '10px'}}>
                <button onClick={() => sendOrder('buy')} style={{width: '60px', height: '25px' ,cursor: 'pointer', background: 'green', color: 'white'}} type="button">Buy</button>
                <button onClick={() => sendOrder('sell')} style={{width: '60px', height: '25px' ,cursor: 'pointer', background: 'red', color: 'yellow'}} type="button">Sell</button>
           </div>
           <div style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '30px'}}>
                <div>
                    <MarketTradeList />
                </div>
           </div>
           <MyMarket />
        </div>
    )
};

export default FormMarket;