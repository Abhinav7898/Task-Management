import React, { useState, useEffect } from 'react';
import { GetTasksHistApi } from "./ApiUrls";
import axios from "axios";


export default function TaskHistory() {
  const[data, setData] = useState([]);

const getData = async()=>{
  const userId = window.localStorage.getItem("userId");
  const token = window.localStorage.getItem("token");
  const url = `${GetTasksHistApi}?userId=${userId}`;
  axios.get(url,{
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }).then((res)=>{
    setData(res.data);
  }).catch((err)=>{
    console.log(err);
  })
}
useEffect(() => {
  getData();
}, []);
  return (
    <div className='container my-2'>
    <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Task Name</th>
      <th scope="col">Task Description</th>
    </tr>
  </thead>
  <tbody>
    {data && data.length !=0 ? (
      data.map((item, index)=>(
    <tr>
      <th scope="row">{index+1}</th>
      <td>{item.taskName}</td>
      <td>{item.taskDescription}</td>
    </tr>
    ))
    ):"No Data Present"}
  </tbody>
</table>
</div>
  )
}
