import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function EditProduct() {
  const [message, setMessage] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [productData, setProductData] = useState({
    productName: "",
    price: "",
    color: "",
    quantity: "",
    image: null,
  });
  const [product, setProduct] = useState("");
  const { id } = useParams();
  if (id) {
    useEffect(() => {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/product/product/${id}`
          );
          setProductData(response.data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchProduct();
    }, []);
  }

  console.log(product);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProductData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };
  const productAdd = async (e) => {
    e.preventDefault();

    const { productName, price, color, quantity, image } = productData;

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("price", price);
    formData.append("color", color);
    formData.append("quantity", quantity);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.patch(
        `http://localhost:5000/product/updateproduct/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.message) {
        setProductData({
          productName: "",
          price: "",
          color: "",
          quantity: "",
          image: null,
        });
        setMessage(response.data.message);
      }
    } catch (error) {
      setErrMsg("Fail Add");
    }
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
            <Link to={"/AdminDashboard"}>
              <a style={sidebarA} href="#" className="active">
                <i className="fa-tachometer-alt fas"></i> Dashboard
              </a>
            </Link>
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
              <div className="row">
                <div className="col-md-10">
                  <h1 className="h3 mb-4 text-gray-800">ADD Product</h1>
                  <form onSubmit={productAdd}>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label htmlFor="productName" className="form-label">
                          Product Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="productName"
                          name="productName"
                          value={productData.productName}
                          onChange={handleInputChange}
                          placeholder="Product Name"
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="price" className="form-label">
                          Price
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="price"
                          name="price"
                          value={productData.price}
                          onChange={handleInputChange}
                          placeholder="Price"
                          required
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label htmlFor="color" className="form-label">
                          Color
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="color"
                          name="color"
                          value={productData.color}
                          onChange={handleInputChange}
                          placeholder="Color"
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="quantity" className="form-label">
                          Quantity
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="quantity"
                          name="quantity"
                          value={productData.quantity}
                          onChange={handleInputChange}
                          placeholder="Quantity"
                          required
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label htmlFor="image" className="form-label">
                          Image
                        </label>
                        <input
                          type="file"
                          className="form-control"
                          id="image"
                          name="image"
                          onChange={handleFileChange}
                        />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Add Product
                    </button>
                  </form>
                  {message && <p>{message}</p>}
                  {errMsg && <p>{errMsg}</p>}
                </div>
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

export default EditProduct;
