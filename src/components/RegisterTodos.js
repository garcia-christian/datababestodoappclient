import React, { Fragment, useState } from "react";
import {toast} from "react-toastify"
const RegisterTodos= ({setAuth}) => {
    
        const [inputs,setInputs] = useState({
            email:"",
            password:"",
            name:""
        })
        
        const {email, password, name} = inputs;

        const onChange = (e) => {
            setInputs({...inputs, [e.target.name] : e.target.value  })
        }
        
        const onSubmitForm = async (e) => {
            e.preventDefault()
            try {
                
                const body = {email,password,name}

                const response = await fetch(`https://datababestodoappserver.herokuapp.com/auth/register`,{
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                })
            
            const parseRes = await response.json()
       
         

           if(parseRes.token){
            localStorage.setItem("token",parseRes.token)
            toast.success("Registered Successfully")
            setAuth(true)
           }else{
               setAuth(false);
               toast.error(parseRes)
           }
                
            } catch (error) {
                console.error(error.message)
            }
        }

  
    return (
        <Fragment>
         
           <h1 className="text-center my-5"> Register</h1>
          <form onSubmit={onSubmitForm}>

            <input type="email" name="email" placeholder="Email" value={email} onChange={e => onChange(e)} className="form-control my-3" />
            <input type="password" name="password" placeholder="Password" value={password} onChange={e => onChange(e)} className="form-control my-3" />
            <input type="name" name="name" placeholder="Name" value={name} onChange={e => onChange(e)} className="form-control my-3" />
            <label className="">Already have account? <a href="/login">Login</a></label>
            <div>
            <button className="btn btn-outline-success btn-lock">Submit</button>
            </div>

          </form>
    
           
          </Fragment>
    );
}

export default RegisterTodos;