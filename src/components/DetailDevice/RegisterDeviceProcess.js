import React from 'react';
import styled from "styled-components";
import Button from '@material-ui/core/Button';

export default class RegisterDeviceProcess extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            registerDeviceError: false,
            newDeviceId: ""
        }
    }

    CheckRegisterDeviceRecognition() {
        const deviceId = this.state.newDeviceId;
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
        else if (deviceId.includes("AMMETER")) {
            deviceRecognition = true
        }
        else if (deviceId.includes("BUTTON")) {
            deviceRecognition = true
        }


        this.setState({ registerDeviceError: !deviceRecognition })
        return deviceRecognition
    }

    NewDeviceIdRegistration(newDeviceId) {
        this.setState({
            newDeviceId: newDeviceId
        })
    }

    createDevice = (event) => {
        const checkRecognition = this.CheckRegisterDeviceRecognition();
        if (checkRecognition) {
            deviceInitialization(this.props, this.state.newDeviceId);
        }
        event.preventDefault();
    }

    render() {
        return (
            <ContentContainer>
                <ElementTitle>
                    <h2>ADD DEVICE:</h2>
                </ElementTitle>
                <ElementContent>
                    <p style={{ color: "red", display: this.state.registerDeviceError ? 'block' : 'none' }} > Error: device Id is not correct!</p>
                    <p style={{ color: "red", display: this.props.registerElementError ? 'block' : 'none' }} > Error: device Id is not correct because already registered!</p>
                    <ElementSettings>
                        <form style={{ marginRight: "10px" }} onSubmit={this.createDevice}>
                            <label style={{ marginRight: "10px" }} htmlFor="deviceId">DEVICE ID: </label>
                            <input name="deviceId" id="deviceId" type="text"
                                onChange={(e) => {
                                    var newDeviceId = e.target.value;
                                    this.props.handleRegisterElementError(false);
                                    this.NewDeviceIdRegistration(newDeviceId);
                                }}
                            />
                        </form>
                        <MyButton onClick={() => {
                            const checkRecognition = this.CheckRegisterDeviceRecognition();
                            if (checkRecognition) {
                                deviceInitialization(this.props, this.state.newDeviceId);
                            }
                        }}>
                            NEXT
                        </MyButton>
                    </ElementSettings>

                </ElementContent>
            </ContentContainer>
        )
    }
}



function deviceInitialization(props, deviceId) {
    var newDevice = null;
    var type = ""
    if (deviceId.includes("SWITCH")) {
        type = "consequent"
        newDevice = { id: deviceId, name: "switch-" + props.consequents.length.toString(), measure: "off", rules: [], automatic: "true", manual_measure: "off" };
    }
    else {
        type = "antecedent"
        if (deviceId.includes("PHOTOCELL")) {
            newDevice = { id: deviceId, name: "photocell-" + props.antecedents.length.toString(), setting: "1024", measure: "init", absolute_measure: "init", error: "0", rules: [] };
        }
        else if (deviceId.includes("WATERLEVEL")) {
            newDevice = { id: deviceId, name: "waterlevel-" + props.antecedents.length.toString(), setting: "100", measure: "init", absolute_measure: "init", error: "0", rules: [] };
        }
        else if (deviceId.includes("SOILMOISTURE")) {
            newDevice = { id: deviceId, name: "soilmoisture-" + props.antecedents.length.toString(), setting: "1024", measure: "init", absolute_measure: "init", error: "0", rules: [] };
        }
        else if (deviceId.includes("AMMETER")) {
            newDevice = { id: deviceId, name: "ammeter-" + props.antecedents.length.toString(), setting: "100", measure: "init", absolute_measure: "init", error: "0", rules: [] };
        }
        else if (deviceId.includes("BUTTON")) {
            newDevice = { id: deviceId, name: "button-" + props.antecedents.length.toString(), setting: "", measure: "init", absolute_measure: "init", error: "", rules: [] };
        }
    }
    props.registerDeviceRequest(type, newDevice);
}

const ContentContainer = styled.div`
  display: flex;
  flex-flow: column;
  float:left;
  background-color: #e6e6e6;
`;

const ElementContent = styled.div`
border: solid #d9d9d9 1px;
height: 100%;
border-radius: 25px;
margin-left: 2%;
margin-right: 2%;
margin-bottom: 2%;
text-align: center;
padding: 2%;
background-color: #cccccc;
`;

const ElementTitle = styled.div`
text-align: left;
margin-left: 2%;
margin-right: 2%;
margin-top: 2%;
display: flex;
flex-flow: row;
`;

const ElementSettings = styled.div`
margin-left: 2%;
margin-right: 2%;
justify-content: center;
padding: 1%;
display: flex;
flex-flow: row;
align-items: center;
`;

const MyButton = styled(Button)`
border: black solid 1px !important;
`;
