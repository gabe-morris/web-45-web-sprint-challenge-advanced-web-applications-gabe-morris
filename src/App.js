import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axiosWithAuth from "./helpers/axiosWithAuth";
import Login from "./components/Login";
import "./styles.scss";
import PrivateRoute from './components/PrivateRoute'
import BubblePage from './components/BubblePage'
function App() {

  const Logout = () =>{
    useEffect(()=>{
      axiosWithAuth()
      .post("http://localhost:5000/api/logout")
      .then(res=>{
        localStorage.removeItem("token")
        localStorage.removeItem("username", res.data.username)
        .push('/login')

      })
    },[])
    return(<div></div>)
  }

  return (
    <Router>
      <div className="App">
        <header>
          Color Picker Sprint Challenge
          <a data-testid="logoutButton" href='/'>logout</a>
        </header>
        <Switch>
          <PrivateRoute path='/bubblepage' component={BubblePage}>
            <BubblePage/>
          </PrivateRoute>
        <Route path='/login'>
        <Login/>
        </Route>
        <Route path='/'>
          <Login/>
        </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

//Task List:
//1. Add in two routes that link to the Login Component, one for the default path '/' and one for the '/login'.
//2. Render BubblePage as a PrivateRoute
//2. Build the logout button to call the logout endpoint, remove the localStorage Item and redirect to the login page.