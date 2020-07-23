import axios from 'axios';
import cogoToast from 'cogo-toast';

const baseUrl = 'http://localhost:3050'

export const getMyLimit = () => {
    return new Promise((res, rej) => {
        axios({
            url: baseUrl + '/trade/myLimitTrade?pair=btcusd',
            method: 'GET',
            headers: {jwttoken: localStorage.getItem('exchangetoken')}
        })
        .then(({data}) => {
            cogoToast.success("Success fetching data", { position: 'top-right'});
            res(data)
        })
        .catch(rej)
    })
};

export const getMyMarket = () => {
    return new Promise((res, rej) => {
        axios({
            url: baseUrl + '/trade/myMarketTrade?pair=btcusd',
            method: 'GET',
            headers: {jwttoken: localStorage.getItem('exchangetoken')}
        })
        .then(({data}) => {
            res(data)
        })
        .catch(err => rej(err))
    })
};

export const deleteMyLimit = (id, pair, cb) => {
        axios({
            url: baseUrl + '/trade/limit/delete/' + `?pair=${pair}&limitId=${id}` ,
            method: 'DELETE',
            headers: {
                jwttoken: localStorage.getItem('exchangetoken')
            }
        })
        .then(({data}) => {
           alert(data.message)
           cb();
        })
        .catch(err => alert(err.response.data.message))
};

export const orderMarket = (data) => {
    axios({
        url: baseUrl + '/trade/market/buy?pair=' + data.pair,
        method: 'POST',
        headers: {
            jwttoken: localStorage.getItem('exchangetoken')
        },
        data
    })
    .then(({data}) => {
        cogoToast.success(data.message, {position: 'top-right'})
    })
    .catch()
};



