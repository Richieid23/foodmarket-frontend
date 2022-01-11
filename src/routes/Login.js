import React, { Fragment, useState } from 'react';

const Login = ({ setAuth }) => {
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    })

    const { email, password } = inputs;

    const onChange = (e) => {
        setInputs({...inputs, [e.target.name] : e.target.value});
    }

    const onSubmitForm = async(e) => {
        e.preventDefault();
        try {
            const body = { email, password };
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })

            const parseRes = await response.json()

            if(parseRes.status === 'success'){
                if (parseRes.data.user.role === 'ADMIN') {
                    localStorage.setItem("token", parseRes.token);
                    setAuth(true);
                } else {
                    alert('Unauthorize')
                }
            } else {
                alert(parseRes.message)
            }
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <Fragment>
            <h1 className='text-center my-3'>Login</h1>
            <form onSubmit={onSubmitForm}>
                <input value={email} onChange={e => onChange(e)} type="email" name='email' placeholder='email' className='form-control my-3' />
                <input value={password} onChange={e => onChange(e)} type="password" name='password' placeholder='password' className='form-control my-3' />
                <button className='btn btn-success btn-block'>Log In</button>
            </form>
        </Fragment>
    )
}

export default Login;