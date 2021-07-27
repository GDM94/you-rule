import React from "react";
import styled from "styled-components";
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ButtonLogout from "./ButtonLogout";
import ButtonProfile from "./ButtonProfile";

function LogoutLateralMenu(props) {
    return (
        <PopperStyled id='menu-popper' style={{ display: props.menuPopUp ? "" : "none" }}>
            <List component="nav" aria-label="main mailbox folders">
                <ButtonProfile
                    {...props}
                />
                <Divider style={{ color: 'white !important' }} />
                <ButtonLogout
                    {...props}
                />
            </List>
            <Divider />
        </PopperStyled>
    );
}

export default LogoutLateralMenu;

const PopperStyled = styled.div`
color: white;
background-color: #737373;
height:100%;
`;