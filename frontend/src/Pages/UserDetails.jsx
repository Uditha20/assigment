import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';

function UserDetails() {
    const [payments, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/user/alluser');
        if (!response.ok) {
          throw new Error('Network response was not ok');
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
    const handleDelete = async (id) => {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      });
  
      if (result.isConfirmed) {
        try {
          await axios.patch(`http://localhost:5000/product/delete/${id}`);
        fetchData();
          Swal.fire(
            'Deleted!',
            'Your product has been deleted.',
            'success'
          );
        } catch (error) {
          console.error(`Error deleting product with id ${id}:`, error);
          setError(error);
          Swal.fire(
            'Error!',
            'There was an error deleting your product.',
            'error'
          );
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your product is safe :)',
          'error'
        );
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
      <div style={sidebar}>
      <Link to={'/AdminDashboard'}>
        <a style={sidebarA} href="#" className="active">
          <i className="fa-tachometer-alt fas"></i> Dashboard
        </a>
        </Link>
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
      <table className="table">
        <thead>
          <tr>
          <th scope="col">#</th>
            <th scope="col">Email</th>
            <th scope="col">Phone No</th>
            <th scope="col">Role</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
        {payments && payments.map((user, index) => (
            <tr key={user._id}>
              <th scope="row">{index + 1}</th>
              <td>{user.email}</td>
              <td>{user.phoneNo}</td>
              <td>{user.role}</td>
             

              
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js"></script>
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    </>
  )
}

export default UserDetails