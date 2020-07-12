import React from 'react';
import { useHistory } from 'react-router-dom';
import { logout } from '../function'

function Header() {

    let history = useHistory();

    return (
        <div style={{width: '100%', height: '70px', background: 'black', display: 'flex', justifyContent: 'space-between'}}>
            <h2 style={{color: 'white', marginLeft: '10px'}}>Exchange</h2>
            <h3 style={{color: 'white', marginRight: '10px', cursor: 'pointer'}} onClick={() => logout(() => history.push('/'))}>Logout</h3>
        </div>
    )

};

export default Header;