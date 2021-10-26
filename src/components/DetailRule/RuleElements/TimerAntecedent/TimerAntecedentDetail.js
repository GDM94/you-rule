import React from 'react';
import styled from "styled-components";

export default function TimerAntecedentDetail(props) {
    return (
        <ElementContent>
            <WeekDaySetting {...props} />
            <br></br>
            <TimeSetting {...props} />
        </ElementContent>
    )

}

function TimeSetting(props) {
    var ruleElement = props.ruleElement;
    const manageStartTime = (startTime) => {
        ruleElement.time_start_value = startTime
        props.setRuleElementObject(ruleElement);
    }
    const manageStopTime = (stopTime) => {
        ruleElement.time_stop_value = stopTime
        props.setRuleElementObject(ruleElement);
    }
    const defaultStartTimeValue = () => {
        if (ruleElement.time_start_value !== "") {
            return ruleElement.time_start_value
        }
        else {
            return "00:00:00"
        }
    }
    const defaultStopTimeValue = () => {
        if (ruleElement.time_stop_value !== "") {
            return ruleElement.time_stop_value
        }
        else {
            return "00:00:00"
        }
    }
    return (
        <>
            <h5>- TIMER SETTING</h5>
            <ElementMeasure>
                <div>
                    Start Time
                    <input type="time" id="start"
                        defaultValue={defaultStartTimeValue()}
                        onChange={e => { manageStartTime(e.target.value) }} />
                </div>
                <br />
                <div>
                    Stop Time
                    <input type="time" id="stop"
                        defaultValue={defaultStopTimeValue()}
                        onChange={e => { manageStopTime(e.target.value) }} />
                </div>
            </ElementMeasure>
        </>
    )

}

function WeekDaySetting(props) {
    var ruleElement = props.ruleElement;

    const manageWeekDays = (day, check) => {
        if (check) {
            ruleElement.day_start_value.push(day)
        }
        else {
            const idx = ruleElement.day_start_value.indexOf(day)
            ruleElement.day_start_value.splice(idx, 1)
        }
        props.setRuleElementObject(ruleElement);
    }

    const checkedWeekDays = (day) => {
        if (ruleElement.day_start_value && ruleElement.day_start_value.length > 0) {
            return ruleElement.day_start_value.some(d => d === day)
        }
        else {
            return false
        }
    }

    const daySelection = (dayName, dayNumberInt) => {
        const dayNumber = dayNumberInt.toString();
        return (
            <DaySelection>
                <input style={{ marginRight: "5px" }} type='checkbox'
                    name={dayNumber} id={dayNumber} value={dayNumber}
                    checked={checkedWeekDays(dayNumber)}
                    onChange={e => { manageWeekDays(dayNumber, e.target.checked) }}
                />
                {dayName}
            </DaySelection>
        )
    }
    return (
        <>
            <h5>- DAYS SETTING</h5>
            <ElementMeasure>
                {daySelection("Lunedì", 0)}
                {daySelection("Martedì", 1)}
                {daySelection("Mercoledì", 2)}
                {daySelection("Giovedì", 3)}
                {daySelection("Venerdì", 4)}
                {daySelection("Sabato", 5)}
                {daySelection("Domenica", 6)}
            </ElementMeasure>
        </>
    )
}

const ElementContent = styled.div`
border: solid #d9d9d9 1px;
height: 100%;
border-radius: 25px;
margin-left: 2%;
margin-right: 2%;
margin-bottom: 2%;
text-align: left;
padding: 2%;
background-color: #cccccc;
`;

const ElementMeasure = styled.div`
display: flex;
flex-flow: column;
border: solid black 2px;
border-radius: 25px;
margin-left: 2%;
margin-right: 2%;
padding: 2%;
background-color: #a7b4a8;
text-align: left;
justify-content: left;
background-color: #e6e6e6;
`;

const DaySelection = styled.label`
width: fit-content; 
cursor: default;
`;





