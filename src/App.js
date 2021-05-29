import React, { Fragment, useState, useEffect} from "react";
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//components


import Dashboard from "./components/Dashboard";
import LoginTodos from "./components/LoginTodos";
import RegisterTodos from "./components/RegisterTodos";
import {BrowserRouter as Router, Switch, Route,Redirect} from "react-router-dom"


toast.configure();

function App() {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const setAuth = (Boolean) => {
      setIsAuthenticated(Boolean);
    };

    async function  isAuth() {
      try {
        const response = await fetch(`https://datababestodoappserver.herokuapp.com/auth/is-verify`,{
          method: "GET",
          headers: { token: localStorage.token},
      })

      const parseRes = await response.json()

        if(parseRes === true){
          setIsAuthenticated(true)
        }
        else{
          setIsAuthenticated(false)
        }

      } catch (error) {
        console.error(error.message)
      }


    }

    useEffect( ()=> {
      isAuth()
      
    },[])

  return (
    <Fragment>
      <Router>
      <div className="container">
      <switch>
     
      <Route exact path="/login" render={props => !isAuthenticated ? <LoginTodos {...props} setAuth={setAuth}  />   : <Redirect to = "/dashboard"/> } />
      <Route exact path="/register" render={props => !isAuthenticated ? <RegisterTodos {...props} setAuth={setAuth} /> : <Redirect to="/login"/> } />
      <Route exact path="/dashboard" render={props => isAuthenticated ? <Dashboard {...props} setAuth={setAuth}/> : <Redirect to="/login"/>  } />
      <Route exact path="/" render={props => isAuthenticated ? <Dashboard {...props} setAuth={setAuth}/> : <Redirect to="/dashboard"/>  } />


      </switch>
      </div>
      </Router>
    </Fragment>
  );
};

export default App;
