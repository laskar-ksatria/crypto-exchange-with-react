import React from 'react';
import { priceContext } from '../views/Main'

function PriceCard() {

    const state = React.useContext(priceContext)

    const [apperance, setApperance] = React.useState({currentPrice: null, lastPrice: null, textColor: "gray", backColor: "whitesmoke"});

    React.useEffect(() => {
        if (apperance.currentPrice === null) {
            setApperance(prev => ({...prev, currentPrice: state.marketPrice }))
        }else {
            let { currentPrice} = apperance;
            setApperance(prev => ({...prev, currentPrice: state.marketPrice, lastPrice: currentPrice}))
            if (state.marketPrice < currentPrice) {
                setApperance(prev => ({...prev, textColor: 'yellow', backColor: 'red'}))
            }else {
                setApperance(prev => ({...prev, textColor: 'whitesmoke', backColor: 'green'}))
            }
        }
    },[state])

    return (
        <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: '30px'}}>
            <div style={{width: '13%', color: apperance.textColor,background: apperance.backColor, height: '80px', border: '1px solid grey', borderRadius: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <h1>{state.marketPrice}</h1>
            </div>
        </div>
    )

};

export default PriceCard;