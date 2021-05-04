import React, { useState } from 'react';
import styled from "styled-components";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import RefreshIcon from '@material-ui/icons/Refresh';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import DeviceAntecedents from './DeviceAntecedents'


export default class DeviceAntecedentPopUp extends React.Component {
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
        if (this.props.antecedentId !== "" && this.props.deviceAntecedentPopUp) {
            const index = this.props.antecedentIdx;
            const rulesName = GetRulesName(this.props);
            return (
                <DeviceDetails
                    antecedentIdx={this.props.antecedentIdx}
                    antecedentId={this.props.antecedentId}
                    antecedentName={this.props.antecedentName}
                    antecedents={this.props.antecedents}
                    index={index}
                    rulesName={rulesName}
                    modifyAntecedentName={this.props.modifyAntecedentName}
                    modifyAntecedentSetting={this.props.modifyAntecedentSetting}
                    modifyAntecedentSettingError={this.props.modifyAntecedentSettingError}
                    modifyDevice={this.props.modifyDevice}
                    checkDeviceNameFunction={this.checkDeviceNameFunction}
                    checkDeviceName={this.state.checkDeviceName}
                    updateDeviceRequest={this.props.updateDeviceRequest}
                    handleModifyDevice={this.props.handleModifyDevice}
                    handleDeviceAntecedentPopUp={this.props.handleDeviceAntecedentPopUp}
                    deleteDeviceRequest={this.props.deleteDeviceRequest}
                    getAntecedentById={this.props.getAntecedentById}
                />
            )
        }
        else {
            return (<ContentContainer></ContentContainer>)
        }
    }
}

function GetRulesName(props) {
    const index = props.antecedentIdx;
    const rules = props.antecedents[index].rules;

    if (rules.length > 0) {
        const rulesNameList = rules.map(rule => {
            const ruleId = rule.id;
            const ruleName = rule.name;
            return (
                <div key={ruleId}>
                    <ListItem key={ruleId} button onClick={() => {
                        props.setNewRule(ruleId, ruleName);
                        props.ruleRoute();
                    }}>
                        <ListItemText primary={ruleName} />
                    </ListItem>
                    <Divider />
                </div>

            )
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

const ContentContainer = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-flow: column;
text-align: center;
max-height:100%;
overflow-y: auto;
background-color: #d9d9d9;
`;


function DeviceDetails(props) {
    const deviceDetail = DeviceAntecedents(props.antecedents, props.antecedentIdx);
    var measure = deviceDetail.measure;
    var status = deviceDetail.status;
    var type = deviceDetail.type;
    var settings = deviceDetail.settings;
    var error_measure = deviceDetail.error_measure;
    var color = deviceDetail.color;
    var measure_type = deviceDetail.measure_type;
    var measure_settings = deviceDetail.measure_settings;
    var measure_unit = deviceDetail.measure_unit;

    if (settings !== "/") {
        settings = props.modifyDevice ? ModifyMaxMeasureSetting(props) : settings;
    }
    if (error_measure !== "/") {
        error_measure = props.modifyDevice ? ModifyErrorSetting(props) : error_measure;
    }

    const [openRule, handleOpenRule] = useState(false);
    const handleClick = () => {
        handleOpenRule(!openRule);
    };
    return (
        <div className="DeviceContentDetail">
            <ElementTitle>
                <p style={{ display: props.checkDeviceName ? 'block' : 'none' }}> Error: device name already exist! Choose another name.</p>
                <h1> <FiberManualRecordIcon style={{ color: color }} /> {props.antecedentName} </h1>
                <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                    <Button style={{ display: props.modifyDevice && !props.antecedentId.includes("timer") ? "" : "none" }}
                        onClick={() => {
                            props.handleModifyDevice();
                            props.handleDeviceAntecedentPopUp(false);
                            props.deleteDeviceRequest("antecedent");

                        }}>
                        <DeleteIcon fontSize="large" style={{ color: "red" }} />
                    </Button>
                    <Button
                        onClick={() => {
                            props.getAntecedentById(props.antecedentId);
                        }}>
                        <RefreshIcon fontSize="large" style={{ color: "black" }} />
                    </Button>
                    <Button
                        onClick={() => {
                            if (props.modifyDevice) {
                                props.updateDeviceRequest("antecedent");
                                props.handleModifyDevice();
                            }
                            else {
                                props.handleModifyDevice();
                            }
                        }}>
                        {props.modifyDevice ? <DoneIcon fontSize="large" style={{ color: "black" }} /> : <EditIcon fontSize="large" style={{ color: "black" }} />}

                    </Button>
                </ButtonGroup>
            </ElementTitle>
            <ElementContent>
                <ul>
                    <li key={"name"}>Name: {props.modifyDevice ? ModifyName(props) : props.antecedentName}</li>
                    <li key={"type"}>{type}</li>
                    <li key={"id"}>Id: {props.antecedentId}</li>
                </ul>
                <ElementMeasure>
                    <h3>{measure_type}</h3>
                    <h1>{measure} {measure_unit}</h1>
                    <ElementSettings style={{ display: settings === "/" ? "none" : "" }}>
                        <ul>
                            <li key={"max"}>Max measure ({measure_settings}): {settings}</li>
                            <li key={"error"}>Error measure ({measure_settings}): {error_measure}</li>
                        </ul>
                    </ElementSettings>
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

const ElementMeasure = styled.div`
border: solid black 2px;
border-radius: 25px;
margin-left: 2%;
margin-right: 2%;
padding: 2%;
text-align: center;
background-color: #e6e6e6;
`;

const ElementSettings = styled.div`
margin-left: 2%;
margin-right: 2%;
text-align: left;
`;




function ModifyName(props) {
    const submitFunction = (event) => {
        props.updateDeviceRequest("antecedent");
        props.handleModifyDevice();
        event.preventDefault();
    }
    return (
        <form style={{ display: "inline" }} name="ItemName" onSubmit={submitFunction}>
            <input type="text" id="name" name="name"
                defaultValue={props.antecedentName}
                onChange={(e) => {
                    const NewName = e.target.value;
                    var checkName = props.checkDeviceNameFunction(props.antecedents, NewName);
                    if (!checkName) {
                        props.modifyAntecedentName(NewName)
                    }
                }}
            />
        </form>
    )
}

function ModifyMaxMeasureSetting(props) {
    const index = props.antecedentIdx;
    const submitFunction = (event) => {
        props.updateDeviceRequest("antecedent");
        props.handleModifyDevice();
        event.preventDefault();
    }
    return (
        <form style={{ display: "inline" }} name="ItemSetting" onSubmit={submitFunction}>
            <input className="DeviceDetailCell" type="number" id="max_measure" name="max_measure"
                defaultValue={props.antecedents[index].setting}
                onChange={(e) => {
                    const newMaxMeasure = e.target.value;
                    props.modifyAntecedentSetting(newMaxMeasure);
                }}
            />
        </form>
    )
}

function ModifyErrorSetting(props) {
    const index = props.antecedentIdx;
    const submitFunction = (event) => {
        props.updateDeviceRequest("antecedent");
        props.handleModifyDevice();
        event.preventDefault();
    }
    return (
        <form style={{ display: "inline" }} name="ItemSetting" onSubmit={submitFunction}>
            <input className="DeviceDetailCell" type="number" id="error_setting" name="error_setting"
                defaultValue={props.antecedents[index].error}
                onChange={(e) => {
                    const error_measure = e.target.value;
                    props.modifyAntecedentSettingError(error_measure);
                }}
            />
        </form>
    )
}

