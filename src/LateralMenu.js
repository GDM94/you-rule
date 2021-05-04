import React from 'react';
import ViewRules from './ViewRules'
import ViewAntecedents from './ViewAntecedents'
import ViewConsequents from './ViewConsequents'
import styled from "styled-components";
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';


export default class LateralMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            popper: false,
            anchorEl: undefined
        }
    }

    handlePopper = () => {
        this.setState({
            popper: !this.state.popper,
        })
    }


    handleAncorPopper = (event) => {
        this.setState({
            anchorEl: event.currentTarget
        })
    }

    AddFunction = () => {
        if (this.props.routeUrl === "sensor") {
            this.props.handleRegisterDevicePopUp();
        }
        else if (this.props.routeUrl === "switch") {
            this.props.handleRegisterDevicePopUp();
        }
        else if (this.props.routeUrl === "rule") {
            this.props.handleAddRulePopUp();
        }

    }

    render() {
        if (this.props.routeUrl === "sensor") {
            return (
                <LateralMenuDiv>
                    <RouteSelection
                        routeUrl={this.props.routeUrl}
                        handlePopper={this.handlePopper}
                        handleAncorPopper={this.handleAncorPopper}
                        anchorEl={this.state.anchorEl}
                        popper={this.state.popper}
                        sensorRoute={this.props.sensorRoute}
                        ruleRoute={this.props.ruleRoute}
                        switchRoute={this.props.switchRoute}
                        AddFunction={this.AddFunction}
                    />
                    <ViewAntecedents
                        antecedents={this.props.antecedents}
                        handleDeviceAntecedentPopUp={this.props.handleDeviceAntecedentPopUp}
                        setNewAntecedent={this.props.setNewAntecedent}
                        getAntecedentById={this.props.getAntecedentById}
                        antecedentId={this.props.antecedentId}
                        modifyDevice={this.props.modifyDevice}
                        updateDeviceRequest={this.props.updateDeviceRequest}
                        handleModifyDevice={this.props.handleModifyDevice}
                        deleteDeviceRequest={this.props.deleteDeviceRequest}
                    />
                </LateralMenuDiv>
            )
        }
        else if (this.props.routeUrl === "rule") {
            return (
                <LateralMenuDiv>
                    <RouteSelection
                        routeUrl={this.props.routeUrl}
                        handlePopper={this.handlePopper}
                        handleAncorPopper={this.handleAncorPopper}
                        anchorEl={this.state.anchorEl}
                        popper={this.state.popper}
                        sensorRoute={this.props.sensorRoute}
                        ruleRoute={this.props.ruleRoute}
                        switchRoute={this.props.switchRoute}
                        AddFunction={this.AddFunction}
                    />
                    <ViewRules
                        handleSetRulePopUp={this.props.handleSetRulePopUp}
                        rules={this.props.rules}
                        setNewRule={this.props.setNewRule}
                        getRuleById={this.props.getRuleById}
                        newRuleId={this.props.newRuleId}
                        modify={this.props.modify}
                        handleModify={this.props.handleModify}
                        AntecedentRulePopUpBody={this.props.AntecedentRulePopUpBody}
                        deleteRuleRequest={this.props.deleteRuleRequest}
                        newRuleIdx={this.props.newRuleIdx}
                        setRuleRequest={this.props.setRuleRequest}
                    />
                </LateralMenuDiv>
            )
        }
        else if (this.props.routeUrl === "switch") {
            return (
                <LateralMenuDiv>
                    <RouteSelection
                        routeUrl={this.props.routeUrl}
                        handlePopper={this.handlePopper}
                        handleAncorPopper={this.handleAncorPopper}
                        anchorEl={this.state.anchorEl}
                        popper={this.state.popper}
                        sensorRoute={this.props.sensorRoute}
                        ruleRoute={this.props.ruleRoute}
                        switchRoute={this.props.switchRoute}
                        AddFunction={this.AddFunction}
                    />
                    <ViewConsequents
                        consequents={this.props.consequents}
                        handleDeviceConsequentPopUp={this.props.handleDeviceConsequentPopUp}
                        setNewConsequent={this.props.setNewConsequent}
                        getConsequentById={this.props.getConsequentById}
                        consequentId={this.props.consequentId}
                        modifyDevice={this.props.modifyDevice}
                        handleModifyDevice={this.props.handleModifyDevice}
                        deleteDeviceRequest={this.props.deleteDeviceRequest}
                        updateDeviceRequest={this.props.updateDeviceRequest}
                    />
                </LateralMenuDiv>
            )
        }

    }
}

function RouteSelection(props) {
    var route = ""
    if (props.routeUrl === "sensor") {
        route = "SENSORS"
    }
    else if (props.routeUrl === "rule") {
        route = "RULES"
    }
    else if (props.routeUrl === "switch") {
        route = "SWITCHES"
    }
    return (
        <div>
            <RouteTitle>
                <AddButton onClick={() => { props.AddFunction() }}>
                    ADD {route} <AddIcon />
                </AddButton>
            </RouteTitle>
        </div>

    )
}

const LateralMenuDiv = styled.div`
  display: flex;
  flex-flow: column;
  height: 100%;
  float:left;
  text-align: center;
  color: rgba(15, 82, 13, 0.541);
  border-right: #bfbfbf solid 1px !important;
  background-color: #e6e6e6;
`;

const RouteTitle = styled.div`
display: flex;
flex-flow: row;
width: 100%;
background-color: #737373;
`;



const AddButton = styled(Button)`
color: white !important;
text-align: center;
border-radius: 0% !important;
width: 100%;
`;


