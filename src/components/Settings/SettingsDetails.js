import React from 'react';
import { withRouter } from 'react-router';
import Profile from './Profile';

class SettingsDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }


    render() {
        if (this.props.settingsPage === process.env.REACT_APP_PAGE_SETTINGS) {
            return (
                <></>
            )
        }
        else if(this.props.settingsPage === process.env.REACT_APP_PAGE_PROFILE){
            return(
                <Profile {...this.props}/>
            )
        }
        
    }
}

export default withRouter(SettingsDetails)