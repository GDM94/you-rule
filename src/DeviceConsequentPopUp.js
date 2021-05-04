import React, { useState } from 'react';
import { FormControlLabel, Switch } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import AddAlertEmailProcess from './AddAlertEmailProcess';



export default class DeviceConsequentPopUp extends React.Component {
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
            var rulesName = GetRulesName(this.props);
            return (
                <DeviceDetail
                    checkDeviceName={this.state.checkDeviceName}
                    modifyDevice={this.props.modifyDevice}
                    consequentName={this.props.consequentName}
                    consequentId={this.props.consequentId}
                    consequents={this.props.consequents}
                    consequentIdx={this.props.consequentIdx}
                    index={index}
                    rulesName={rulesName}
                    setConsequentAutomaticRequest={this.props.setConsequentAutomaticRequest}
                    setConsequentManualMeasureRequest={this.props.setConsequentManualMeasureRequest}
                    removeAlertEmailRequest={this.props.removeAlertEmailRequest}
                    modifyAlertEmail={this.props.modifyAlertEmail}
                    handleModifyAlertEmail={this.props.handleModifyAlertEmail}
                    handleAddAlertEmailPopUp={this.props.handleAddAlertEmailPopUp}
                    checkDeviceNameFunction={this.checkDeviceNameFunction}
                    modifyConsequentName={this.props.modifyConsequentName}
                    updateDeviceRequest={this.props.updateDeviceRequest}
                    handleModifyDevice={this.props.handleModifyDevice}
                    handleDeviceAntecedentPopUp={this.props.handleDeviceAntecedentPopUp}
                    deleteDeviceRequest={this.props.deleteDeviceRequest}
                    getConsequentById={this.props.getConsequentById}
                    addEmailLocal={this.props.addEmailLocal}
                    addNewAlertEmailRequest={this.props.addNewAlertEmailRequest}
                    modifyEmailRequest={this.props.modifyEmailRequest}
                />
            )
        }
        else {
            return (<div> </div>)
        }
    }
}




function GetRulesName(props) {
    const index = props.consequentIdx;
    const rules = props.consequents[index].rules;
    if (rules.length > 0) {
        const rulesNameList = rules.map(rule => {
            const ruleId = rule.id;
            const ruleName = rule.name;
            return (<div key={ruleId}>
                <ListItem button onClick={() => {
                    props.setNewRule(ruleId, ruleName);
                    props.ruleRoute();
                    props.handleSetRulePopUp(true);
                }}>
                    <ListItemText primary={ruleName} />
                </ListItem>
                <Divider />

            </div>)
        })
        return (
            <List component="div" aria-label="main mailbox folders">
                {rulesNameList}
            </List>
        )
    }
    else {
        return (
            <List component="div" aria-label="main mailbox folders">
                <ListItem>
                    <ListItemText primary="no rules setted" />
                </ListItem>
                <Divider />
            </List>)
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
        deviceDetails = AlertDetails(props)
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
                            props.handleDeviceAntecedentPopUp(false);
                            props.deleteDeviceRequest("antecedent");

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
            <ElementContent>
                {deviceDetails}
            </ElementContent>
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

const ConsequentContent = styled.div`
height: 100%;
width: 100%;
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

const EmailTitle = styled.div`
text-align: center;
justify-content: center;
margin-left: 2%;
margin-right: 2%;
margin-top: 2%;
display: flex;
flex-flow: row;
`;

function AlertDetails(props) {
    const [openRule, handleOpenRule] = useState(false);
    const handleClick = () => {
        handleOpenRule(!openRule);
    };
    return (
        <ConsequentContent>
            <ul>
                <li key={"name"}>Name: {props.modifyDevice ? ModifyName(props) : props.consequentName}</li>
                <li key={"type"}>consequent - alert email sender</li>
                <li key={"id"}>Id: {props.consequentId}</li>
            </ul>
            <ElementMeasure>
                <EmailTitle>
                    <h3> emails </h3>
                    <Button onClick={() => {
                        props.addNewAlertEmailRequest()
                    }}>
                        <AddIcon fontSize="small" style={{ color: "black" }} />
                    </Button >
                </EmailTitle>
                <Divider />

                <EmailDetail
                    consequentIdx={props.consequentIdx}
                    consequents={props.consequents}
                    modifyAlertEmail={props.modifyAlertEmail}
                    removeAlertEmailRequest={props.removeAlertEmailRequest}
                    modifyEmailRequest={props.modifyEmailRequest}
                />
            </ElementMeasure>
            <br></br>
            <ul>
                <li key={"rules"}><Button onClick={() => { handleClick(); }}>
                    RULES  {openRule ? <ExpandLess /> : <ExpandMore />}
                </Button></li>
                <Collapse in={openRule} timeout="auto" unmountOnExit>
                    {props.rulesName}
                </Collapse>
            </ul>

        </ConsequentContent>
    )
}

function EmailDetail(props) {
    const consequent_idx = props.consequentIdx;
    const email_list = props.consequents[consequent_idx].email_list;
    var i = -1;
    if (email_list.length > 0) {
        const email_element = email_list.map(email => {
            i++;
            return (
                <AddAlertEmailProcess
                    email={email}
                    idx={i}
                    consequentIdx={props.consequentIdx}
                    consequents={props.consequents}
                    addNewAlertEmailRequest={props.addNewAlertEmailRequest}
                    removeAlertEmailRequest={props.removeAlertEmailRequest}
                    modifyEmailRequest={props.modifyEmailRequest}
                />
            )
        })
        return (

            <table align="center">
                <tbody>
                    {email_element}
                </tbody>
            </table>
        )
    }
    else {
        return (
            <table align="center">
                <tbody>

                </tbody>
            </table>
        )
    }


}



function SwitchDetails(props) {
    const consequent = props.consequents[props.index];
    const checkStatusDevice = checkDeviceStatusAndMeasure(props);
    const measure = checkStatusDevice["measure"]
    const status = checkStatusDevice["status"]
    const [openRule, handleOpenRule] = useState(false);
    const handleClick = () => {
        handleOpenRule(!openRule);
    };
    return (
        <ConsequentContent>
            <ul>
                <li>Name: {props.modifyDevice ? ModifyName(props) : props.consequentName}</li>
                <li>consequent - switch</li>
                <li>Id: {props.consequentId}</li>
                <li>last on: {consequent.last_on}</li>
                <li>last off: {consequent.last_off}</li>
            </ul>
            <ElementMeasure>
                <h1>{measure}</h1>
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
                    {props.rulesName}
                </Collapse>
            </ul>
        </ConsequentContent>
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

