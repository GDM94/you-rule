import React from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { withRouter } from 'react-router-dom';
import styled from "styled-components";
import TopBar from '../components/TopBar/TopBar';
import LogoutLateralMenu from "../components/TopBar/LogoutLateralMenu";
import Profile from '../components/Settings/Profile';
import LateralMenuSettings from '../components/LateralMenu/LateralMenuSettings';
import SettingsDetails from '../components/Settings/SettingsDetails';

var jwt = require('jwt-simple');

class SettingPage extends React.Component {
    constructor(props) {
        super(props);
        const decoded = jwt.decode(this.props.location.state.token, process.env.REACT_APP_JWT_SECRET);
        const idToken = jwt.encode({ uid: decoded.uid }, process.env.REACT_APP_JWT_SECRET);
        axios.defaults.headers.common['Authorization'] = idToken;
        axios.defaults.timeout.toFixed(0);
        this.state = {
            email: decoded.email,
            password: decoded.password,
            name: decoded.name,
            surname: decoded.surname
        }
    }


    render() {
        return (
            <AppDiv>
                <TopBar
                    {...this.props}
                />
                <GreatBody>
                    <LateralMenuSettings
                        {...this.props}
                    />
                    <ContentContainer>
                        <SettingsDetails
                            {...this.props}
                            {...this.state}
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

export default withRouter(SettingPage)



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





