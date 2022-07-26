import React from "react";

import User from "./User.js";


const UserList = props => {

  const showUsers = props.users.map((user, index) => {
    user.ranking = index + 1;
    if (user.first_name === 'Chang') {
      user.first_name = 'Chang Ju';
    }
    if (user.first_name === 'Ji') {
      user.first_name = 'Ji Young';
    }

    let prevUser;
    if (props.users[index - 1]) {
      prevUser = props.users[index - 1];
      if (prevUser.score === user.score) {
        user.ranking = prevUser.ranking;
      }
    }

    return (
      <User
        key={user.id}
        id={user.id}
        ranking={user.ranking}
        image_url={user.image_url}
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