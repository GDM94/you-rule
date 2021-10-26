import React from 'react';
import styled from "styled-components";
import RuleElementTitle from '../RuleElementTitle';
import SwitchConsequentDetail from './SwitchConsequentDetail';

export default class SwitchConsequent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            device_id: "",
            device_name: "",
            message: "",
            if_value: "",
            else_value: "between",
            delay: "=",
            delay_unit_measure: "",
            order: ""
        }
    }


    render() {
        return (
            <ContentContainer>
                <RuleElementTitle {...this.props}/>
                <SwitchConsequentDetail {...this.props}/>
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
