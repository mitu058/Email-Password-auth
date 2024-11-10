import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import auth from "../firebase.init";

const SignUp = () => {
    const [errorMessage, setErrorMessage] = useState('')
    const handelSignUp = (e) =>{
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        console.log(email,password)
        // rest error message
        setErrorMessage('')
        if(password.length < 6){
            setErrorMessage('password must be at least 6 charecter or longer')
            return;
        }
        // creat user with email and password
        createUserWithEmailAndPassword(auth,email,password)
       .then(result => {
        console.log(result.user)
       })
       .catch(error =>{
        console.log('ERROR',error.message)
        setErrorMessage(error.message)
       })
        
    }
  return (
    <div>
     
        <div className="hero-content flex-col lg:flex-row-reverse mt-20">
       
         
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <h1 className="text-3xl text-center pt-3 font-bold">SignUp now!</h1>

            <form onSubmit={handelSignUp} className="card-body">
            
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Sign Up</button>
              </div>
            </form>
            {
                errorMessage && <p className="text-center pb-3 text-red-500">{errorMessage}</p>
            }
          </div>
        </div>
      </div>
    
  );
};

export default SignUp;
