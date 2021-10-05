import React from 'react';
import styled from "styled-components";
import RegisterDeviceProcess from './RegisterDeviceProcess'
import ConsequentDevices from './ConsequentDevices';
import { withRouter } from 'react-router';
import Switch from './Switch/Switch';

function DetailDevice(props) {
    if (props.elementId !== "" && props.addNewElement === false) {
        if (props.elementId.includes("SWITCH")) {
            return (
                <Switch
                    {...props}
                />
            )
        }
        if (props.location.state.page === process.env.REACT_APP_PAGE_SWITCHES) {
            return (
                <ConsequentDevices
                    {...props}
                />
            )
        }

    }
    else if (props.elementId === "" && props.addNewElement === true) {
        return (<ContentContainer>
            <RegisterDeviceProcess
                {...props}
            />
        </ContentContainer>)
    }
    else {
        return (<ContentContainer> </ContentContainer>)
    }

}

export default withRouter(DetailDevice)




const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  float:left;
  text-align: center;
`;



