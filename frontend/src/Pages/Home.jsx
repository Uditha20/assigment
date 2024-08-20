import React, { useEffect, useState } from "react";

import Header from "../Components/Header";
import Footer from "../Components/Footer";
import LandImageDiv from "../Components/LandImageDiv";
import Artical from "../Components/Artical";
import InstaPicCard from "../Components/InstaPicCard";
import PageSwitcher from "../Components/PageSwitcher";
import ProductItem from "../Components/ProductItem";
import SmallCardSet from "../Components/SmallCardSet";
import DiscountProductItem from "../Components/DiscountProductItem";
import { Link } from "react-router-dom";
import axios from "axios";
import { useUser } from "../context/UserContext";

function Home() {
  const [product, setProduct] = useState([]);
  const { user } = useUser();
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

      <section id="billboard" className="overflow-hidden mt-5" style={{ paddingTop: "200px" }}>
        <button className="button-prev">
          <i className="icon-chevron-left icon"></i>
        </button>
        <button className="button-next">
          <i className="icon-chevron-right icon"></i>
        </button>
        <div className="main-swiper swiper">
          <div className="swiper-wrapper">
            <div
              className="swiper-slide"
              style={{
                backgroundImage: "url('../../src/assets/images/banner1.jpg')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="banner-content" >
                <div className="container">
                  <div className="row">
                    <div className="col-md-6">
                      <h2 className="banner-title">Summer Collection</h2>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed eu feugiat amet, libero ipsum enim pharetra hac.
                      </p>
                      <div className="btn-wrap">
                        <Link
                          to={"../Shop"}
                          className="d-flex align-items-center btn btn-light btn-medium"
                          tabindex="0"
                        >
                          Shop it now <i className="icon-arrow-io icon"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="swiper-slide"
              style={{
                backgroundImage: "url('../../src/assets/images/banner2.jpg')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="banner-content">
                <div className="container">
                  <div className="row">
                    <div className="col-md-6">
                      <h2 className="banner-title">Casual Collection</h2>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed eu feugiat amet, libero ipsum enim pharetra hac.
                      </p>
                      <div className="btn-wrap">
                        <Link
                          to={"../Shop"}
                          className="d-flex align-items-center btn btn-light btn-light-arrow btn-medium"
                          tabindex="0"
                        >
                          Shop it now <i className="icon-arrow-io icon"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="shopify-grid padding-large">
        <div className="row">
          <section id="selling-products" className="col-md-12 product-store">
            <div className="container">
              <div className="d-flex flex-wrap justify-content-between align-items-center section-header">
                <h2 className="section-title">Featured Products</h2>
                
              </div>
              <div className="tab-content">
                <div id="all" data-tab-content className="active">
                  <div className="d-flex flex-wrap row">
                    {product.map((product, index) => (
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
          </section>
        </div>
      </div>

      <section id="latest-collection">
        <div className="container">
          <div className="product-collection row">
            <div className="left-content col-lg-7 col-md-12">
              <div className="collection-item">
                <div className="products-thumb">
                  <img
                    src="../../src/assets/images/collection-item1.jpg"
                    alt="collection item"
                    className="image-rounded large-image"
                  />
                </div>
                <div className="col-sm-6 col-lg-6 col-md-6 product-entry">
                  <div className="categories">casual collection</div>
                  <h3 className="item-title">street wear.</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Dignissim massa diam elementum.
                  </p>
                  <div className="btn-wrap">
                    <a href="shop.html" className="d-flex align-items-center">
                      shop collection <i className="icon-arrow-io icon"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="right-content flex-wrap col-lg-5 col-md-12">
              <div className="top-item collection-item">
                <div className="products-thumb">
                  <img
                    src="../../src/assets/images/collection-item2.jpg"
                    alt="collection item"
                    className="image-rounded small-image"
                  />
                </div>
                <div className="col-md-6 product-entry">
                  <div className="categories">Basic Collection</div>
                  <h3 className="item-title">Basic shoes.</h3>
                  <div className="btn-wrap">
                    <a href="shop.html" className="d-flex align-items-center">
                      shop collection <i className="icon-arrow-io icon"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="bottom-item collection-item">
                <div className="products-thumb">
                  <img
                    src="../../src/assets/images/collection-item3.jpg"
                    alt="collection item"
                    className="image-rounded small-image"
                  />
                </div>
                <div className="col-md-6 product-entry">
                  <div className="categories">Best Selling Product</div>
                  <h3 className="item-title">woolen hat.</h3>
                  <div className="btn-wrap">
                    <a href="shop.html" className="d-flex align-items-center">
                      shop collection <i className="icon-arrow-io icon"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="subscribe" className="padding-large">
        <div className="container">
          <div className="row">
            <div className="block-text col-md-6">
              <div className="section-header">
                <h2 className="section-title">Get 25% off Discount Coupons</h2>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Dictumst amet, metus, sit massa posuere maecenas. At tellus ut
                nunc amet vel egestas.
              </p>
            </div>
            <div className="col-md-6 subscribe-content">
              <form id="form" className="d-flex justify-content-between">
                <input
                  type="text"
                  name="email"
                  placeholder="Enter your email addresss here"
                />
                <button className="btn btn-dark">Subscribe Now</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <div className="shopify-grid padding-large">
        <div className="container">
          <div className="d-flex flex-wrap justify-content-between align-items-center section-header">
            <h2 className="section-title">Best Selling Products</h2>
          </div>
          <div className="row">
            <section id="selling-products" className="col-md-12 product-store">
              <div className="container">
                <ul className="list-unstyled tabs">
                  <li data-tab-target="#all" className="active tab">
                    All
                  </li>
                  <li data-tab-target="#shoes" className="tab">
                    Shoes
                  </li>
                  <li data-tab-target="#tshirts" className="tab">
                    Tshirts
                  </li>
                  <li data-tab-target="#pants" className="tab">
                    Pants
                  </li>
                  <li data-tab-target="#hoodie" className="tab">
                    Hoodie
                  </li>
                  <li data-tab-target="#outer" className="tab">
                    Outer
                  </li>
                  <li data-tab-target="#jackets" className="tab">
                    Jackets
                  </li>
                  <li data-tab-target="#accessories" className="tab">
                    Accessories
                  </li>
                </ul>
                <div className="tab-content">
                  <div id="all" data-tab-content className="active">
                    <div className="d-flex flex-wrap row">
                      {product.map((product, index) => (
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
            </section>
          </div>
        </div>
      </div>

      <section id="testimonials" className="padding-large">
        <div className="container">
          <div className="reviews-content">
            <div className="d-flex flex-wrap row">
              <div className="col-md-2">
                <div className="review-icon">
                  <i className="icon-right-quote icon"></i>
                </div>
              </div>
              <div className="col-md-8">
                <div className="overflow-hidden swiper testimonial-swiper">
                  <div className="swiper-wrapper">
                    <div className="swiper-slide">
                      <div className="testimonial-detail">
                        <p>
                          “Dignissim massa diam elementum habitant fames. Id
                          nullam pellentesque nisi, eget cursus dictumst
                          pharetra, sit. Pulvinar laoreet id porttitor egestas
                          dui urna. Porttitor nibh magna dolor ultrices iaculis
                          sit iaculis.”
                        </p>
                        <div className="author-detail">
                          <div className="name">By Maggie Rio</div>
                        </div>
                      </div>
                    </div>
                    <div className="swiper-slide">
                      <div className="testimonial-detail">
                        <p>
                          “Dignissim massa diam elementum habitant fames. Id
                          nullam pellentesque nisi, eget cursus dictumst
                          pharetra, sit. Pulvinar laoreet id porttitor egestas
                          dui urna. Porttitor nibh magna dolor ultrices iaculis
                          sit iaculis.”
                        </p>
                        <div className="author-detail">
                          <div className="name">By John Smith</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swiper-arrows">
                  <button className="prev-button">
                    <i className="icon-arrow-left icon"></i>
                  </button>
                  <button className="next-button">
                    <i className="icon-arrow-right icon"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="flash-sales" className="padding-large product-store">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Flash sales</h2>
          </div>
          <div className="flash-sales overflow-hidden product-swiper swiper">
            {/* <div className="swiper-wrapper">
                            <div className="swiper-slide">
                                <DiscountProductItem
                                    img="../../src/assets/images/selling-products8.jpg"
                                    imgAlt="Books"
                                    discount="10%"
                                    link="single-product.html"
                                    title="Half sleeve T-shirt"
                                    prevprice="50.00"
                                    price="40.00"
                                />
                            </div>
                            <div className="swiper-slide">
                                <DiscountProductItem
                                    img="../../src/assets/images/selling-products8.jpg"
                                    imgAlt="Books"
                                    discount="10%"
                                    link="single-product.html"
                                    title="Half sleeve T-shirt"
                                    prevprice="50.00"
                                    price="40.00"
                                />
                            </div>
                            <div className="swiper-slide">
                                <DiscountProductItem
                                    img="../../src/assets/images/selling-products8.jpg"
                                    imgAlt="Books"
                                    discount="10%"
                                    link="single-product.html"
                                    title="Half sleeve T-shirt"
                                    prevprice="50.00"
                                    price="40.00"
                                />
                            </div>
                            <div className="swiper-slide">
                                <DiscountProductItem
                                    img="../../src/assets/images/selling-products8.jpg"
                                    imgAlt="Books"
                                    discount="10%"
                                    link="single-product.html"
                                    title="Half sleeve T-shirt"
                                    prevprice="50.00"
                                    price="40.00"
                                />

                            </div>
                            <div className="swiper-slide">
                                <DiscountProductItem
                                    img="../../src/assets/images/selling-products8.jpg"
                                    imgAlt="Books"
                                    discount="10%"
                                    link="single-product.html"
                                    title="Half sleeve T-shirt"
                                    prevprice="50.00"
                                    price="40.00"
                                />
                            </div>
                        </div> */}
          </div>
        </div>
      </section>
      <section className="shoppify-section-banner">
        <div className="container">
          <div className="product-collection">
            <div className="left-content collection-item">
              <div className="products-thumb">
                <img
                  src="../../src/assets/images/model.jpg"
                  alt="collection item"
                  className="image-rounded large-image"
                />
              </div>
              <div className="col-sm-6 col-lg-6 col-md-6 product-entry">
                <div className="categories">Denim collection</div>
                <h3 className="item-title">The casual selection.</h3>
                <p>
                  Vel non viverra ligula odio ornare turpis mauris. Odio
                  aliquam, tincidunt ut vitae elit risus. Tempor egestas
                  condimentum et ac rutrum dui, odio.
                </p>
                <div className="btn-wrap">
                  <a href="shop.html" className="d-flex align-items-center">
                    shop collection <i className="icon-arrow-io icon"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="quotation" className="align-center padding-large">
        <div className="inner-content">
          <h2 className="divider section-title">Quote of the day</h2>
          <blockquote>
            <q>
              It's true, I don't like the whole cutoff-shorts-and-T-shirt look,
              but I think you can look fantastic in casual clothes.
            </q>
            <div className="author-name">- Dr. Seuss</div>
          </blockquote>
        </div>
      </section>

      <hr />
      <section id="latest-blog" className="padding-large">
        <div className="container">
          <div className="d-flex flex-wrap justify-content-between align-items-center section-header">
            <h2 className="section-title">our Journal</h2>
            <div className="align-right btn-wrap">
              <a href="blog.html" className="d-flex align-items-center">
                Read All Articles <i className="icon-arrow-io icon icon"></i>
              </a>
            </div>
          </div>
          <div className="d-flex flex-wrap row">
            <Artical
              link="single-post.html"
              img="../../src/assets/images/post-img1.jpg"
              day="22"
              month="Aug-2021"
              text="Top 10 casual look ideas to dress up your kids"
              category="Fashion"
            />
            <Artical
              link="single-post.html"
              img="../../src/assets/images/post-img2.jpg"
              day="25"
              month="Aug-2021"
              text="Latest trends of wearing street wears supremely"
              category="Trending"
            />
            <Artical
              link="single-post.html"
              img="../../src/assets/images/post-img3.jpg"
              day="28"
              month="Aug-2021"
              text="types of comfortable clothes ideas for women"
              category="Inspiration"
            />
          </div>
        </div>
      </section>

      <section id="brand-collection" className="bg-light-grey padding-medium">
        <div className="container">
          <div className="d-flex flex-wrap justify-content-between">
            <img
              src="../../src/assets/images/brand1.png"
              alt="phone"
              className="brand-image"
            />
            <img
              src="../../src/assets/images/brand2.png"
              alt="phone"
              className="brand-image"
            />
            <img
              src="../../src/assets/images/brand3.png"
              alt="phone"
              className="brand-image"
            />
            <img
              src="../../src/assets/images/brand4.png"
              alt="phone"
              className="brand-image"
            />
            <img
              src="../../src/assets/images/brand5.png"
              alt="phone"
              className="brand-image"
            />
          </div>
        </div>
      </section>

      <section id="instagram" className="padding-large">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Follow our instagram</h2>
          </div>
          <p>
            Our official Instagram account <a href="#">@ultras</a> or{" "}
            <a href="#">#ultras_clothing</a>
          </p>
          <div className="d-flex flex-wrap justify-content-between row">
            <InstaPicCard link="../../src/assets/images/insta-image1.jpg" />
            <InstaPicCard link="../../src/assets/images/insta-image2.jpg" />
            <InstaPicCard link="../../src/assets/images/insta-image3.jpg" />
            <InstaPicCard link="../../src/assets/images/insta-image4.jpg" />
            <InstaPicCard link="../../src/assets/images/insta-image5.jpg" />
            <InstaPicCard link="../../src/assets/images/insta-image6.jpg" />
          </div>
        </div>
      </section>

      <SmallCardSet />

      <Footer />
    </>
  );
}

export default Home;
