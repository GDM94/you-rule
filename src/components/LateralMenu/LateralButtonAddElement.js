import React from "react";
import styled from "styled-components";
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

function LateralButtonAddElement(props) {
    return (
        <div>
            <RouteTitle>
                <AddButton onClick={() => { 
                    props.handleRegisterDevicePopUp(); 
                    props.setNewElement("", "", 0);
                    }}>
                    ADD NEW {props.page} <AddIcon />
                </AddButton>
            </RouteTitle>
        </div>

    );
}


export default withRouter(LateralButtonAddElement);


const RouteTitle = styled.div`
display: flex;
flex-flow: row;
width: 100%;
background-color: #737373;
`;



const AddButton = styled(Button)`
color: white !important;
text-align: center;
border-radius: 0% !important;
width: 100%;
`;

