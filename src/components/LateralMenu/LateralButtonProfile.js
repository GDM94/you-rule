import React from "react";
import styled from "styled-components";
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { ListItemIcon } from "@material-ui/core";

function LateralButtonProfile(props) {
    return (
        <div key={"profile"}>
            <MyListItem style={{ color: "black" }} className={props.settingsPage === process.env.REACT_APP_PAGE_PROFILE ? "ItemButtonClicked" : ""}
                onClick={() => {
                    props.setSettingsPage(process.env.REACT_APP_PAGE_PROFILE)
                }}>
                <ListItemIcon>
                    <AccountCircleIcon/>
                </ListItemIcon>
                
                <ListItemText primary={process.env.REACT_APP_PAGE_PROFILE} />
            </MyListItem>
            <Divider />
        </div>
    )

}

export default LateralButtonProfile;

const MyListItem = styled(ListItem)`
padding-bottom: 0px !important;
padding-top: 10px !important;

`;