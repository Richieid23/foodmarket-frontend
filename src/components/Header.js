import React, {Fragment, useState, useEffect} from 'react';

const Header = ({ setAuth }) => {
    const [username, setUsername] = useState("");

    const getUsername = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/auth/verified",{
                method: "GET",
                headers: {token: localStorage.token}
            });

            const parseRes = await response.json();
            setUsername(parseRes.data.user.username);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getUsername();
    }, []);

    return (
        <Fragment>
            <div className='mt-3'>
                <h1 className='text-center'>PERN FOODMARKET</h1>
                <p className='text-center font-weight-bold'>Selamat Datang {username}</p>
            </div>
        </Fragment>
    )
}

export default Header;