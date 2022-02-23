import React from "react";
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';

function TopBar2ButtonWithRequests(props) {
    return (
        <Button style={{ color: "#bfbfbf" }} className={props.routeUrl === props.path ? "ButtonClicked" : ""}
            onClick={() => {
                props.location.state.page = props.page;
                props.location.state.path = props.path;
                props.setRouteUrlWithRequests(props.path);
                props.history.push({ pathname: props.path, state: props.location.state })
            }}>
            {props.page}
        </Button>

    );
}


export default withRouter(TopBar2ButtonWithRequests);