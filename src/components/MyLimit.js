import React from 'react';
import { getMyLimit, deleteMyLimit } from './functions';
import { UserContext } from '../App'
import Socket from 'socket.io-client';
let Io;


function MyLimit() {
    let { user } = React.useContext(UserContext)
    const [myLimit, setMyLimit] = React.useState(null);
    const ENDPOINT = 'http://localhost:3050';
    
    const myLimitList = () => {
        getMyLimit().then(data => {
            setMyLimit(data)
        })
    };

    React.useEffect(() => {
        Io = Socket(ENDPOINT);
       if (user) {
        Io.on(`${user._id}-btcusd-limit`, data => {
            myLimitList();
        })
       }
    }, [ENDPOINT, user])

    React.useEffect(myLimitList, []);
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <td>Price</td>
                        <td>Type</td>
                        <td>Amount</td>
                        <td>Filled</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {myLimit ? myLimit.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item.price}</td>
                                <td>{item.order_type}</td>
                                <td>{item.amount}</td>
                                <td>{item.filled}</td>
                                <td>
                                    <button type="button" onClick={() => deleteMyLimit(item._id, item.pair,myLimitList)}>Cancel</button>
                                </td>
                            </tr>
                        )
                    }) : ""}
                </tbody>
            </table>
        </div>
    )

};

export default MyLimit;