import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { useUser } from "../context/UserContext";
import { CartContext } from "../context/CartContext";
import { jsPDF } from "jspdf";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import { loadStripe } from "@stripe/stripe-js";
function Payment() {
  const [message, setMessage] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [town, setTown] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const { user } = useUser();
  const { cart, total } = useContext(CartContext);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const customizeid = queryParams.get("customizeid");
  const navigate = useNavigate();

  const handleCardNumberChange = (e) => {
    const input = e.target.value.replace(/\s/g, ""); // Remove any existing whitespace
    let formattedInput = "";

    // Divide the input into groups of four digits
    for (let i = 0; i < input.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedInput += " "; // Add a space every four digits
      }
      formattedInput += input[i];
    }

    setCardNumber(formattedInput);
  };
  function generateReceipt(payment) {
    const doc = new jsPDF();

    doc.text("Receipt", 10, 10);
    doc.text(`Payment ID: ${payment._id}`, 10, 150);
    doc.text(`Name: ${payment.name}`, 10, 20);
    doc.text(`Address: ${payment.address}`, 10, 30);
    doc.text(`Apartment: ${payment.apartment}`, 10, 40);
    doc.text(`Town: ${payment.town}`, 10, 50);
    doc.text(`Phone No: ${payment.phoneNo}`, 10, 60);
    doc.text(`Email: ${payment.email}`, 10, 70);
    doc.text(`Card Number: ${payment.cardNumber}`, 10, 80);
    doc.text(`Expiry Month: ${payment.expiryMonth}`, 10, 90);
    doc.text(`Expiry Year: ${payment.expiryYear}`, 10, 100);
    doc.text(`CVV: ${payment.cvv}`, 10, 110);
    doc.text(`Total: ${payment.total}`, 10, 120);
    doc.text(
      `Created At: ${new Date(payment.createdAt).toLocaleString()}`,
      10,
      130
    );
    doc.text(
      `Updated At: ${new Date(payment.updatedAt).toLocaleString()}`,
      10,
      140
    );

    return doc;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const billDetails = [
      {
        name,
        address,
        apartment,
        town,
        phoneNo,
        email,
      },
    ];
    const orderData = {
      user: user._id,
      items: cart.map((item) => ({
        product: item._id, // Assuming 'id' is the product ID
        quantity: item.quantity,
        subtotal: item.subtotal,
      })),
      billDetails,
      total,
    };
    const confirmResult = await Swal.fire({
      title: "Confirm Payment",
      text: "Are you sure you want to proceed with the payment?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, proceed",
      cancelButtonText: "No, cancel",
    });
    if (confirmResult.isConfirmed) {
      try {
        const response = await axios.post(
          "http://localhost:5000/sales/addOrder",
          orderData
        );

        if (response.data && response.data.message) {
          const stripe = await loadStripe(
            "pk_test_51Oy64VSC015njDot40bpYm2BS5VjpwPJb0WWw1G9Pa1dDRqK5ujoZgHal0vgITI2LWKOC4kLPuyXiIRJOeshzxkT00ZG1XgdQL"
          );

          const response = await axios.post(
            "http://localhost:5000/sales/payment",
            {
              total: orderData.total,
            }
          );

          const session = response.data;

          stripe.redirectToCheckout({
            sessionId: session.id,
          });

          localStorage.removeItem("cart");
        } else {
          Swal.fire({
            title: "Error",
            text: response.data.message,
            icon: "error",
            confirmButtonText: "OK",
          });
        }

        // Handle the response as needed
      } catch (error) {
        if (error.response && error.response.data) {
          // Server-sent error message
          setErrMsg(error.response.data.message || "Failed to add package.");
        } else {
          // Generic or network error
          setErrMsg("An unexpected error occurred.");
        }
      }
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className=" row d-flex pt-5 ">
          <div className=" d-flex justify-content-between  ">
            <div className="d-flex">
              <h6 style={{ opacity: "50%" }}>PAYMENT</h6>
            </div>
          </div>
        </div>

        <div className="row pt-5">
          <div className="col-lg-6 col-md-12">
            <h2>Billing Details</h2>
            {message ? (
              <p className="alert alert-success">{message}</p>
            ) : errMsg ? (
              <p className="alert alert-danger">{errMsg}</p>
            ) : null}
            <div className="pt-3 pb-3">
              <div className="checkout-input">
                <h5 style={{ opacity: "50%" }}>
                  Name<span style={{ color: "red" }}>*</span>
                </h5>
                <input
                  type="first"
                  class="form-control"
                  id="inputFirst"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ width: "470px", height: "50px" }}
                />
              </div>

              <div className="checkout-input">
                <h5 style={{ opacity: "50%" }}>
                  Street Address<span style={{ color: "red" }}>*</span>
                </h5>
                <input
                  type="Street"
                  class="form-control"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  id="inputStreet"
                  style={{ width: "470px", height: "50px" }}
                />
              </div>
              <div className="checkout-input">
                <h5 style={{ opacity: "50%" }}>
                  Apartment, floor, etc. (optional)
                </h5>
                <input
                  type="Apartment"
                  class="form-control"
                  value={apartment}
                  onChange={(e) => setApartment(e.target.value)}
                  id="inputApartment"
                  style={{ width: "470px", height: "50px" }}
                />
              </div>
              <div className="checkout-input">
                <h5 style={{ opacity: "50%" }}>
                  Town/City<span style={{ color: "red" }}>*</span>
                </h5>
                <input
                  type="Town"
                  class="form-control"
                  id="inputTown"
                  value={town}
                  onChange={(e) => setTown(e.target.value)}
                  style={{ width: "470px", height: "50px" }}
                />
              </div>
              <div className="checkout-input">
                <h5 style={{ opacity: "50%" }}>
                  Phone Number<span style={{ color: "red" }}>*</span>
                </h5>
                <input
                  type="Phone"
                  class="form-control"
                  id="inputPhone"
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                  style={{ width: "470px", height: "50px" }}
                />
              </div>
              <div className="checkout-input">
                <h5 style={{ opacity: "50%" }}>
                  Email Address<span style={{ color: "red" }}>*</span>
                </h5>
                <input
                  type="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  class="form-control"
                  id="inputEmail"
                  style={{ width: "470px", height: "50px" }}
                />
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-12 padding-style">
            <div>
              <div className="process-box-row">
                <h3>Total: $ {total}</h3>
              </div>
              <hr />
              {/* 
            <div class="form-check pt-3">
              <label class="form-check-label" for="flexRadioDefault2">
                <h5>Bank</h5>
              </label>
            </div> */}
              <div></div>
              {/* <div>
              <h2 class="mt-4">Payment Details</h2>
              <form>
                <div class="form-group">
                  <label for="cardNumber">Card Number</label>
                  <input
                    type="text"
                    class="form-control"
                    id="cardNumber"
                    value={cardNumber}
                    placeholder="1234 1234 1234 1234"
                    maxLength="19" // Adjusted for spaces
                    onChange={handleCardNumberChange}
                  />
                </div>

                <div class="form-row">
                  <div class="col">
                    <label for="expiryMonth">Expiry Month</label>
                    <input
                      type="text"
                      class="form-control"
                      id="expiryMonth"
                      value={expiryMonth}
                      placeholder="MM"
                      maxlength="2"
                      onChange={(e) => setExpiryMonth(e.target.value)}
                    />
                  </div>
                  <div class="col">
                    <label for="expiryYear">Expiry Year</label>
                    <input
                      type="text"
                      class="form-control"
                      id="expiryYear"
                      value={expiryYear}
                      placeholder="YY"
                      maxlength="2"
                      onChange={(e) => setExpiryYear(e.target.value)}
                    />
                  </div>
                </div>

                <div class="form-group mt-3">
                  <label for="cvv">CVV</label>
                  <input
                    type="text"
                    class="form-control"
                    id="cvv"
                    value={cvv}
                    placeholder="123"
                    maxlength="3"
                    onChange={(e) => setCvv(e.target.value)}
                  />
                </div>
              </form>
            </div> */}

              <div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Payment;
