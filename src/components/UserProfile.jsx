import React from "react";
import { MdOutlineCancel } from "react-icons/md";

import { Button } from ".";
import { userProfileData } from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";
import userImage from "../data/user-image.jpg"
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { currentColor } = useStateContext();
  const [userData, setUserData] = useState([]);

  const url = "https://confidanto.com/finalconfi/header-data";
  const fetchInfo = () => {
    return axios
      .post(url, { email: localStorage.getItem("email") })
      .then((res) => {
        setUserData([res.data.userData]);
      })
      .catch((error) => console.log(error.response));
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate("/");
  };

  useEffect(() => {
    /*const countdownInterval = setInterval(() => {
      fetchInfo();
    }, 2000);

    return () => clearInterval(countdownInterval);*/
    fetchInfo();
  }, []);
  //console.log(userData);
  //console.log(userData.userData["username"]);
  return (
    <div className="nav-item absolute right-1 top-12 shadow-md lg:top-16 bg-white dark:bg-[#42464D] p-4 lg:p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">User Profile</p>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <img
          className="rounded-full h-20 w-20 lg:h-24 lg:w-24"
          src={userImage}
          alt="user-profile"
        />
        <div>
          {/*<p className="font-semibold text-xl dark:text-gray-200">
            {userData.userData.username}
          </p>*/}
          {userData.map((dataObj) => {
            return (
              <p className="font-semibold text-lg lg:text-xl dark:text-gray-200">
                {dataObj.username}
              </p>
            );
          })}

          {userData.map((dataObj) => {
            return (
              <p className="text-gray-500 text-sm dark:text-gray-400">
                {dataObj.usertype}
              </p>
            );
          })}

          {userData.map((dataObj) => {
            return (
              <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">
                {dataObj.email}
              </p>
            );
          })}
        </div>
      </div>
      <div>
        {userProfileData.map((item, index) => (
          <div
            key={index}
            className="flex gap-5 border-b-1 border-color p-2 lg:p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]"
          >
            
            <button
              type="button"
              style={{ color: item.iconColor, backgroundColor: item.iconBg }}
              className="text-md lg:text-xl rounded-lg p-3 hover:bg-light-gray"
            >
              {item.icon}
            </button>

            <div>
              <Link to={`${item.path}`} className="font-semibold dark:text-gray-200 text-md lg:text-lg">{item.title}</Link>
              <p className="text-gray-500 text-sm dark:text-gray-400">
                {" "}
                {item.desc}{" "}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5">
        <button className='text-base p-3 w-full bg-blue-500 text-white rounded-xl hover:drop-shadow-xl hover:bg-blue-100 hover:text-blue-500' onClick={handleLogout}>Log Out</button>
      </div>
    </div>
  );
};

export default UserProfile;
