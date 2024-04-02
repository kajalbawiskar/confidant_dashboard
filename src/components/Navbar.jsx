import React, { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { BsChatLeft } from "react-icons/bs";
import { RiNotification3Line } from "react-icons/ri";
import { FiDollarSign } from "react-icons/fi";
import { HiOutlineCalendar } from "react-icons/hi";
import { TbCategory2 } from "react-icons/tb";
import { CiCircleList } from "react-icons/ci";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import Marquee from "react-fast-marquee";

import userImage from "../data/user-image.jpg";
import { Cart, Chat, Notification, UserProfile } from ".";
import { monthNames } from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";
import axios from "axios";
import { useState } from "react";

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = ({ onLogout }) => {
  const {
    currentColor,
    activeMenu,
    setActiveMenu,
    handleClick,
    isClicked,
    setScreenSize,
    screenSize,
    setIsClicked,
  } = useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      setIsClicked(!isClicked.userProfile);
      onLogout();
    }
  });

  const signUpDate = localStorage.getItem("start_date");
  console.log(signUpDate);
  const trialPeriodDays = 30;

  // Calculate trial end date
  const trialEndDate = new Date(signUpDate);
  console.log(trialEndDate);
  trialEndDate.setDate(trialEndDate.getDate() + trialPeriodDays);
  console.log(trialEndDate);
  function calculateDaysLeftInTrial(trialEndDate) {
    const currentDate = new Date();
    const timeDiff = trialEndDate - currentDate;

    // Convert time difference from milliseconds to days
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    return daysLeft;
  }

  const daysLeft = calculateDaysLeftInTrial(trialEndDate);
  const daysLeftText =
    daysLeft > 0
      ? `${daysLeft} days left in your trial`
      : "Your trial has ended";
  console.log(daysLeftText);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);
  const [userData, setUserData] = useState([]);
  const [additionalData, setAdditionalData] = useState([]);
  const [subscriptionColor, setSubscriptionColor] = useState("");
  const [subscriptionColorHover, setSubscriptionColorHover] = useState("");
  const [subscription, setSubscription] = useState("");
  let subColor = "";
  const email = localStorage.getItem("email");
  const url = "https://confidanto.com/finalconfi/header-data";
  const fetchInfo = () => {
    return axios
      .post(url, { email: localStorage.getItem("email") })
      .then((res) => {
        setUserData([res.data.userData]);
        const { start_date } = res.data.userData;
        localStorage.setItem("start_date", start_date);
        //setSignupDate(localStorage.getItem("start_date"));
        setSubscription(res.data.userData.subscription);
        const startDate_backend = res.data.userData.start_date.split("-");
        //const endDate_backend = res.data.userData.end_date.split("-");
        const tempStartInd = Number(startDate_backend[1]);
        const startMonth_backend = monthNames[tempStartInd - 1];
        //const tempEndInd = Number(endDate_backend[1]);
        //const endMonth_backend = monthNames[tempEndInd - 1];
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
            icon: <TbCategory2 />,
            title: "Category",
            iconColor: "#03C9D7",
            iconBg: "#E5FAFB",
            pcColor: "red-600",
          },
          {
            value: temp,
            icon: <CiCircleList />,
            title: "Subcategory",
            iconColor: "rgb(255, 244, 229)",
            iconBg: "rgb(254, 201, 15)",
            pcColor: "green-600",
          },
          {
            value: startMonth_backend,
            icon: <HiOutlineCalendar />,
            title: "Month Range",
            iconColor: "rgb(228, 106, 118)",
            iconBg: "rgb(255, 244, 229)",
            pcColor: "green-600",
          },
          {
            value: "$" + res.data.userData.exp_budget,
            icon: <FiDollarSign />,
            title: "Budget",
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

  console.log(additionalData);
  return (
    <div className="flex flex-col flex-wrap md:flex-nowrap justify-between relative">
      <div className="flex flex-wrap md:flex-nowrap justify-between p-2 lg:ml-6 md:mr-6 relative">
        <NavButton
          title="Menu"
          customFunc={handleActiveMenu}
          color={currentColor}
          icon={<AiOutlineMenu />}
        />

        <div className="flex">
          {subscription === "Free Trial" && (
            <h3 className="blink" style={{ color: "red" }}>
              {daysLeftText}
            </h3>
          )}
          <TooltipComponent content="Subscription" position="BottomCenter">
            <div
              className={`flex items-center ${
                subscription === "Free Trial" ? "bg-blue-500" : "bg-green-500"
              } text-white cursor-pointer mt-1 py-1.5 lg:py-2.5 px-5 hover:${
                subscription === "Free Trial" ? "bg-blue-100" : "bg-green-100"
              } hover:${
                subscription === "Free Trial"
                  ? "text-blue-500"
                  : "text-green-500"
              } rounded-lg`}
            >
              <p>
                {userData.map((dataObj) => {
                  return (
                    <span className="font-bold text-sm lg:text-14">
                      {dataObj.subscription}
                    </span>
                  );
                })}
              </p>
            </div>
          </TooltipComponent>
          {screenSize > 900 && (
            <NavButton
              title="Chat"
              dotColor="#03C9D7"
              customFunc={() => handleClick("chat")}
              color={currentColor}
              icon={<BsChatLeft />}
            />
          )}
          {screenSize > 900 && (
            <NavButton
              title="Notification"
              dotColor="rgb(254, 201, 15)"
              customFunc={() => handleClick("notification")}
              color={currentColor}
              icon={<RiNotification3Line />}
            />
          )}
          <TooltipComponent content="Profile" position="BottomCenter">
            <div
              className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
              onClick={() => handleClick("userProfile")}
            >
              <img
                className="rounded-full w-8 h-8"
                src={userImage}
                alt="user-profile"
              />
              {screenSize > 900 && (
                <p>
                  <span className="text-gray-400 text-14">Hi,</span>
                  {userData.map((dataObj) => {
                    return (
                      <span className="text-gray-400 font-bold ml-1 text-14">
                        {dataObj.username}
                      </span>
                    );
                  })}
                </p>
              )}
              <MdKeyboardArrowDown className="text-gray-400 text-14" />
            </div>
          </TooltipComponent>
          {isClicked.cart && <Cart />}
          {isClicked.chat && <Chat />}
          {isClicked.notification && <Notification />}
          {isClicked.userProfile && <UserProfile />}
        </div>
      </div>
      {screenSize > 900 && (
        <div className="flex m-3 justify-center gap-3 items-center top-12 right-0 z-50">
          {additionalData.map((item) => (
            <div
              key={item.title}
              className="flex bg-white h-22 dark:text-gray-200 dark:bg-secondary-dark-bg shadow md:w-72 p-4 pt-4 rounded-2xl sh hover:drop-shadow-xl"
            >
              <button
                type="button"
                style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                className="text-xl md:text-2xl opacity-0.9 rounded-full p-3 shadow-md hover:drop-shadow-xl h-14 w-14 flex items-center justify-center"
              >
                {item.icon}
              </button>
              <div className="flex flex-col ml-4">
                <p className="mt-2">
                  <span className="text-sm md:text-base font-semibold">
                    {item.value}
                  </span>
                </p>
                <p className="text-xs md:text-sm text-gray-400  mt-1">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;
