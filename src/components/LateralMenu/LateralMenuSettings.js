import React from "react";
import Divider from '@material-ui/core/Divider';
import { withRouter } from 'react-router-dom';
import List from '@material-ui/core/List';
import LateralButtonSettings from "./LateralButtonSettings";
import LateralButtonSettingProfile from "./LateralButtonSettingProfile";
import { makeStyles } from "@material-ui/core/styles";
import LateralButtonSettingLocation from "./LateralButtonSettingLocation";

function LateralMenuSettings(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Divider />
            <LateralButtonSettings {...props} />
            <List>
                <LateralButtonSettingProfile {...props} />
                <Divider />
                <LateralButtonSettingLocation {...props} />
                <Divider />
            </List>
        </div>

    );
}

export default withRouter(LateralMenuSettings);

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        float: "left",
        textAlign: "center",
        color: "#0f540d",
        borderRight: "#bfbfbf solid 1px !important",
        backgroundColor: "#e6e6e6"
    }
}));


