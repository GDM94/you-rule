import React from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { withRouter } from 'react-router-dom';
import styled from "styled-components";
import TopBar from '../components/TopBar/TopBar';
import TopBar2 from '../components/TopBar2/TopBar2';
import LateralMenu from '../components/LateralMenu/LateralMenu';
import LogoutLateralMenu from "../components/TopBar/LogoutLateralMenu";
import DetailRule from '../components/DetailRule/DetailRule';
import CreateRuleProcess from '../components/DetailRule/CreateRuleProcess';
import AddRuleConsequentProcess from '../components/DetailRule/AddRuleConsequentProcess'
import AddRuleAntecedentProcess from '../components/DetailRule/AddRuleAntecedentProcess'


class RulesPage extends React.Component {
    constructor(props) {
        super(props);
        axios.defaults.headers.common['Authorization'] = this.props.location.state.token;
        axios.defaults.timeout.toFixed(0);
        this.state = {

        }
    }

    componentDidMount() {
        this.props.getElements();
    }

    render() {
        return (
            <AppDiv>
                <TopBar
                    {...this.props}
                />
                <TopBar2
                    {...this.props}
                />
                <GreatBody>
                    <LateralMenu
                        {...this.props}
                    />
                    <ContentContainer>
                        <DetailRule
                            {...this.props}
                        />
                        <AddRuleConsequentProcess
                            {...this.props}
                        />
                        <AddRuleAntecedentProcess
                            {...this.props}
                        />
                    </ContentContainer>
                    <LogoutLateralMenu
                        {...this.props}
                    />
                </GreatBody>
            </AppDiv>
        );

    }
}

export default withRouter(RulesPage)



const AppDiv = styled.div`
display: flex;
flex-direction: column;
width: 100%;
height: 100%;
background-color: rgb(190, 210, 218);
`;

const GreatBody = styled.div`
display: flex;
flex-flow: row;
width: 100%;
height: 100%;
`;

const ContentContainer = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-flow: column;
text-align: center;
max-height:100%;
overflow-y: auto;
background-color: #e6e6e6;
`;





