import React, { useState } from "react";
import axios from "axios";
import { Header } from "../components";
import { useStateContext } from "../contexts/ContextProvider";

const StrategyIdeas = () => {
  const [planData, setPlanData] = useState(null);
  const { currentMode } = useStateContext();
  const API_URL = "https://api.openai.com/v1/chat/completions";
  const API_KEY = "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";

  const generate = async () => {
    const prompt = "share marketing plan for clothing brand for the month of april till june";

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
        }),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header title="Strategy Ideas" />
      {planData && (
        <div>
          <p>Category: {planData[0].category}</p>
          <p>Subcategory: {planData[0].subcategory}</p>
          <p>Start Date: {planData[0].start_date}</p>
          <p>End Date: {planData[0].end_date}</p>
        </div>
      )}
      <button
        onClick={generate}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Generate Plan
      </button>
    </div>
  );
};

export default StrategyIdeas;
