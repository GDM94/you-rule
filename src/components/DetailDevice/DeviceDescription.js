import React, { useState } from 'react';
import styled from "styled-components";

export default function DeviceDescription(props) {
    const [duplicatedDeviceName, handleDuplicatedDeviceName] = useState(false);


    const duplicatedDeviceNameFunction = (newName) => {
        var check = false;
        const devices = props.elements;
        if (devices.some(device => device.name === newName)) {
            check = true;
        }
        handleDuplicatedDeviceName(check)
    }

    return (
        <ElementDescription>
            <ul>
                <li style={{ color: "red", display: duplicatedDeviceName ? 'block' : 'none' }}> Error: device name already exist! Choose another name.</li>
                <li>Name: {props.modify ?
                    <ModifyNameForm
                        {...props}
                        duplicatedDeviceNameFunction={duplicatedDeviceNameFunction}
                        duplicatedDeviceName={duplicatedDeviceName}
                    />
                    : props.elementName}
                </li>
                <li>{props.description}</li>
                <li>Id: {props.elementId}</li>
            </ul>
        </ElementDescription>
    )

}

function ModifyNameForm(props) {
    const submitFunction = (event) => {
        props.updateDeviceRequest(props.device_id);
        props.handleModifyDevice();
        event.preventDefault();
    }

    return (
        <form style={{ display: "inline" }} name="ItemName" onSubmit={submitFunction}>
            <input type="text" id="name" name="name"
                defaultValue={props.elementName}
                onChange={(e) => {
                    props.duplicatedDeviceNameFunction(e.target.value);
                    if (!props.duplicatedDeviceName) {
                        props.modifyElementName(e.target.value)
                    }
                }}
            />
        </form>
    )
}


const ElementDescription = styled.div`
text-align: left;
margin-left: 2%;
margin-top: 5px;
display: flex;
flex-flow: row;
`;

