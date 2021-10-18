import React from 'react';
import styled from "styled-components";
import SwitchTitle from './SwitchTitle';
import SwitchDetail from './SwitchDetail';

export default class Switch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            device_id: "",
            name: "switch",
            measure: "-",
            rules: [],
            automatic: "true",
            manual_measure: "false",
            last_date_on: "-",
            last_date_off: "-",
            last_time_on: "-",
            last_time_off: "-",
            status: "disconnected",
            color: "red",
            description: "consequent - switch"
        }
    }

    render() {
        return (
            <ContentContainer>
                <SwitchTitle {...this.props} {...this.state}/>
                <SwitchDetail {...this.props} {...this.state}/>
            </ContentContainer>
        )
    }
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
