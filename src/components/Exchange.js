import React from 'react';

import FormLimit from './FormLimit';

function Exchange() {


    return (
        <React.Fragment>
            <div style={{display: 'flex', width: '100%', justifyContent: 'space-around'}}>
                <FormLimit />
                <div>
                    <h1>Market Trade</h1>
                </div>
            </div>
        </React.Fragment>
    )

};

export default Exchange;