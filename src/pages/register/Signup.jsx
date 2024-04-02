/* eslint-disable no-useless-escape */
import React from "react";
import { confilogo, GoogleLogo } from "../logo/index";
import { useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConditions, setShowPasswordConditions] = useState(false);
  const [showPasswordMatch, setPasswordMatch] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleUserChange = (e) => setUserName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://confidanto.com/finalconfi/signup", {
        userName,
        email,
        password,
      })
      .then((res) => {
        if (res.data.message === "User registered successfully") {
          localStorage.setItem("email", email);
          localStorage.setItem("userName", userName);
          alert("You've successfully registered !");
          navigate("/get-started");
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 409) {
          alert(error.response.data.message);
        } else {
          alert(error);
        }
      });
  };
  return (
    <>
    <style>
        {`
          body {
            overflow-y: hidden;
            font-family: Calibri", sans-serif;
          }
        `}
      </style>
    <div className="bg-white overflow-y-hidden">
      <a href="https://www.confidanto.com" rel="noopener noreferrer">
        <img
          src={confilogo}
          alt="Logo"
          className="h-6 w-32 lg:h-12 lg:w-auto mb-1 mt-4 ml-8"
          style={{ width: "234px", height: "46px"}}
        />
      </a>
      <div className="min-h-screen flex justify-center bg-cover bg-center bg-transparent w-full overflow-y-hidden">
        <div className="max-w-4xl bg-white bg-center bg-opacity-75 rounded-lg p-2">
          <h2 className="mt-6 text-center text-4xl lg:text-6xl font-extrabold text-gray-900">
            Sign Up
          </h2>
          <div className="text-sm lg:text-base mt-4 text-center text-gray-500">
            Already have an account ?{" "}
            <Link
              to="/"
              className="font-medium underline text-indigo-600 hover:text-indigo-500"
            >
              Log In
            </Link>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="flex justify-between  space-x-6">
              <div className="lg:w-[700px] space-y-4 mr-6">
                <div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    className="block px-4 py-3 w-full text-inherit text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none  focus:outline-none focus:border-blue-600 peer"
                    placeholder="Full Name"
                    value={userName}
                    onChange={handleUserChange}
                  />
                </div>
                <div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block px-4 py-3 w-full text-left text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none focus:outline-none focus:border-blue-600 peer"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </div>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"} // Change type dynamically
                    autoComplete="new-password"
                    required
                    className="block px-4 py-3 w-full text-base text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none focus:outline-none focus:border-blue-600 peer"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    onMouseEnter={() => setShowPasswordConditions(true)}
                    onMouseLeave={() => setShowPasswordConditions(false)}
                  />
                  <button
                    type="button"
                    className="absolute top-6 right-2 focus:outline-none text-xl"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                  </button>
                  {showPasswordConditions && (
                    <div className="text-sm mt-1 text-gray-500">
                      <p
                        className={
                          password.length >= 6
                            ? "text-green-500"
                            : "text-red-500"
                        }
                      >
                        - Must have at least 6 characters
                      </p>
                      <p
                        className={
                          /(?=.*[a-z])(?=.*[A-Z])/.test(password)
                            ? "text-green-500"
                            : "text-red-500"
                        }
                      >
                        - Must have upper & lower case letters
                      </p>
                      <p
                        className={
                          /[\#\$&]/.test(password)
                            ? "text-green-500"
                            : "text-red-500"
                        }
                      >
                        - Must have symbols (#&$)
                      </p>
                      <p
                        className={
                          password.length >= 8
                            ? "text-green-500"
                            : "text-red-500"
                        }
                      >
                        - Must be longer password
                      </p>
                    </div>
                  )}
                </div>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"} // Change type dynamically
                    autoComplete="new-password"
                    required
                    className="block px-4 py-3 w-full text-base text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none focus:outline-none focus:border-blue-600 peer"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    onFocus={() => setPasswordMatch(true)}
                  />
                  {showPasswordMatch && (
                    <p className="text-red-500">
                      {password !== confirmPassword && "Password doesn't match"}
                    </p>
                  )}
                  <button
                    type="button"
                    className="absolute top-6 right-2 focus:outline-none text-xl"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {showConfirmPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                  </button>
                  <div className="flex mt-12 justify-center">
                    <button
                      type="submit"
                      className="group relative w-full lg:w-fit px-20 text-[#0f62e6] items-center flex justify-center py-2 border border-[#0f62e6] text-sm font-medium rounded-full hover:text-white bg-transparent hover:bg-[#0f62e6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Next 🠖
                    </button>
                  </div>
                  <div className="text-sm mt-6 text-center">
                    <Link
                      to="/"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Back to Login
                    </Link>
                  </div>
                </div>
              </div>
              <div className="flex lg:flex-col lg:w-fit items-center justify-center w-full mt-2">
                {/* Vertical line */}
                <div className="w-28 h-px lg:h-40 lg:w-px bg-gray-300"></div>
                {/* Or text */}
                <p className="mx-4 mb-0 text-center font-semibold text-gray-400 dark:text-white">
                  or
                </p>
                {/* Vertical line */}
                <div className="w-28 h-px lg:h-40 lg:w-px bg-gray-300"></div>
              </div>
              <div className="flex flex-col w-full lg:w-max items-center p-4 justify-center ml-12">
                <div className="google-btn w-full lg:w-[350px] h-10 bg-blue-500 hover:shadow-xl relative hover:shadow-outline active:bg-blue-600 mt-2">
                  <button
                    className="google-btn w-full lg:w-[350px] h-10 bg-blue-500 shadow-md relative hover:shadow-outline active:bg-blue-600"
                    type="button"
                  >
                    <div className="flex items-center border-1 border-blue-600">
                      <div className="google-icon-wrapper w-10 h-10 bg-white relative">
                        <img
                          className="google-icon w-6 h-6 absolute top-2 left-1.5"
                          src={GoogleLogo}
                          alt="Google Icon"
                        />
                      </div>
                      <p className="btn-text font-semibold text-white text-sm leading-none w-full lg:px-12">
                        Continue with Google
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default Signup;
