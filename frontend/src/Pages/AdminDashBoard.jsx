import React, { useEffect, useState } from "react";
import DashboardCard from "../Components/DashboardCard";
import axios from "axios";
import { Link } from "react-router-dom";

function AdminDashBoard() {
  const [payments, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/user/count");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
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
      <div style={sidebar}>
        <a style={sidebarA} href="#" className="active">
          <i className="fa-tachometer-alt fas"></i> Dashboard
        </a>
        <Link to={"/product"}>
          <a style={sidebarA} href="#">
            <i className="fa-plus-square fas"></i> Add Products
          </a>
        </Link>
        <Link to={"/allproduct"}>
          <a style={sidebarA} href="#">
            <i className="fa-eye fas"></i> View Products
          </a>
        </Link>
        <Link to={"/allSales"}>
          <a style={sidebarA} href="#">
            <i className="fa-chart-line fas"></i> View Sales
          </a>
        </Link>
        <Link to={"/allDetails"}>
          <a style={sidebarA} href="#">
            <i className="fa-user-friends fas"></i> Users
          </a>
        </Link>
        <a style={sidebarA} onClick={logout}>
          <span style={{ cursor: "pointer" }}>
            <i className="fa-sign-out-alt fas"></i> Logout
          </span>
        </a>
      </div>

      <div style={content}>
        <h2 className="mb-4">Dashboard</h2>
        <div className="row">
          <div className="col-md-4">
            <DashboardCard
              bgColor="bg-info"
              title="Total Product"
              text={payments.productCount}
            />
          </div>
          <div className="col-md-4">
            <DashboardCard
              bgColor="bg-success"
              title="Total Customers"
              text={payments.userCount}
            />
          </div>
          <div className="col-md-4">
            <DashboardCard
              bgColor="bg-warning"
              title="Total Sales"
              text={payments.paymentCount}
            />
          </div>
        </div>
      </div>

      <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js"></script>
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    </>
  );
}

export default AdminDashBoard;
