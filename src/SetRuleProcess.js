import React from 'react';
import Modal from 'react-bootstrap/Modal';


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



    AntecedentRulePopUpBody() {
        this.setState({ ruleBody: false, classButtonRuleSelection: "AntecedentRuleSelection" })
    }
    ConsequentRulePopUpBody() {
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
        if (this.props.rules.length > 0) {
            return (
                <div className="SetRulePopUp">
                    <Modal show={this.props.setRulePopUp} onHide={() => {
                        this.props.handleSetRulePopUp();
                        this.AntecedentRulePopUpBody();
                        if (this.props.modify) {
                            this.props.handleModify();
                        }
                    }}>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                <div>
                                    <p style={{ display: this.state.checkRuleName ? 'block' : 'none' }}> Error: rule name already exist! Choose another name.</p>
                                    {this.props.modify ? ModifyNewRuleName(this.props, this.checkRuleNameFunction, this.updateRuleName) : "Rule name: " + this.props.newRuleName}
                                </div>
                                <div className="RuleEvaliation">
                                    Evaluation: {this.props.rules[this.props.newRuleIdx].evaluation}
                                </div>
                                <div className="RuleSectionButton">
                                    <button className={this.state.classButtonRuleSelection} type="button" id="ruleAntecedentButton" onClick={() => { this.AntecedentRulePopUpBody() }}>ANTECEDENT</button>
                                    <button className={this.state.classButtonRuleSelection} id="ruleConsequentButton" onClick={() => { this.ConsequentRulePopUpBody() }}>CONSEQUENT</button>
                                </div>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <RuleBody
                                ruleBody={this.state.ruleBody}
                                rules={this.props.rules}
                                newRuleId={this.props.newRuleId}
                                newRuleIdx={this.props.newRuleIdx}
                                deleteRuleConsequentRequest={this.props.deleteRuleConsequentRequest}
                                deleteRuleAntecedentRequest={this.props.deleteRuleAntecedentRequest}
                                modify={this.props.modify}
                                setNewRuleCondition={this.props.setNewRuleCondition}
                                setNewStartValue={this.props.setNewStartValue}
                                setNewStopValue={this.props.setNewStopValue}
                                setNewRuleMeasure={this.props.setNewRuleMeasure}
                                antecedents={this.props.antecedents}
                                consequents={this.props.consequents}
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <RuleFooter
                                ruleBody={this.state.ruleBody}
                                modify={this.props.modify}
                                handleSetRulePopUp={this.props.handleSetRulePopUp}
                                handleAddRuleConsequentPopUp={this.props.handleAddRuleConsequentPopUp}
                                handleAddRuleAntecedentPopUp={this.props.handleAddRuleAntecedentPopUp}
                            />
                            <button onClick={() => {
                                if (this.props.modify) {
                                    const ruleIdx = this.props.newRuleIdx;
                                    this.props.setRuleRequest(ruleIdx);
                                    this.props.handleModify();
                                }
                                else {
                                    this.props.handleModify();
                                }

                            }}>
                                {this.props.modify ? 'Save' : 'Modify'}
                            </button>
                            <button onClick={() => {
                                if (this.props.modify) {
                                    this.props.handleModify();
                                    this.props.handleSetRulePopUp();
                                    this.AntecedentRulePopUpBody();
                                    this.props.deleteRuleRequest(this.props.newRuleId, this.props.newRuleIdx);
                                } else {
                                    this.AntecedentRulePopUpBody();
                                    this.props.handleSetRulePopUp();
                                }
                            }}>
                                {this.props.modify ? 'Delete' : 'Close'}
                            </button>
                        </Modal.Footer>
                    </Modal>
                </div >
            )
        } else {
            return (
                <div>

                </div>
            )
        }

    }
}

