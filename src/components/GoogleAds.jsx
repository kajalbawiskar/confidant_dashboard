import React, { useEffect } from "react";

const GoogleAds = () => {
  useEffect(() => {
    // Initialize Google Ads
    window.adsbygoogle = window.adsbygoogle || [];
    window.adsbygoogle.push({});
  }, []);

  return (
    <div className="my-4 mx-auto max-w-2xl">
      <ins className="adsbygoogle block"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-4087697410775578" // Replace with your AdSense client ID
        data-ad-slot="5352503601" // Replace with your Ad Unit ID
        data-ad-format="auto">
      </ins>
    </div>
  );
};

export default GoogleAds;
