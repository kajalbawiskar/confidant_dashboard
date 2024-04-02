import React from 'react';
import KeywordPlanner from './KeywordPlanner'; // Path to your KeywordPlanner component

function App() {
  const accessToken = 'Ya29.a0Ad52N38Vv9v0YXH6iJfyM2vv8_WlezBG_A7pRr4ANEOW-v6-712NI_gZl59298Ai-WKIPJnUoHqeE_bDBmdrsdlw08BZ_4jdfjeVv1meVlX_pmxZFtNVwvTMTJaEd37NPVALQ1Br7zebQqIEaeZ0fX1YTAstbUJ02anVaCgYKARwSARMSFQHGX2Mi-F4kwVhUcVK0QTVC90eZyw0171';
  const developerToken = '-OlDMpjDW61JgrPVZolWZQ';
  const customerId = '464-303-6315';

  return (
    <div className="App">
      <KeywordPlanner accessToken={accessToken} developerToken={developerToken} customerId={customerId}  />
    </div>
  );
}

export default App;
