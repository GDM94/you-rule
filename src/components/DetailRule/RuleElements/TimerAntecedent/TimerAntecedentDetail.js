import React from 'react';
import styled from "styled-components";

export default function TimerAntecedentDetail(props) {
    return (
        <ElementContent>
            <WeekDaySetting {...props} />
            <br></br>
            <TimeSetting {...props}/>
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
    const defaultStartTimeValue = () =>{
        if (ruleElement.time_start_value !== "") {
            return ruleElement.time_start_value
        }
        else{
            return "00:00:00"
        }
    }
    const defaultStopTimeValue = () =>{
        if (ruleElement.time_stop_value !== "") {
            return ruleElement.time_stop_value
        }
        else{
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
    return (
        <>
        <h5>- DAYS SETTING</h5>
        <ElementMeasure>
            
            <label>
                <input type='checkbox'
                    name="0" id="0" value="0"
                    checked={checkedWeekDays("0")}
                    onChange={e => { manageWeekDays("0", e.target.checked) }}
                />
                Lunedi
            </label>
            <label>
                <input type='checkbox'
                    name="1" id="1" value="1"
                    checked={checkedWeekDays("1")}
                    onChange={e => { manageWeekDays("1", e.target.checked) }}
                />
                Martedi
            </label>
            <label>
                <input type='checkbox'
                    name="2" id="2" value="2"
                    checked={checkedWeekDays("2")}
                    onChange={e => { manageWeekDays("2", e.target.checked) }}
                />
                Mercoledi
            </label>
            <label>
                <input type='checkbox'
                    name="3" id="3" value="3"
                    checked={checkedWeekDays("3")}
                    onChange={e => { manageWeekDays("3", e.target.checked) }}
                />
                Giovedi
            </label>
            <label>
                <input type='checkbox'
                    name="4" id="4" value="4"
                    checked={checkedWeekDays("4")}
                    onChange={e => { manageWeekDays("4", e.target.checked) }}
                />
                Venerdi
            </label>
            <label>
                <input type='checkbox'
                    name="5" id="5" value="5"
                    checked={checkedWeekDays("5")}
                    onChange={e => { manageWeekDays("5", e.target.checked) }}
                />
                Sabato
            </label>
            <label>
                <input type='checkbox'
                    name="6" id="6" value="6"
                    checked={checkedWeekDays("6")}
                    onChange={e => { manageWeekDays("6", e.target.checked) }}
                />
                Domenica
            </label>
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


