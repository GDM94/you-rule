import React from 'react';
import styled from "styled-components";
import RuleElementTitle from '../RuleElementTitle';
import WaterLevelAntecedentDetail from './WaterLevelAntecedentDetail';

export default class WaterLevelAntecedent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            device_id: "",
            device_name: "",
            measure: "",
            absolute_measure: "",
            condition_measure: "between",
            start_value: "",
            stop_value: "",
            last_time_on: "",
            last_time_off: "",
            last_date_on: "",
            last_date_off: "",
            evaluation: "false"
        }
    }

    render() {
        return (
            <ContentContainer>
                <RuleElementTitle {...this.props} />
                <WaterLevelAntecedentDetail {...this.props} options={options} />
            </ContentContainer>
        )
    }
}

const options = [
    { value: 'between', label: 'between' },
    { value: '>', label: '>' },
    { value: '<', label: '<' },
    { value: 'isteresi', label: 'isteresi' }
  ]


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
