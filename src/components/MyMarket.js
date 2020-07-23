import React from 'react';
import { getMyMarket } from './functions';

function MyMarket() {

    const [myMarket, setMyMarket] = React.useState(null);

    const getMyMarketList = () => {
        getMyMarket()
            .then(data => {
                setMyMarket(data)
            })
    };

    React.useEffect(getMyMarketList, [])

    return (
        <div style={{width: '100%'}}>
            <table style={{width: '100%'}}>
                <thead>
                    <tr>
                        <td>Price</td>
                        <td>Type</td>
                        <td>Amount</td>
                    </tr>
                </thead>
                <tbody>
                    {myMarket ? myMarket.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item.price}</td>
                                <td>{item.order_type}</td>
                                <td>{item.amount}</td>
                            </tr>
                        )
                    }) : ""}
                </tbody>
            </table>
        </div>
    )

};

export default MyMarket;