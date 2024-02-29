import "../css/Input.css"

const Input = () => {
  return (
    <div className="inputs">
      <div className="input-days">
        <label id="label-day">day</label>
        <input type="text" placeholder="DD" id="day"></input>
        <label className="error-msg" id="error-msg-day"></label>
      </div>
      <div className="input-months">
        <label id="label-month">month</label>
        <input type="text" placeholder="MM" id="month"></input>
        <label className="error-msg" id="error-msg-month"></label>
      </div>
      <div className="input-days">
        <label id="label-year">year</label>
        <input type="text" placeholder="YYYY" id="year"></input>
        <label className="error-msg" id="error-msg-year"></label>
      </div>
    </div>
  );
};

export default Input;