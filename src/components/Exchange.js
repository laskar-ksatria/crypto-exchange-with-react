import React from 'react';

import FormLimit from './FormLimit';
import FormMarket from './FormMarket';
import PriceCard from './PriceCard';
import Socket from 'socket.io-client';
let Io

function Exchange({ myAccount }) {

    const ENDPOINT = process.env.REACT_APP_BASE_URL
    
    const [Account, setAccount] = React.useState(null);

    React.useEffect(() => {
        setAccount(myAccount);
    },[myAccount])

    React.useEffect(() => {
        Io = Socket(ENDPOINT);  
            console.log(myAccount.user);
            Io.on(`${myAccount.user}-btcusd`, data => {
                alert("Masuk");
                console.log(data);
                setAccount(data);
            })
    },[ENDPOINT, myAccount])


    return (
        <React.Fragment>
            <PriceCard />
            <h3>BTC: {Account ? Account.BTC_coin : ""}</h3>
            <h3>USD: ${Account ? Account.balance : ""}</h3>
            <button type="button">Get</button>
            <div style={{display: 'flex', width: '100%', justifyContent: 'space-around'}}>
                <FormLimit />
                <FormMarket />
            </div>
        </React.Fragment>
    )

};

// const MyData = props => {
//     return (
//         <React.Fragment>
//             <h3>BTC: {props.first_type ? props.data.first_type : ""}</h3>
//             <h3>USD: {props.first_type ? props.data.second_type : ""}</h3>
//         </React.Fragment>
//     )
// }

export default Exchange;