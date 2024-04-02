import React, { useState } from 'react';
import axios from 'axios';

function KeywordPlanner({ accessToken, developerToken, customerId }) {
  const [keyword, setKeyword] = useState('');
  const [searchVolume, setSearchVolume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(`https://googleads.googleapis.com/v8/customers/${customerId}/keywordSuggestions`, {
        params: {
          query: keyword
          // Add any necessary parameters for your request
          // For example, location, language, etc.
        },
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'developer-token': developerToken,
          'Origin': 'http://localhost:3000' // Set the origin header to your application's URL
        },
      });

      if (response.data && response.data.search_volume) {
        setSearchVolume(response.data.search_volume);
      } else {
        throw new Error('Search volume data not available.');
      }
    } catch (error) {
      console.error('Error searching keyword:', error);
      setError(error.message || 'Error searching keyword. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Keyword Planner</h1>
      <div className="flex items-center mb-4">
        <input
          type="text"
          value={keyword}
          onChange={handleKeywordChange}
          disabled={loading}
          className="border border-gray-300 px-4 py-2 rounded-l-md focus:outline-none focus:ring focus:border-blue-300 flex-1"
          placeholder="Enter keyword"
        />
        <button
          onClick={handleSearch}
          disabled={loading || keyword === ''}
          className="bg-blue-500 text-white px-4 py-2 rounded-r-md ml-2 disabled:opacity-50"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {searchVolume !== null && (
        <p className="text-green-500">Search volume for "{keyword}": {searchVolume}</p>
      )}
    </div>
  );
}

export default KeywordPlanner;
