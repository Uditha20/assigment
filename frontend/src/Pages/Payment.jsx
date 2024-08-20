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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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

  const generateReceipt = (orderData) => {
    const doc = new jsPDF();

    // Add shop name
    doc.setFontSize(22);
    doc.setTextColor(40, 116, 240); // Set color to a shade of blue
    doc.text("Ultras Shop", 20, 20);

    // Add Receipt title
    doc.setFontSize(20);
    doc.setTextColor(0, 0, 0); // Set color to black
    doc.text("Receipt", 20, 30);

    // Add billing details
    doc.setFontSize(12);
    doc.text(`Name: ${orderData.billDetails[0].name}`, 20, 50);
    doc.text(
      `Address: ${orderData.billDetails[0].address}, ${orderData.billDetails[0].apartment}, ${orderData.billDetails[0].town}`,
      20,
      60
    );
    doc.text(`Phone: ${orderData.billDetails[0].phoneNo}`, 20, 70);
    doc.text(`Email: ${orderData.billDetails[0].email}`, 20, 80);

    // Add items
    doc.text("Items:", 20, 90);
    orderData.items.forEach((item, index) => {
      const y = 100 + index * 10;
      doc.text(`${item.productName}`, 20, y);
      doc.text(`Quantity: ${item.quantity}`, 120, y, { align: "right" });
      doc.text(`Subtotal: ${item.subtotal}`, 180, y, { align: "right" });
    });

    // Add total
    doc.setFontSize(14);
    doc.setFont("bold");
    doc.text(
      `Total: ${orderData.total}`,
      20,
      100 + orderData.items.length * 10
    );

    // Save the PDF
    doc.save("receipt.pdf");
  };

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
        productName:item.productName
      })),
      billDetails,
      total,
    };

    console.log(orderData); // Ensure orderData is correct

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
            "pk_test_51PplaGP7jUWx2W2SXdWpYdK72glTn9Biu2OE8ybctFwDoAKN5D804HkF5XeMQNsQ8fAHg1cDhPjTQ6nvnEKaeR3800xINiusCn"
          );

          const paymentResponse = await axios.post(
            "http://localhost:5000/sales/payment",
            {
              total: orderData.total,
            }
          );

          const session = paymentResponse.data;

          stripe.redirectToCheckout({
            sessionId: session.id,
          });

          localStorage.removeItem("cart");
          generateReceipt(orderData); // Ensure this is called correctly
        } else {
          Swal.fire({
            title: "Error",
            text: response.data.message,
            icon: "error",
            confirmButtonText: "OK",
          });
        }
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
      <div className="container" style={{ paddingTop: "250px" }}>
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
