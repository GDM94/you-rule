import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import RefreshIcon from '@material-ui/icons/Refresh';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import styled from "styled-components";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';


export default class SetRuleProcess extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ruleBody: false,
            checkRuleName: false,
            updateName: false,
            classButtonRuleSelection: "AntecedentRuleSelection"
        }
    }

    AntecedentRulePopUpBody = () => {
        this.setState({ ruleBody: false, classButtonRuleSelection: "AntecedentRuleSelection" })
    }
    ConsequentRulePopUpBody = () => {
        this.setState({ ruleBody: true, classButtonRuleSelection: "ConsequentRuleSelection" })
    }

    checkRuleNameFunction = (rules, ruleName) => {
        var checkRuleName = false;
        if (rules.some(rule => rule.name === ruleName)) {
            checkRuleName = true;
        }
        this.setState({
            checkRuleName: checkRuleName
        }, () => { this.render() });

        return checkRuleName
    }

    updateRuleName = (update) => {
        this.setState({ updateName: update })
    }


    render() {
        if (this.props.newRuleName !== "" && this.props.setRulePopUp) {
            return (
                <RuleContent
                    checkRuleName={this.state.checkRuleName}
                    modify={this.props.modify}
                    newRuleName={this.props.newRuleName}
                    rules={this.props.rules}
                    modifyRuleName={this.props.modifyRuleName}
                    checkRuleNameFunction={this.checkRuleNameFunction}
                    updateRuleName={this.updateRuleName}
                    newRuleId={this.props.newRuleId}
                    newRuleIdx={this.props.newRuleIdx}
                    ruleBody={this.state.ruleBody}
                    AntecedentRulePopUpBody={this.AntecedentRulePopUpBody}
                    ConsequentRulePopUpBody={this.ConsequentRulePopUpBody}
                    deleteRuleConsequentRequest={this.props.deleteRuleConsequentRequest}
                    deleteRuleAntecedentRequest={this.props.deleteRuleAntecedentRequest}
                    setNewRuleCondition={this.props.setNewRuleCondition}
                    setNewStartValue={this.props.setNewStartValue}
                    setNewStopValue={this.props.setNewStopValue}
                    setNewRuleMeasure={this.props.setNewRuleMeasure}
                    handleAddRuleConsequentPopUp={this.props.handleAddRuleConsequentPopUp}
                    handleAddRuleAntecedentPopUp={this.props.handleAddRuleAntecedentPopUp}
                    setRuleRequest={this.props.setRuleRequest}
                    handleModify={this.props.handleModify}
                    handleSetRulePopUp={this.props.handleSetRulePopUp}
                    deleteRuleRequest={this.props.deleteRuleRequest}
                    getRuleById={this.props.getRuleById}
                />

            )
        } else {
            return (
                <div>

                </div>
            )
        }

    }
}

const RuleTitle = styled.div`
display: flex;
flex-flow: row;
text-align: left;
margin-left: 2%;
margin-right: 2%;
margin-top: 2%;
`;

const RuleContentDiv = styled.div`
border: solid #d9d9d9 1px;
height: 100%;
background-color: #cccccc;
border-radius: 25px;
margin-left: 2%;
margin-right: 2%;
margin-bottom: 2%;
text-align: left;
padding: 2%;
display: flex;
flex-flow: column;
`;



