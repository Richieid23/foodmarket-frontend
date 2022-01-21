import React, { Fragment, useEffect, useState } from "react";
import OrderEdit from "./OrderEdit";

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  const getOrder = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/order", {
          method: "GET",
          headers: {token: localStorage.token}
        }
      );
      const jsonData = await response.json();
      setOrders(jsonData.data.orders);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  return (

    <Fragment>
      <div className="list-group mt-3">
        <table className="table table-dark table-hover table-responsive-lg">
          <thead>
            <tr className="bg-primary">
              <th scope="col">User</th>
              <th scope="col">Menu</th>
              <th scope="col">Quantity</th>
              <th scope="col">Total</th>
              <th scope="col">Status</th>
              <th scope="col">Edit</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              return (
                <tr key={order.id}>
                  <th>{order.user_name}</th>
                  <td>{order.menu_name}</td>
                  <td>{order.quantity}</td>
                  <td>IDR {order.total}</td>
                  <td>{order.status}</td>
                  <td>
                    <OrderEdit order={order} />
                  </td>
                  
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default OrderList;
