import React from "react";
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';

function TopBar2Button(props) {
    return (
        <Button style={{ color: "#bfbfbf" }} className={props.routeUrl === props.path ? "ButtonClicked" : ""}
            onClick={() => {
                console.log("switch to " + props.page)
                props.setNewRouteUrl(props.path, props.page);
            }}>
            {props.page}
        </Button>

    );
}


export default withRouter(TopBar2Button);