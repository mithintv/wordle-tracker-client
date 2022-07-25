import React, { useEffect, useState } from "react";

import User from "./User.js";



const UserList = () => {
  console.log("rendering");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const scoreData = async () => {
      const response = await fetch(`http://localhost:3000/users/scores`);
      const userList = await response.json();
      setUsers(userList.users.sort((a, b) => {
        return a.score - b.score;
      }));
    };
    scoreData();
  }, []);

  const showUsers = users.map(user => {
    return (
      <User
        key={user.id}
        id={user.id}
        first_name={user.first_name}
        last_name={user.last_name}
        score={user.score}
      />);
  });

  return (
    <React.Fragment>
      {showUsers}
    </React.Fragment>
  );
};

export default UserList;