import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    useLocation
} from "react-router-dom";
import UserAccessProcess from "./UserAccessProcess";
import App from './App'


export default class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }





    render() {
        return (
            <Router>
                <Switch>
                    <PrivateRoute
                        path={process.env.REACT_APP_PROTECTED_URL}
                    />
                    <UserAccessProcess
                        path={process.env.REACT_APP_LOGIN_URL}

                    />

                </Switch>
            </Router>
        )
    }


}


function PrivateRoute(props) {
    let query = new URLSearchParams(useLocation().search);
    const user_name = query.get("user_name")
    const user_id = query.get("user_id")
    return (
        <App
            user_id={user_id}
            user_name={user_name}
        />
        )

}








