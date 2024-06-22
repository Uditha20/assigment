import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Register() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrorMessage("");
      try {
        const response = await axios.post("http://localhost:5000/user/register", {
          email: username,
          phoneNo,
          password,
        });
        if (response.data.message) {
          setMessage(response.data.message);
          setPassword("");
          setUsername("");
          setPhoneNo("");
          setConfirmPassword("");
        }
      } catch (error) {
        if (error.response && error.response.data) {
          const message = error.response.data.message;
          setErrMsg(error.response.data.message);
        }
      }
    } else {
      setErrorMessage("Passwords do not match");
    }
  };
  const body = {
    backgroundColor: "#f8f9fa",
    height: "100vh",
    paddingTop:"200px"
   
  };

  const container = {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  const card = {
    border: "none",
    borderRadius: "20px",
    boxShadow: "0px 0px 20px 0px rgba(0,0,0,0.1)",
  };
  const cardHeader = {
    backgroundColor: "#007bff",
    color: "#fff",
    borderRadius: "20px 20px 0 0,",
  };
  const cardBody = {
    padding: "40px",
  };
  const btnRegister = {
    backgroundCcolor: "#007bff",
    border: "none",
    borderRadius: "20px",
  };

  return (
    <>
    <header id="header" className="fixed-top">
        <div id="header-wrap">
          <nav className="padding-small primary-nav">
            <div className="container">
              <div className="d-flex align-items-center row">
                <div className="col-lg-2 col-md-2">
                  <div className="main-logo">
                    <Link to="/">
                      <img
                        src="../../src/assets/images/main-logo.png"
                        alt="logo"
                      />
                    </Link>
                  </div>
                </div>
                <div className="col-lg-10 col-md-10">
                  <div className="navbar">
                    <div
                      id="main-nav"
                      className="right d-flex justify-content-end stellarnav"
                    >
                      <ul className="menu-list">
                        <li className="has-sub menu-item">
                          <Link
                            to={"/Home"}
                            className="d-flex align-items-center item-anchor"
                            data-effect="Home"
                          >
                            Home
                          </Link>
                        </li>

                        <li>
                          <Link
                            to={"/AboutUs"}
                            className="item-anchor"
                            data-effect="About"
                          >
                            About
                          </Link>
                        </li>

                        <li className="has-sub menu-item">
                          <Link
                            to={"/Shop"}
                            className="d-flex align-items-center item-anchor"
                            data-effect="Shop"
                          >
                            Shop
                          </Link>
                          <ul className="submenu">
                            <li>
                              <Link to="/shop" className="item-anchor">
                                Shop
                              </Link>
                            </li>
                            <li>
                              <Link to="/shop-slider" className="item-anchor">
                                Shop slider
                                <span className="text-primary"> (PRO)</span>
                              </Link>
                            </li>
                            <li>
                              <Link to="/shop-grid" className="item-anchor">
                                Shop grid
                                <span className="text-primary"> (PRO)</span>
                              </Link>
                            </li>
                            <li>
                              <Link to="/shop-list" className="item-anchor">
                                Shop list
                                <span className="text-primary"> (PRO)</span>
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/single-product"
                                className="item-anchor"
                              >
                                Single product
                                <span className="text-primary"> (PRO)</span>
                              </Link>
                            </li>
                            <li>
                              <Link to="/cart" className="item-anchor">
                                Cart<span className="text-primary"> (PRO)</span>
                              </Link>
                            </li>
                            <li>
                              <Link to="/wishlist" className="item-anchor">
                                Wishlist
                                <span className="text-primary"> (PRO)</span>
                              </Link>
                            </li>
                            <li>
                              <Link to="/checkout" className="item-anchor">
                                Checkout
                                <span className="text-primary"> (PRO)</span>
                              </Link>
                            </li>
                          </ul>
                        </li>

                        <li className="has-sub menu-item">
                          <Link
                            to={"/Blog"}
                            className="d-flex align-items-center item-anchor"
                            data-effect="Blog"
                          >
                            Blog
                          </Link>
                          <ul className="submenu">
                            <li>
                              <Link to="/blog" className="item-anchor">
                                Blog
                              </Link>
                            </li>
                            <li>
                              <Link to="/blog-sidebar" className="item-anchor">
                                Blog with sidebar
                                <span className="text-primary"> (PRO)</span>
                              </Link>
                            </li>
                            <li>
                              <Link to="/blog-masonry" className="item-anchor">
                                Blog masonry
                                <span className="text-primary"> (PRO)</span>
                              </Link>
                            </li>
                            <li>
                              <Link to="/single-post" className="item-anchor">
                                Single post
                              </Link>
                            </li>
                          </ul>
                        </li>

                        <li>
                          <Link
                            to={"/ContactUs"}
                            className="item-anchor"
                            data-effect="Contact"
                          >
                            Contact
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
      ></link>
      <body style={body}>
        <div style={container}>
          <div className="justify-content-center row" style={{ width: "100%" }}>
            
            <div className="col-sm-8 col-md-6 col-xs-12">
              <div style={card}>
                <div style={cardHeader}>
                  <h3 className="text-center">Register</h3>
                </div>
                <div style={cardBody}>
                  <form onSubmit={handleSubmit}>
                    {errorMessage && (
                      <div style={{ color: "red", marginBottom: "1rem" }}>
                        {errorMessage}
                      </div>
                    )}
                    {}
                    {message ? (
                      <p
                        style={{
                          backgroundColor: "green",
                          marginBottom: "1rem",
                          color: "white",
                          borderRadius: "15px",
                        }}
                      >
                        {message}
                      </p>
                    ) : errMsg ? (
                      <p
                        style={{
                          backgroundColor: "red",
                          marginBottom: "1rem",
                          color: "white",
                          borderRadius: "15px",
                        }}
                      >
                        {errMsg}
                      </p>
                    ) : null}
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter email"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Phone No</label>
                      <input
                        type="text"
                        className="form-control"
                        id="phone"
                        value={phoneNo}
                        onChange={(e) => setPhoneNo(e.target.value)}
                        placeholder="Enter password"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={handlePasswordChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="confirm_password">Confirm Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="confirm_password"
                        name="confirm_password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn-block btn btn-primary"
                      style={btnRegister}
                    >
                      Register
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Bootstrap JS and dependencies --> */}
        <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
      </body>
    </>
  );
}

export default Register;
