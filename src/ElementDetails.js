import React from 'react';
import DeviceAntecedentPopUp from './DeviceAntecedentPopUp'
import SetRuleProcess from './SetRuleProcess'
import DeviceConsequentPopUp from './DeviceConsequentPopUp'


export default class ElementDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        if (this.props.routeUrl === "sensor") {
            return (
                <DeviceAntecedentPopUp
                    ruleRoute={this.props.ruleRoute}
                    rules={this.props.rules}
                    deviceAntecedentPopUp={this.props.deviceAntecedentPopUp}
                    handleDeviceAntecedentPopUp={this.props.handleDeviceAntecedentPopUp}
                    modifyDevice={this.props.modifyDevice}
                    handleModifyDevice={this.props.handleModifyDevice}
                    antecedents={this.props.antecedents}
                    antecedentId={this.props.antecedentId}
                    antecedentName={this.props.antecedentName}
                    antecedentIdx={this.props.antecedentIdx}
                    setNewAntecedent={this.props.setNewAntecedent}
                    modifyAntecedentSetting={this.props.modifyAntecedentSetting}
                    modifyAntecedentSettingError={this.props.modifyAntecedentSettingError}
                    updateDeviceRequest={this.props.updateDeviceRequest}
                    deleteDeviceRequest={this.props.deleteDeviceRequest}
                    getDeviceMeasureRequest={this.props.getDeviceMeasureRequest}
                    modifyAntecedentName={this.props.modifyAntecedentName}
                    setNewRule={this.props.setNewRule}
                    handleSetRulePopUp={this.props.handleSetRulePopUp}
                    getAntecedentById={this.props.getAntecedentById}
                    getRuleById={this.props.getRuleById}
                />
            )

        }
        else if (this.props.routeUrl === "switch") {
            return (<DeviceConsequentPopUp
                ruleRoute={this.props.ruleRoute}
                rules={this.props.rules}
                consequents={this.props.consequents}
                consequentId={this.props.consequentId}
                consequentName={this.props.consequentName}
                consequentIdx={this.props.consequentIdx}
                setNewConsequent={this.props.setNewConsequent}
                handleDeviceConsequentPopUp={this.props.handleDeviceConsequentPopUp}
                deviceConsequentPopUp={this.props.deviceConsequentPopUp}
                modifyDevice={this.props.modifyDevice}
                handleModifyDevice={this.props.handleModifyDevice}
                updateDeviceRequest={this.props.updateDeviceRequest}
                deleteDeviceRequest={this.props.deleteDeviceRequest}
                getDeviceMeasureRequest={this.props.getDeviceMeasureRequest}
                modifyConsequentName={this.props.modifyConsequentName}
                setNewRule={this.props.setNewRule}
                handleSetRulePopUp={this.props.handleSetRulePopUp}
                setConsequentAutomaticRequest={this.props.setConsequentAutomaticRequest}
                setConsequentManualMeasureRequest={this.props.setConsequentManualMeasureRequest}
                removeAlertEmailRequest={this.props.removeAlertEmailRequest}
                modifyAlertEmail={this.props.modifyAlertEmail}
                handleModifyAlertEmail={this.props.handleModifyAlertEmail}
                handleAddAlertEmailPopUp={this.props.handleAddAlertEmailPopUp}
                getConsequentById={this.props.getConsequentById}
                getRuleById={this.props.getRuleById}
                handleDeviceAntecedentPopUp={this.props.handleDeviceAntecedentPopUp}
                addEmailLocal={this.props.addEmailLocal}
                addNewAlertEmailRequest={this.props.addNewAlertEmailRequest}
                modifyEmailRequest={this.props.modifyEmailRequest}
            />)

        }
        else if ( this.props.routeUrl === "rule") {
            return (
                <SetRuleProcess
                    setRulePopUp={this.props.setRulePopUp}
                    handleSetRulePopUp={this.props.handleSetRulePopUp}
                    rules={this.props.rules}
                    newRuleIdx={this.props.newRuleIdx}
                    newRuleId={this.props.newRuleId}
                    newRuleName={this.props.newRuleName}
                    deleteRuleConsequentRequest={this.props.deleteRuleConsequentRequest}
                    deleteRuleAntecedentRequest={this.props.deleteRuleAntecedentRequest}
                    handleModify={this.props.handleModify}
                    modify={this.props.modify}
                    setNewRuleCondition={this.props.setNewRuleCondition}
                    setNewStartValue={this.props.setNewStartValue}
                    setNewStopValue={this.props.setNewStopValue}
                    handleAddRuleAntecedentPopUp={this.props.handleAddRuleAntecedentPopUp}
                    handleAddRuleConsequentPopUp={this.props.handleAddRuleConsequentPopUp}
                    setRuleAntecedentRequest={this.props.setRuleAntecedentRequest}
                    setRuleConsequentRequest={this.props.setRuleConsequentRequest}
                    deleteRuleRequest={this.props.deleteRuleRequest}
                    modifyRuleName={this.props.modifyRuleName}
                    updateRuleName={this.props.updateRuleName}
                    setNewRuleMeasure={this.props.setNewRuleMeasure}
                    setRuleRequest={this.props.setRuleRequest}
                    getRuleById={this.props.getRuleById}
                    
                />
            )
        }
        else {
            return (<div></div>)
        }
    }

}