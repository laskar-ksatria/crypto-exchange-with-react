import React from 'react';
import { login } from '../function'
import { useHistory } from 'react-router-dom';

const Login = () => {

    let history = useHistory();

    const [state, setState] = React.useState({email:"", password: ""});

    const getLogin = (e) => {
        e.preventDefault();
        login({email: state.email, password: state.password})
            .then(data => {
                localStorage.setItem('exchangetoken', data.token);
                alert("Welcome");
                history.push('/main')
            }).catch(err => alert(err.response.data.message))
    };

    const handleChange = (e) => {
        setState({...state, [e.target.name]: e.target.value})
    };

    return (
        <div>
            <form onSubmit={getLogin}>
                <h3>Login</h3>
                <input name="email" onChange={handleChange} placeholder="Email" type="text" value={state.email} />
                <br />
                <input name="password" onChange={handleChange} placeholder="Password" type="password" value={state.password} />
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    )

};

export default Login;