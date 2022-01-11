import React, { Fragment, useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

//component
import Home from './routes/Home';
import Login from './routes/Login';
import Register from './routes/Register';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const setAuth = (boolean) => {
        setIsAuthenticated(boolean);
    }

    const isAuth = async() => {
        try {
            const response = await fetch("http://localhost:5000/api/auth/is-verify", {
                method: "GET",
                headers: {token: localStorage.token}
            });

            const parseRes = await response.json();
            (parseRes === true) ? setIsAuthenticated(true) : setIsAuthenticated(false);
            console.log(parseRes);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        isAuth();
    }, [])

    return (
        <Fragment>
            <div className='container'>
                <Router>
                    <Switch>
                        <Route exact path="/" render={(props) => 
                            isAuthenticated ? <Home {...props} setAuth={setAuth}/> : <Redirect to="/login"/>
                        }
                        />
                        <Route exact path="/login" render={(props) => 
                            !isAuthenticated ? <Login {...props} setAuth={setAuth}/> : <Redirect to="/"/>
                        }/>
                        <Route exact path="/register" render={(props) => 
                            !isAuthenticated ? <Register {...props} setAuth={setAuth}/> : <Redirect to="/login"/>
                        }/>
                    </Switch>
                </Router>
            </div>
        </Fragment>
    );
}

export default App;