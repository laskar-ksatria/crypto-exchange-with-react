import React from 'react';
import { Link, Switch, Route, useRouteMatch } from 'react-router-dom'

function Loop() {

    const [route, setRoute] = React.useState(['apple','banana']);
    const [inputRoute, setInputRoute] = React.useState("");
    let { path, url } = useRouteMatch();
    const handleChange = (e) => {
        setInputRoute(e.target.value)
    };

    const plusRoute = () => {
        setRoute(prev => ([...prev, inputRoute]));
    };

    return (
        <div>

            <h1>Route</h1>

            <input placeholder="Input Route" onChange={handleChange} />
            <button type="button" onClick={plusRoute}>Add</button>
            <br />
                {route.map((item,index) => {
                    return (
                        <li key={index}>
                            <Link to={`${url}/${item}`}>{item}</Link>
                        </li>
                    )
                })}
            <hr />
                
                <Switch>
                    {route.map((item, index) => {
                        return (
                            <Route key={index} exact path={`${path}/${item}`}>
                                <h1>Route result: {item}</h1>
                            </Route>
                        )
                    })}
                </Switch>

        </div>
    )

};

export default Loop;