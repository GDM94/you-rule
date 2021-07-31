import React from "react";
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { ListItemIcon } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import MuiListItem from "@material-ui/core/ListItem";
import LocationOnIcon from '@material-ui/icons/LocationOn';

function LateralButtonSettingLocation(props) {
  return (
    <>
      <MyListItem style={{ color: "black" }} selected={props.settingsPage === process.env.REACT_APP_PAGE_SETTINGS_LOCATION}
        onClick={() => {
          props.getLocationByUserId()
          props.setSettingsPage(process.env.REACT_APP_PAGE_SETTINGS_LOCATION)
        }}>
        <ListItemIcon>
          <LocationOnIcon />
        </ListItemIcon>

        <ListItemText primary={process.env.REACT_APP_PAGE_SETTINGS_LOCATION} />
      </MyListItem>
      <Divider />
    </>
  )

}

export default LateralButtonSettingLocation;



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