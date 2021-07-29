import React from 'react';
import Button from '@material-ui/core/Button';
import RefreshIcon from '@material-ui/icons/Refresh';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import ButtonGroup from '@material-ui/core/ButtonGroup';

function ButtonGroupSensor(props) {
    return (
        <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
        <Button style={{ display: props.modifyDevice && !props.elementId.includes("timer") ? "" : "none" }}
            onClick={() => {
                props.handleModifyDevice();
                props.handleDeviceAntecedentPopUp(false);
                props.deleteDeviceRequest("antecedent");

            }}>
            <DeleteIcon fontSize="large" style={{ color: "red" }} />
        </Button>
        <Button
            onClick={() => {
                props.getElementById(props.elementId);
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
    )
}

export default ButtonGroupSensor