import React from 'react';
import styled from "styled-components";
import DetailAlert from './DetailAlert';
import SwitchTitle from './SwitchTitle';

export default function ConsequentDevices(props) {
    var deviceDetails = null;
    if (props.elementId.includes("alert")) {
        deviceDetails = DetailAlert(props)
    }
    return (
        <ContentContainer>
            <SwitchTitle
                {...props}
            />
            {deviceDetails}
        </ContentContainer>
    )

}

const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  float:left;
  text-align: center;
  max-height:100%;
  overflow-y: auto;
  background-color: #d9d9d9;
`;


