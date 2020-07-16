import axios from 'axios';


const baseUrl = process.env.REACT_APP_BASE_URL

export const inititalState = {
    btc_price: null
}

const reducer = ((state, action) => {

})

export const register = (data) => {
    return new Promise((res,rej) => {
        axios({
            url: process.env.REACT_APP_BASE_URL + '/users',
            data: data,
            method: 'POST'
        })
        .then(({data}) => {
            res(data)
        })
        .catch(err => rej(err));
    })
};

export const logout = (cb) => {
    localStorage.removeItem('exchangetoken')
    cb();
}

export const login = (data) => {
    return new Promise((res,rej) => {
        axios({
            url: process.env.REACT_APP_BASE_URL + '/users/login',
            method: 'POST',
            data: data
        })
        .then(({data}) => res(data))
        .catch(err => rej(err))
    })
};

export const getAccount = () => {
    return new Promise((res,rej) => {
        axios({
            url: process.env.REACT_APP_BASE_URL + '/account',
            method: 'GET',
            headers: {
                jwttoken: localStorage.getItem('exchangetoken')
            }
        })
        .then(({data}) => {
            console.log(data);
            res(data)
        })
        .catch(err => rej(err))
    })
};

export const getPrice = (first_currency, second_currency) => {
    return new Promise((res,rej) => {
        axios.get(`https://min-api.cryptocompare.com/data/price?fsym=${first_currency}&tsyms=${second_currency}`)
            .then(({data}) => {
                res(data)
            })
            .catch(err => rej(err))
    })
};

export const createLimitOrder = (data) => {
    let { amount, price, order_type, first_currency, second_currency, pair } = data
    return new Promise((res,rej) => {
        axios({
            url: `${baseUrl}/trade/limit/${order_type}/?pair=${pair}`,
            method: 'POST',
            headers: {jwttoken: localStorage.getItem('exchangetoken')},
            data: {
                amount, price, order_type, first_currency, second_currency
            }
        })
        .then(({data}) => {
            res(data)
        })
        .catch(rej)
    })
};

export const getLimitOrder = (pair) => {
    return new Promise((res,rej) => {
        axios({
            url: `${baseUrl}/trade/limit/?pair=${pair}`,
            method: 'GET',
            headers: {jwttoken: localStorage.getItem('exchangetoken')},
        })
        .then(({data}) => {
            res(data)
        }).catch(rej);
    })
};

export const generateLimitTrade = (data) => {
    let buy = [];
    let sell = [];
    data.forEach(item => {
        if (item.order_type === 'buy') {
            buy.push(item)
        }else {
            sell.push(item);
        }
    })
    let newBuy = [];
    let newSell = [];
    let countBuy = buy.length - 1;
    let countSell = sell.length - 1;

    for (let i = 0; i < 9; i++) {
        if (i <= countBuy) {
            newBuy.push(buy[i]);
        }else {
            newBuy.push(false)
        }
        if (i <= countSell) {
            newSell.push(sell[i]);
        }else {
            newSell.push(false);
        }
    };

    return {buy: newBuy, sell: newSell}

}

export const generateSocketData = (data) => {
    let { limitTrades, order_type } = data;
    let buy = [];
    let sell = [];
    let count = limitTrades.length - 1;
    if (order_type === 'buy') {
        for (let i = 0; i < 9; i++) {
            if (i <= count) {
                buy.push(limitTrades[i])
            }else {
                buy.push(false);
            }
        }
        return {buy}
    }else if (order_type === 'sell') {
        for (let i = 0; i < 9; i++) {
            if (i <= count) {
                sell.push(limitTrades[i])
            }else {
                sell.push(false)
            }
        }
        return {sell}
    }else {
        for (let i = 0; i < 9; i++) {
            if (i <= count) {
                if (limitTrades[i].order_type === 'buy') {
                    buy.push(limitTrades[i])
                }else if (limitTrades[i].order_type === 'sell') {
                    sell.push(limitTrades[i])
                }
            }else {
                buy.push(false);
                sell.push(false);
            }
        }
        return {buy, sell}
    }
};