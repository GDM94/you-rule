import React from "react";
import styled from "styled-components";
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import SettingsIcon from '@material-ui/icons/Settings';

function LateralButtonAddElement(props) {
    return (
        <RouteTitle>
            <SettingsButton style={{ color: 'white' }} onClick={() => {
                props.setSettingsPage(process.env.REACT_APP_PAGE_SETTINGS)
            }}>
                <SettingsIcon/> {process.env.REACT_APP_PAGE_SETTINGS}
            </SettingsButton>
        </RouteTitle>
    );
}


export default withRouter(LateralButtonAddElement);


const RouteTitle = styled.div`
display: flex;
flex-flow: row;
width: 100%;
background-color: #737373;
`;



const SettingsButton = styled(Button)`
text-align: center;
border-radius: 0% !important;
width: 100%;
`;

