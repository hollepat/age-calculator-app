import "../css/Button.css";
import moment from 'moment'
import {ChangeAgeWithEffect} from "./Card";
import React from "react";

interface ButtonProps {
    changeAgeWithEffect: ChangeAgeWithEffect;
}

const Button: React.FC<ButtonProps> = ({ changeAgeWithEffect }) => {

    function handleEvent() {

        // get input elements
        const dayInput = document.getElementById("day") as HTMLInputElement;
        const monthInput = document.getElementById("month") as HTMLInputElement;
        const yearInput = document.getElementById("year") as HTMLInputElement;

        // IIFE for reset error indicators
        (function resetErrorHandling() {

            // reset input styling
            const inputDay = document.getElementById('day') as HTMLElement;
            inputDay.style.border = 'solid 1px hsl(0, 0%, 86%)'
            const inputMonth = document.getElementById('month') as HTMLElement;
            inputMonth.style.border = 'solid 1px hsl(0, 0%, 86%)'
            const inputYear = document.getElementById('year') as HTMLElement;
            inputYear.style.border = 'solid 1px hsl(0, 0%, 86%)'

            // reset lebels styling
            const dayLabel = document.getElementById('label-day') as HTMLElement
            dayLabel.style.color = 'hsl(0, 1%, 44%)';
            const monthLabel = document.getElementById('label-month') as HTMLElement
            monthLabel.style.color = 'hsl(0, 1%, 44%)';
            const yearLabel = document.getElementById('label-year') as HTMLElement
            yearLabel.style.color = 'hsl(0, 1%, 44%)';

            // reset error message
            showErrorMesageDay(' ');
            showErrorMesageMonth(' ');
            showErrorMesageYear(' ');
        })()

        // get input
        const dayBirth: number = parseInt(dayInput.value, 10);
        const monthBirth: number = parseInt(monthInput.value, 10);
        const yearBirth: number = parseInt(yearInput.value, 10);

        // check empty input
        if ( !emptyCheck(dayBirth, monthBirth, yearBirth) ) {
            return;
        }

        // check valid input
        if ( !validityCheck(dayBirth, monthBirth, yearBirth) ) {
            return;
        }

        // calculate age
        const {days, months, years} = getDifferenceInDaysMonthsYears(dayBirth, monthBirth, yearBirth);
        console.log('Time in between: days: ' + days + ' months: ' + months + ' years ' + years);

        // show age
        changeAgeWithEffect(days, months, years);
    }

    return (
        <div className="submit-button">
            <hr/>
            <button onClick={handleEvent}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="46"
                    height="44"
                    viewBox="0 0 46 44"
                >
                    <g fill="none" stroke="#FFF" strokeWidth="2">
                        <path
                            d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44"/>
                    </g>
                </svg>
            </button>
        </div>
    );
};



function changeInputToErrorState(inputId: string, labelId: string) {
    
    // show error
    const input = document.getElementById(inputId) as HTMLElement;
    input.style.border = 'solid 1px hsl(0, 100%, 67%)'
    
    const label = document.getElementById(labelId) as HTMLElement
    label.style.color = 'hsl(0, 100%, 67%)';
}


function emptyCheck(dayBirth: number, monthBirth: number, yearBirth: number): boolean {
    let isOk: boolean = true;

    // empty input
    if (Number.isNaN(dayBirth)) {
        console.error("Day field is required!");
        isOk = false;

        changeInputToErrorState('day', 'label-day');
        showErrorMesageDay('This field is required');
    }

    if (Number.isNaN(monthBirth)) {
        console.error("Month field is required!");
        isOk = false;

        changeInputToErrorState('month', 'label-month');
        showErrorMesageMonth('This field is required');
    }

    if (Number.isNaN(yearBirth)) {
        console.error("Year field is required!")
        isOk = false;

        changeInputToErrorState('year', 'label-year');
        showErrorMesageYear('This field is required');
    }

    return isOk;
}

function validityCheck(dayBirth: number, monthBirth: number, yearBirth: number): boolean {

    let isOk: boolean = true;

    // check validity of input
    if (!(isNumberBetween(dayBirth, 1, 31))) {
        console.error("Wrong day!");
        isOk = false;

        changeInputToErrorState('day', 'label-day');
        showErrorMesageDay('Must be a valid day');
    }
    if (!(isNumberBetween(monthBirth, 1, 12))) {
        console.error("Wrong month!");
        isOk = false;

        changeInputToErrorState('month', 'label-month');
        showErrorMesageMonth('Must be a valid month');
    }

    if (isInThePast(yearBirth)) {
        console.error("Must be in the past")
        isOk = false;

        changeInputToErrorState('year', 'label-year');
        showErrorMesageYear('Must be in the past');
    }

    if (!isValidDate(dayBirth, monthBirth, yearBirth)) {
        console.error("Must be valid date")
        isOk = false;
        
        changeInputToErrorState('day', 'label-day');
        changeInputToErrorState('month', 'label-month');
        changeInputToErrorState('year', 'label-year');

        showErrorMesageDay('Must be a valid date');
    }

    return isOk;
}

function isInThePast(year: number) {
    const currentDate: Date = new Date();
    return currentDate.getFullYear() < year;
}

function showErrorMesageDay(msg: string) {
    const dayLabel = document.getElementById('error-msg-day') as HTMLElement;
    dayLabel.innerText = msg;
}
function showErrorMesageMonth(msg: string) {
    const dayLabel = document.getElementById('error-msg-month') as HTMLElement;
    dayLabel.innerText = msg;
}
function showErrorMesageYear(msg: string) {
    const dayLabel = document.getElementById('error-msg-year') as HTMLElement;
    dayLabel.innerText = msg;
}


function isNumberBetween(n: number, lowest: number, highest: number): boolean {
    return n >= lowest && n <= highest;
}

function isValidDate(day: number, month: number, year: number): boolean {
    console.log(day + '/' + month + '/' + year)
    return moment(day + '/' + month + '/' + year, 'DD/M/YYYY', true).isValid();
}

function getDifferenceInDaysMonthsYears(day: number, month: number, year: number): { days: number, months: number, years: number } {
    // input date
    const startDate: Date = new Date(year, month - 1, day);
    
    // today's date
    const endDate: Date = new Date();
    
    // Calculate the difference in milliseconds between the two dates
    const differenceInMillis = endDate.getTime() - startDate.getTime();
  
    // Calculate the number of milliseconds in a day, month, and year
    const oneDayInMillis = 1000 * 60 * 60 * 24;
    const oneMonthInMillis = oneDayInMillis * 30.4375; // Average days in a month (365.25 days / 12 months)
    const oneYearInMillis = oneDayInMillis * 365.25;  // Average days in a year
  
    // Calculate the number of whole years, months, and days
    const years = Math.floor(differenceInMillis / oneYearInMillis);
    const months = Math.floor((differenceInMillis % oneYearInMillis) / oneMonthInMillis);
    const days = Math.floor((differenceInMillis % oneMonthInMillis) / oneDayInMillis);
  
    return { days, months, years };
  }

export default Button;
