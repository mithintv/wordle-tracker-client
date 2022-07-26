import classes from "./User.module.css";



const User = props => {

  const ordinal = n => {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return (s[(v - 20) % 10] || s[v] || s[0]);
  };


  return (
    <div className={`mx-2 mb-3 ${classes.card}`}>
      <div className={`row m-auto px-3 py-2 align-items-center ${classes.row}`}>
        {props.ranking === 1 && <img className={`col-2 ${classes.ordinal}`} src="https://cdn-icons-png.flaticon.com/512/2583/2583344.png" alt="first place" />}
        {props.ranking === 2 && <img className={`col-2 ${classes.ordinal}`} src="https://cdn-icons-png.flaticon.com/512/2583/2583319.png" alt="second place" />}
        {props.ranking === 3 && <img className={`col-2 ${classes.ordinal}`} src="https://cdn-icons-png.flaticon.com/512/2583/2583434.png" alt="third place" />}
        {props.ranking > 3 && <span
          className={`col-2 text-center ${classes.place}`}>
          {props.ranking}{ordinal(props.ranking)}
        </span>}
        <img className={`col-2 ${classes.avatar}`} src={props.image_url} alt={`${props.first_name} avatar`} />
        <span className={`col-6 ${classes.name}`}>{props.first_name}</span>
        <span className={`col-2 text-center ${classes.score}`}>{props.score}</span>
      </div>
    </div>

  );

};

export default User;