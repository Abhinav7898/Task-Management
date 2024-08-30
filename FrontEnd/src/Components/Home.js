import React from 'react';
import { Link } from 'react-router-dom';
import {LoginPath} from "./Routes";
import { useNavigate } from "react-router-dom";
import "react-bootstrap";



export default function Home() {
  let navigate = useNavigate();
  const handleLogoutClick = ()=>{
    window.localStorage.removeItem("userName");
    window.localStorage.removeItem("userId");
    window.localStorage.removeItem("userEmail");
    window.localStorage.removeItem("token");
    navigate(LoginPath);
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
  <Link className="navbar-brand" to="/Home">Task Management</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item mx-4">
        <Link className="nav-link" to="/AddTask">Add Task</Link>
      </li>
      <li className="nav-item mx-4 active">
        <Link className="nav-link" to="/Tasks">Tasks</Link>
      </li>
      <li className="nav-item mx-4">
        <Link className="nav-link" to="/TaskHistory">History</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/Feedback">Feedback</Link>
      </li>
    </ul>
    <form className="form-inline my-2 my-lg-0">
      <label htmlFor="exampleInputEmail1" className='text-white'>Hello {localStorage.getItem("userName")}</label>
      <button className="btn btn-outline-success mx-2 btn-sm" onClick={handleLogoutClick}>Log Out</button>
    </form>
  </div>
</nav>
  )
}
