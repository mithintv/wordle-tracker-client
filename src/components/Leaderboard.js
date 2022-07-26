import React from "react";

import UserList from "./UserList";

import classes from "./Leaderboard.module.css";

const Leaderboard = () => {

  return (
    <React.Fragment>
      <div className={`container px-3 pb-2 my-3 ${classes.container}`}>
        <h1 className="col-12 text-center p-3">Wordle<br /> Leaderboard</h1>
        <div className={`col-12 row m-auto pb-2 justify-content-center d-flex justify-content-around`}>
          <button className={`col-4 px-0 btn ${classes.button}`} >Weekly</button>
          <button className={`col-4 px-0 btn ${classes.button}`} >Monthly</button>
          <button className={`col-4 px-0 btn ${classes.button}`} >All Time</button>
        </div>
        <UserList />
      </div>
    </React.Fragment>
  );
};

export default Leaderboard;