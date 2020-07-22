import React from 'react';
import MarketTradeList from './MarketTradeList';

function FormMarket() {
    return (
        <div>
            <h1>Market Trade</h1>
            <input placeholder="Amount" />
            <br />
           <div style={{marginTop: '10px'}}>
                <button style={{width: '60px', height: '25px' ,cursor: 'pointer', background: 'green', color: 'white'}} type="button">Buy</button>
                <button style={{width: '60px', height: '25px' ,cursor: 'pointer', background: 'red', color: 'yellow'}} type="button">Sell</button>
           </div>
           <div style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '30px'}}>
                <div>
                    <MarketTradeList />
                </div>
           </div>
        </div>
    )
};

export default FormMarket;