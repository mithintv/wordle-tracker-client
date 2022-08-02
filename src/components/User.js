// React specific modules
import React, { useState, useEffect, useContext } from 'react';
import FilterContext from './../context/filter-context';

// API Reference
import api from "../api/api";

// Chart Tools
import { ResponsiveTimeRange } from '@nivo/calendar';
import { ResponsiveBar } from '@nivo/bar';

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
        {stats && <div className={classes.chart}><ResponsiveTimeRange
          data={data}
          from='2022-04'
          to={Date.now()}
          minValue={1}
          maxValue={7}
          emptyColor="#eeeeee"
          colors={['#66BC62', '#A6D96A', '#D9EF8B', '#FEE08B', '#FCAE60', '#F46C42', '#D63126']}
          margin={{ top: 30, right: 40, bottom: 0, left: 40 }}
          weekdayTicks={[0, 1, 2, 3, 4, 5, 6, 7]}
          dayBorderWidth={2}
          dayBorderColor="#ffffff"
          legends={[
            {
              anchor: 'right',
              direction: 'row',
              translateY: 50,
              translateX: -100,
              itemCount: 5,
              itemWidth: 42,
              itemHeight: 10,
              itemsSpacing: 10,
              itemDirection: 'right-to-left'
            }
          ]}
        />
        </div>}
        {stats && <div className={classes.bar}><ResponsiveBar
          data={data}
          keys={[
            'score',
          ]}
          indexBy="date"
          maxValue={7}
          margin={{ top: 25, right: 47.5, bottom: 60, left: 75 }}
          reverse={true}
          padding={0.1}
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          colors={['#78d765']}
          axisTop={null}
          axisRight={null}
          axisBottom={ctx.filter === 'all' ? null :
            {
              tickSize: 2,
              tickPadding: 5,
              tickRotation: 45,
              legend: 'Days Played',
              legendPosition: 'middle',
              legendOffset: 40
            }}
          gridYValues={6}
          axisLeft={{
            tickValues: 3,
            tickSize: 4,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'guesses',
            legendPosition: 'middle',
            legendOffset: -40
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{
            from: 'color',
            modifiers: [
              [
                'darker',
                1.6
              ]
            ]
          }}
          role="application"
          ariaLabel="Nivo bar chart demo"
          barAriaLabel={function (e) { return e.id + ": " + e.formattedValue + " in country: " + e.indexValue; }}
        /></div>}
      </div>
    </React.Fragment>
  );

};

export default User;