function RuleContent(props) {
    const evaluation = props.rules[props.newRuleIdx].evaluation;
    return (
        <div className="DeviceContentDetail">
            <RuleTitle>
                <h1> <FiberManualRecordIcon style={{ color: evaluation === "true" ? "green" : "red" }} /> {props.newRuleName} </h1>
                <p style={{ display: props.checkRuleName ? 'block' : 'none' }}> Error: rule name already exist! Choose another name.</p>
                <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                    <Button style={{ display: props.modify ? "" : "none" }}
                        onClick={() => {
                            props.handleModify(false);
                            props.handleSetRulePopUp(false);
                            props.AntecedentRulePopUpBody();
                            props.deleteRuleRequest(props.newRuleId, props.newRuleIdx);

                        }}>
                        <DeleteIcon fontSize="large" style={{ color: "red" }} />
                    </Button >
                    <Button
                        onClick={() => {
                            props.getRuleById(props.newRuleId);
                        }}>
                        <RefreshIcon fontSize="large" style={{ color: "black" }} />
                    </Button >
                    <Button
                        onClick={() => {
                            if (props.modify) {
                                const ruleIdx = props.newRuleIdx;
                                props.setRuleRequest(ruleIdx);
                                props.handleModify(false);
                            }
                            else {
                                props.handleModify(true);
                            }
                        }}>
                        {props.modify ? <DoneIcon fontSize="large" style={{ color: "black" }} /> : <EditIcon fontSize="large" style={{ color: "black" }} />}

                    </Button >
                </ButtonGroup>
            </RuleTitle>
            <RuleContentDiv>

                <ElementTitle>
                    <ul>
                        <li key={"name"}>Name: {props.modify ? ModifyNewRuleName(props) : props.newRuleName}</li>
                    </ul>
                </ElementTitle>

                <ElementContent>
                    <div className="RuleHeaderButtons">
                        <Button className={props.ruleBody ? "UnclickedRuleBodyButton" : "ClickedRuleBodyButton"} id="ruleAntecedentButton"
                            onClick={() => { props.AntecedentRulePopUpBody(); }}>
                            ANTECEDENTS
                        </Button>
                        <AddRuleElementButtonStyled style={{ display: props.ruleBody ? "none" : "" }} id="ruleAntecedentButton"
                            onClick={() => {
                                props.handleAddRuleAntecedentPopUp();
                            }}>
                            <AddIcon />
                        </AddRuleElementButtonStyled>
                        <Button className={props.ruleBody ? "ClickedRuleBodyButton" : "UnclickedRuleBodyButton"} id="ruleConsequentButton"
                            onClick={() => { props.ConsequentRulePopUpBody(); }}>
                            CONSEQUENTS
                        </Button>
                        <AddRuleElementButtonStyled style={{ display: props.ruleBody ? "" : "none" }} id="ruleConsequentButton"
                            onClick={() => {
                                props.handleAddRuleConsequentPopUp();
                            }}>
                            <AddIcon />
                        </AddRuleElementButtonStyled>
                    </div>

                    <RuleBody
                        ruleBody={props.ruleBody}
                        rules={props.rules}
                        newRuleId={props.newRuleId}
                        newRuleIdx={props.newRuleIdx}
                        deleteRuleConsequentRequest={props.deleteRuleConsequentRequest}
                        deleteRuleAntecedentRequest={props.deleteRuleAntecedentRequest}
                        modify={props.modify}
                        setNewRuleCondition={props.setNewRuleCondition}
                        setNewStartValue={props.setNewStartValue}
                        setNewStopValue={props.setNewStopValue}
                        setNewRuleMeasure={props.setNewRuleMeasure}
                        handleModify={props.handleModify}
                        setRuleRequest={props.setRuleRequest}
                    />
                </ElementContent>
            </RuleContentDiv>
        </div>
    )
}


const AddRuleElementButtonStyled = styled(Button)`
border: solid black 2px !important;
border-radius: 0px !important;
background-color: #eead4c !important;
`;

const ElementTitle = styled.div`
text-align: left;
margin-left: 2%;
margin-right: 2%;
margin-top: 2%;
display: flex;
flex-flow: row;
`;

const ElementContent = styled.div`
border: solid black 2px;
border-radius: 25px;
margint: 2%;
padding: 2%;
text-align: center;
background-color: #e6e6e6;
width: 100%;
height: 100%;
  
`;

function ModifyNewRuleName(props) {
    const submitFunction = (event) => {
        props.setRuleRequest(props.newRuleIdx);
        props.handleModify(false);
        event.preventDefault();
    }
    return (
        <form style={{ display: "inline" }} name="ItemName" onSubmit={submitFunction}>
            <input type="text" id="name" name="name"
                defaultValue={props.newRuleName}
                onChange={(e) => {
                    const NewName = e.target.value;
                    var checkRuleName = props.checkRuleNameFunction(props.rules, NewName)
                    props.updateRuleName(true)
                    if (!checkRuleName) {
                        props.modifyRuleName(NewName)
                    }
                }}
            />
        </form>
    )
}


