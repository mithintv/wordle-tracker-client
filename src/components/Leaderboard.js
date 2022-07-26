import React, { useState, useEffect } from "react";

import UserList from "./UserList";

import classes from "./Leaderboard.module.css";

const Leaderboard = () => {

  const [weekly, setWeekly] = useState('active');
  const [monthly, setMonthly] = useState('');
  const [all, setAll] = useState('');
  const [filter, setFilter] = useState('weekly');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const scoreData = async () => {
      const response = await fetch(`https://aqueous-atoll-74275.herokuapp.com/leaderboard/${filter}`);
      const userList = await response.json();
      setUsers(userList.users.sort((a, b) => {
        return a.score - b.score;
      }));
    };
    scoreData();
  }, [filter]);


  const weeklyHandler = () => {
    setFilter('weekly');
    setMonthly('');
    setAll('');
  };
  const monthlyHandler = () => {
    setFilter('monthly');
    setWeekly('');
    setAll('');
  };
  const allHandler = () => {
    setFilter('all');
    setWeekly('');
    setMonthly('');
  };

  return (
    <React.Fragment>
      <div className={`container px-3 pb-2 my-3 ${classes.container}`}>
        <h1 className="text-center p-3">Wordle<br /> Leaderboard</h1>

        {/* // <----- dropdown style filters -----> */}
        {/* <div className="row justify-content-end pb-2">
          <div className="col-4 text-end dropdown">
            <a class="btn dropdown-toggle pe-4" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <span className="pe-2">{active}</span>
            </a>
            <ul class="dropdown-menu">
              <li><a class="active dropdown-item" onClick={clickHandler}>Weekly</a></li>
              <li><a class="dropdown-item" onClick={clickHandler}>Monthly</a></li>
              <li><a class="dropdown-item" onClick={clickHandler}>All Time</a></li>
            </ul>
          </div>
        </div> */}
        <div className={`row m-auto pb-2 justify-content-center d-flex justify-content-around`}>
          <button onClick={weeklyHandler} className={`col-4 px-0 btn ${classes.button} ${weekly && classes.active}`}>Weekly</button>
          <button onClick={monthlyHandler} className={`col-4 px-0 btn ${classes.button} ${monthly && classes.active}`} >Monthly</button>
          <button onClick={allHandler} className={`col-4 px-0 btn ${classes.button} ${all && classes.active}`} >All Time</button>
        </div>
        {/* <----- Legend Below ----->*/}
        {/* <div className="row m-auto pb-1">
          <span className="col-2 text-center ps-4 pe-0 ms-1">Rank</span>
          <span className="col-7 ms-4 px-0">User</span>
          <span className="col-2 ms-0 ps-2">Score</span>
        </div> */}
        <UserList users={users} />
      </div>
    </React.Fragment>
  );
};

export default Leaderboard;