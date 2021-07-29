import React, { useState } from 'react';

export default function InfoDescriptionComponent(props) {
    const [checkDeviceName, handleCheckDeviceName] = useState(false);


    const checkDeviceNameFunction = (newName) => {
        var checkDeviceName = false;
        const devices = props.elements;
        if (devices.some(device => device.name === newName)) {
            checkDeviceName = true;
        }
        handleCheckDeviceName(checkDeviceName)
    }

    return (
        <>
            <li style={{ color: "red", display: checkDeviceName ? 'block' : 'none' }}> Error: device name already exist! Choose another name.</li>
            <li>Name: {props.modify ?
                <ModifyNameForm
                    {...props}
                    checkDeviceNameFunction={checkDeviceNameFunction}
                    checkDeviceName={checkDeviceName}
                />
                : props.elementName}
            </li>
            <li>{props.description}</li>
            <li>Id: {props.elementId}</li>
        </>
    )

}

function ModifyNameForm(props) {
    const submitFunction = (event) => {
        props.updateDeviceRequest(props.elementType);
        props.handleModifyDevice();
        event.preventDefault();
    }

    return (
        <form style={{ display: "inline" }} name="ItemName" onSubmit={submitFunction}>
            <input type="text" id="name" name="name"
                defaultValue={props.elementName}
                onChange={(e) => {
                    const NewName = e.target.value;
                    props.checkDeviceNameFunction(NewName);
                    if (!props.checkDeviceName) {
                        props.modifyElementName(NewName)
                    }
                }}
            />
        </form>
    )
}

