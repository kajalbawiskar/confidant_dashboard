/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha"; // Import the reCAPTCHA component
import { confilogo, Forgetbg } from "../logo/index";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [captchaValue, setCaptchaValue] = useState("");
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const handleForgotPassword = () => {
    if (captchaVerified) {
      // Implement forgot password logic here
      alert("An email has been sent to your account...!");
    } else {
      alert("Please verify reCAPTCHA");
    }
  };

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
    if (value) {
      setCaptchaVerified(true);
    } else {
      setCaptchaVerified(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center w-full bg-gray-100">
      <div className="max-w-screen-xl flex flex-col md:flex-row justify-center">
        <div className="w-full md:w-1/2">
          <img src={Forgetbg} alt="Forgot Password" className="w-full h-auto" />
        </div>
        <div className="max-w-md bg-white bg-opacity-75 rounded-lg p-8 mt-4 md:mt-0">
          <img src={confilogo} alt="Logo" className="h-9 w-auto mb-6 mx-auto" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Forgot Your Password?
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>
          <form
            className="mt-8 space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              handleForgotPassword();
            }}
          >
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="from-input"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <ReCAPTCHA
              sitekey="6Lf_w4spAAAAAKup6UFKCCrO6f66JZkTaax0WDpb" // Replace 'your-site-key' with your actual reCAPTCHA site key
              onChange={handleCaptchaChange}
            />

            <div>
              <button
                className="g-recaptcha"
                data-sitekey="6LdeBYwpAAAAAKFoTNMTT4sxoidz6E9xUGOPtQCQ"
                data-callback="onSubmit"
                data-action="submit"
              >
                Submit
              </button>
            </div>

            <div className="text-sm mt-4 text-center">
              <Link
                to="/"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
