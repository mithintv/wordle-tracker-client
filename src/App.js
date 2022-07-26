import React from "react";

import Header from "./layout/Header";
import Leaderboard from "./components/Leaderboard";

import "./App.css";

const App = () => {
  return (
    <React.Fragment>
      <Header />
      <Leaderboard />
    </React.Fragment>
  );
};

export default App;
