import React from 'react';
import { Redirect } from 'react-router-dom';
import MainProtectedPage from './pages/MainProtectedPage'

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
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
            <MainProtectedPage
                {...this.props}
                elements={this.props.consequents}
                setNewElement={this.props.setNewConsequent}
                getElements={this.props.getConsequents}
                getElementById={this.props.getConsequentById}
                elementId={this.props.consequentId}
                elementName={this.props.consequentName}
                addNewElement={this.props.registerDevicePopUp}
            />
        }
        else if (this.props.routeUrl === process.env.REACT_APP_RULES_URL) {
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
            />
        }

    }
}