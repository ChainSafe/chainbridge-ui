import React, { useEffect, useState } from "react";
import Widget from "chainbridge-ui-transfer-widget-unstable";

import "./App.css";

const App: React.FC<{}> = () => {
  const runtimeConfig = {};

  return (
    <div className="wrap">
      <div className="header">
        <h1>SURF-SWAP 🏄</h1>
      </div>
      <div className="container">
        <Widget config={runtimeConfig} />
      </div>
    </div>
  );
};

export default App;
