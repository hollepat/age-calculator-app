import "../css/Card.css";
import Input from "../components/Input";
import Button from "./Button";
import Show from "./Show";
import {useState} from "react";

const Card = () => {

    const [age, setAge] = useState({days: 0, months: 0, years: 0});

    const changeAgeWithAffect = (days: number, months: number, years: number) => {
        setAge({days, months, years})
    }

    return (
        <div className="card">
            <Input/>
            <Button changeAgeWithEffect={changeAgeWithAffect} />
            <Show age={age} />
        </div>
    );
};

export type DetailedAge = {
    years: number;
    months: number;
    days: number;
};

export type ChangeAgeWithEffect = (days: number, months: number, years: number) => void;

export default Card;