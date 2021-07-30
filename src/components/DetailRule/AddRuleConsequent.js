import React from 'react';


export default class AddRuleConsequent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }


    render() {
        return (
            <div>
                <div className="GenericModalBody">
                    <table>
                        <tbody>
                            <AddRuleConsequentDevice
                                {...this.props}
                            />
                        </tbody>
                    </table>

                </div>
                <button onClick={() => {
                    this.props.handleRuleBody(process.env.REACT_APP_RULE_BODY_CONSEQUENTS);
                }}>
                    Close
                </button>
            </div>
        )
    }

}


function AddRuleConsequentDevice(props) {
    var i = -1;
    const ruleIdx = props.newRuleIdx;
    const consequentRule = props.rules[ruleIdx].consequent;
    const consequent_order = (consequentRule.length + 1).toString();
    var consequentsId = [];
    if (consequentRule.length > 0) {
        consequentsId = consequentRule.map(item => {
            return (item.device_id)
        })
    }

    return (
        props.consequents.map(item => {
            if (!consequentsId.some(c => c === item.id)) {
                i++;
                console.log(item)
                return (
                    <tr key={i}>
                        <td>
                            <button onClick={() => {
                                var automatic = "";
                                var measure = "measure"
                                if (item.id.includes("alert")) {
                                    automatic = "true";
                                }
                                else {
                                    automatic = item.automatic;
                                    measure = item.measure
                                }
                                const newConsequent = { device_id: item.id, name: item.name, if_value: "on", else_value: "off", automatic: automatic, measure: measure, order: consequent_order, delay: "0" };
                                props.setConsequentRuleLocal(props.newRuleIdx, newConsequent);
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