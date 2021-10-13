import React from 'react';
import styled from "styled-components";
import TimerDetail from './TimerDetail';
import TimerTitle from './TimerTitle';

export default class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            device_id: "",
            name: "timer",
            measure_time: "-",
            measure_day: "-",
            rules: [],
            status: "connected",
            color: "green"
        }
    }

    

    render() {
        return (
            <ContentContainer>
                <TimerTitle {...this.props} {...this.state}/>
                <TimerDetail {...this.props} {...this.state}/>
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
