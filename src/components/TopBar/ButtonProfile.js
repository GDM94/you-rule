import React from "react";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { withRouter } from 'react-router-dom';

function ButtonProfile(props) {
    return (
        <ListItem button onClick={() => {
            props.handleProfile();
            props.history.push({ pathname: process.env.REACT_APP_PROFILE_URL, state: props.location.state })
        }}>
            <ListItemIcon>
                <AccountCircleIcon fontSize="small" style={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="profile" />
        </ListItem>
    )
}

export default withRouter(ButtonProfile)