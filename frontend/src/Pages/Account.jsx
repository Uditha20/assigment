import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import axios from "axios";
import { useUser } from "../context/UserContext";
import Header from "../Components/Header";

const Account = () => {
  const { user } = useUser();
  console.log(user);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    if (user && user._id) {
      axios
        .get(`http://localhost:5000/sales/user/${user._id}/orders`) // Adjust the URL according to your backend routes
        .then(({ data }) => {
          setOrders(data); // Assuming you have a state variable 'setOrders' to store the fetched orders
        })
        .catch((error) => {
          console.error("Error fetching orders", error);
          // Handle error (e.g., set an error state, display a message, etc.)
        });
    }
  }, [user]);
  console.log(orders);
  return (
    <>
  <Header/>
    <div className="container">
      
      <div className="row d-flex pt-5">
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            <h6 style={{ opacity: "50%" }}>Home /</h6>
            <h6 className="ms-2">My Account/</h6>
          </div>
          <div className="justify-content-end">
            <h6>Welcome!</h6>
          </div>
        </div>
      </div>
      <div className="container d-flex pt-4">
        <div className="col-lg-3">
          <div className="row">
            <div className="col-12">
              <div
                className="d-flex flex-row flex-wrap flex-lg-column align-items-start justify-content-center"
                style={{ height: "auto" }}
              >
                <button
                  type="button"
                  className="btn"
                  data-bs-toggle="button"
                ></button>
                <div className="mx-4">
                  <button type="button" className="btn btn-primary" data-bs-toggle="button">
                    My Profile
                  </button>
                </div>
                <Link
                  to={"/orders"}
                  style={{
                    textDecoration: "none",
                    color: "black",
                    paddingLeft: "12px",
                  }}
                ></Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-9">
        <div className="container mt-5 order-card-back">
        <h3 className="mb-5">Order History</h3>
        {orders.map((order) => (
          <div key={order._id} className="order-card mb-5 p-3 border rounded">
            <div className="d-flex justify-content-between">
              <h3 className="order-date mb-3">
                Order Date: {new Date(order.createdAt).toLocaleDateString()}
              </h3>
            </div>
            <p className="order-total">Total: $ {order.total}</p>
            <div className="row">
              {order.items.map((item) => (
                <div key={item._id} className="col-12 mb-3">
                  <div className="card h-100">
                    <div className="card-body">
                      <h5 className="card-title">
                        Product Name:{" "}
                        {item.product ? item.product.productName : "N/A"}
                      </h5>
                      <p className="card-text">Quantity: {item.quantity}</p>
                      <p className="card-text">Subtotal: Rs {item.subtotal}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Account;
