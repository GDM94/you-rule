import React from 'react';

export default function ConsequentRuleDetails(props) {
    const ruleIdx = props.newRuleIdx;
    var consequents_list_unsorted = props.rules[ruleIdx].consequent;
    const consequents_list = consequents_list_unsorted.sort((a, b) => parseInt(a.order) > parseInt(b.order) ? 1 : -1);
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
                <td>{element.order}</td>
                <td>{props.modify ? setConsequentDelay(props, idx, element.delay) : element.delay}</td>
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

function setConsequentDelay(props, element_idx, oldDelay) {
    return (
        <form name="consequentDelay">
            <input name="delay"
                id="delay"
                type="number"
                min="0"
                defaultValue={oldDelay}
                onChange={(e) => {
                    var value = e.target.value;
                    if (value < 0) {
                        value = 0;
                    }
                    props.setRuleConsequentDelay(props.newRuleIdx, element_idx, value)
                }}>
            </input>
        </form>
    )
}