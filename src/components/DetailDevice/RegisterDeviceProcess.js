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
        const allDeviceId = this.props.allDeviceId;
        const deviceId = this.state.newDeviceId;
        var deviceRecognition = false;
        if (!allDeviceId.some(el => el === deviceId)) {
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
            else if (deviceId.includes("AMMETER")) {
                deviceRecognition = true
            }
            else if (deviceId.includes("BUTTON")) {
                deviceRecognition = true
            }

        }
        this.setState({ registerDeviceError: !deviceRecognition }, () => { this.render() })
        return deviceRecognition
    }

    NewDeviceIdRegistration(newDeviceId) {
        this.setState({
            newDeviceId: newDeviceId
        }, () => { this.render() })
    }

    createDevice = (event) => {
        const checkRecognition = this.CheckRegisterDeviceRecognition();
        if (checkRecognition) {
            deviceInitialization(this.props, this.state.newDeviceId);
            this.props.handleRegisterDevicePopUp();
        }
        event.preventDefault();
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
                            <form onSubmit={this.createDevice}>
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
    var type = ""
    if (deviceId.includes("SWITCH")) {
        type = "consequent"
        newDevice = { id: deviceId, name: "switch", measure: "off", rules: [], automatic: "true", manual_measure: "off" };
    }
    else {
        type = "antecedent"
        if (deviceId.includes("PHOTOCELL")) {
            newDevice = { id: deviceId, name: "photocell", setting: "1024", measure: "init", absolute_measure: "init", error: "0", rules: [] };
        }
        else if (deviceId.includes("WATERLEVEL")) {
            newDevice = { id: deviceId, name: "waterlevel", setting: "100", measure: "init", absolute_measure: "init", error: "0", rules: [] };
        }
        else if (deviceId.includes("SOILMOISTURE")) {
            newDevice = { id: deviceId, name: "soilmoisture", setting: "1024", measure: "init", absolute_measure: "init", error: "0", rules: [] };
        }
        else if (deviceId.includes("AMMETER")) {
            newDevice = { id: deviceId, name: "ammeter", setting: "100", measure: "init", absolute_measure: "init", error: "0", rules: [] };
        }
        else if (deviceId.includes("BUTTON")){
            newDevice = { id: deviceId, name: "button", setting: "", measure: "init", absolute_measure: "init", error: "", rules: [] };
        }
    }
    props.registerDeviceRequest(type, newDevice);
}