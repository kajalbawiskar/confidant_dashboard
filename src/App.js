import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import {
  Navbar,
  Footer,
  Sidebar,
  ThemeSettings,
  LoadingSpinner,
} from "./components";
import {
  Stacked,
  ColorMapping,
  YoyAnalysis,
  Login,
  Signup,
  ForgotPassword,
  StrategyIdeas,
  DeviceLevel,
  Forecasting,
  AcquiringCustomers,
  Remarketing,
  FunnelAnalysis,
  PlatformAnalysis,
  KeywordAnalysis,
  Age,
  Gender,
  Audience,
  BrandSpecificKeyword,
  NonBrandSpecificKeyword,
  CategorySpecific,
  SubcategorySpecific,
  SubscriptionStatus,
  Dashboard,
  Getstarted,
  SignupSteps,
  Ad_copies
} from "./pages";
import "./App.css";

import { useStateContext } from "./contexts/ContextProvider";
import Demographics from "./pages/Charts/Demographics";

const App = () => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeMenu, setActiveMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const token = localStorage.getItem('token');
  console.log(token);
  const handleLogin = () => {
    // Implement your login logic here
    setIsLoggedIn(true);
    setActiveMenu(true);
  };

  const toggleSidebar = () => {
    setActiveMenu(!activeMenu);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveMenu(false);
  }

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
    // Simulate loading completion after 2 seconds
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => clearTimeout(timeout);
  }, [setCurrentColor, setCurrentMode]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div
      className={currentMode === "Dark" ? "dark" : ""}
      style={{ overflowY: "hidden" }}
    >
      <BrowserRouter basename="/user-dashboard">
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
            <TooltipComponent content="Settings" position="Top">
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: "50%" }}
                className="text-2xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>
          {isLoggedIn && token !=='' && (
            <div className={`sidebar ${activeMenu ? "active" : ""}`}>
              <Sidebar onLogout={handleLogout} />
            </div>
          )}
          <div
            className={
              activeMenu
                ? "dark:bg-main-dark-bg bg-main-bg max-h-screen md:ml-2 w-full  overflow-hidden"
                : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
            }
          >
            {isLoggedIn && token !=='' && (
              <div className="md:static bg-main-bg dark:bg-main-dark-bg navbar w-full fixed top-0 left-0 z-50">
                <Navbar toggleSidebar={toggleSidebar} />
              </div>
            )}
            <Routes>
                <Route path="/" element={<Login onLogin={handleLogin} />} />
                <Route
                  path="/signup"
                  element={<Signup onSignup={handleLogin} />}
                />
                <Route
                  path="/Getstarted"
                  element={<Getstarted onSignup={handleLogin} />}
                />
                <Route
                  path="/SignupSteps"
                  element={<SignupSteps onSignup={handleLogin} />}
                />
                <Route
                  path="/ForgotPassword"
                  element={<ForgotPassword onForgotPassword={handleLogin} />}
                />
            </Routes>
            {isLoggedIn && token !=='' && (
              <div
                className="route-container overflow-auto bg-white mt-8"
                style={{ maxHeight: "calc(100vh - 8rem)" }}
              >
                {themeSettings && <ThemeSettings />}
                <Routes>
                  {/* dashboard  */}
                  <Route path="/dashboard" element={<Dashboard />} />
                  {/*<ProtectedRoute path="/ecommerce" element={<Ecommerce />} />*/}
                  {/* pages  */}
                  <Route path="/strategy-ideas" element={<StrategyIdeas />} />
                  <Route path="/forecasting" element={<Forecasting />} />
                  <Route path="/funnel-analysis" element={<FunnelAnalysis />} />

                  {/* apps  */}
                  <Route
                    path="/keyword-analysis"
                    element={<KeywordAnalysis />}
                  />
                  <Route
                    path="/keyword-analysis-brand-specific"
                    element={<BrandSpecificKeyword />}
                  />
                  <Route
                    path="/keyword-analysis-non-brand-specific"
                    element={<NonBrandSpecificKeyword />}
                  />
                  <Route
                    path="/keyword-analysis-category-specific"
                    element={<CategorySpecific />}
                  />
                  <Route
                    path="/keyword-analysis-subcategory-specific"
                    element={<SubcategorySpecific />}
                  />
                  <Route path="/yoy-analysis" element={<YoyAnalysis />} />
                  <Route
                    path="/platform-analysis"
                    element={<PlatformAnalysis />}
                  />
                  <Route
                    path="/Ad_copies"
                    element={<Ad_copies />}
                  />
                  <Route path="/device-level" element={<DeviceLevel />} />

                  {/* charts  */}
                  <Route path="/demographics" element={<Demographics />} />
                  <Route path="/demographics-age" element={<Age />} />
                  <Route path="/demographics-audience" element={<Audience />} />
                  <Route path="/demographics-gender" element={<Gender />} />
                  <Route
                    path="/acquiring-new-customers"
                    element={<AcquiringCustomers />}
                  />
                  <Route path="/color-mapping" element={<ColorMapping />} />
                  <Route path="/remarketing" element={<Remarketing />} />
                  <Route path="/Stacked" element={<Stacked />} />
                  <Route path="/account-subscription" element={<SubscriptionStatus />} />
                </Routes>
              </div>
            )}
            {isLoggedIn && token !=='' && <Footer />}
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
