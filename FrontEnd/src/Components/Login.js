import React, { useState } from "react";
import "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { HomePath, SignUpPath } from "./Routes";
import { LoginApi } from "./ApiUrls";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
export default function Login(props) {
  const [justifyActive, setJustifyActive] = useState("tab1");

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const Registration = {
      email: email,
      password: password,
    };
    await axios
      .post(LoginApi, Registration)
      .then((res) => {
        if (res && res.status == 200) {
          var data = res.data;
          props.setLocalStorage(
            data.token,
            data.userName,
            data.userId,
            data.userEmail
          );
          toast.success("Login Success");
          navigate(HomePath);
        } else {
          toast.error("Invalid Credentials");
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          toast.error("Invaliad Credentials");
        } else {
          toast.error(err.message);
        }
      });
  };

  const handleCreateAccount = () => {
    navigate(SignUpPath);
  };
  return (
    <div className="container">
      <ToastContainer />
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
                <h1>Log In to Task Management</h1>
              </div>
              <MDBInput
                wrapperClass="mb-4"
                required
                label="Email address"
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

              {/* <div className="d-flex justify-content-between mb-4">
            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
            <a href="!#">Forgot password?</a>
          </div> */}

              <div className="text-center text-md-start mt-4 pt-2">
                <MDBBtn className="mb-0 px-5" size="lg">
                  Login
                </MDBBtn>
                <p className="small fw-bold mt-2 pt-1 mb-2">
                  Don't have an account?{" "}
                  <Link to={SignUpPath} className="link-danger">
                    Register
                  </Link>
                </p>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </form>
    </div>
  );
}
