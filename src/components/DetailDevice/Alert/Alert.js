import React from 'react';
import styled from "styled-components";
import AlertTitle from './AlertTitle';
import AlertDesctiption from './AlertDescription';

export default class Alert extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            device_id: "",
            name: "alert",
            email_list: [],
            rules: [],
            status: "connected",
            color: "green",
            description: "consequent - alert email sender"
        }
    }



    render() {
        return (
            <ContentContainer>
                <AlertTitle {...this.props} {...this.state} />
                <AlertDesctiption {...this.props} {...this.state}/>
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