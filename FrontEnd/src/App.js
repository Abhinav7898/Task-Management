import "./App.css";
import Login from "./Components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import SignUp from "./Components/SignUp";
import AddTasks from "./Components/AddTasks";
import Tasks from "./Components/Tasks";
import TaskHistory from "./Components/TaskHistory";
import { useState,useEffect } from "react";
import Feedback from "./Components/Feedback";
function App() {
  const [isLocalStorageNotEmpty, setIsLocalStorageNotEmpty] = useState(
    localStorage.getItem("token") !== null &&
    localStorage.getItem("userName") !== null
  );

    const setLocalStorage = (token, userName, userId, userEmail)=>{
      localStorage.setItem("token", token);
      localStorage.setItem("userName",userName);
      localStorage.setItem("userId",userId);
      localStorage.setItem("userEmail",userEmail);
      setIsLocalStorageNotEmpty(true);
    } 
    useEffect(() => {
      setIsLocalStorageNotEmpty(
        localStorage.getItem("token") !== null &&
        localStorage.getItem("userName") !== null && 
        localStorage.getItem("userId") !== null 
      );
    }, [])
  return (
    <>
    {!isLocalStorageNotEmpty ?(
      <Router>
        <Routes>
          <Route element={<Login setLocalStorage={setLocalStorage}></Login>} path="/"></Route>
          <Route Component={SignUp} exact path="/signup"></Route>
        </Routes>
      </Router>
    ):""}
      {isLocalStorageNotEmpty ? (
        <Router>
          <Home Component={Home} exact path="/Home"></Home>
          <Routes>
            <Route Component={AddTasks} exact path="/AddTask"></Route>
            <Route Component={Tasks} exact path="/Tasks"></Route>
            <Route Component={TaskHistory} exact path="/TaskHistory"></Route>
            <Route Component={Feedback} exact path="/Feedback"></Route>
          </Routes>
        </Router>
      ) : (
        ""
      )}
    </>
  );
}

export default App;
