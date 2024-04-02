import React from "react";
import twitter from "../data/twitter-removebg-preview.png";
import googleAds from "../data/Google_Ads_logo.png";
import instagramLogo from "../data/Instagram-logo.png";
import GoogleTrends from "../components/GoogleTrends";
import { useState, useEffect } from "react";
import { monthNames } from "../data/dummy";
import axios from "axios";
//import GoogleTrendsComponent from '../components/GoogleTrendsComponent';

/*const DropDown = ({ currentMode }) => (
  <div className="w-28 border-1 border-color px-2 py-1 rounded-md">
    <DropDownListComponent id="time" fields={{ text: 'Time', value: 'Id' }} style={{ border: 'none', color: (currentMode === 'Dark') && 'white' }} value="1" dataSource={dropdownData} popupHeight="220px" popupWidth="120px" />
  </div>
);*/

const Dashboard = () => {
  const [userData, setUserData] = useState([]);
  const [additionalData, setAdditionalData] = useState([]);
  const url = "https://confidanto.com/finalconfi/header-data";
  const [word, setKeyWord] = useState("");
  const { getCode, getName } = require('country-list');
  const [regionCode, setRegionCode] = useState('')
  const [isData, setIsData] = useState(false);
  const fetchInfo = () => {
    return axios
      .post(url, { email: localStorage.getItem("email") })
      .then((res) => {
        setUserData([res.data.userData]);
        setKeyWord(res.data.userData.category);
        let code = getCode(res.data.userData.region);
        setRegionCode(code);
        setIsData(true);
        const startDate_backend = res.data.userData.start_date.split("-");
        const endDate_backend = res.data.userData.end_date.split("-");
        const tempStartInd = Number(startDate_backend[1]);
        const startMonth_backend = monthNames[tempStartInd - 1];
        const tempEndInd = Number(endDate_backend[1]);
        const endMonth_backend = monthNames[tempEndInd - 1];
        const subcategories_backend = res.data.userData.sucategory.split(",");
        let temp = "";
        if (subcategories_backend.length > 1) {
          temp =
            subcategories_backend[0] +
            " +" +
            (subcategories_backend.length - 1);
        } else {
          temp = subcategories_backend[0];
        }
        setAdditionalData([
          {
            value: res.data.userData.category,
            title: "Category",
            iconColor: "#03C9D7",
            iconBg: "#E5FAFB",
            pcColor: "red-600",
          },
          {
            value: temp,
            title: "Subcategory",
            iconColor: "rgb(255, 244, 229)",
            iconBg: "rgb(254, 201, 15)",
            pcColor: "green-600",
          },
          {
            value: startMonth_backend + " - " + endMonth_backend,
            title: "Budget",
            iconColor: "rgb(228, 106, 118)",
            iconBg: "rgb(255, 244, 229)",
            pcColor: "green-600",
          },
          {
            value: "$" + res.data.userData.exp_budget,
            title: "Month Range",
            iconColor: "rgb(0, 194, 146)",
            iconBg: "rgb(235, 250, 242)",
            pcColor: "red-600",
          },
        ]);
      })
      .catch((error) => console.log(error.response));
  };

  useEffect(() => {
    fetchInfo();
  }, []);
  console.log(word);
  console.log(regionCode);
  return (
    <div className="mt-6 lg:mt-1 mr-3 ml-3">
      {isData && (
        <div>
          <div className="flex flex-wrap justify-center lg:w-full">
            <div className="w-full pl-3 pr-3">
              <div id="widget" className="w-full">
                <GoogleTrends
                  type="TIMESERIES"
                  keyword={word}
                  geo={regionCode}
                  time="now 1-d"
                  url="https://ssl.gstatic.com/trends_nrtr/3601_RC01/embed_loader.js"
                />
              </div>
            </div>
            <div className="w-full pl-3 pr-3">
              <div id="widget" className="w-full">
                <GoogleTrends
                  type="GEO_MAP"
                  keyword={word}
                  geo={regionCode}
                  time="now 1-d"
                  url="https://ssl.gstatic.com/trends_nrtr/3601_RC01/embed_loader.js"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap justify-center w-full">
            <div className="w-full pl-3 pr-3">
              <div id="widget" className="w-full">
                <GoogleTrends
                  type="RELATED_TOPICS"
                  keyword={word}
                  geo={regionCode}
                  time="now 1-d"
                  url="https://ssl.gstatic.com/trends_nrtr/3601_RC01/embed_loader.js"
                />
              </div>
            </div>
            <div className="w-full pl-3 pr-3">
              <div id="widget" className="w-full">
                <GoogleTrends
                  type="RELATED_QUERIES"
                  keyword={word}
                  geo={regionCode}
                  time="now 1-d"
                  url="https://ssl.gstatic.com/trends_nrtr/3601_RC01/embed_loader.js"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-10 mt-6 flex-wrap justify-center">
        <p className="text-2xl font-semibold hover:drop-shadow-xl hover:text-3xl">
          Platform Analysis
        </p>
      </div>
      <div className="flex flex-wrap lg:flex-nowrap justify-center lg:w-full lg:mb-36">
        <div className="flex flex-wrap lg:flex-nowrap justify-center">
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-50 w-full lg:w-68 pt-2 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center shadow-md rounded-none hover:drop-shadow-xl transform transition-transform duration-300 hover:scale-105">
            <div className="flex justify-center items-center bg-blue-600 pl-5 pr-5 pt-8 pb-8">
              <p className="text-4xl lg:text-5xl font-bold text-white hover:drop-shadow-xl">
                facebook
              </p>
            </div>
            <div className="flex mt-1 justify-between items-center">
              <div className="border-r-1 border-color m-4 p-3 lg:m-3 lg:mr-2 lg:pl-1">
                <p className="font-semibold text-gray-400">Estimated Traffic</p>
                <p className="text-md lg:text-xl">89K</p>
              </div>
              <div className="pl-5">
                <p className="font-semibold text-gray-400">Estimated Sales</p>
                <p className="text-md lg:text-xl">$459</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap lg:flex-nowrap justify-center">
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-50 w-full lg:w-68 pt-2 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center shadow-md rounded-none hover:drop-shadow-xl transform transition-transform duration-300 hover:scale-105">
            <div className="flex justify-center items-center bg-gray-300 pl-6 pr-6 pt-6 pb-6">
              <img
                className="h-16 lg:h-22 w-36 lg:w-34"
                src={googleAds}
                alt="Twitter"
              />
            </div>
            <div className="flex mt-1 justify-between items-center">
              <div className="border-r-1 border-color m-4 p-3 lg:m-3 lg:mr-2 lg:pl-1">
                <p className="font-semibold text-gray-400">Estimated Traffic</p>
                <p className="text-md lg:text-xl">89K</p>
              </div>
              <div className="pl-5">
                <p className="font-semibold text-gray-400">Estimated Sales</p>
                <p className="text-md lg:text-xl">$459</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap lg:flex-nowrap justify-center">
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-50 w-full lg:w-68 pt-2 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center shadow-md rounded-none hover:drop-shadow-xl transform transition-transform duration-300 hover:scale-105">
            <div className="flex justify-center items-center bg-blue-500 pl-6 pr-6 pt-7 pb-7">
              <img
                className="h-14 w-28"
                src={twitter}
                alt="Twitter"
              />
            </div>
            <div className="flex mt-1 justify-between items-center">
              <div className="border-r-1 border-color m-4 p-3 lg:m-3 lg:mr-2 lg:pl-1">
                <p className="font-semibold text-gray-400">Estimated Traffic</p>
                <p className="text-md lg:text-xl">89K</p>
              </div>
              <div className="pl-5">
                <p className="font-semibold text-gray-400">Estimated Sales</p>
                <p className="text-md lg:text-xl">$459</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap lg:flex-nowrap justify-center">
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-50 w-full lg:w-68 pt-2 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center shadow-md rounded-none hover:drop-shadow-xl transform transition-transform duration-300 hover:scale-105">
            <div className="flex justify-center items-center bg-gradient-to-br from-purple-500 via-pink-500 to-yellow-500 pl-6 pr-6 pt-6 pb-6">
              <img
                className="h-16 w-20"
                src={instagramLogo}
                alt="Twitter"
              />
            </div>
            <div className="flex mt-1 justify-between items-center">
              <div className="border-r-1 border-color m-4 p-3 lg:m-3 lg:mr-2 lg:pl-1">
                <p className="font-semibold text-gray-400">Estimated Traffic</p>
                <p className="text-md lg:text-xl">89K</p>
              </div>
              <div className="pl-5">
                <p className="font-semibold text-gray-400">Estimated Sales</p>
                <p className="text-md lg:text-xl">$459</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
