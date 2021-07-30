import React from "react";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SettingsIcon from '@material-ui/icons/Settings';
import { withRouter } from 'react-router-dom';

function ButtonSettings(props) {
    return (
        <ListItem button onClick={() => {
            props.handleSettings();
            props.history.push({ pathname: process.env.REACT_APP_SETTINGS_URL, state: props.location.state })
        }}>
            <ListItemIcon>
                <SettingsIcon fontSize="small" style={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="settings" />
        </ListItem>
    )
}

export default withRouter(ButtonSettings)