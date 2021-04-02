import React from 'react';
import Modal from 'react-bootstrap/Modal'

export default class RegisterDeviceProcess extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            registerDeviceError: false,
            newDeviceId: ""
        }
    }

    CheckRegisterDeviceRecognition() {
        const deviceId = this.state.newDeviceId
        var deviceRecognition = false;
        if (deviceId.includes("SWITCH")) {
            deviceRecognition = true;
        }
        else if (deviceId.includes("PHOTOCELL")) {
            deviceRecognition = true
        }
        else if (deviceId.includes("WATERLEVEL")) {
            deviceRecognition = true
        }
        else if (deviceId.includes("SOILMOISTURE")) {
            deviceRecognition = true
        }
        this.setState({registerDeviceError: !deviceRecognition}, ()=>{this.render()})
        return deviceRecognition
    }

    NewDeviceIdRegistration(newDeviceId){
        this.setState({
            newDeviceId: newDeviceId
        }, ()=>{this.render()})
    }

    render() {
        return (
            <div>
                <Modal show={this.props.registerDevicePopUp} onHide={() => this.props.handleRegisterDevicePopUp()}>
                    <Modal.Header closeButton>
                        <Modal.Title>ADD DEVICE</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="GenericModalBody">
                            <p style={{ display: this.state.registerDeviceError ? 'block' : 'none' }} > Error: device Id is not correct!</p>
                            <form>
                                <label htmlFor="deviceId">DEVICE ID: </label>
                                <input name="deviceId" id="deviceId" type="text"
                                    onChange={(e) => {
                                        var newDeviceId = e.target.value;
                                        this.NewDeviceIdRegistration(newDeviceId);
                                    }}
                                />
                            </form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button onClick={() => {
                            const checkRecognition = this.CheckRegisterDeviceRecognition();
                            if (checkRecognition) {
                                deviceInitialization(this.props, this.state.newDeviceId);
                                this.props.handleRegisterDevicePopUp();
                            }
                        }}>
                            NEXT
                        </button>
                        <button onClick={() => this.props.handleRegisterDevicePopUp()}>Close</button>
                    </Modal.Footer>
                </Modal>
            </div >
        )
    }
}



function deviceInitialization(props, deviceId) {
    var newDevice = null;
    if (deviceId.includes("SWITCH")) {
        newDevice = { id: deviceId, name: "switch", measure: "init", rules: [] };
        props.registerDeviceRequest("consequent", newDevice);
    }
    else {
        if (deviceId.includes("PHOTOCELL")) {
            newDevice = { id: deviceId, name: "photocell", setting: "1024", measure: "init", rules: [] };
        }
        else if (deviceId.includes("WATERLEVEL")) {
            newDevice = { id: deviceId, name: "waterlevel", setting: "100", measure: "init", rules: [] };
        }
        else if (deviceId.includes("SOILMOISTURE")) {
            newDevice = { id: deviceId, name: "soilmoisture", setting: "1024", measure: "init", rules: [] };
        }
        props.registerDeviceRequest("antecedent", newDevice);
    }
}