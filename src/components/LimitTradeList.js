import React from 'react';

function LimitTradeList(props) {
    return (
        <table style={{width: '250px', border: '1px solid grey'}}>
        <thead style={{color: 'white', backgroundColor: 'blue'}}>
            <tr>
                <td>Price</td>
                <td>Amount</td>
                <td>Filled</td>
            </tr>
        </thead>
        <tbody style={{background: 'whitesmoke'}}>
            {props.tradeList.buy.map((item, index) => {
                if (item) {
                    return (
                        <tr key={index} style={{fontWeight: 'bolder', cursor: 'pointer'}}>
                            <td>{item.price}</td>
                            <td>{(item.amount).toFixed(2)}</td>
                            <td>{(item.filled).toFixed(2)}</td>
                        </tr>
                    )
                }else {
                    return (
                        <tr key={index}>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                        </tr>
                    )
                }
            })}
          

            <tr style={{backgroundColor: 'black', height: '10px'}}>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            {props.tradeList.sell.map((item, index) => {
                if (item) {
                    return (
                        <tr key={index} style={{fontWeight: 'bolder',cursor: 'pointer'}}>
                            <td>{item.price}</td>
                            <td>{(item.amount).toFixed(2)}</td>
                            <td>{(item.filled).toFixed(2)}</td>
                        </tr>
                    )
                }else {
                    return (
                        <tr key={index}>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                        </tr>
                    )
                }
            })}
        </tbody>
    </table>
    )
};

export default LimitTradeList;