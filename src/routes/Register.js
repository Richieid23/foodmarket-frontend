import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const Register = ({ setAuth }) => {
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: ""
    })

    const { name, email, password } = inputs;

    const onChange = (e) => {
        setInputs({...inputs, [e.target.name] : e.target.value});
    }

    const onSubmitForm = async(e) => {
        e.preventDefault();
        try {
            const body = { name, email, password };
            const response = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })

            const parseRes = await response.json()

            localStorage.setItem("token", parseRes.token);
            setAuth(true);
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <Fragment>
            <h1 className='text-center my-3'>Register</h1>
            <form onSubmit={onSubmitForm}>
                <input value={name} onChange={e => onChange(e)} type="text" name='name' placeholder='name' className='form-control my-3' />
                <input value={email} onChange={e => onChange(e)} type="email" name='email' placeholder='email' className='form-control my-3' />
                <input value={password} onChange={e => onChange(e)} type="password" name='password' placeholder='password' className='form-control my-3' />
                <button className='btn btn-success btn-block'>Sign Up</button>
            </form>
            <Link to="/login">Login</Link>
        </Fragment>
    )
}

export default Register;