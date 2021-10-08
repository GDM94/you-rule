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

    return (
        <ElementTitle>
            <h1> <FiberManualRecordIcon style={{ color: props.color }}/> {props.name} </h1>
            <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                <Button style={{ display: props.modifyDevice }}
                    onClick={() => {
                        props.handleModifyDevice();
                        props.deleteDeviceRequest("consequent");

                    }}>
                    <DeleteIcon fontSize="large" style={{ color: "red" }} />
                </Button >
                <Button
                    onClick={() => {
                        props.getElementById(props.device_id);
                    }}>
                    <RefreshIcon fontSize="large" style={{ color: "black" }} />
                </Button >
                <Button
                    onClick={() => {
                        if (props.modifyDevice) {
                            props.updateDeviceRequest(props.device_id);
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

const ElementTitle = styled.div`
text-align: left;
margin-left: 2%;
margin-right: 2%;
margin-top: 2%;
display: flex;
flex-flow: row;
`;