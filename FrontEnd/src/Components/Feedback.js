import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FeedbackApi } from "./ApiUrls";
import axios from 'axios';


export default function Feedback() {

    const[feedback, setFeedback] = useState('');
    const handleSubmitClick = async(e)=>{
        e.preventDefault();
        const data = {
            userName: window.localStorage.getItem("userName"),
            userId : window.localStorage.getItem("userId"),
            userEmail : window.localStorage.getItem("userEmail"),
            feedbackSuggestion : feedback
        }

        const token = window.localStorage.getItem("token");

        await axios.post(FeedbackApi, data,{
            headers:{
                Authorization: `Bearer ${token}` 
            }
        }).then((res)=>{
            if(res.status === 201){
                toast.success("Submitted Successfully!");
                setFeedback('');
            }
            else{
                toast.error(res.message);
            }
        }).catch((err)=>{
            toast.error(err.message);
        })
    }

    const handleFeedbackChange = (e)=>{
        setFeedback(e.target.value);
    }
  return (
    <div className="container">
        <ToastContainer/>
  <div className="row justify-content-center align-items-center" style={{ height: '85vh' }}>
    <form onSubmit={handleSubmitClick} className="col-md-8">
      <div className="form-group d-flex flex-column align-items-center">
        {/* <label htmlFor="feedback">Enter Your Feedback</label> */}
        <input
          value={feedback}
          onChange={handleFeedbackChange}
          required
          id="feedback"
          type="text"
          className="form-control"
          placeholder="Enter your Feedback..."
          style={{ height: '50px' }} // Adjust the height as needed
        />
        <button className="btn btn-success mt-2">
          Submit
        </button>
      </div>
    </form>
  </div>
</div>
  )
}
