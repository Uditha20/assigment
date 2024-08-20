import React from "react";

import Header from "../Components/Header";
import Footer from "../Components/Footer";
import LandImageDiv from "../Components/LandImageDiv";
import SmallCard from "../Components/SmallCard";
import Artical from "../Components/Artical";
import InstaPicCard from "../Components/InstaPicCard";

function AboutUs() {
  return (
    <>
      <Header />

      <LandImageDiv
        img="../../src/assets/images/hero-image.jpg"
        pageName="About Us"
        name1="Home /"
        name2="About"
       />
      <section id="shipping-information" className="padding-large" >
        <div className="container">
          <div className="d-flex flex-wrap justify-content-between align-items-center row">
            <SmallCard
              icon="icon icon-truck"
              bolt="Free shipping"
              light="Over $200"
            />
            <SmallCard
              icon="icon icon-return"
              bolt="Money back"
              light="Return within 7 days"
            />
            <SmallCard
              icon="icon icon-tags1"
              bolt="Buy 4 get 5th"
              light="50% off"
            />
            <SmallCard
              icon="icon icon-help_outline"
              bolt="Any questions?"
              light="experts are ready"
            />
          </div>
        </div>
      </section>

      <section id="about-us" >
        <div className="container">
          <div className="d-flex align-items-center row">
            <div className="col-lg-6 col-md-12">
              <div className="image-holder">
                <img
                  src="../../src/assets/images/single-image1.jpg"
                  alt="single"
                  className="about-image"
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="detail">
                <div className="display-header">
                  <h2 className="section-title">
                    How was Ultras Store started?
                  </h2>
                  <p>
                    Risus augue curabitur diam senectus congue velit et. Sed
                    vitae metus nibh sit era. Nulla adipiscing pharetra
                    pellentesque maecenas odio eros at. Et libero vulputate amet
                    duis erat volutpat vitae eget. Sed vitae metus nibh sit era.
                    Nulla adipiscing pharetra pellentesque maecenas odio eros
                    at.
                    <br />
                    Sed vitae metus nibh sit era. Nulla adipiscing pharetra
                    pellentesque maecenas odio eros at. Et libero vulputate amet
                    duis erat volutpat vitae eget. Quam libero etiam et in ac at
                    quis. Risus augue curabitur diam senectus congue velit et.{" "}
                  </p>
                  <div className="btn-wrap">
                    <a
                      href="shop.html"
                      className="d-flex align-items-center btn btn-dark btn-medium"
                      tabindex="0"
                    >
                      Shop our store<i className="icon-arrow-io icon"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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

      <Footer />
    </>
  );
}

export default AboutUs;
