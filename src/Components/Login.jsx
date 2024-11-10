import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import React, { useRef, useState } from "react";
import auth from "../firebase.init";
import { Link } from "react-router-dom";

const Login = () => {
  const [success, setSuccess] = useState(false);
  const [loginError, setLoginError] = useState("");
const emailRef = useRef()

  const handelLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    // reset error message
    setSuccess(false);
    setLoginError("");

    // login user
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess(true)
        // if(!result.user.emailVerified){
        //     setLoginError('please verify your email address.')
        // }
        // else{

        //     setSuccess(true);
        // }
      })
      .catch((error) => {
        console.log("ERROR", error.message);
        setLoginError(error.message);
        setSuccess(false);
      });
  };

const handelForgetPassword = () =>{
    const email = emailRef.current.value
    if(!email){
        console.log('pleases provide a valid email address')
    }
    else{
        sendPasswordResetEmail(auth, email)
        .then(() =>{
            alert('Password reset email sent!, check your email')
        })
    }
}

  return (
    <div className="hero  min-h-screen">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <h1 className="text-3xl text-center pt-4 font-bold">Login now!</h1>
        <form onSubmit={handelLogin} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="email"
              ref={emailRef}
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
            <label onClick={handelForgetPassword} className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">Login</button>
          </div>
        </form>
        {success && (
          <p className="text-green-600 text-center pb-3 text-lg">
            Successfully Log in
          </p>
        )}
        {loginError && (
          <p className="text-center pb-3 text-red-500">{loginError}</p>
        )}
        <p className="text-center p-4">
          New to this website? please <Link to="/signup"><u>Sign Up</u></Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
