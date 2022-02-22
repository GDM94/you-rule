import React from "react";
import { withRouter } from "react-router";
import styled from "styled-components";
import RegisterDeviceProcess from "./RegisterDeviceProcess";
import Switch from "./deviceElements/Switch/Switch";
import Timer from "./deviceElements/Timer/Timer";
import Alert from "./deviceElements/Alert/Alert";
import Button from "./deviceElements/Button/Button";
import WaterLevel from "./deviceElements/WaterLevel/WaterLevel";
import Weather from "./deviceElements/Weather/Weather";
import Photocell from "./deviceElements/Photocell/Photocell";
import Servo from "./deviceElements/Servo/Servo";
import DevicePreview from "./DeviceUtils/DevicePreview";
import RegisterDeviceForm from "./DeviceUtils/AddDeviceButton";

function Devices(props) {
  if (
    props.elementId &&
    props.elementId !== "" &&
    props.elements.length > 0 &&
    props.addNewElement === false
  ) {
    console.log("DETAIL DEVICE");
    if (props.elementId.includes("SWITCH")) {
      return <Switch {...props} />;
    } else if (props.elementId.includes("alert")) {
      return <Alert {...props} />;
    } else if (props.elementId.includes("timer")) {
      return <Timer {...props} />;
    } else if (props.elementId.includes("WATERLEVEL")) {
      return <WaterLevel {...props} />;
    } else if (props.elementId.includes("BUTTON")) {
      return <Button {...props} />;
    } else if (props.elementId.includes("WEATHER")) {
      return <Weather {...props} />;
    } else if (props.elementId.includes("PHOTOCELL")) {
      return <Photocell {...props} />;
    } else if (props.elementId.includes("SERVO")) {
      return <Servo {...props} />;
    }
  } else if (props.elementId === "" && props.addNewElement === true) {
    console.log("REGISTER DEVICE");
    return (
      <ContentContainer>
        <RegisterDeviceProcess {...props} />
      </ContentContainer>
    );
  } else {
    console.log("GET DEVICE");
    return (
      <ContentContainer>
       <RegisterDeviceForm {...props}/>
        <div>
          <List>
            {props.elements.map((item) => {
              return DevicePreview(props, item);
            })}
          </List>
        </div>
      </ContentContainer>
    );
  }
}

export default withRouter(Devices);

const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  float: left;
  text-align: center;
`;

const List = styled.ul`
  list-style: none;
  padding-left: 0%;
  padding-top: 5px;
`;

