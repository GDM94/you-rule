import React from 'react';
import { Redirect } from 'react-router-dom';
import MainProtectedPage from './pages/MainProtectedPage'
import axios from 'axios';
import { withRouter } from 'react-router-dom';

var jwt = require('jwt-simple');

class App extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.location.state.token)
        const decoded = jwt.decode(this.props.location.state.token, process.env.REACT_APP_JWT_SECRET);
        const idToken = jwt.encode({ uid: decoded.uid }, process.env.REACT_APP_JWT_SECRET);
        axios.defaults.headers.common['Authorization'] = idToken;
        axios.defaults.timeout.toFixed(0);
        this.state = {}
    }

    render() {
        console.log(this.props.routeUrl)
        if (this.props.routeUrl === process.env.REACT_APP_LOGIN_URL) {
            return (
                <Redirect to={process.env.REACT_APP_LOGIN_URL} />
            )
        }
        else if (this.props.routeUrl === process.env.REACT_APP_SENSORS_URL) {
            return (
                <MainProtectedPage
                    {...this.props}
                    elements={this.props.antecedents}
                    setNewElement={this.props.setNewAntecedent}
                    getElements={this.props.getAntecedents}
                    getElementById={this.props.getAntecedentById}
                    elementId={this.props.antecedentId}
                    elementName={this.props.antecedentName}
                    addNewElement={this.props.registerDevicePopUp}
                />
            )
        }
        else if (this.props.routeUrl === process.env.REACT_APP_SWITCHES_URL) {
            return (
                <MainProtectedPage
                    {...this.props}
                    elements={this.props.consequents}
                    setNewElement={this.props.setNewConsequent}
                    getElements={this.props.getConsequents}
                    getElementById={this.props.getConsequentById}
                    elementId={this.props.consequentId}
                    elementName={this.props.consequentName}
                    addNewElement={this.props.registerDevicePopUp}
                />)
        }
        else if (this.props.routeUrl === process.env.REACT_APP_RULES_URL) {
            return (
                <MainProtectedPage
                    {...this.props}
                    elements={this.props.rules}
                    setNewElement={this.props.setNewRule}
                    getElements={this.props.getRules}
                    getElementById={this.props.getRuleById}
                    elementId={this.props.newRuleId}
                    elementName={this.props.newRuleName}
                    addNewElement={this.props.AddRulePopUp}
                    handleRegisterDevicePopUp={this.props.handleAddRulePopUp}
                />)
        }

    }
}

export default withRouter(App)