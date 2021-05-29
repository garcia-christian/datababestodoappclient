import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";

import InputTodo from "./InputTodo";
import ListTodos from "./ListTodos"


const Dashboard= ({setAuth}) => {
 
  const [name,setName] = useState([]);
  const [userId, setId] = useState([]);
  const [statusU, setStatusU] = useState([]);

//console.log(statusU)



  async function getName(){

    try {
        const response = await fetch(`https://datababestodoappclient.herokuapp.com/dashboard`,{
            method: "GET",
            headers: {token: localStorage.token}
        });

        const pareRes = await response.json()
        
        console.log(pareRes)
        setName(pareRes.user_name)

        setId(pareRes.user_id)
    
    } catch (error) {
        console.error(error.message)
    }
    
  }
  const logout = e => {
      e.preventDefault();
      localStorage.removeItem("token");
      toast.error("Logged out")
      setAuth(false);
  }

  useEffect( ()=> {
    getName();
  },[])

    return (
        <Fragment>
    <headers >Welcome {name}
    <button className="btn btn-outline-danger ml-2" onClick={e => logout(e) }>Logout</button>
    
    </headers>
      
       <InputTodo userId = {userId} statusU = {statusU} />
       <ListTodos userId = {userId} setStatusU = {setStatusU} />
      
    
          </Fragment>
    );
}

export default Dashboard;