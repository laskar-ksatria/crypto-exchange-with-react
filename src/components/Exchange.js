import React from 'react';

import FormLimit from './FormLimit';
import FormMarket from './FormMarket';

function Exchange() {


    return (
        <React.Fragment>
            <div style={{display: 'flex', width: '100%', justifyContent: 'space-around'}}>
                <FormLimit />
                <FormMarket />
            </div>
        </React.Fragment>
    )

};

export default Exchange;