import React from "react";
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { ListItemIcon } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import MuiListItem from "@material-ui/core/ListItem";

function LateralButtonSettingProfile(props) {
    return (
        <>
            <MyListItem style={{ color: "black" }} selected={props.settingsPage === process.env.REACT_APP_PAGE_SETTINGS_PROFILE}
                onClick={() => {
                    props.setSettingsPage(process.env.REACT_APP_PAGE_SETTINGS_PROFILE)
                }}>
                <ListItemIcon>
                    <AccountCircleIcon />
                </ListItemIcon>

                <ListItemText primary={process.env.REACT_APP_PAGE_SETTINGS_PROFILE} />
            </MyListItem>
            <Divider />
        </>
    )

}

export default LateralButtonSettingProfile;



const MyListItem = withStyles({
    root: {
      "&$selected": {
        fontWeight: "bold !important",
        color: "#000000 !important",
        borderBottom: "#000000 solid 5px !important",
        backgroundColor: "#d5d8d8",
      },
      "&:hover": {
        backgroundColor: "#d5d8d8",
        color: "black"
      }
    },
    selected: {}
  })(MuiListItem);