function ModifyNewRuleName(props, checkRuleNameFunction, updateRuleName) {
    return (
        <form name="ItemName">
            <label htmlFor="name">Rule: </label>
            <input type="text" id="name" name="name"
                defaultValue={props.newRuleName}
                onChange={(e) => {
                    const NewName = e.target.value;
                    var checkRuleName = checkRuleNameFunction(props.rules, NewName)
                    updateRuleName(true)
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
            <div className="RuleConsequentDetail">
                <div>
                    <table id="rule">
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
                                consequents={props.consequents}

                            />
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="RuleAntecedentDetail">
                <div>
                    <table id="rule">
                        <thead>
                            <tr>
                                <th>DEVICE</th>
                                <th>STATUS</th>
                                <th>MEASURE</th>
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
                                antecedents={props.antecedents}
                                consequents={props.consequents}
                            />
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

function RuleConsequentDetails(props) {
    const ruleIdx = props.newRuleIdx;
    const consequents_list = props.rules[ruleIdx].consequent;
    const consequents = props.consequents;
    const consequentsIdList = consequents.map(consequent=>{return consequent.id});

    var idx = -1;
    return (consequents_list.map(element => {
        idx++;
        const consequent_idx = consequentsIdList.indexOf(element.device_id);
        const measure = consequents[consequent_idx].measure;
        const automatic = consequents[consequent_idx].automatic;
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
    const antecedents = props.antecedents;
    const antecedentsIdList = antecedents.map(antecedent => { return antecedent.id });
    const consequents = props.consequents;
    const consequentsIdList = consequents.map(consequent=> {return consequent.id})
    var element_idx = -1;
    return (antecedents_list.map(element => {
        element_idx++;
        var measure = "null";
        if(element.device_id.includes("SWITCH")){
            const consequent_idx = consequentsIdList.indexOf(element.device_id);
            measure = consequents[consequent_idx].measure;
        }else{
            const antecedent_idx = antecedentsIdList.indexOf(element.device_id);
            measure = antecedents[antecedent_idx].measure;
        }
        
        return (
            <tr key={element_idx}>
                <td>{element.name}</td>
                <td>{measure === "null" ? "disconnected" : "connected"}</td>
                <td>{element.measure}</td>
                <td>{props.modify ? SetRuleCondition(props, element_idx, element.condition) : element.condition}</td>
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

function RuleFooter(props) {
    if (props.ruleBody) {
        return (
            <button style={{ display: props.modify ? 'block' : 'none' }}
                onClick={() => {
                    props.handleSetRulePopUp();
                    props.handleAddRuleConsequentPopUp();
                }}>
                Add Consequent
            </button>
        )
    }
    else {
        return (
            <button style={{ display: props.modify ? 'block' : 'none' }}
                onClick={() => {
                    props.handleSetRulePopUp();
                    props.handleAddRuleAntecedentPopUp();
                }}>
                Add Antecedent
            </button>
        )
    }
}

function SetRuleCondition(props, element_idx, oldCondition) {
    if (oldCondition === "delta") {
        return (oldCondition)
    }
    else {
        return (
            <form name="ruleCondition">
                <select name="condition"
                    id="condition"
                    defaultValue={oldCondition}
                    onChange={(e) => {
                        props.setNewRuleCondition(props.newRuleIdx, element_idx, e.target.value)
                    }}>
                    <option value=">">{'>'}</option>
                    <option value="<">{'<'}</option>
                    <option value="between">'between'</option>
                </select>
            </form>
        )
    }

}

function SetStartValueRuleAntecedent(props, element, element_idx) {
    const oldValue = element.start_value;
    const elementId = element.device_id;
    if (elementId.includes("timer") || elementId.includes("SWITCH")) {
        return SetStartValueTimer(props, element_idx, oldValue)
    }
    else {
        return (
            <form name="ruleAntecedentStartValue">
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
    const elementId = antecedent.device_id;
    if (elementId.includes("timer") || elementId.includes("SWITCH")) {
        return SetStopValueTimer(props, element_idx, antecedent)
    }
    else {
        const condition = antecedent.condition;
        if (condition === "between") {
            return (
                <form name="ruleAntecedentStopValue">
                    <input id="StopValue"
                        name="StopValue"
                        type="number"
                        min="0"
                        max="100"
                        step="5"
                        defaultValue={antecedent.stop_value}
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
        else {
            return (<div>{antecedent.stop_value}</div>)
        }
    }

}


function SetStartValueTimer(props, element_idx, oldValue) {
    return (
        <form name="ruleAntecedentStartValue">
            <input id="time_start"
                name="time_start"
                type="time"
                defaultValue={oldValue}
                onChange={(e) => {
                    props.setNewStartValue(props.newRuleIdx, element_idx, e.target.value);
                }}
            />
        </form>
    )
}

function SetStopValueTimer(props, element_idx, antecedent) {
    if (antecedent.condition === "between" || antecedent.condition === "delta") {
        return (
            <form name="ruleAntecedentStopValue">
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

