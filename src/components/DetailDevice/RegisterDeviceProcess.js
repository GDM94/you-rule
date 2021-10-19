import React from 'react';
import styled from "styled-components";
import Button from '@material-ui/core/Button';

export default class RegisterDeviceProcess extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            registerDeviceError: false,
            newDeviceId: "",
            deviceType: "",
        }
    }

    CheckRegisterDeviceRecognition() {
        const deviceId = this.state.newDeviceId;
        var deviceRecognition = false;
        var deviceType = ""
        if (deviceId.includes("SWITCH")) {
            deviceRecognition = true;
            deviceType = "switch";
        }
        else if (deviceId.includes("PHOTOCELL")) {
            deviceRecognition = true;
            deviceType = "sensor";
        }
        else if (deviceId.includes("WATERLEVEL")) {
            deviceRecognition = true;
            deviceType = "sensor";
        }
        else if (deviceId.includes("SOILMOISTURE")) {
            deviceRecognition = true;
            deviceType = "sensor";
        }
        else if (deviceId.includes("AMMETER")) {
            deviceRecognition = true;
            deviceType = "sensor";
        }
        else if (deviceId.includes("BUTTON")) {
            deviceRecognition = true;
            deviceType = "sensor";
        }
        this.setState({ registerDeviceError: !deviceRecognition, deviceType: deviceType})
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
            this.props.registerDeviceRequest(this.state.newDeviceId, this.state.deviceType);
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
                                this.props.registerDeviceRequest(this.state.newDeviceId, this.state.deviceType);
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
