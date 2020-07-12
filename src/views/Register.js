import React from 'react';
import { register } from '../function';
import { useHistory } from 'react-router-dom';

const Register = () => {

    let history = useHistory();

    const [state, setState] = React.useState({email: "", password: ""});

    const handleChange = (e) => {
        setState({...state, [e.target.name]: e.target.value})
;    }

    const getRegister = (e) => {
        e.preventDefault();
        register({email: state.email, password: state.password})
            .then(data => {
                setState({email: "", password: ""})
                alert(data.message);
                history.push('/')
            })
            .catch(err => alert(err.response.data.message))
    };

    return (
        <div>
            <form onSubmit={getRegister}>
                <h3>Register</h3>
                <input onChange={handleChange} name="email" placeholder="Email" value={state.email} />
                <br />
                <input onChange={handleChange} name="password" type="password" placeholder="Password" value={state.password} />
                <br />
                <button type="submit">Create</button>
            </form>
        </div>
    )

};

export default Register;