import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardCard from "../Components/DashboardCard";
import { Link } from "react-router-dom";
function Product({ existProduct, clearEditing }) {
  const [message, setMessage] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const initialProductName = existProduct ? existProduct.productName : "";
  const initialPrice = existProduct ? existProduct.price : "";
  const initialCount = existProduct ? existProduct.item_count : 0;
  const initialColor = existProduct ? existProduct.color : "";
  const initialSize = existProduct ? existProduct.size : "";
  const initialDescription = existProduct ? existProduct.description : "";
  const initialCategory =existProduct ? existProduct.category : "";
  
 
  const initialMainImage = existProduct ? existProduct.mainImage : null;
  const initialAdditionalImages = existProduct
    ? existProduct.additionalImages
    : [];


  const [productName, setProductName] = useState(initialProductName);
  const [price, setPrice] = useState(initialPrice);
  const [count, setCount] = useState(initialCount);
  const [color, setColor] = useState(initialColor);
  const [size, SetSize] = useState(initialSize);
  const [description, setDescription] = useState(initialDescription);
  
  const [Category, setCategory] = useState(
    initialCategory
  );
  const [mainImage, setMainImage] = useState(initialMainImage);
  const [additionalImages, setAdditionalImages] = useState(
    initialAdditionalImages
  );

  const handleMainImageChange = (event) => {
    setMainImage(event.target.files[0]);
  };

  const handleAdditionalImagesChange = (event) => {
    setAdditionalImages([...event.target.files]);
  };

  const addProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("price", price);
    formData.append("item_count", count);
    formData.append("color", color);
    formData.append("size", size);
    formData.append("categoryName", Category);
    formData.append("description", description);
    if (mainImage) {
      formData.append("mainImage", mainImage);
    }
    additionalImages.forEach((image) => {
      formData.append("additionalImages", image);
    });
    // console.log(formData)
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }
    try {
      const response = await axios.post("http://localhost:5000/product/addProduct", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data.message === "ok") {
        setMessage("Successfully added product");
        setErrMsg("");
        // Reset form fields
        setProductName("");
        setPrice("");
        setCount(0);
        setColor("");
        SetSize("");
        setCategory("");
        setMainImage(null);
        setAdditionalImages([]);
        setDescription("");
      }
     
    } catch(err) {
      console.log(err.message);
    }
    // try {
    //   let response;
    //   if (existProduct) {
    //     response = await axios.put(
    //       `/products/editProduct/${existProduct._id}`,
    //       formData,
    //       {
    //         headers: {
    //           "Content-Type": "multipart/form-data",
    //         },
    //       }
    //     );
    //     window.location.href = `${process.env.REACT_APP_DASH_URL}product`;
    //     clearEditing();
    //     console.log(response.data);
    //   } else {
    //     response = await axios.post("/products/addProduct", formData, {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //       },
    //     });
    //   }
    //   if (response.data.message === "ok") {
    //     setMessage("Successfully added product");
    //     setErrMsg("");
    //     // Reset form fields
    //     setProductName("");
    //     setPrice("");
    //     setCount(0);
    //     setColor("");
    //     SetSize("");
    //     setSelectedCategory("");
    //     setSelectBrand("");
    //     setMainImage(null);
    //     setAdditionalImages([]);
    //     setDescription("");
    //     setWeight("");
    //   }
    // } catch (err) {
    //   setErrMsg("Can't add product");
    //   console.error(err.message);
    //   setMessage("");
    // }
  };

  const logout = async () => {
    try {
      const logOut = await axios.get("/user/logout");
      if (logOut.data) {
        // console.log(logOut.data.message);
        window.location.href = "http://localhost:5173/";
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const sidebar = {
    height: "100%",
    width: "250px",
    position: "fixed",
    top: "0",
    left: "0",
    backgroundColor: "#343a40",
    paddingTop: "20px",
    overflowY: "auto",
  };
  const sidebarA = {
    padding: "10px 20px",
    textDecoration: "none",
    fontSize: "18px",
    color: "#f8f9fa",
    display: "block",
  };
  /* Main content */
  const content = {
    marginLeft: "250px",
    padding: "20px",
  };
  return (
    <>
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
      />

      {/* <!-- Sidebar --> */}
      <div style={sidebar}></div>
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <div style={sidebar} className="col-lg-3 col-md-4">
            <a style={sidebarA} href="#" className="active">
              <i className="fa-home fas"></i> Dashboard
            </a>
            <Link to={"/product"}>
              <a style={sidebarA} href="#">
                <i className="fa-box fas"></i> Add Products
              </a>
            </Link>
            <Link to={"/allproduct"}>
              <a style={sidebarA} href="#">
                <i className="fa-box fas"></i> View Products
              </a>
            </Link>
            <Link to={"/allSales"}>
              <a style={sidebarA} href="#">
                <i className="fa-box fas"></i>View Sales
              </a>
            </Link>
            <Link to={"/allDetails"}>
              <a style={sidebarA} href="#">
                <i className="fa-users fas"></i>Users
              </a>
            </Link>
            <a style={sidebarA} onClick={logout}>
              <span style={{ cursor: "pointer" }}>Logout</span>
            </a>
          </div>

          {/* Main Content */}
          <div style={content} className="col-lg-9 col-md-8">
            <div className="container">
              <div className="form-container">
              <form method="POST" onSubmit={addProduct}>
        {message && <p className="alert alert-success">{message}</p>}
        {errMsg && <p className="alert alert-danger">{errMsg}</p>}
        <div className="form-group pb-3">
          <label htmlFor="productName">Product Name</label>
          <input
            type="text"
            className="form-control pt-2 mt-2"
            id="productName"
            aria-describedby="productNameHelp"
            value={productName}
            placeholder="Ex: Levis t-shirt"
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div className="form-group pb-3">
          <label htmlFor="size">Product Category</label>
          <input
            type="text"
            className="form-control pt-2 mt-2"
            id="size"
            aria-describedby="sizeHelp"
            value={Category}
            placeholder="Ex: Sm, Lg"
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="form-group pb-3">
          <label htmlFor="price">Product Price</label>
          <input
            type="text"
            className="form-control pt-2 mt-2"
            id="price"
            aria-describedby="priceHelp"
            value={price}
            placeholder="Ex: $100"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="form-group pb-3">
          <label htmlFor="count">Product Count</label>
          <input
            type="text"
            className="form-control pt-2 mt-2"
            id="count"
            aria-describedby="countHelp"
            value={count}
            placeholder="Ex: 5"
            onChange={(e) => setCount(e.target.value)}
          />
        </div>
        <div className="form-group pb-3">
          <label htmlFor="description">Product Description</label>
          <input
            type="text"
            className="form-control pt-2 mt-2"
            id="description"
            aria-describedby="descriptionHelp"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group pb-3">
          <label htmlFor="color">Color</label>
          <input
            type="text"
            className="form-control pt-2 mt-2"
            id="color"
            aria-describedby="colorHelp"
            value={color}
            placeholder="Ex: red"
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        <div className="form-group pb-3">
          <label htmlFor="size">Product Size</label>
          <input
            type="text"
            className="form-control pt-2 mt-2"
            id="size"
            aria-describedby="sizeHelp"
            value={size}
            placeholder="Ex: Sm, Lg"
            onChange={(e) => SetSize(e.target.value)}
          />
        </div>
        <div className="form-group pb-3">
          <label className="">Main Image</label>
          <input
            type="file"
            className="form-control"
            onChange={handleMainImageChange}
          />
        </div>
        <div className="form-group">
          <label className="">Additional Images</label>
          <input
            type="file"
            className="form-control"
            multiple
            onChange={handleAdditionalImagesChange}
          />
        </div>
        <button type="submit" className="btn btn-primary btn-submit mt-3">
          Submit
        </button>
      </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js"></script>
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    </>
  );
}

export default Product;
