import React from "react";
import styled from "styled-components";
import { withRouter } from 'react-router-dom';
import List from '@material-ui/core/List';
import LateralButtonSettings from "./LateralButtonSettings";
import LateralButtonProfile from "./LateralButtonProfile";
import { makeStyles } from "@material-ui/core/styles";




function LateralMenuSettings(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <LateralButtonSettings
                {...props}
            />
            <MyList>
                <List component="div" aria-label="main mailbox folders">
                    <LateralButtonProfile
                        {...props}
                    />
                </List>
            </MyList>



        </div>

    );
}


export default withRouter(LateralMenuSettings);



const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        float:"left",
        textAlign: "center",
        color: "#0f540d",
        borderRight: "#bfbfbf solid 1px !important",
        backgroundColor: "#e6e6e6"
    }
  }));
const MyList = styled.div`
 color: white;
  margin: 5px;
  padding-left: 5px;
  padding-right: 0px;
  
  height: 100%;
  overflow-y:auto;
  text-align: center;
`;


