import React from "react";
import styled from "styled-components";
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

function LateralButtonAddElement(props) {
    return (
        <div>
            <RouteTitle>
                <AddButton style={{ color: props.addNewElement? '#eead4c' : 'white' }}  onClick={() => { 
                    props.handleRegisterDevicePopUp(); 
                    props.setNewElement("", "", 0);
                    }}>
                    ADD NEW {props.location.state.page} <AddIcon />
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
text-align: center;
border-radius: 0% !important;
width: 100%;
`;

