import React, { useState, useEffect } from "react";
import { GetTaskApi, DeleteTasksApi, UpdateTasksHistApi } from "./ApiUrls";
import axios from "axios";
import "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";


export default function Tasks() {
  const [data, setData] = useState([]);
  const [editTaskName, seteditTaskName] = useState("");
  const [editTaskDesc, seteditTaskDesc] = useState("");
  const [editTaskId, seteditTaskId] = useState("");

  const handleEditTaskChange = (taskUserId, taskId, taskName, taskDesc) => {
    seteditTaskName(taskName);
    seteditTaskDesc(taskDesc);
    seteditTaskId(taskId);
  };

  const handleEditTaskDescChange = (e) => {
    seteditTaskDesc(e.target.value);
  };

  const handleEditTaskNameChange = (e) => {
    seteditTaskName(e.target.value);
  };

  const getData = async () => {
    const userId = window.localStorage.getItem("userId");
    const token = window.localStorage.getItem("token");
    const url = `${GetTaskApi}?userId=${userId}`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClear = () => {
    seteditTaskName("");
    seteditTaskDesc("");
    seteditTaskId("");
  };

  const getTaskFormData = (userId, taskId, taskName, taskDescription) => {
    return {
      taskUserId: userId,
      taskId: taskId,
      taskName: taskName,
      taskDescription: taskDescription,
    };
  };

  const handleEditSaveClick = () => {
    const userId = window.localStorage.getItem("userId");
    const token = window.localStorage.getItem("token");
    const data = getTaskFormData(
      userId,
      editTaskId,
      editTaskName,
      editTaskDesc
    );
    axios
      .post(UpdateTasksHistApi, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Task Edited Successfully!");
          handleClear();
          getData();
        } else {
          toast.error(res.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  useEffect(() => {
    getData();
  }, []);
  const handleDeleteClick = (userId, taskId, taskName, taskDescription) => {
    debugger;
    console.log(userId, taskId, taskName, taskDescription);
    const token = window.localStorage.getItem("token");
    const tasks = getTaskFormData(userId, taskId, taskName, taskDescription);
    axios
      .delete(DeleteTasksApi, {
        data: tasks,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Task Deleted Successfully!");
        } else {
          toast.error(res.message);
        }
        getData();
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  return (
    <div className="container my-2">
        <ToastContainer/>
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Task
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <input
                  value={editTaskName}
                  onChange={handleEditTaskNameChange}
                  type="text"
                  className="form-control col-md-6"
                  placeholder="Task Name"
                />
              </div>
              <div className="form-group">
                <input
                  value={editTaskDesc}
                  onChange={handleEditTaskDescChange}
                  type="text"
                  className="form-control col-md-6"
                  placeholder="Task Description (Optional)"
                />
              </div>
              <div>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary mx-2"
                  onClick={handleEditSaveClick}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Task Name</th>
            <th scope="col">Task Description</th>
            <th colSpan={4}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length != 0
            ? data.map((item, index) => (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{item.taskName}</td>
                  <td>{item.taskDescription}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        handleEditTaskChange(
                          item.taskUserId,
                          item.taskId,
                          item.taskName,
                          item.taskDescription
                        )
                      }
                      data-toggle="modal"
                      data-target="#exampleModal"
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        handleDeleteClick(
                          item.taskUserId,
                          item.taskId,
                          item.taskName,
                          item.taskDescription
                        )
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            : "No Data Present"}
        </tbody>
      </table>
    </div>
  );
}
