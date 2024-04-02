import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { SiShopware } from "react-icons/si";
import { MdOutlineCancel } from "react-icons/md";
import { LiaDotCircleSolid } from "react-icons/lia";
import { PiCaretDownLight } from "react-icons/pi";
import { PiCaretUpLight } from "react-icons/pi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import {  SlLogout } from "react-icons/sl";
import { useNavigate } from "react-router-dom";

import { links } from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";

const Sidebar = ({ onLogout }) => {
  const { currentColor, activeMenu, setActiveMenu, screenSize } =
    useStateContext();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpenFunnel, setDropdownOpenFunnel] = useState(false);
  const [dropdownOpenKeyword, setDropdownOpenKeyword] = useState(false);

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleDropdownFunnel = () => {
    setDropdownOpenFunnel(!dropdownOpenFunnel);
  };

  const toggleDropdownKeyword = () => {
    setDropdownOpenKeyword(!dropdownOpenKeyword);
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    onLogout();
    navigate("/");
  };
  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2";

  return (
    <>
      {activeMenu && (
        <div
          className={`${
            screenSize <= 900 ?  "w-screen" : "w-72"
          } h-screen flex flex-col justify-between overflow-y-auto`}
        >
          <div>
              <div>
                <div className="flex justify-between items-center">
                  <Link
                    to="/"
                    onClick={handleCloseSideBar}
                    className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
                  >
                    <SiShopware /> <span>Confidanto</span>
                  </Link>
                  <TooltipComponent content="Menu" position="BottomCenter">
                    <button
                      type="button"
                      onClick={() => setActiveMenu(!activeMenu)}
                      style={{ color: currentColor }}
                      className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
                    >
                      <MdOutlineCancel />
                    </button>
                  </TooltipComponent>
                </div>
                <div className="mt-10">
                  {links.map((item) => (
                    <div key={item.title}>
                      {item.title !== "Charts" &&
                        item.title !== "Funnel" &&
                        item.title !== "Keyword" && (
                          <div className="text-lg lg:text-base">
                            {item.links.map((link) => (
                              <NavLink
                                to={`/${link.path}`}
                                key={link.name}
                                onClick={handleCloseSideBar}
                                style={({ isActive }) => ({
                                  backgroundColor: isActive ? currentColor : "",
                                })}
                                className={({ isActive }) =>
                                  isActive ? activeLink : normalLink
                                }
                              >
                                {link.icon}
                                <span className="capitalize pl-4">
                                  {link.name}
                                </span>
                              </NavLink>
                            ))}
                          </div>
                        )}

                      {item.title === "Keyword" && (
                        <div>
                          {item.links.map((link) => (
                            <div key={link.name} className="text-lg lg:text-base">
                              <NavLink
                                to={`/${link.path}`}
                                onClick={handleCloseSideBar}
                                style={({ isActive }) => ({
                                  backgroundColor: isActive ? currentColor : "",
                                })}
                                className={({ isActive }) =>
                                  isActive ? activeLink : normalLink
                                }
                              >
                                {link.icon}
                                <div className="flex items-center space-x-12 lg:space-x-8">
                                  <span
                                    className="capitalize pl-4"
                                    onClick={toggleDropdownKeyword}
                                  >
                                    {link.name}
                                  </span>
                                  <span onClick={toggleDropdownKeyword}>
                                    {dropdownOpenKeyword ? (
                                      <PiCaretUpLight />
                                    ) : (
                                      <PiCaretDownLight />
                                    )}
                                  </span>
                                </div>
                              </NavLink>
                              {dropdownOpenKeyword && (
                                <div>
                                  {link.items.map((subItem) => (
                                    <NavLink
                                      to={`/${subItem.path}`}
                                      onClick={handleCloseSideBar}
                                      style={({ isActive }) => ({
                                        backgroundColor: isActive
                                          ? currentColor
                                          : "",
                                      })}
                                      className={({ isActive }) =>
                                        isActive ? activeLink : normalLink
                                      }
                                      isActive={(match, location) => {
                                        // Check if the current location matches the subItem's path
                                        if (!match) return false;
                                        return match.url === `/${subItem.path}`;
                                      }}
                                      key={subItem.name}
                                    >
                                      <div className="flex pl-12 items-center">
                                        <LiaDotCircleSolid />
                                        <span className="capitalize ml-2 text-sm">
                                          {subItem.name}
                                        </span>
                                      </div>
                                    </NavLink>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {item.title === "Funnel" && (
                        <div>
                          {item.links.map((link) => (
                            <div key={link.name} className="text-lg lg:text-base">
                              <NavLink
                                to={`/${link.path}`}
                                onClick={handleCloseSideBar}
                                style={({ isActive }) => ({
                                  backgroundColor: isActive ? currentColor : "",
                                })}
                                className={({ isActive }) =>
                                  isActive ? activeLink : normalLink
                                }
                              >
                                {link.icon}
                                <div className="flex items-center space-x-16 lg:space-x-12">
                                  <span
                                    className="capitalize pl-4"
                                    onClick={toggleDropdownFunnel}
                                  >
                                    {link.name}
                                  </span>
                                  <span onClick={toggleDropdownFunnel}>
                                    {dropdownOpenFunnel ? (
                                      <PiCaretUpLight />
                                    ) : (
                                      <PiCaretDownLight />
                                    )}
                                  </span>
                                </div>
                              </NavLink>
                              {dropdownOpenFunnel && (
                                <div>
                                  {link.items.map((subItem) => (
                                    <NavLink
                                      to={`/${subItem.path}`}
                                      onClick={handleCloseSideBar}
                                      style={({ isActive }) => ({
                                        backgroundColor: isActive
                                          ? currentColor
                                          : "",
                                      })}
                                      className={({ isActive }) =>
                                        isActive ? activeLink : normalLink
                                      }
                                      isActive={(match, location) => {
                                        // Check if the current location matches the subItem's path
                                        if (!match) return false;
                                        return match.url === `/${subItem.path}`;
                                      }}
                                      key={subItem.name}
                                    >
                                      <div className="flex pl-12 items-center">
                                        <LiaDotCircleSolid />
                                        <span className="capitalize ml-2 text-sm">
                                          {subItem.name}
                                        </span>
                                      </div>
                                    </NavLink>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {item.title === "Charts" && (
                        <div>
                          {item.links.map((link) => (
                            <div key={link.name} className="text-lg lg:text-base">
                              <NavLink
                                to={`/${link.path}`}
                                onClick={handleCloseSideBar}
                                style={({ isActive }) => ({
                                  backgroundColor: isActive ? currentColor : "",
                                })}
                                className={({ isActive }) =>
                                  isActive ? activeLink : normalLink
                                }
                              >
                                {link.icon}
                                <div className="flex items-center space-x-16 lg:space-x-12">
                                  <span
                                    className="capitalize pl-4"
                                    onClick={toggleDropdown}
                                  >
                                    {link.name}
                                  </span>
                                  <span onClick={toggleDropdown}>
                                    {dropdownOpen ? (
                                      <PiCaretUpLight />
                                    ) : (
                                      <PiCaretDownLight />
                                    )}
                                  </span>
                                </div>
                              </NavLink>
                              {dropdownOpen && (
                                <div>
                                  {link.items.map((subItem) => (
                                    <NavLink
                                      to={`/${subItem.path}`}
                                      onClick={handleCloseSideBar}
                                      style={({ isActive }) => ({
                                        backgroundColor: isActive
                                          ? currentColor
                                          : "",
                                      })}
                                      className={({ isActive }) =>
                                        isActive ? activeLink : normalLink
                                      }
                                      isActive={(match, location) => {
                                        // Check if the current location matches the subItem's path
                                        if (!match) return false;
                                        return match.url === `/${subItem.path}`;
                                      }}
                                      key={subItem.name}
                                    >
                                      <div className="flex pl-12 items-center">
                                        <LiaDotCircleSolid />
                                        <span className="capitalize ml-2 text-sm">
                                          {subItem.name}
                                        </span>
                                      </div>
                                    </NavLink>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
          </div>
          <div className="mb-4">
            <button
              className="group relative w-4/5 mx-4 lg:w-10/12 text-[#0f62e6] items-center flex justify-center py-2 px-4 border border-[#0f62e6] text-sm lg:text-base font-medium rounded-xl hover:text-white bg-transparent hover:bg-[#0f62e6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handleLogout}
            >
              Switch to Performance
              <span className="ml-4">
                <SlLogout />
              </span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
