import React from 'react';
import Header from '../components/Header';
import Exchange from '../components/Exchange';
import { w3cwebsocket } from 'websocket';
import { getPrice, getUserData, getAccount } from '../function'
import Chat from '../components/Chat'
// const client = new w3cwebsocket('wss://streamer.cryptocompare.com/v2?api_key=' + process.env.REACT_APP_WEBSOCKET_APIKEY);
import { UserContext } from '../App'

export const priceContext = React.createContext();

function Main() {

    let { dispatch } = React.useContext(UserContext) 

    const ENDPOINT = 'wss://streamer.cryptocompare.com/v2';

    const marketPair = ['BTC', 'USD']

    const [marketPrice, setMarketPrice] = React.useState(null);

    const [myAccount, setMyAccount] = React.useState(null);

    const getMyAccount = () => {
       getAccount()
       .then(data => {
            setMyAccount(data)
        })
        .catch(err => alert('Upps something wrong'))
    }

    const pricing = () => {
        getPrice(marketPair[0], marketPair[1])
            .then(data => {
                setMarketPrice(data.USD)
            })
    };

    const getMyData = () => {
        getUserData(dispatch)
    };

    React.useEffect(pricing, []);
    React.useEffect(getMyAccount, []);
    React.useEffect(getMyData, []);

    const getWebSocket = () => {
        const client = new w3cwebsocket(ENDPOINT + '?api_key=' + process.env.REACT_APP_WEBSOCKET_APIKEY);
        client.onopen = () => {
            let subRequest = {
                "action": "SubAdd",
                "subs": ["5~CCCAGG~BTC~USD"]
            }
            client.send(JSON.stringify(subRequest))
        };

        client.onmessage = message => {
            let data = JSON.parse(message.data);
            if (data.PRICE && data.FROMSYMBOL === marketPair[0]) {
                setMarketPrice(data.PRICE)
            }
        }
    }

    React.useEffect(getWebSocket, [ENDPOINT])
    

    return (
        <div>
            <Header />
            <priceContext.Provider value={{marketPrice}}>
                {myAccount ? <Exchange myAccount={myAccount} /> : "Loading..."}
                {/* <Chat /> */}
            </priceContext.Provider>
        </div>
    )

};

export default Main;
