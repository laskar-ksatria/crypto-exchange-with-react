import React from 'react';
import Header from '../components/Header';
import Exchange from '../components/Exchange';
import { w3cwebsocket } from 'websocket';

const client = new w3cwebsocket('wss://streamer.cryptocompare.com/v2?api_key=' + process.env.REACT_APP_WEBSOCKET_APIKEY);

class Main extends React.Component {

    state = {
        price: null,
        last_price: null,
        textColor: "",
        backColor: ""
    }

    componentDidMount() {

        client.onopen = () => {
            var subRequest = {
                "action": "SubAdd",
                "subs": ["5~CCCAGG~BTC~USD"]
            }
            client.send(JSON.stringify(subRequest))
        }

        client.onmessage = (message) => {
            // console.log(JSON.parse(message.data))
        }
    }



    render() {
        return (
            <div>
                <Header />
                <Exchange/>
            </div>
        )
    }
}

export default Main;