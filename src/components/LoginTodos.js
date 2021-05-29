import React, { Fragment, useState } from "react";
import {toast} from "react-toastify"


const LoginTodos= ({setAuth}) => {
    
    const [inputs,setInputs] = useState({
        email:"",
        password:""
    })
    
    
    const {email, password, name} = inputs;

    const onChange = (e) => {
        setInputs({...inputs, [e.target.name] : e.target.value  })
    }
    
    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = {email,password}

                const response = await fetch(`https://datababestodoappserver.herokuapp.com/auth/login`,{
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                })

                const parseRes = await response.json()

                if(parseRes.token){
                    localStorage.setItem("token",parseRes.token)
                    setAuth(true)
                    toast.success("Logged in successfully")
                }else{
                    setAuth(false)
                    toast.error(parseRes)
                }

             
            
        } catch (error) {
            console.error(error.message)
        }

    }
  
    return (
        <Fragment>

            <h1 className="text-center my-5">Login</h1>
          <form onSubmit={onSubmitForm}>

            <input type="email" name="email" placeholder="Email" value={email} onChange={e => onChange(e)} className="form-control my-3" />
            <input type="password" name="password" placeholder="Password" value={password} onChange={e => onChange(e)} className="form-control my-3" />
            <label className="text-rigt">New User? <a href="/register">Register</a></label>
            <div>
            <button className="btn btn-outline-success btn-lock">Submit</button>

            </div>

          </form>
        
          </Fragment>
    );
}

export default LoginTodos;