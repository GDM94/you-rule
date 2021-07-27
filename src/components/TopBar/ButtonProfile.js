import React from "react";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { withRouter } from 'react-router-dom';

function ButtonProfile(props) {
    return (
        <ListItem button >
            <ListItemIcon>
                <AccountCircleIcon fontSize="small" style={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary="profile" />
        </ListItem>
    )
}

export default withRouter(ButtonProfile)