import React from 'react';

import FormLimit from './FormLimit';
import FormMarket from './FormMarket';
import PriceCard from './PriceCard';
import { getAccount } from '../function';
import Socket from 'socket.io-client';
let Io

function Exchange() {

    const ENDPOINT = process.env.REACT_APP_BASE_URL
    // const ENDPOINT = 'http://localhost:3050'

    const [myData, setMyData] = React.useState(null)

    const getMyAccount = () => {
        getAccount().then(data => {
            setMyData(data)
        })
    };

    const getSocket = () => {
        Io = Socket(ENDPOINT);
        if (myData) {
            Io.on(`${myData.user}-btcusd`, data => {
                setMyData(data);
            })
        }
        return () => {
            Io.emit('disconnected')
        }
    }
    React.useEffect(getMyAccount, []);
    React.useEffect(getSocket,[ENDPOINT, myData])

    return (
        <React.Fragment>
            <PriceCard />
            <h3>BTC: {myData ? myData.BTC_coin : ""}</h3>
            <h3>USD: ${myData ? myData.balance : ""}</h3>
            <button type="button" onClick={getMyAccount}>Get</button>
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