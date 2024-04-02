// src/pages/AdCopies.js

import React from "react";
import { useState } from "react";
import axios from "axios"; // You can use axios for API requests
import { Header } from "../components"; // Assuming you have a Header component
import { useStateContext } from "../contexts/ContextProvider"; // Assuming you have a ContextProvider

const AdCopies = () => {
  const [adData, setAdData] = useState(null);
  const { currentMode } = useStateContext(); // Replace with your actual context

  const generateAdCopies = async () => {
    // Your API request logic here
    try {
      // Make an API call to get ad copies
      const response = await axios.get("YOUR_API_ENDPOINT");
      setAdData(response.data); // Set the ad data in state
    } catch (error) {
      console.error("Error fetching ad copies:", error);
    }
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header title="Ad Copies" />
      {adData && (
        <div>
          {/* Display ad data */}
          <p>Category: {adData.category}</p>
          <p>Subcategory: {adData.subcategory}</p>
          {/* Add more ad details as needed */}
        </div>
      )}
      <button
        onClick={generateAdCopies}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Generate Ad Copies
      </button>
    </div>
  );
};

export default AdCopies;
