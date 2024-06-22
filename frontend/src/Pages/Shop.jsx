import React, { useEffect, useState } from 'react'

import Header from '../Components/Header'
import Footer from '../Components/Footer'
import LandImageDiv from '../Components/LandImageDiv'
import Artical from '../Components/Artical'
import InstaPicCard from '../Components/InstaPicCard'
import PageSwitcher from '../Components/PageSwitcher'
import ProductItem from '../Components/ProductItem'
import SmallCardSet from '../Components/SmallCardSet'
import axios from 'axios'
import { useUser } from "../context/UserContext";

function Shop() {
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

            <LandImageDiv img="../../src/assets/images/hero-image.jpg" pageName="Shop page" name1="Home /" name2="Shop" name3="/Login /" />

            <div className="shopify-grid padding-large">
                <div className="container">
                    <div className="row">

                        <section id="selling-products" className="col-md-9 product-store">
                            <div className="container">
                                <ul className="list-unstyled tabs">
                                    <li data-tab-target="#all" className="active tab">All</li>
                                    <li data-tab-target="#shoes" className="tab">Shoes</li>
                                    <li data-tab-target="#tshirts" className="tab">Tshirts</li>
                                    <li data-tab-target="#pants" className="tab">Pants</li>
                                    <li data-tab-target="#hoodie" className="tab">Hoodie</li>
                                    <li data-tab-target="#outer" className="tab">Outer</li>
                                    <li data-tab-target="#jackets" className="tab">Jackets</li>
                                    <li data-tab-target="#accessories" className="tab">Accessories</li>
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






                                <PageSwitcher />
                            </div>
                        </section>

                        <aside className="col-md-3">
                            <div className="sidebar">
                                <div className="widget-menu widgets">
                                    <div className="widget-search-bar">
                                        <form role="search" method="get" className="d-flex">
                                            <input className="search-field" placeholder="Search" type="text" />
                                            <button className="btn btn-dark"><i className="icon icon-search"></i></button>
                                        </form>
                                    </div>
                                </div>
                                <div className="widget-product-tags widgets">
                                    <h5 className="widget-title">Tags</h5>
                                    <ul className="list-unstyled product-tags sidebar-list">
                                        <li className="tags-item">
                                            <a href="">White</a>
                                        </li>
                                        <li className="tags-item">
                                            <a href="">Cheap</a>
                                        </li>
                                        <li className="tags-item">
                                            <a href="">Branded</a>
                                        </li>
                                        <li className="tags-item">
                                            <a href="">Modern</a>
                                        </li>
                                        <li className="tags-item">
                                            <a href="">Simple</a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="widget-product-brands widgets">
                                    <h5 className="widget-title">Brands</h5>
                                    <ul className="list-unstyled product-tags sidebar-list">
                                        <li className="tags-item">
                                            <a href="">Nike</a>
                                        </li>
                                        <li className="tags-item">
                                            <a href="">Adidas</a>
                                        </li>
                                        <li className="tags-item">
                                            <a href="">Puma</a>
                                        </li>
                                        <li className="tags-item">
                                            <a href="">Spike</a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="widget-price-filter widgets">
                                    <h5 className="widget-title">Filter By Price</h5>
                                    <ul className="list-unstyled product-tags sidebar-list">
                                        <li className="tags-item">
                                            <a href="">Less than $10</a>
                                        </li>
                                        <li className="tags-item">
                                            <a href="">$10- $20</a>
                                        </li>
                                        <li className="tags-item">
                                            <a href="">$20- $30</a>
                                        </li>
                                        <li className="tags-item">
                                            <a href="">$30- $40</a>
                                        </li>
                                        <li className="tags-item">
                                            <a href="">$40- $50</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </aside>

                    </div>
                </div>
            </div>

            <hr />
            <section id="latest-blog" className="padding-large">
                <div className="container">
                    <div className="d-flex flex-wrap justify-content-between align-items-center section-header">
                        <h2 className="section-title">our Journal</h2>
                        <div className="align-right btn-wrap">
                            <a href="blog.html" className="d-flex align-items-center">Read All Articles <i className="icon-arrow-io icon icon"></i>
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
                        <img src="../../src/assets/images/brand1.png" alt="phone" className="brand-image" />
                        <img src="../../src/assets/images/brand2.png" alt="phone" className="brand-image" />
                        <img src="../../src/assets/images/brand3.png" alt="phone" className="brand-image" />
                        <img src="../../src/assets/images/brand4.png" alt="phone" className="brand-image" />
                        <img src="../../src/assets/images/brand5.png" alt="phone" className="brand-image" />
                    </div>
                </div>
            </section>

            <section id="instagram" className="padding-large">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Follow our instagram</h2>
                    </div>
                    <p>Our official Instagram account <a href="#">@ultras</a> or <a href="#">#ultras_clothing</a>
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
    )
}

export default Shop