function RuleBody(props) {
    if (props.ruleBody) {
        return (

            <table id="tableRule">
                <thead>
                    <tr>
                        <th>DEVICE</th>
                        <th>STATUS</th>
                        <th>MODALITY</th>
                        <th>IF</th>
                        <th>ELSE</th>
                    </tr>
                </thead>
                <tbody>
                    <RuleConsequentDetails
                        rules={props.rules}
                        newRuleId={props.newRuleId}
                        newRuleIdx={props.newRuleIdx}
                        deleteRuleConsequentRequest={props.deleteRuleConsequentRequest}
                        modify={props.modify}

                    />
                </tbody>
            </table>

        )
    }
    else {
        return (

            <table id="tableRule">
                <thead>
                    <tr>
                        <th>DEVICE</th>
                        <th>STATUS</th>
                        <th>MEASURE</th>
                        <th>VALUE</th>
                        <th>CONDITION</th>
                        <th>START</th>
                        <th>STOP</th>
                    </tr>
                </thead>
                <tbody>
                    <RuleAntecedentDetails
                        rules={props.rules}
                        newRuleId={props.newRuleId}
                        newRuleIdx={props.newRuleIdx}
                        deleteRuleAntecedentRequest={props.deleteRuleAntecedentRequest}
                        modify={props.modify}
                        setNewRuleCondition={props.setNewRuleCondition}
                        setNewStartValue={props.setNewStartValue}
                        setNewStopValue={props.setNewStopValue}
                        setNewRuleMeasure={props.setNewRuleMeasure}
                        handleModify={props.handleModify}
                        setRuleRequest={props.setRuleRequest}
                    />
                </tbody>
            </table>
        )
    }
}

function RuleConsequentDetails(props) {
    const ruleIdx = props.newRuleIdx;
    const consequents_list = props.rules[ruleIdx].consequent;

    var idx = -1;
    return (consequents_list.map(element => {
        idx++;
        var measure = element.measure;
        if (element.device_id.includes("alert")) {
            measure = "measure"
        }
        const automatic = element.automatic;
        return (
            <tr key={idx}>
                <td>{element.name}</td>
                <td>{measure === "null" ? "disconnected" : "connected"}</td>
                <td>{automatic === "true" ? "automatic" : "manual"}</td>
                <td>{element.if_value}</td>
                <td>{element.else_value}</td>
                <td className="deleteRuleRow" style={{ visibility: props.modify ? 'visible' : 'hidden' }}>
                    <button onClick={() => {
                        props.deleteRuleConsequentRequest(props.newRuleId, element.device_id);
                    }}>
                        delete
                    </button>
                </td>
            </tr>
        )
    })
    )
}

function RuleAntecedentDetails(props) {
    const ruleIdx = props.newRuleIdx;
    const antecedents_list = props.rules[ruleIdx].antecedent;
    var element_idx = -1;
    return (antecedents_list.map(element => {
        element_idx++;
        var value = "//";
        if (element.device_id.includes("timer")) {
            value = "now";
        }
        else {
            if (element.value !== "null") {
                value = element.value;
            }
        }
        return (
            <tr key={element_idx}>
                <td>{element.name}</td>
                <td>{value === "//" ? "disconnected" : "connected"}</td>
                <td>{element.measure}</td>
                <td>{value}</td>
                <td>{props.modify ? SetRuleCondition(props, element_idx, element.condition, element.device_id) : element.condition}</td>
                <td>{props.modify ? SetStartValueRuleAntecedent(props, element, element_idx) : element.start_value}</td>
                <td>{props.modify ? SetStopValueRuleAntecedent(props, element, element_idx) : element.stop_value}</td>
                <td className="deleteRuleRow" style={{ visibility: props.modify ? 'visible' : 'hidden' }}>
                    <button onClick={() => { props.deleteRuleAntecedentRequest(props.newRuleId, element.device_id); }}>
                        delete
                    </button>
                </td>
            </tr>
        )
    })
    )
}



function SetRuleCondition(props, element_idx, oldCondition, deviceId) {
    const submitFunction = (event) => {
        props.setRuleRequest(props.newRuleIdx);
        props.handleModify(false);
        event.preventDefault();
    }
    if (deviceId.includes("SWITCH")) {
        return (
            <form name="ruleCondition" onSubmit={submitFunction}>
                <select name="condition"
                    id="condition"
                    defaultValue={oldCondition}
                    onChange={(e) => {
                        props.setNewRuleCondition(props.newRuleIdx, element_idx, e.target.value)
                    }}>
                    <option value="delta">'delta'</option>
                </select>
            </form>
        )
    }
    else if (deviceId.includes("WATERLEVEL")) {
        return (
            <form name="ruleCondition" onSubmit={submitFunction}>
                <select name="condition"
                    id="condition"
                    defaultValue={oldCondition}
                    onChange={(e) => {
                        props.setNewRuleCondition(props.newRuleIdx, element_idx, e.target.value)
                    }}>
                    <option value=">">{'>'}</option>
                    <option value="<">{'<'}</option>
                    <option value="between">'between'</option>
                    <option value="isteresi">'isteresi'</option>
                </select>
            </form>
        )
    }
    else if (deviceId.includes("BUTTON")) {
        return (
            <form name="ruleCondition" onSubmit={submitFunction}>
                <select name="condition"
                    id="condition"
                    defaultValue={oldCondition}
                    onChange={(e) => {
                        props.setNewRuleCondition(props.newRuleIdx, element_idx, e.target.value)
                    }}>
                    <option value="=">'='</option>
                </select>
            </form>
        )
    }
    else {
        return (
            <form name="ruleCondition" onSubmit={submitFunction}>
                <select name="condition"
                    id="condition"
                    defaultValue={oldCondition}
                    onChange={(e) => {
                        props.setNewRuleCondition(props.newRuleIdx, element_idx, e.target.value)
                    }}>
                    <option value=">">{'>'}</option>
                    <option value="<">{'<'}</option>
                    <option value="between">between</option>
                </select>
            </form>
        )
    }
}


