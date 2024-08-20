import React, { useEffect, useState } from "react";

import Header from "../Components/Header";
import Footer from "../Components/Footer";
import LandImageDiv from "../Components/LandImageDiv";
import Artical from "../Components/Artical";
import InstaPicCard from "../Components/InstaPicCard";
import PageSwitcher from "../Components/PageSwitcher";
import ProductItem from "../Components/ProductItem";
import SmallCardSet from "../Components/SmallCardSet";
import axios from "axios";
import { useUser } from "../context/UserContext";
import { Link } from "react-router-dom";

function Shop() {
  const [product, setProduct] = useState([]);
  const { user } = useUser();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const filteredProducts =
    selectedCategory === "All"
      ? product
      : product.filter((product) => product.categoryName === selectedCategory);

  console.log(user);
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
  return (
    <>
      <Header />
      <LandImageDiv
        img="../../src/assets/images/hero-image.jpg"
        pageName="Shop page"
        name1="Home /"
        name2="Shop"
        name3="/Login /"
      />

      <div className="shopify-grid padding-large">
        <div className="container">
          <div className="d-flex flex-wrap justify-content-between align-items-center section-header"></div>
          <div className="row">
            <section id="selling-products" className="col-md-12 product-store">
              <div className="container">
                <ul className="list-unstyled tabs">
                  <li>
                    <button
                      className={`tab ${
                        selectedCategory === "All" ? "active" : ""
                      }`}
                      onClick={() => handleCategoryClick("All")}
                    >
                      All
                    </button>
                  </li>
                  <li>
                    <button
                      className={`tab ${
                        selectedCategory === "Shoes" ? "active" : ""
                      }`}
                      onClick={() => handleCategoryClick("Shoes")}
                    >
                      Shoes
                    </button>
                  </li>
                  <li>
                    <button
                      className={`tab ${
                        selectedCategory === "Tshirts" ? "active" : ""
                      }`}
                      onClick={() => handleCategoryClick("Tshirts")}
                    >
                      Tshirts
                    </button>
                  </li>
                  <li>
                    <button
                      className={`tab ${
                        selectedCategory === "Pants" ? "active" : ""
                      }`}
                      onClick={() => handleCategoryClick("Pants")}
                    >
                      Pants
                    </button>
                  </li>
                  <li>
                    <button
                      className={`tab ${
                        selectedCategory === "Hoodie" ? "active" : ""
                      }`}
                      onClick={() => handleCategoryClick("Hoodie")}
                    >
                      Hoodie
                    </button>
                  </li>
                  <li>
                    <button
                      className={`tab ${
                        selectedCategory === "Outer" ? "active" : ""
                      }`}
                      onClick={() => handleCategoryClick("Outer")}
                    >
                      Outer
                    </button>
                  </li>
                  <li>
                    <button
                      className={`tab ${
                        selectedCategory === "Jackets" ? "active" : ""
                      }`}
                      onClick={() => handleCategoryClick("Jackets")}
                    >
                      Jackets
                    </button>
                  </li>
                  <li>
                    <button
                      className={`tab ${
                        selectedCategory === "Accessories" ? "active" : ""
                      }`}
                      onClick={() => handleCategoryClick("Accessories")}
                    >
                      Accessories
                    </button>
                  </li>
                </ul>
                <div className="tab-content">
                  <div
                    id={selectedCategory.toLowerCase()}
                    data-tab-content
                    className="active"
                  >
                    <div className="d-flex flex-wrap row">
                      {filteredProducts.map((product, index) => (
                        <div
                          className="col-sm-6 col-lg-3 col-md-6 product-item"
                          key={index}
                        >
                          <ProductItem
                            pic={product.mainImage}
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
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Shop;
