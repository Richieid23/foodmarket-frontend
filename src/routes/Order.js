import React, { Fragment } from "react";
import Header from "../components/Header";
import OrderList from "../components/OrderList";

const Order = ({ setAuth }) => {
  return (
    <Fragment>
      <Header setAuth={setAuth} />
      <OrderList />
    </Fragment>
  );
};

export default Order;
