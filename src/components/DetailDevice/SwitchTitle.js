import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import DeleteIcon from '@material-ui/icons/Delete';
import RefreshIcon from '@material-ui/icons/Refresh';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import styled from "styled-components";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

export default function SwitchTitle(props) {
    const getColorStatus = () =>{
        var color = "green";
        if (props.elementId.includes("SWITCH")) {
            const measure_device = props.elements[props.elementIdx].measure
            const checkStatusDevice = checkDeviceStatusAndColor(measure_device);
            color = checkStatusDevice.color;
        }
        return color;
    }

    return (
        <ElementTitle>
            <h1> <FiberManualRecordIcon style={{ color: getColorStatus() }} /> {props.elementName} </h1>
            <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                <Button style={{ display: props.modifyDevice && !props.elementId.includes("alert") ? "" : "none" }}
                    onClick={() => {
                        props.handleModifyDevice();
                        props.handleDeviceConsequentPopUp(false);
                        props.deleteDeviceRequest("consequent");

                    }}>
                    <DeleteIcon fontSize="large" style={{ color: "red" }} />
                </Button >
                <Button
                    onClick={() => {
                        props.getConsequentById(props.elementId);
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

const ElementTitle = styled.div`
text-align: left;
margin-left: 2%;
margin-right: 2%;
margin-top: 2%;
display: flex;
flex-flow: row;
`;