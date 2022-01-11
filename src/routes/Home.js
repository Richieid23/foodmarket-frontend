import React, { Fragment } from 'react'
import Header from '../components/Header';
import MenuInput from '../components/MenuInput';
import MenuList from '../components/MenuList';

const Home = ({ setAuth}) => {
    return (
        <Fragment>
            <Header setAuth={setAuth}/>
            <MenuInput/>
            <MenuList/>
        </Fragment>
    )
}

export default Home;
