import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    useLocation,
    Route,
    useRouteMatch
} from "react-router-dom";
import UserAccessProcess from "./UserAccessProcess";
import AppNew from './AppNew'


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
                    <Route path={process.env.REACT_APP_PROTECTED_URL}>
                        <PrivateRoute/>
                    </Route>
                    <Route path={process.env.REACT_APP_LOGIN_URL}>
                        <UserAccessProcess />
                    </Route>
                </Switch>
            </Router>
        )
    }


}


function PrivateRoute() {
    console.log("route private")
    let { path, url } = useRouteMatch();
    const location = useLocation();
    const idToken = location.state.idToken;
    
    return (
        <AppNew
            idToken={idToken}
            user_id="user"
            url={url}
            path={path}
        />
    )

}








