import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import UserAccessProcess from "./UserAccessProcess";
import AppNew from './AppNew'

export default class MainRouter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            token: ""
        }
    }



    render() {
        return (
            <Router>
                <Switch>
                    <Route path={process.env.REACT_APP_SENSORS_URL}
                        render={(props) =>
                            <AppNew
                                {...props}
                            />}
                    />
                    <Route path={process.env.REACT_APP_LOGIN_URL}
                        render={(props) =>
                            <UserAccessProcess
                                {...props}
                            />}
                    />
                </Switch>
            </Router>
        )
    }
}








