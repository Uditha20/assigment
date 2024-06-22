import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const BASE_URL = "http://localhost:5000/";

function ProductItem({ pic, imgAlt, link, title, price, _id }) {
  const { cart, addToCart } = useContext(CartContext);

  const addToCartHandler = () => {
    const item = {
      _id,
      productName: title,
      price,
      img: imagePath,
      quantity: 1, // Default initial quantity
      subtotal: price, // Initial subtotal
    };
    addToCart(item);
  };

  console.log(cart); // To verify the cart content
  const adjustedPic = pic.replace(/\\/g, '/');
  const imagePath = `${BASE_URL}${adjustedPic}`;
  return (
    <>
      <div className="image-holder">
        <img src={imagePath} className="product-image" />
      </div>
      <div className="cart-concern">
        <div className="d-flex justify-content-between align-items-center cart-button">
          <button
            type="button"
            className="d-flex align-items-center btn-wrap cart-link"
            onClick={addToCartHandler}
          >
            add to cart <i className="icon-arrow-io icon"></i>
          </button>
          <button type="button" className="d-flex view-btn tooltip">
          <Link className="icon-heart" to={`/productDetails/${_id}`}> <i className="icon icon-screen-full"></i></Link>
            <span className="tooltip-text">Quick view</span>
          </button>
          <button type="button" className="wishlist-btn">
            <i className="icon icon-heart"></i>
          </button>
        </div>
      </div>
      <div className="product-detail">
        <h3 className="product-title">
          <Link to={link}>{title}</Link>
        </h3>
        <span className="item-price text-primary">${price}</span>
      </div>
    </>
  );
}

export default ProductItem;
