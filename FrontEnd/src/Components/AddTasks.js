import React, { useState } from "react";
import { AddTasksApi } from "./ApiUrls";
import axios from "axios";
import "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';

export default function AddTasks() {

  const[taskName,setTaskName] = useState('');
  const[taskDesc,setTaskDesc] = useState('');

  const handleClear = ()=>{
    setTaskName('');
    setTaskDesc('');
  }
  const handleSubmitClick = (e)=>{
    e.preventDefault();
    const taskUserId = window.localStorage.getItem("userId");
    const tasks = {
      "taskUserId": taskUserId,
      "taskName": taskName,
      "taskDescription": taskDesc
    };
  
    const token = window.localStorage.getItem("token");

    axios.post(AddTasksApi, tasks,{
      headers:{
        Authorization: `Bearer ${token}`
    }
    }).then((res)=>{
      if(res.status === 201){
        toast.success("Task Added Successfully!");
        handleClear();
      }
      else{
        toast.error(res.message);
      }
      console.log(res.data);
    }).catch((err)=>{
      toast.error(err.message);
    })
  }

  const handleTaskNameChange = (e)=>{
    setTaskName(e.target.value)
  }
  const handleTaskDescChange = (e)=>{
    setTaskDesc(e.target.value)
  }
  return (
    <div className="container my-3">
      <form onSubmit={handleSubmitClick}>
      <ToastContainer/>
        <div className="form-group">
          <input value={taskName}
            onChange={handleTaskNameChange}
            type="text" required
            className="form-control col-md-6"
            placeholder="Task Name"/>
        </div>
        <div className="form-group">
          <input
          value={taskDesc} onChange={handleTaskDescChange}
            type="text"
            className="form-control col-md-6"
            placeholder="Task Description (Optional)" />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