function SetStartValueRuleAntecedent(props, element, element_idx) {
    const submitFunction = (event) => {
        props.setRuleRequest(props.newRuleIdx);
        props.handleModify(false);
        event.preventDefault();
    }
    const oldValue = element.start_value;
    const elementId = element.device_id;
    if (elementId.includes("timer") || elementId.includes("SWITCH")) {
        return (<form name="ruleAntecedentStartValue" onSubmit={submitFunction}>
            <input id="time_start"
                name="time_start"
                type="time"
                defaultValue={oldValue}
                onChange={(e) => {
                    props.setNewStartValue(props.newRuleIdx, element_idx, e.target.value);
                }}
            />
        </form>)

    }
    else if (elementId.includes("BUTTON")) {
        return (<form name="ruleAntecedentStartValue" onSubmit={submitFunction}>
            <select name="button_status"
                id="button_status"
                defaultValue={oldValue}
                onChange={(e) => {
                    props.setNewStartValue(props.newRuleIdx, element_idx, e.target.value)
                }}>
                <option value="on">ON</option>
                <option value="off">OFF</option>
            </select>
           
        </form>)
    }
    else {
        return (
            <form name="ruleAntecedentStartValue" onSubmit={submitFunction}>
                <input id="StartValue"
                    name="StartValue"
                    type="number"
                    min="1"
                    max="100"
                    step="5"
                    defaultValue={oldValue}
                    onChange={(e) => {
                        if (e.target.value > 100) {
                            e.target.value = 100;
                        }
                        else if (e.target.value < 0) {
                            e.target.value = 0;
                        }
                        props.setNewStartValue(props.newRuleIdx, element_idx, e.target.value);
                    }}
                />
            </form>
        )

    }

}


function SetStopValueRuleAntecedent(props, antecedent, element_idx) {
    const submitFunction = (event) => {
        props.setRuleRequest(props.newRuleIdx);
        props.handleModify(false);
        event.preventDefault();
    }
    const elementId = antecedent.device_id;
    if (elementId.includes("timer") || elementId.includes("SWITCH")) {
        if (antecedent.condition === "between" || antecedent.condition === "delta") {
            return (
                <form name="ruleAntecedentStopValue" onSubmit={submitFunction}>
                    <input id="time_stop"
                        name="time_stop"
                        type="time"
                        defaultValue={antecedent.stop_value}
                        onChange={(e) => {
                            props.setNewStopValue(props.newRuleIdx, element_idx, e.target.value);
                        }}
                    />
                </form>
            )
        }
        else {
            return (<div>{antecedent.stop_value}</div>)
        }
    }
    else if (elementId.includes("BUTTON")){
        return (<div>{antecedent.stop_value}</div>)
    }
    else {
        const stop_value = antecedent.stop_value;
        if (stop_value === "//") {
            return (<div>{stop_value}</div>)
        }
        else {
            return (
                <form name="ruleAntecedentStopValue" onSubmit={submitFunction}>
                    <input id="StopValue"
                        name="StopValue"
                        type="number"
                        min="0"
                        max="100"
                        step="5"
                        defaultValue={stop_value}
                        onChange={(e) => {
                            if (e.target.value > 100) {
                                e.target.value = 100;
                            }
                            else if (e.target.value < 0) {
                                e.target.value = 0;
                            }
                            props.setNewStopValue(props.newRuleIdx, element_idx, e.target.value);
                        }}
                    />
                </form>
            )
        }
    }

}





