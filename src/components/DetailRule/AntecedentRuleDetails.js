import React from 'react';


export default function AntecedentRuleDetails(props) {
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
    if (deviceId.includes("SWITCH")) {
        return (
            <form name="ruleCondition">
                <select name="condition"
                    id="condition"
                    defaultValue={oldCondition}
                    onChange={(e) => {
                        props.setNewRuleCondition(props.newRuleIdx, element_idx, e.target.value)
                    }}>
                    <option value="delta">delta</option>
                </select>
            </form>
        )
    }
    else if (deviceId.includes("WATERLEVEL")) {
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
                    <option value="between">between</option>
                    <option value="isteresi">isteresi</option>
                </select>
            </form>
        )
    }
    else if (deviceId.includes("BUTTON")) {
        return (
            <form name="ruleCondition">
                <select name="condition"
                    id="condition"
                    defaultValue={oldCondition}
                    onChange={(e) => {
                        props.setNewRuleCondition(props.newRuleIdx, element_idx, e.target.value)
                    }}>
                    <option value="=">=</option>
                </select>
            </form>
        )
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
                    <option value="between">between</option>
                </select>
            </form>
        )
    }
}



function SetStartValueRuleAntecedent(props, element, element_idx) {
    const oldValue = element.start_value;
    const elementId = element.device_id;
    if (elementId.includes("timer")) {
        return (<form name="ruleAntecedentStartValue">
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
    else if (elementId.includes("SWITCH")) {
        return (<form name="ruleAntecedentStartValue">
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
        return (<form name="ruleAntecedentStartValue">
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
    else if (elementId.includes("BUTTON")) {
        return (<div>{antecedent.stop_value}</div>)
    }
    else {
        const stop_value = antecedent.stop_value;
        if (stop_value === "//") {
            return (<div>{stop_value}</div>)
        }
        else {
            return (
                <form name="ruleAntecedentStopValue">
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