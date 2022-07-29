// React specific modules
import React, { useState, useEffect, useContext } from 'react';
import FilterContext from './../context/filter-context';

// API Reference
import api from "../api/api";

// Chart Tools
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

// CSS Classes
import classes from "./User.module.css";

const User = props => {

  const ordinal = n => {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return (s[(v - 20) % 10] || s[v] || s[0]);
  };

  const ctx = useContext(FilterContext);

  const [stats, setStats] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${api}/user/${props.id}/${ctx.filter}`, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
        setData(await response.json());
      }
      catch (err) {
        console.log(err);
      }
    })();
  }, [stats, props.id, ctx.filter]);

  const clickHandler = () => {
    setStats(prevState => !prevState);
  };


  return (
    <React.Fragment>
      <div className={`mx-2 mb-3 ${classes.card}`}>
        <div onClick={clickHandler} className={`row m-auto px-3 py-2 align-items-center ${classes.row}`}>
          {props.ranking === 1 && <img className={`col-2 ${classes.ordinal}`} src="https://cdn-icons-png.flaticon.com/512/2583/2583344.png" alt="first place" />}
          {props.ranking === 2 && <img className={`col-2 ${classes.ordinal}`} src="https://cdn-icons-png.flaticon.com/512/2583/2583319.png" alt="second place" />}
          {props.ranking === 3 && <img className={`col-2 ${classes.ordinal}`} src="https://cdn-icons-png.flaticon.com/512/2583/2583434.png" alt="third place" />}
          {props.ranking > 3 && <span
            className={`col-2 text-center ${classes.place}`}>
            {props.ranking}{ordinal(props.ranking)}
          </span>}
          <div className={`col-2 p-0 ${classes.outline}`}>
            <img className={`${classes.avatar}`} src={props.image_url} alt={`${props.first_name} avatar`} />
          </div>
          <span className={`col-5 ${classes.name}`}>{props.first_name}</span>
          <span className={`col text-center ${classes.score}`}>{props.score}</span>
        </div>

        {stats && <ResponsiveContainer className={`m-auto`} width="95%" height={225}>
          <BarChart width={450} height={200} data={data}
            margin={{ top: 25, right: 60, left: 10, bottom: 25 }}>
            <XAxis dataKey="date" />
            <YAxis tickCount={7} interval={1} ticks={[0, 1, 2, 3, 4, 5, 6, 7]} domain={[1, 7]} />
            <Tooltip />
            <Bar type="monotone" dataKey="score" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>}
      </div>
    </React.Fragment>
  );

};

export default User;