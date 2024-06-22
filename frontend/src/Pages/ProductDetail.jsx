import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import ProductItem from "../Components/ProductItem";
import { CartContext } from "../context/CartContext";
const ProductDetail = () => {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState({});
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState([]);
  const { cart, addToCart } = useContext(CartContext);
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/product/product/${id}`
        );
        setProductDetails(response.data); // Assuming the details are in response.data
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    if (id) {
      fetchProductDetails();
    }
  }, [id]);


  const addToCartHandler = () => {
    const item = {
      _id:productDetails._id,
      productName:productDetails.productName,
      price:productDetails.price,
      img: productDetails.mainImage,
      quantity: 1, // Default initial quantity
      subtotal: productDetails.price, // Initial subtotal
    };
    addToCart(item);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/product/getAll"
        );
        setProduct(response.data); // Assuming the response contains the array of vehicles
      } catch (error) {
        console.error("Error fetching data: ", error);
        // Handle errors here, for example, by setting an error state
      }
    };

    fetchData();
  }, []);
  
  const BASE_URL = "http://localhost:5000/";

  return (
    <>
   <Header/>
    <div className="container">
      <div className="breadcrumb">
        <h6>{productDetails.productName}</h6>
      </div>

      <div className="product-details-container">
        <div className="additional-images">
          {productDetails.additionalImages &&
            productDetails.additionalImages.length > 0 &&
            productDetails.additionalImages.map((image, index) => {
              const adjustedImage = image.replace(/\\/g, "/");
              const imagePath = `${BASE_URL}${adjustedImage}`;

              return (
                <div key={index} className="detail-product-small">
                  <img
                    src={imagePath}
                    alt={`Additional Image ${index}`}
                    className="additional-image"
                  />
                </div>
              );
            })}
        </div>
        <div className="main-image">
          {productDetails && productDetails.mainImage ? (
            <img
              src={`${BASE_URL}${productDetails.mainImage.replace(
                /\\/g,
                "/"
              )}`}
              alt="Main Product"
              className="main-product-image"
            />
          ) : (
            <div>Loading image or image not available...</div>
          )}
        </div>
        <div className="product-info">
          <h4>{productDetails.productName}</h4>
          <div className="status">
            <p>In Stock</p>
          </div>
          <h5>Rs: {productDetails.price}</h5>
          <h6>Color: {productDetails.color}</h6>
          <h6>size: {productDetails.size}</h6>


          <p className="description">{productDetails.description}</p>
          <button className="buy-now" onClick={addToCartHandler}>
            Buy Now
          </button>
        </div>
      </div>

      <div className="related-items">
        <h6>Related Items</h6>
        <div className="tab-content">
                <div id="all" data-tab-content className="active">
                  <div className="d-flex flex-wrap row">
                    {product.slice(0, 4).map((product, index) => (
                      <div
                        className="col-sm-6 col-lg-3 col-md-6 product-item"
                        key={index}
                      >
                        <ProductItem
                          pic={product.mainImage} // Use product.imageUrl if available
                          imgAlt={product.productName}
                          link="single-product.html"
                          title={product.productName}
                          price={product.price}
                          _id={product._id}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
      </div>
    </div>
    <Footer />

    </>
  );
};

export default ProductDetail;
