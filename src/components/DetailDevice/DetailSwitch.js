import React, { useState } from 'react';
import { FormControlLabel, Switch } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import styled from "styled-components";
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import RuleNameList from './RuleNameList'
import DeviceDescription from './DeviceDescription';



export default function DetailSwitch(props) {
    const consequent = props.elements[props.elementIdx];
    const measure_device = props.elements[props.elementIdx].measure
    const checkStatusDevice = checkDeviceStatusAndColor(measure_device);
    const measure = checkStatusDevice.measure
    const [openRule, handleOpenRule] = useState(false);
    const handleClick = () => {
        handleOpenRule(!openRule);
    };
    return (
        <ElementContent>
            <DeviceDescription
                {...props}
                description={"consequent - switch"}
            />
            <ElementMeasure>
                <h1>{measure}</h1>
                <p>last on ({consequent.last_on})</p>
                <p>last off ({consequent.last_off})</p>
                <ElementSettings>
                    {set_automatic_button(props)}
                    {SetManualMeasureButton(props)}
                </ElementSettings>
            </ElementMeasure>
            <br></br>
            <ul>
                <li><Button onClick={() => { handleClick(); }}>
                    RULES  {openRule ? <ExpandLess /> : <ExpandMore />}
                </Button></li>
                <Collapse in={openRule} timeout="auto" unmountOnExit>
                    <RuleNameList
                        {...props}
                        rulesDevice={props.elements[props.elementIdx].rules}
                    />
                </Collapse>
            </ul>
        </ElementContent>
    )

}



function checkDeviceStatusAndColor(measure_device) {
    if (measure_device !== "null" && measure_device !== "init") {
        const color = "green"
        return { measure: measure_device, color: color }
    }
    else if (measure_device === "null") {
        const status = "disconnected"
        const color = "red"
        return { measure: status, color: color }
    }
    else {
        const status = "initialization"
        const color = "yellow"
        return { measure: status, color: color }
    }
}


function set_automatic_button(props) {
    const consequent = props.elements[props.elementIdx];
    const automatic = consequent.automatic
    var value = false;
    if (automatic === "true") {
        value = true;
    }
    return (
        <FormControlLabel
            control={
                <Switch
                    checked={value}
                    onChange={(e) => { props.setConsequentAutomaticRequest(e.target.checked) }}
                    value={value}
                    color="primary"

                />
            }
            label="automatic"
        />
    )
}


function SetManualMeasureButton(props) {
    const consequent = props.elements[props.elementIdx];
    const measure = consequent.measure
    const automatic = consequent.automatic
    return (
        <FormControlLabel
            control={
                <Switch
                    checked={measure === "on"}
                    onChange={(e) => { props.setConsequentManualMeasureRequest(e.target.value) }}
                    value={measure === "on" ? "off" : "on"}
                    color="primary"
                    disabled={automatic === "true"}
                />
            }
            label="on"
        />
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

const ElementSettings = styled.div`
margin-left: 2%;
margin-right: 2%;
justify-content: center;
padding: 1%;
display: flex;
flex-flow: column;
align-items: center;
`;
