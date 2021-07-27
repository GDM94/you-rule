import React, { useState } from 'react';
import { FormControlLabel, Switch } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import RefreshIcon from '@material-ui/icons/Refresh';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import styled from "styled-components";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import RuleNameList from './RuleNameList'
import DetailAlert from './DetailAlert';


export default class DetailSwitch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkDeviceName: false
        }
    }

    checkDeviceNameFunction = (devices, newName) => {
        var checkDeviceName = false;
        if (devices.some(device => device.name === newName)) {
            checkDeviceName = true;
        }
        this.setState({
            checkDeviceName: checkDeviceName
        }, () => { this.render() });

        return checkDeviceName
    }


    render() {

        if (this.props.consequentId !== "" && this.props.deviceConsequentPopUp) {
            const index = this.props.consequentIdx;
            return (
                <DeviceDetail
                    checkDeviceName={this.state.checkDeviceName}
                    index={index}
                    checkDeviceNameFunction={this.checkDeviceNameFunction}
                    {...this.props}
                />
            )
        }
        else {
            return (<div> </div>)
        }
    }
}




function ModifyName(props) {
    const submitFunction = (event) => {
        props.updateDeviceRequest("consequent");
        props.handleModifyDevice();
        event.preventDefault();
    }
    return (
        <form style={{ display: "inline" }} name="ItemName" onSubmit={submitFunction}>
            <input type="text" id="name" name="name"
                defaultValue={props.consequentName}
                onChange={(e) => {
                    const NewName = e.target.value;
                    var checkName = props.checkDeviceNameFunction(props.consequents, NewName);
                    if (!checkName) {
                        props.modifyConsequentName(NewName)
                    }
                }}
            />
        </form>
    )
}


function checkDeviceStatusAndMeasure(props) {
    const measure_device = props.consequents[props.index].measure
    if (measure_device !== "null" && measure_device !== "init") {
        const status = "connected"
        const color = "green"
        return { measure: measure_device, status: status, color: color }
    }
    else if (measure_device === "null") {
        const measure = "off";
        const status = "disconnected"
        const color = "red"
        return { measure: measure, status: status, color: color }
    }
    else {
        const measure = "init";
        const status = "initialization"
        const color = "yellow"
        return { measure: measure, status: status, color: color }
    }
}


function DeviceDetail(props) {
    var deviceDetails = null;
    var color = "green";
    if (props.consequentId.includes("SWITCH")) {
        const checkStatusDevice = checkDeviceStatusAndMeasure(props);
        color = checkStatusDevice.color;
        deviceDetails = SwitchDetails(props)
    }
    else if (props.consequentId.includes("alert")) {
        deviceDetails = DetailAlert(props)
    }
    return (
        <div className="DeviceContentDetail">
            <ElementTitle>
                <h1> <FiberManualRecordIcon style={{ color: color }} /> {props.consequentName} </h1>
                <p style={{ display: props.checkDeviceName ? 'block' : 'none' }}> Error: device name already exist! Choose another name.</p>
                <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                    <Button style={{ display: props.modifyDevice && !props.consequentId.includes("alert") ? "" : "none" }}
                        onClick={() => {
                            props.handleModifyDevice();
                            props.handleDeviceConsequentPopUp(false);
                            props.deleteDeviceRequest("consequent");

                        }}>
                        <DeleteIcon fontSize="large" style={{ color: "red" }} />
                    </Button >
                    <Button
                        onClick={() => {
                            props.getConsequentById(props.consequentId);
                        }}>
                        <RefreshIcon fontSize="large" style={{ color: "black" }} />
                    </Button >
                    <Button
                        onClick={() => {
                            if (props.modifyDevice) {
                                props.updateDeviceRequest("consequent");
                                props.handleModifyDevice();
                            }
                            else {
                                props.handleModifyDevice();
                            }
                        }}>
                        {props.modifyDevice ? <DoneIcon fontSize="large" style={{ color: "black" }} /> : <EditIcon fontSize="large" style={{ color: "black" }} />}

                    </Button >
                </ButtonGroup>
            </ElementTitle>
            {deviceDetails}
        </div>
    )

}

const ElementTitle = styled.div`
text-align: left;
margin-left: 2%;
margin-right: 2%;
margin-top: 2%;
display: flex;
flex-flow: row;
`;

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





function SwitchDetails(props) {
    const consequent = props.consequents[props.index];
    const checkStatusDevice = checkDeviceStatusAndMeasure(props);
    const measure = checkStatusDevice["measure"]
    //const status = checkStatusDevice["status"]
    const [openRule, handleOpenRule] = useState(false);
    const handleClick = () => {
        handleOpenRule(!openRule);
    };
    return (
        <ElementContent>
            <ul>
                <li>Name: {props.modifyDevice ? ModifyName(props) : props.consequentName}</li>
                <li>consequent - switch</li>
                <li>Id: {props.consequentId}</li>
            </ul>
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
                        rulesDevice={props.consequents[props.consequentIdx].rules}
                    />
                </Collapse>
            </ul>
        </ElementContent>
    )

}


function set_automatic_button(props) {
    const consequent = props.consequents[props.index];
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
    const consequent = props.consequents[props.index];
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

