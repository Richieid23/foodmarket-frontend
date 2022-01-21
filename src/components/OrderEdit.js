import React, { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";

const OrderEdit = ({ order }) => {
  const [status, setStatus] = useState(order.status);
  const history = useHistory();

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { status };
      await fetch(`http://localhost:5000/api/order/${order.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", token: localStorage.token },
        body: JSON.stringify(body),
      });

      history.go(0);
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${order.id}`}
      >
        Edit
      </button>

      <div className="modal" id={`id${order.id}`}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Menu</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                onClick={() => {
                  setStatus(order.status);
                }}
              >
                &times;
              </button>
            </div>

            <div class="modal-body">
              <label className="mt-1">Status</label>
              <select
                className="form-control custom-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">
                  Pilih tipe..
                </option>
                <option value="ON_DELIVERY">ON DELIVERY</option>
                <option value="SUCCESS">SUCCESS</option>
              </select>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                data-dismiss="modal"
                onClick={(e) => onSubmitForm(e)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={() => {
                  setStatus(order.status);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default OrderEdit;
