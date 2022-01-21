import React, {Fragment, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

const Header = ({ setAuth }) => {
    const [name, setName] = useState("");

    const getName = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/auth/verified",{
                method: "GET",
                headers: {token: localStorage.token}
            });

            const parseRes = await response.json();
            setName(parseRes.data.user.name);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getName();
    }, []);

    return (
      <Fragment>
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
          <a className="navbar-brand" href="#">
            Pern FoodMarket
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/"}>
                  Menu
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/order"}>
                  Order
                </Link>
              </li>
            </ul>
            <span class="navbar-text">Welcome, {name}</span>
          </div>
        </nav>
      </Fragment>
    );
}

export default Header;