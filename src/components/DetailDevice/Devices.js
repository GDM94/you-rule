import React from 'react';
import { withRouter } from 'react-router';
import styled from "styled-components";
import RegisterDeviceProcess from './RegisterDeviceProcess'
import Switch from './Switch/Switch';
import Timer from './Timer/Timer'
import Alert from './Alert/Alert';
import Button from './Button/Button';
import WaterLevel from './WaterLevel/WaterLevel';

function Devices(props) {
    if (props.elementId !== "" && props.elements.length > 0 && props.addNewElement === false) {
        if (props.elementId.includes("SWITCH")) {
            return (
                <Switch {...props} />
            )
        }
        else if (props.elementId.includes("alert")) {
            return (
                <Alert {...props} />
            )
        }
        else if (props.elementId.includes("timer")) {
            return (
                <Timer {...props} />
            )
        }
        else if (props.elementId.includes("WATERLEVEL")) {
            return (
                <WaterLevel {...props} />
            )
        }
        else if (props.elementId.includes("BUTTON")) {
            return (
                <Button {...props} />
            )
        }
    }
    else if (props.elementId === "" && props.addNewElement === true) {
        return (
            <ContentContainer>
                <RegisterDeviceProcess
                    {...props}
                />
            </ContentContainer>
        )
    }
    else {
        return (<ContentContainer> </ContentContainer>)
    }

}

export default withRouter(Devices)

const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  float:left;
  text-align: center;
`;