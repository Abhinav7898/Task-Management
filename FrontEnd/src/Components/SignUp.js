import React, { useState } from "react";
import "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import {HomePath,LoginPath} from "./Routes";
import { SignUpApi } from "./ApiUrls";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";

export default function SignUp() {
    let navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNo, setPhoneNo] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handlePhoneNoChange = (e) => {
    setPhoneNo(e.target.value);
  };

  const handleClear = ()=>{
    setName('');
    setEmail('');
    setPassword('');
    setPhoneNo('');
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    const data = {
        name:name,
        email:email,
        password:password,
        phoneNo:phoneNo,
        isactive:1
    };

    await axios.post(SignUpApi, data)
    .then((res)=>{
        console.log(res);
        if(res.status===201){
            toast.success("User Added Successfully, Please Login Now");
            handleClear();
        }
        else{
            toast.error("User Already Exist");
        }
    }).catch((err)=>{
        console.log(err.status);
        toast.error("User Already Exist");
    })
  }
  const handleSignInClick =()=>{
    navigate(LoginPath);
  }
  return (
    <div className="container">
      <ToastContainer/>
    <form onSubmit={handleSubmit}>
        <MDBContainer fluid className="p-3 my-5 h-custom">
          <MDBRow>
            <MDBCol col="10" md="6">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                class="img-fluid"
                alt="Sample image"
              />
            </MDBCol>

            <MDBCol col="4" md="6">
              <div className="d-flex flex-row align-items-center justify-content-center my-4">
                <h1>Sign In to Task Management</h1>
              </div>
              <MDBInput
                wrapperClass="mb-4"
                required
                label="User Name"
                id="formControlLg"
                value={name}
                onChange={handleNameChange}
                type="text"
                size="lg"
              />
              <MDBInput
                wrapperClass="mb-4"
                required
                label="Email Address"
                id="formControlLg"
                value={email}
                onChange={handleEmailChange}
                type="email"
                size="lg"
              />
              <MDBInput
                wrapperClass="mb-4"
                required
                label="Password"
                id="formControlLg"
                value={password}
                onChange={handlePasswordChange}
                type="password"
                size="lg"
              />
              <MDBInput
                wrapperClass="mb-4"
                required
                label="Phone Number"
                id="formControlLg"
                value={phoneNo}
                onChange={handlePhoneNoChange}
                type="text"
                size="lg"
              />
              <div className="text-center text-md-start mt-4 pt-2">
                <MDBBtn className="mb-0 px-5 btn-success" size="lg">
                  Submit
                </MDBBtn>
                <MDBBtn onClick={handleSignInClick} className="mb-0 px-5 mx-2" size="lg">
                  Login
                </MDBBtn>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </form>
      </div>
  )
}
