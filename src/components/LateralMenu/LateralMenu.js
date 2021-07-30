import React from "react";
import styled from "styled-components";
import { withRouter } from 'react-router-dom';
import LateralButtonAddElement from "./LateralButtonAddElement";
import List from '@material-ui/core/List';
import LateralButtonViewElement from './LateralButtonViewElement'
import { makeStyles } from "@material-ui/core/styles";


function LateralMenu(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <LateralButtonAddElement
                {...props}
            />
            <MyList>
                <List component="div" aria-label="main mailbox folders">
                    <LateralButtonViewElement
                        {...props}
                    />
                </List>
            </MyList>



        </div>

    );
}


export default withRouter(LateralMenu);

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
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
  text-align: center;
`;


