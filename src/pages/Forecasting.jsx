import React from "react";
import { monthNames } from "../data/dummy";
import JsPDF from 'jspdf';
import {
  animals_pets,
  attorneys,
  autom,
  advocacy,
  art_ent,
  beauty,
  business,
  dating,
  dentists,
  edu,
  finance,
  home_improve,
  home_goods,
  furniture,
  health,
  health_medical,
  ecomm,
  real_estate,
} from "../data/subcategory";
import { Button, Header } from "../components";
import { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { useStateContext } from "../contexts/ContextProvider";
import LoadingAnimation from "../components/LoadingAnimation";
import { PiDownloadSimple } from "react-icons/pi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

const Forecasting = () => {
  const Goals = ["Branding", "Conversion", "Branding + Conversion"];
  const [startMonth, setStartMonth] = useState("");
  const [endMonth, setEndMonth] = useState("");
  const [goal, setGoal] = useState("");
  const [category_backend, setCategoryBack] = useState("");
  const { currentColor } = useStateContext();

  let type = null;
  let cat = category_backend;
  console.log(cat);
  if (cat === "Animals & Pets") {
    type = animals_pets;
  } else if (cat === "Advocacy") {
    type = advocacy;
  } else if (cat === "Arts & Entertainment") {
    type = art_ent;
  } else if (cat === "Automotive") {
    type = autom;
  } else if (cat === "Attorneys & Legal Services") {
    type = attorneys;
  } else if (cat === "Beauty & Personal Care") {
    type = beauty;
  } else if (cat === "Business Services") {
    type = business;
  } else if (cat === "Dating & Personals") {
    type = dating;
  } else if (cat === "Dentists & Dental Services") {
    type = dentists;
  } else if (cat === "Education & Instruction") {
    type = edu;
  } else if (cat === "Finance & Insurance") {
    type = finance;
  } else if (cat === "Home & Home Improvement") {
    type = home_improve;
  } else if (cat === "Furniture") {
    type = furniture;
  } else if (cat === "Health & Fitness") {
    type = health;
  } else if (cat === "Health & Medical") {
    type = health_medical;
  } else if (cat === "Home Goods") {
    type = home_goods;
  } else if (cat === "E-Commerce") {
    type = ecomm;
  } else if (cat === "Real Estate") {
    type = real_estate;
  }
  let options = null;
  let optionList;
  if (type) {
    options = type.map((el) => <option key={el}>{el}</option>);
    optionList = type.map((service) => ({ value: service, label: service }));
    console.log(optionList);
  }

  
  const [dropDown, setDropdown] = useState([]);
  const handleSubCategoryDropdownChange = (data) => {
    setDropdown(data);
  };
  console.log(dropDown);
  let temp = [];
  if (dropDown) {
    for (let i = 0; i < dropDown.length; i++) {
      temp.push(dropDown[i].value);
    }
  }
  console.log(temp);

  const editing = { allowDeleting: true, allowEditing: true };
  const [userData, setUserData] = useState([]);
  const [foreCastData, setForeCastData] = useState([]);
  const [avgBudget, setAvgBudget] = useState(0);
  const [spend, setSpend] = useState(0);
  const [startDate_backend, setStartDate] = useState("");
  const [endDate_backend, setEndDate] = useState("");
  const [hasExecutedOnce, setHasExecutedOnce] = useState(false);
  const [loading, setLoading] = useState(true); // State for loading spinner
  const [subscription, setSubscription] = useState("");
  const date = new Date();
  console.log(date);
  const allMonths = monthNames;

  // For Free subscription, limit selectable months to the first three
  const [selectableMonths, setSelectableMonths] = useState([]);
  //const selectableMonths = subscription === "Free Trial" ? monthNames.slice(0, 3) : allMonths;

  const handleSpend = (e) => {
    setSpend(e.target.value);
  };
  const [values, setValues] = useState({
    category: "",
    subcategory: [],
  });

  const generatePDF = () => {
    const report = new JsPDF('portrait','pt','a4');
    report.html(document.querySelector('#report'), {
      html2canvas: { scale: 0.51 }, 
      x: 0,
      y: 50,
    }).then(() => {
      report.save('forecasting.pdf');
    });
  }

  const getMonthsBetweenDates = (startDate) => {
    let months = [];
    console.log(startDate);
    let startIndex;
    let endIndex = 11;
    let startDateTemp = startDate.split("-");
    //let endDateTemp = endDate.split("-");
    for (let i = 0; i < monthNames.length; i++) {
      if (monthNames[i] === monthNames[Number(startDateTemp[1]) - 1]) {
        startIndex = i;
      }
      /*if (monthNames[i] === monthNames[Number(endDateTemp[1]) - 1]) {
        endIndex = i;
      }*/
    }
    months = monthNames.slice(startIndex, endIndex + 1);
    console.log(months);
    return months;
  };
  let months_selected = null;
  let startMonthIndex = 0;
  let endMonthIndex = 0;
  for (let i = 0; i < monthNames.length; i++) {
    if (monthNames[i] === startMonth) startMonthIndex = i;
    if (monthNames[i] === endMonth) endMonthIndex = i;
  }
  months_selected = monthNames.slice(startMonthIndex, endMonthIndex + 1);
  console.log(months_selected);
  console.log(startMonthIndex);
  console.log(endMonthIndex);

  let category = values.category;
  let subcategory = temp;
  let months = months_selected;
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("https://confidanto.com/finalconfi/forecasting", {
        category,
        subcategory,
        months,
      })
      .then((res) => {
        setForeCastData(res.data.forecastData);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const getUserdata = async () => {
      axios
        .post("https://confidanto.com/finalconfi/header-data", {
          email: localStorage.getItem("email"),
        })
        .then((res) => {
          console.log(hasExecutedOnce);
          setUserData([res.data.userData]);
          setSubscription(res.data.userData.subscription);
          setAvgBudget(res.data.userData.avg_budget);
          setValues({
            category: res.data.userData.category,
            subcategory: res.data.userData.sucategory.split(","),
          });
          setCategoryBack(res.data.userData.category);
          setStartDate(res.data.userData.start_date.split("-"));
          //setEndDate(res.data.userData.end_date.split("-"));
          if (res.data.userData.subscription === "Free Trial") {
            setSelectableMonths(monthNames.slice(0, 3));
          } else if (res.data.userData.subscription === "Paid") {
            setSelectableMonths(allMonths);
          }
          if (!hasExecutedOnce) {
            let category = res.data.userData.category;
            let subcategory = res.data.userData.sucategory.split(",");
            let date = new Date().toJSON();
            let selectedMonthRange = getMonthsBetweenDates(
              res.data.userData.start_date
            );
            let monthsAllSel = selectedMonthRange;
            const months =
              res.data.userData.subscription === "Free Trial"
                ? selectedMonthRange.slice(0, 3)
                : monthsAllSel;
            setHasExecutedOnce(true);
            setSpend(res.data.userData.exp_budget);
            console.log(months);
            console.log(res.data.userData.start_date);
            return axios.post("https://confidanto.com/finalconfi/forecasting", {
              category,
              subcategory,
              months,
            });
          }
        })
        .then((res) => {
          setForeCastData(res.data.forecastData);
        })
        .catch((error) => console.log(error.response))
        .finally(() => {
          setLoading(false); // Stop loading spinner when data is fetched
        });
    };
    const countdownInterval = setInterval(() => {
      getUserdata();
    }, 2000);

    return () => clearInterval(countdownInterval);
  }, [hasExecutedOnce]);

  console.log(userData);
  console.log(foreCastData);

  const totalMonths = foreCastData.length;
  const totalCPC = foreCastData
    .reduce((acc, curr) => acc + parseFloat(curr.cpc), 0)
    .toFixed(2);
  const totalCTR = foreCastData
    .reduce((acc, curr) => acc + parseFloat(curr.ctr), 0)
    .toFixed(2);
  const totalCVR = foreCastData
    .reduce((acc, curr) => acc + parseFloat(curr.cvr), 0)
    .toFixed(2);
  const totalImpressions = foreCastData
    .reduce(
      (acc, curr) =>
        acc +
        Math.floor(
          Math.floor(Number(spend) / Number(curr.cpc)) /
            (Number(curr.ctr) / 100)
        ),
      0
    )
    .toFixed(2);
  const totalClicks = foreCastData
    .reduce(
      (acc, curr) => acc + Math.floor(Number(spend) / Number(curr.cpc)),
      0
    )
    .toFixed(2);
  const totalLeads = foreCastData
    .reduce(
      (acc, curr) =>
        acc +
        Math.floor(
          Math.floor(Number(spend) / Number(curr.cpc)) *
            (Number(curr.cvr) / 100)
        ),
      0
    )
    .toFixed(2);
  const totalCPL = foreCastData
    .reduce(
      (acc, curr) =>
        acc +
        Math.floor(
          Number(spend) /
            Math.floor(
              Math.floor(Number(spend) / Number(curr.cpc)) *
                (Number(curr.cvr) / 100)
            )
        ),
      0
    )
    .toFixed(2);
  const totalSpend = spend * foreCastData.length;
  const totalRevenue = foreCastData
    .reduce(
      (acc, curr) =>
        acc +
        Math.floor(
          Math.floor(Number(spend) / Number(curr.cpc)) * Number(curr.cvr)
        ) *
          Number(avgBudget),
      0
    )
    .toFixed(2);

  return (
    <div className="m-2 md:my-12 md:mx-4 p-2 md:p-4 bg-white rounded-3xl">
      <Header title="Forecasting" />
      <form className="max-w-full mx-auto" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="w-full md:col-span-1">
            <div className="relative z-0 mb-5 group">
              <Select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
                options={optionList}
                value={dropDown}
                onChange={handleSubCategoryDropdownChange}
                isMulti={true}
                id="multi-select"
                placeholder=" Select a Subcatgory "
              />
            </div>
          </div>
          <div className="w-full md:col-span-1">
            <div className="relative z-0 mb-5 group">
              <select
                onChange={(e) => setStartMonth(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="Select Start Month">Select Start Month</option>
                {selectableMonths.map((month) => (
                  <option key={month}>{month}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="w-full md:col-span-1">
            <div className="relative z-0 mb-5 group">
              <select
                onChange={(e) => setEndMonth(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="Select End Month"> Select End Month </option>
                {selectableMonths.map((month) => (
                  <option key={month}>{month}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="w-full md:col-span-1">
            <div className="relative z-0 mb-5 group">
              <select
                onChange={(e) => setGoal(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="Select Business Goal">
                  Select Business Goal
                </option>
                {Goals.map((goal) => (
                  <option key={goal}>{goal}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="w-full md:col-span-1">
            <div className="relative z-0 mb-5 group">
              <input
                type="text"
                id="budget"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter Budget"
                onChange={handleSpend}
                required
              />
            </div>
          </div>
        </div>
        {/*<div className="flex justify-center p-2">
          <button
            type="submit"
            className="bg-[#5e60ce] hover:bg-white hover:text-[#5e60ce] hover:border hover:border-[#5e60ce] text-white font-bold py-2 px-6 rounded-full"
          >
            Search
          </button>
          <button className="text-2xl">
          <PiDownloadSimple />
          </button>
        </div>*/}
        <div className="flex justify-between items-center p-2">
          <div className="flex-grow justify-center flex">
            <button
              type="submit"
              className="bg-[#5e60ce] hover:bg-white hover:text-[#5e60ce] hover:border hover:border-[#5e60ce] text-white font-bold py-2 px-6 rounded-full mx-auto"
            >
              Search
            </button>
          </div>
          <TooltipComponent content="Download" position="Top">
          <button className="text-3xl" onClick={generatePDF}>
            <PiDownloadSimple />
          </button>
          </TooltipComponent>
        </div>
      </form>
      {loading ? ( // Show spinner when loading is true
        <div className="flex justify-center items-center h-40 mt-3">
          <LoadingAnimation />
        </div>
      ) : (
        <div id="report" className="flex flex-col items-center justify-center">
        <h2 className="text-3xl py-5 font-bold">Forecasting Report</h2>
        <table className="w-full lg:mb-32 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead
            className="text-xs text-white uppercase bg-black dark:bg-gray-700 dark:text-gray-400"
            style={{ backgroundColor: currentColor }}
          >
            <tr>
              <th className="px-6 py-4">SUBCATEGORY</th>
              <th className="px-6 py-4">MONTHS</th>
              <th className="px-6 py-4">CPC</th>
              <th className="px-6 py-4">CTR</th>
              <th className="px-6 py-4">CVR</th>
              <th className="px-6 py-4">IMPRESSIONS</th>
              <th className="px-6 py-4">CLICKS</th>
              <th className="px-6 py-4">LEADS</th>
              <th className="px-6 py-4">CPL</th>
              <th className="px-6 py-4">SPEND</th>
              <th className="px-6 py-4">REVENUE</th>
            </tr>
          </thead>
          <tbody>
            {foreCastData.map((res, index) => (
              <tr
                key={index}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <td className="px-6 py-4">{res.subcategory}</td>
                <td className="px-6 py-4">{res.month}</td>
                <td className="px-6 py-4">${res.cpc}</td>
                <td className="px-6 py-4">{res.ctr}%</td>
                <td className="px-6 py-4">{res.cvr}%</td>
                <td className="px-6 py-4">
                  {Math.floor(
                    Math.floor(Number(spend) / Number(res.cpc)) /
                      (Number(res.ctr) / 100)
                  ).toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  {Math.floor(Number(spend) / Number(res.cpc))}
                </td>
                <td className="px-6 py-4">
                  {Math.floor(
                    Math.floor(Number(spend) / Number(res.cpc)) *
                      (Number(res.cvr) / 100)
                  )}
                </td>
                <td className="px-6 py-4">
                  $
                  {Math.floor(
                    Number(spend) /
                      Math.floor(
                        Math.floor(spend / res.cpc) * (Number(res.cvr) / 100)
                      )
                  )}
                </td>
                <td className="px-6 py-4">${spend}</td>
                <td className="px-6 py-4">
                  $
                  {(
                    Math.floor(
                      Math.floor(Number(spend) / Number(res.cpc)) *
                        Number(res.cvr)
                    ) * Number(avgBudget)
                  ).toFixed(2)}
                </td>
              </tr>
            ))}
            <tr className="bg-gray-600 text-white">
              <td className="px-6 py-4">Total</td>
              <td className="px-6 py-4">{totalMonths} Months</td>
              <td className="px-6 py-4">{totalCPC}%</td>
              <td className="px-6 py-4">{totalCTR}%</td>
              <td className="px-6 py-4">{totalCVR}%</td>
              <td className="px-6 py-4">{totalImpressions}</td>
              <td className="px-6 py-4">{totalClicks}</td>
              <td className="px-6 py-4">{totalLeads}</td>
              <td className="px-6 py-4">${totalCPL}</td>
              <td className="px-6 py-4">${totalSpend}</td>
              <td className="px-6 py-4">${totalRevenue}</td>
            </tr>
          </tbody>
        </table>
        </div>
      )}
    </div>
  );
};
export default Forecasting;
