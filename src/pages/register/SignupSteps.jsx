/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { SlLogin } from "react-icons/sl";
import { Link, useNavigate } from "react-router-dom";
import {
  confilogo,
  GoogleLogo2,
  Amazon,
  flipkartlogo,
  YoutubeLogo,
  Thinking,
} from "../logo/index";
import { IoMdArrowRoundBack } from "react-icons/io";
import Select from "react-select";
import { categoryMap } from "../../data/subcategory";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

const SignupSteps = () => {
  const [step, setStep] = useState(1);
  const [region, setRegion] = useState("");
  const [userName, setUserName] = useState("");
  const email = localStorage.getItem("email");
  const [password, setPassword] = useState("");
  const [platform, setPlatform] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState("individual");
  const [websiteLink, setWebsiteLink] = useState("");
  const [alertComponent, setAlertComponent] = useState(null);
  const categories = Object.keys(categoryMap);
  const [category, setCategory] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState([]);
  const [goalSelected, setGoal] = useState([]);
  const [marketingPlatform, setMarketingPlatform] = useState([]);
  const [showPasswordConditions, setShowPasswordConditions] = useState(false);
  
  const navigate = useNavigate();

  function handleChange(event) {
    const { value, checked } = event.target;
    if (checked) {
      setGoal((pre) => [...pre, value]);
    } else {
      setGoal((pre) => {
        return [...pre.filter((skill) => skill !== value)];
      });
    }
  }
  console.log(goalSelected);

  let goal = goalSelected.join();

  function handleMarketingPlatform(event) {
    const { value, checked } = event.target;
    if (checked) {
      setMarketingPlatform((pre) => [...pre, value]);
    } else {
      setMarketingPlatform((pre) => {
        return [...pre.filter((skill) => skill !== value)];
      });
    }
  }
  console.log(marketingPlatform);

  let marketing_platform = marketingPlatform.join();
  useEffect(() => {
    if (category) {
      setSubcategories(categoryMap[category] || []);
    }
  }, [category]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubCategoryChange = (selectedOptions) => {
    setSelectedSubcategory(selectedOptions);
  };

  const optionList = subcategories.map((service) => ({
    value: service,
    label: service,
  }));
  let subcategory = [];
  if (selectedSubcategory) {
    for (let i = 0; i < selectedSubcategory.length; i++) {
      subcategory.push(selectedSubcategory[i].value);
    }
  }
  subcategory = subcategory.join();
  console.log(category);
  console.log(selectedSubcategory);
  console.log(subcategory);
  const countryList = require("country-list");
  const countries = countryList.getData();
  const countryCode = countryList.getCode(region);

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0"); // Adding 1 to get correct month
    const day = today.getDate().toString().padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  }

  const start_date = getCurrentDate();
  console.log(start_date); 
  const [exp_budget, setMarketingBudget] = useState("");
  const [avg_budget, setAverageBudget] = useState("");
  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
    if (e.target.value === "individual") {
      // Show styled alert
      const alertDiv = document.createElement("div");
      alertDiv.className =
        "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md";
      alertDiv.innerHTML = `
        <div className="flex">
          <div className="py-1"><svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg></div>
          <div>
            <p className="font-bold">Since you are an individual business owner</p>
            <p className="text-sm">kindly select the category carefully as you cannot edit it in future.</p>
          </div>
        </div>
      `;
      document.body.appendChild(alertDiv);
      // Hide the alert after 3 seconds
      setTimeout(() => {
        alertDiv.remove();
      }, 5000);
    }
  };
  const handleregionChange = (e) => setRegion(e.target.value);
  const handleMarketingBudgetChange = (value) => {
    setMarketingBudget(value);
  };
  console.log(exp_budget);
  const validateFields = () => {
    // Check if any required fields are empty or not selected
    if (step === 1) {
      if (platform === "") {
        alert("Please select Business Status.");
        return false;
      }
      if (platform === "launched" && websiteLink === "") {
        alert("Please provide Website Link.");
        return false;
      }
      if (region === "") {
        alert("Please select Business Location.");
        return false;
      }
      if (userType === "") {
        alert("Please select Agency or Individual.");
        return false;
      }
    } else if (step === 2) {
      if (category === "") {
        alert("Please select Business Category.");
        return false;
      }
      if (selectedSubcategory.length === 0) {
        alert("Please select at least one Business Sub-Category.");
        return false;
      }
      // Additional validation checks for Step 2 if needed
    } else if (step === 3) {
      if (exp_budget === "") {
        alert("Please select Marketing Budget.");
        return false;
      }
      if (avg_budget === "") {
        alert("Please enter Average Product Price.");
        return false;
      }
      if (marketingPlatform.length === 0) {
        alert("Please select at least one Marketing Platform.");
        return false;
      }
      // Additional validation checks for Step 3 if needed
    }
    return true; // All required fields are filled, proceed to next step
  };
  
  const nextStep = () => {
    // Validate fields before proceeding to the next step
    if (validateFields()) {
      if (step === 1) {
        setStep(2);
      } else if (step === 2) {
        setStep(3);
      }
    }
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://confidanto.com/finalconfi/additional-details", {
        email,
        userType,
        platform,
        region,
        category,
        subcategory,
        exp_budget,
        avg_budget,
        start_date,
        goal,
        marketing_platform,
        websiteLink,
      })
      .then((res) => {
        if (res.data) {
          alert("Congratulations! You've Successfully completed all the steps");
          navigate("/");
        } else {
          alert("Failed to Register");
        }
      })
      .catch((error) => {
        alert("any thing is wrong");
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const prevStep = () => {
    setStep(step - 1);
  };
  const onSuccess = (res) => {
    console.log("Sign SUCCESS! res:", res.profileObj);
    // setSignSuccess(true);
  };
  const platformList = [
    { value: "Amazon", label: "Amazon" },
    { value: "Google Ads", label: "Google Ads" },
    { value: "Flipkart", label: "Flipkart" },
    {
      value: "Not Sure/ We would like your recommendation",
      label: "Not Sure/ We would like your recommendation",
    },
  ];
  const marketingBudgetOptions = [
    { label: "Up to $1000", value: 500 },
    { label: "$1000 - $5000", value: 2500 },
    { label: "$5000 - $25000", value: 12000 },
    { label: "$25000+", value: 25000 },
  ];

  console.log(localStorage.getItem("category"));

  const onFailure = (res) => {
    console.log("LOGIN FAILED! res:", res);
  };
  const business_status = platform;
  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
  };

  return (
    <div className="bg-white ">
      <a href="https://www.confidanto.com" rel="noopener noreferrer">
        <img
          src={confilogo}
          alt="Logo"
          className="h-6 w-32 lg:h-12 lg:w-auto mb-1 mt-2 ml-8"
          style={{ width: "234px", height: "46px"}}
        />
      </a>
      <div className="min-h-screen flex justify-center bg-cover bg-center bg-transparent w-full">
        <div className="max-w-4xl bg-white bg-center bg-opacity-75 rounded-lg p-2">
          <div className="p-4 space-y-4 dark:bg-gray-800 dark:text-gray-100">
            <div className="flex max-w-xs space-x-6 p-4">
              {[...Array(3)].map((_, index) => (
                <span
                  key={index}
                  className={`w-12 h-2 rounded-sm ${
                    index + 1 === step ? "bg-violet-400" : "bg-gray-600"
                  }`}
                ></span>
              ))}
            </div>
            <button
              onClick={prevStep}
              className="flex p-1 items-center justify-start"
            >
              <IoMdArrowRoundBack className="h-6 w-6 text-gray-500" />
              <h3 className="text-lg  font-semibold text-gray-800 ml-2">
                {step === 1
                  ? " Step 1: Business Details"
                  : step === 2
                  ? "Step 2: Category Details"
                  : "Step 3: Marketing Details"}
              </h3>
            </button>
          </div>
          <div className="flex-grow">
            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                if (step === 1) {
                  nextStep();
                } else {
                  handleSubmit(e);
                }
              }}
            >
              {step === 1 && (
                <div className="p-2 px-12 space-y-4">
                  <div className="flex flex-col space-y-4 p-2">
                    <div className="flex flex-col space-y-4">
                    <fieldset className="flex flex-col space-y-4 p-2" required>
                      <label
                        className="block text-gray-700 text-base font-semibold mb-2"
                        for="businessStatus"
                      >
                        Business Status
                      </label>
                      <label className="inline-flex text-sm items-center">
                        <input
                          type="radio"
                          className="form-radio h-5 w-5 text-blue-600"
                          name="businessStatus"
                          value="launched"
                          onChange={() => {
                            // Handle selection of "Launched" option
                            setPlatform("launched");
                          }}
                        />
                        <span className="ml-2 text-gray-700">
                          Already Launched / Running
                        </span>
                      </label>
                      <label className="inline-flex text-sm items-center">
                        <input
                          type="radio"
                          className="form-radio h-5 w-5 text-blue-600"
                          name="businessStatus"
                          value="coming_soon"
                          onChange={() => {
                            setPlatform("launching"); // Handle selection of "Coming soon" option
                          }}
                        />
                        <span className="ml-2 text-gray-700">
                          Launching - Coming soon
                        </span>
                      </label>
                      <label className="inline-flex text-sm items-center">
                        <input
                          type="radio"
                          className="form-radio h-5 w-5 text-blue-600"
                          name="businessStatus"
                          value="looking"
                          onChange={() => {
                            setPlatform("To be launched"); // Handle selection of "Just looking" option
                          }}
                        />
                        <span className="ml-2 text-gray-700">
                          To be launched / I am Just looking !
                        </span>
                      </label>
                      </fieldset>
                    </div>
                  </div>
                  {platform === "launched" && (
                    <div className="mt-4">
                      <input
                        type="text"
                        className="block w-full px-4 py-3 text-base text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none rounded-md focus:outline-none focus:border-blue-600"
                        placeholder="Website link"
                        required
                        value={websiteLink}
                        onChange={(e) => setWebsiteLink(e.target.value)}
                      />
                    </div>
                  )}
                  <div className="flex flex-col space-y-4 p-2">
                    <label
                      className="block text-gray-700 text-base font-semibold"
                      for="businessStatus"
                    >
                      Business Location
                    </label>
                    <select
                      id="region"
                      name="region"
                      className="block w-full px-4 py-1.5 text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none focus:outline-none focus:border-blue-600 rounded-md"
                      value={region}
                      onChange={handleregionChange}
                      required
                    >
                      <option value="">Select Region</option>
                      {countries.map((country) => (
                        <option key={country.code} value={country.name}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-initial">
                    <label
                      className="block text-gray-700 text-base font-semibold"
                      for="businessStatus"
                    >
                      Are you an Agency or Individual ?
                    </label>
                  </div>
                    <fieldset className="flex flex-col space-y-4 p-2" required>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      className="form-radio h-4 w-4 text-sm text-indigo-600"
                      name="userType"
                      value="individual"
                      onChange={handleUserTypeChange}
                    />
                    <span className="ml-2 text-gray-700">Individual</span>
                    <input
                      type="radio"
                      className="form-radio h-4 w-4 ml-6 text-sm text-indigo-600"
                      name="userType"
                      value="agency"
                      onChange={handleUserTypeChange}
                    />
                    <span className="ml-2 text-gray-700">Agency</span>
                  </div>
                    </fieldset>
                  <div className="flex justify-between mt-8">
                    <button
                      type="submit"
                      onClick={nextStep}
                      className="group relative min-w-fit lg:w-10/12 text-[#0f62e6] items-center flex justify-center py-2 px-4 border border-[#0f62e6] text-sm font-medium rounded-full hover:text-white bg-transparent hover:bg-[#0f62e6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 m-2"
                    >
                      Next 🠖
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="p-2 px-12 space-y-4">
                  {/* Content from AdditionalDetailsStep3 component */}
                  {/*<AdditionalDetailsStep3 />*/}
                  <div className="rounded-md shadow-sm -space-y-px">
                    <label
                      className="block text-gray-700 text-base font-bold mb-2 pb-2 pt-4"
                      htmlFor="category"
                    >
                      Select your Business Category
                    </label>
                    <select
                      id="category"
                      required
                      name="category"
                      className="block px-2 py-1.5 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none focus:outline-none focus:border-blue-600 peer"
                      value={category}
                      onChange={handleCategoryChange}
                    >
                      <option>Select a Category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    <label
                      className="block text-gray-700 text-base font-bold mb-2 pb-2 pt-6"
                      htmlFor="subcategory"
                    >
                      Select your Business Sub-Category
                    </label>
                    <Select
                      className="block px-4 py-3 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none focus:outline-none focus:border-blue-600 peer"
                      options={optionList}
                      value={selectedSubcategory}
                      onChange={handleSubCategoryChange}
                      isMulti
                      placeholder="-- Select Subcategories --"
                    />
                  </div>
                  <label
                    className="block text-gray-700 text-base font-bold pb-1 pt-2"
                    htmlFor="subcategory"
                  >
                    Select your Business Goal
                  </label>
                  <div className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      className="form-radio h-4 w-4 text-sm text-indigo-600"
                      name="branding"
                      value="Branding"
                      onChange={handleChange}
                    />
                    <span className="ml-2 text-gray-700">Branding</span>
                    <input
                      type="checkbox"
                      className="form-radio h-4 w-4 ml-5 text-sm text-indigo-600"
                      name="Conversion"
                      value="Conversion"
                      onChange={handleChange}
                    />
                    <span className="ml-2 text-gray-700">Conversion</span>
                    <input
                      type="checkbox"
                      className="form-radio h-4 w-4 ml-4 text-sm text-indigo-600"
                      name="Branding+Conversion"
                      value="Branding+Conversion"
                      onChange={handleChange}
                    />
                    <span className="ml-2 text-gray-700">
                      Branding+Conversion
                    </span>
                  </div>
                  <div>
                    {/* Your Step 2 content here */}
                    <div className="bg-white flex justify-center w-full mt-8">
                      <button
                        type="submit"
                        onClick={nextStep}
                        className="group relative min-w-fit lg:w-10/12 text-[#0f62e6] items-center flex justify-center py-2 px-4 border border-[#0f62e6] text-sm font-medium rounded-full hover:text-white bg-transparent hover:bg-[#0f62e6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
                      >
                        Next 🠖
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {step === 3 && (
                <>
                  <div>
                    <div className="max-w-6xl mx-auto px-12">
                      <label
                        className="block text-gray-700 text-base font-bold mb-2 pb-2"
                        for="businessStatus"
                      >
                        Select your Marketing Budget
                      </label>
                      <div className="flex flex-wrap gap-3">
                        {marketingBudgetOptions.map((option) => (
                          <label key={option.value} className="cursor-pointer">
                            <input
                              type="radio"
                              className="peer sr-only text-indigo-600"
                              name="marketingBudget"
                              value={option.value}
                              checked={exp_budget === option.value}
                              onChange={() =>
                                handleMarketingBudgetChange(option.value)
                              }
                            />
                            <div className="w-40 max-w-xl p-4 bg-white text-gray-600 rounded-md shadow ring-2 ring-transparent peer-checked:text-sky-600 peer-checked:ring-sky-400 peer-checked:ring-offset-2 ">
                              <div className="flex flexcol gap-5">
                                <div className="flex items-center justify-between">
                                  {option.label}
                                </div>
                              </div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="max-w-6xl mx-auto px-12 mt-8">
                      <label
                        className="block text-gray-700 text-base font-bold mb-4"
                        for="businessStatus"
                      >
                        Enter Average Product Price
                      </label>
                      <div className="flex flex-wrap gap-3">
                        <input
                          id="avg_budget"
                          name="avg_budget"
                          type="text"
                          required
                          className="block px-2.5 pb-2 w-full text-sm lg:text-sm text-gray-900 bg-transparent dark:bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=""
                          value={avg_budget}
                          onChange={(e) => setAverageBudget(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="flex mt-8 flex-col justify-center overflow-hidden bg-gradient-to-br from-enerald-500 via-lime-300 to-green-500 mx-auto max-w-2xl">
                      <label
                        className="block text-gray-700 text-base font-bold mb-2 pb-2"
                        for="businessStatus"
                      >
                        Select your Marketing Platform
                      </label>
                      <div className="flex flex-nowrap justify-center gap-4 mb-4 px-1">
                        <label className="relative cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            name="google_ads"
                            value="Google Ads"
                            onChange={handleMarketingPlatform}
                          />
                          <div className="overflow-hidden rounded-lg bg-white shadow-md ring ring-transparent peer-checked:ring-blue-500 grayscale peer-checked:grayscale-0">
                            <img
                              src={GoogleLogo2}
                              alt="Google Ads"
                              className="h-24 w-48 object-contain"
                            />
                          </div>
                        </label>
                        <label className="relative cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            name="amazon"
                            value="Amazon"
                            onChange={handleMarketingPlatform}
                          />
                          <div className="overflow-hidden rounded-lg bg-white shadow-md ring ring-transparent peer-checked:ring-blue-500 grayscale peer-checked:grayscale-0">
                            <img
                              src={Amazon}
                              alt="Amazon"
                              className="h-24 w-40 object-contain"
                            />
                          </div>
                        </label>
                        <label className="relative cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            name="flipkart"
                            value="Flipkart"
                            onChange={handleMarketingPlatform}
                          />
                          <div className="overflow-hidden rounded-lg bg-white shadow-md ring ring-transparent peer-checked:ring-blue-500 grayscale peer-checked:grayscale-0">
                            <img
                              src={flipkartlogo}
                              alt="Flipkart"
                              className="h-24 w-40 object-contain"
                            />
                          </div>
                        </label>
                        <label className="relative cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            name="youtube"
                            value="Youtube"
                            onChange={handleMarketingPlatform}
                          />
                          <div className="overflow-hidden rounded-lg bg-white shadow-md ring ring-transparent peer-checked:ring-blue-500 grayscale peer-checked:grayscale-0">
                            <img
                              src={YoutubeLogo}
                              alt="YouTube"
                              className="h-24 w-40 object-contain"
                            />
                          </div>
                        </label>
                        <TooltipComponent
                          content="Not Sure"
                          position="RightCenter"
                        >
                          <label className="relative cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              name="not_sure"
                              value="Not Sure"
                              onChange={handleMarketingPlatform}
                            />
                            <div className="overflow-hidden rounded-lg bg-white shadow-md ring ring-transparent peer-checked:ring-blue-500 grayscale peer-checked:grayscale-0">
                              <img
                                src={Thinking}
                                alt="Not Sure"
                                className="h-24 w-40 object-contain"
                              />
                            </div>
                          </label>
                        </TooltipComponent>
                      </div>
                    </div>
                    <div className="flex justify-center mt-4">
                      <button
                        type="submit"
                        onClick={handleFinalSubmit}
                        className="group relative min-w-fit lg:w-1/3 text-[#0f62e6] items-center flex justify-center py-2 px-4 border border-[#0f62e6] text-sm font-medium rounded-full hover:text-white bg-transparent hover:bg-[#0f62e6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 m-2"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupSteps;
