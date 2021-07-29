import React from 'react';
import styled from "styled-components";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import DetailAlert from './DetailAlert';
import ButtonGroupSwitch from './ButtonGroupSwitch';
import DetailSwitch from './DetailSwitch';

export default function ConsequentDevices(props) {
    var deviceDetails = null;
    var color = "green";
    if (props.elementId.includes("SWITCH")) {
        const measure_device = props.elements[props.elementIdx].measure
        const checkStatusDevice = checkDeviceStatusAndColor(measure_device);
        color = checkStatusDevice.color;
        deviceDetails = DetailSwitch(props)
    }
    else if (props.elementId.includes("alert")) {
        deviceDetails = DetailAlert(props)
    }
    return (
        <ContentContainer>
            <ElementTitle>
                <h1> <FiberManualRecordIcon style={{ color: color }} /> {props.elementName} </h1>
                <ButtonGroupSwitch
                    {...props}
                />
            </ElementTitle>
            {deviceDetails}
        </ContentContainer>
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

const ElementTitle = styled.div`
text-align: left;
margin-left: 2%;
margin-right: 2%;
margin-top: 2%;
display: flex;
flex-flow: row;
`;


