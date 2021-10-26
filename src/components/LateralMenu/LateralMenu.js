import React from "react";
import { withRouter } from 'react-router-dom';
import LateralButtonAddElement from "./LateralButtonAddElement";
import List from '@material-ui/core/List';
import LateralButtonViewElement from './LateralButtonViewElement'
import { makeStyles } from "@material-ui/core/styles";


function LateralMenu(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <LateralButtonAddElement {...props} />
            <List>
                <LateralButtonViewElement {...props} />
            </List>
        </div>

    );
}


export default withRouter(LateralMenu);

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
        float: "left",
        textAlign: "center",
        color: "#0f540d",
        borderRight: "#bfbfbf solid 1px !important",
        backgroundColor: "#e6e6e6",
        width: "30%",
        minWidth: "30%"
    }
}));




