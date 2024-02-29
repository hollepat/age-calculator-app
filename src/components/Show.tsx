import "../css/Show.css";
import CountUp from "react-countup";
import React, {useState, useEffect} from "react";
import {DetailedAge} from "./Card";

interface ShowProps {
    age: DetailedAge;
}


const Show: React.FC<ShowProps> = ({ age }) => {

    console.log({ age })

    const [startCounting, setStartCounting] = useState(false)

    /**
     * deps: specify, when should useEffect called.[age] says that useEffect is executed every time
     * age changes value
     */
    useEffect(() => {

        // Update startCounting when age values are not all zero
        if (age.months !== 0 || age.days !== 0 || age.years !== 0) {
            setStartCounting(true);
        }
    }, [age]);

    return (
        <div className="result">
            <div>
                {startCounting ? <CountUp start={0} end={age.years} duration={3}/> : <span id="show-years">--</span>}
                <label>years</label>
            </div>
            <div>
                {startCounting ? <CountUp start={0} end={age.months} duration={3}/> : <span id="show-months">--</span>}
                <label>months</label>
            </div>
            <div>
                {startCounting ? <CountUp start={0} end={age.days} duration={3}/> : <span id="show-days">--</span>}
                <label>days</label>
            </div>
        </div>
    );
};

export default Show;