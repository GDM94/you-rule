import React from "react";
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';

function TopBar2Button(props) {
    return (
        <Button style={{ color: "#bfbfbf" }} className={props.routeUrl === props.path ? "ButtonClicked" : ""}
            onClick={() => {
                props.location.state.url = props.path
                props.history.push({ pathname: props.path, state: props.location.state })
            }}>
            {props.button}
        </Button>

    );
}


export default withRouter(TopBar2Button);