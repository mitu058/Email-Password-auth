import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import auth from "../firebase.init";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignUp = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handelSignUp = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const terms = e.target.terms.checked;
    console.log(email, password,terms);
    // rest error message
    setErrorMessage("");
    setSuccess(false);
      if(!terms){
        setErrorMessage('please accept our terms and conditions')
        return
      }

    if (password.length < 6) {
      setErrorMessage("password must be at least 6 charecter or longer");
      return;
    }
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "At least one upperCase, one lowerCase, one number, one special charecter"
      );
      return;
    }

    // creat user with email and password
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess(true);
      })
      .catch((error) => {
        console.log("ERROR", error.message);
        setErrorMessage(error.message);
        setSuccess(false);
      });
  };
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
            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="btn btn-xs absolute right-4 top-12"
              >
                {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
              </button>
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            {/* terms and consition */}
            <div className="form-control">
              <label className="label cursor-pointer justify-start">
              <input type="checkbox" name="terms" className="checkbox  checkbox-sm" />
                <span className="label-text ml-4">Accept our terms and conditions</span>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Sign Up</button>
            </div>
          </form>
          {errorMessage && (
            <p className="text-center pb-3 text-red-500">{errorMessage}</p>
          )}
          {success && (
            <p className="text-green-600 text-center pb-3 text-lg">
              Successfully Sign Up
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
