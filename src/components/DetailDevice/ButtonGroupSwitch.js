import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import DeleteIcon from '@material-ui/icons/Delete';
import RefreshIcon from '@material-ui/icons/Refresh';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';

export default function ButtonGroupSwitch(props) {
    return (
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
    )
}