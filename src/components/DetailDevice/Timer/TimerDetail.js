import React from 'react';
import styled from "styled-components";
import RuleNameList from '../RuleNameList'
import DeviceDescription from '../DeviceDescription';

export default function TimerDetail(props) {
    return (
        <ElementContent>
            <DeviceDescription
                {...props}
            />
            <ElementMeasure>
                <h1>{weekDayMapper(props.element.measure_day)}, {props.element.measure_time}</h1>
            </ElementMeasure>
            <br></br>
            <RuleNameList
                {...props}
            />
        </ElementContent>
    )

}

function weekDayMapper(numberDay) {
    switch (numberDay) {
        case '0':
            return 'Lunedi';
        case '1':
            return 'Martedi';
        case '2':
            return 'Mercoledi';
        case '3':
            return 'Giovedi';
        case '4':
            return 'Venerdi';
        case '5':
            return 'Sabato';
        case '6':
            return 'Domenica';
        default:
            return '-';
    }
}

const ElementContent = styled.div`
border: solid #d9d9d9 1px;
border-radius: 25px;
margin-left: 2%;
margin-right: 2%;
margin-bottom: 2%;
text-align: left;
padding: 2%;
background-color: #cccccc;
`;

const ElementMeasure = styled.div`
border: solid black 2px;
border-radius: 25px;
margin-left: 2%;
margin-right: 2%;
padding: 2%;
background-color: #a7b4a8;
text-align: center;
justify-content: center;
background-color: #e6e6e6;
`;

