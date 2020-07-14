import React from 'react';

import FormLimit from './FormLimit';
import FormMarket from './FormMarket';
import PriceCard from './PriceCard';
import { getAccount } from '../function';

function Exchange() {

    const [myData, setMyData] = React.useState(null)

    const getMyAccount = () => {
        getAccount().then(data => {
            console.log(data);
            setMyData(data)
        })
    };

    React.useEffect(getMyAccount, []) 

    return (
        <React.Fragment>
            <PriceCard />
            <h3>BTC: {myData ? myData.BTC_coin : ""}</h3>
            <h3>USD: ${myData ? myData.balance : ""}</h3>
            <button type="button" onClick={getMyAccount}>Get</button>
            <div style={{display: 'flex', width: '100%', justifyContent: 'space-around'}}>
                <FormLimit getMyAccount={getMyAccount} />
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