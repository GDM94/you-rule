import React, { useState } from 'react';
import styled from "styled-components";
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import DeviceAntecedents from '../../DeviceAntecedents'
import RuleNameList from './RuleNameList'
import SensorTitle from './SensorTitle';
import DeviceDescription from './DeviceDescription';

export default function AntecedentDevices(props) {
    const deviceDetail = DeviceAntecedents("view", props.antecedents, props.antecedentIdx);
    var measure = deviceDetail.measure;
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
        <ContentContainer>
            <SensorTitle
                {...props}
                color={color}
            />
            <ElementContent>
                <DeviceDescription
                    {...props}
                    description={type}
                />

                <ElementMeasure>
                    <h3>{measure_type}</h3>
                    <h1>{measure} {measure_unit}</h1>
                    <p style={{ margin: 0, display: deviceDetail.max_measure === "" ? "none" : "" }}>{deviceDetail.max_measure} ({deviceDetail.max_measure_time})</p>
                    <p style={{ display: deviceDetail.min_measure === "" ? "none" : "" }}>{deviceDetail.min_measure} ({deviceDetail.min_measure_time})</p>
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
                        <RuleNameList
                            {...props}
                            rulesDevice={props.antecedents[props.antecedentIdx].rules}
                        />
                    </Collapse>
                </ul>
            </ElementContent>
        </ContentContainer>

    )
}


const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  float:left;
  text-align: center;
  max-height:100%;
  overflow-y: auto;
  background-color: #d9d9d9;
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

