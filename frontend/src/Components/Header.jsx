import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { useUser } from "../context/UserContext";

function Header() {
  const { totalItems } = useContext(CartContext);
  const { user } = useUser();

  return (
    <>
      <header id="header" className="fixed-top">
        <div id="header-wrap">
          <nav className="border-bottom secondary-nav">
            <div className="container">
              <div className="d-flex align-items-center row">
                <div className="col-md-4 header-contact">
                  <p>
                    Let's talk! <strong>011 444 1103</strong>
                  </p>
                </div>
                <div className="text-center col-md-4 shipping-purchase">
                  <p>Free shipping on a purchase value of $200</p>
                </div>
                <div className="col-sm-12 col-md-4 user-items">
                  <ul className="d-flex justify-content-end list-unstyled">
                    <li>
                      <Link to={"/Login"}>Login</Link>
                    </li>
                    <li>
                      <Link to={"/Register"}>Sign Up</Link>
                    </li>
                    <li>{user && <i className="icon icon-user" style={{cursor:'pointer'}}></i>}</li>
                    <li>
                      <Link to={"/cart"}>
                        <i className="icon icon-shopping-cart"></i>
                        {totalItems > 0 && (
                          <span className="cart-count">{totalItems}</span>
                        )}
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </nav>
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
                    
                        </li>

                        <li className="has-sub menu-item">
                          <Link
                            to={"/Blog"}
                            className="d-flex align-items-center item-anchor"
                            data-effect="Blog"
                          >
                            Blog
                          </Link>
                        
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
    </>
  );
}

export default Header;
