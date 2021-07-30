import React from 'react';


export default class AddRuleAntecedent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }


    render() {
        return (
            <div>
                <div className="GenericModalBody">
                    <div>
                        <table>
                            <tbody>
                                <AddRuleAntecedentsDevice
                                  {...this.props}
                                />
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <table>
                            <tbody>
                                <AddRuleAntecedentSwitchLastTimeOn
                                    {...this.props}
                                />
                            </tbody>
                        </table>
                    </div>
                </div>
                <button onClick={() => {
                    this.props.handleRuleBody(process.env.REACT_APP_RULE_BODY_ANTECEDENTS);
                }}>
                    Close
                </button>
            </div>
        )
    }

}


function AddRuleAntecedentsDevice(props) {
    var i = -1;
    const ruleIdx = props.newRuleIdx;
    const antecedentRule = props.rules[ruleIdx].antecedent;
    const order = (antecedentRule.length + 1).toString();
    var antecedentsId = [];
    if (antecedentRule.length > 0) {
        antecedentsId = antecedentRule.map(item => {
            return (item.device_id)
        })
    }

    return (
        props.antecedents.map(item => {
            if (!antecedentsId.some(c => c === item.id)) {
                i++;
                return (
                    <tr key={i}>
                        <td>
                            <button onClick={() => {
                                var value = "//"
                                if (item.measure !== null) {
                                    value = item.measure
                                }
                                var newAntecedent = { device_id: item.id, name: item.name, start_value: "0", stop_value: "0", condition: "between", measure: "", value: value, order: order };
                                if (item.id.includes("timer")) {
                                    newAntecedent.start_value = "00:00";
                                    newAntecedent.stop_value = "00:00";
                                    newAntecedent.measure = "time";
                                }
                                else if (item.id.includes("PHOTOCELL")) {
                                    newAntecedent.measure = "luminosity (%)";
                                }
                                else if (item.id.includes("WATERLEVEL")) {
                                    newAntecedent.measure = "water level (%)";
                                }
                                else if (item.id.includes("SOILMOISTURE")) {
                                    newAntecedent.measure = "soil moisture (%)";
                                }
                                else if (item.id.includes("AMMETER")) {
                                    newAntecedent.measure = "power (W)";
                                }
                                else if (item.id.includes("BUTTON")) {
                                    newAntecedent.measure = "On/Off";
                                    newAntecedent.condition = "=";
                                    newAntecedent.start_value = "on"
                                    newAntecedent.stop_value = "off"
                                }
                                props.setAntecedentRuleLocal(props.newRuleIdx, newAntecedent);
                                props.handleModify(true);
                            }}>
                                {item.name}
                            </button>
                        </td>
                    </tr>
                )
            }
            else {
                return null;
            }
        })
    )
}

function AddRuleAntecedentSwitchLastTimeOn(props) {
    const ruleIdx = props.newRuleIdx;
    const antecedentRule = props.rules[ruleIdx].antecedent;
    const order = (antecedentRule.length + 1).toString();
    var antecedentsId = [];
    if (antecedentRule.length > 0) {
        antecedentsId = antecedentRule.map(item => {
            return (item.device_id)
        })
    }
    var i = -1;
    const consequents = props.rules[ruleIdx].consequent;
    if (consequents.length > 0) {
        return (
            consequents.map(item => {
                if (!item.device_id.includes("alert")) {
                    if (!antecedentsId.some(c => c === item.device_id)) {
                        i++;
                        return (
                            <tr key={i}>
                                <td>
                                    <button onClick={() => {
                                        var newAntecedent = { device_id: item.device_id, name: item.name, start_value: "00:00", stop_value: "00:00", condition: "delta", measure: "last time on", value: "-", order: order };
                                        props.setAntecedentRuleLocal(props.newRuleIdx, newAntecedent);
                                        props.handleModify(true);
                                    }}>
                                        {item.name}
                                    </button>
                                </td>
                            </tr>
                        )
                    }
                    else {
                        return null
                    }
                } else {
                    return null
                }

            })
        )
    }
    else {
        return null
    }

}