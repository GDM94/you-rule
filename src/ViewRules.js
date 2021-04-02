import React from 'react';



export default function ViewRules(props) {
    return (
        <div className="RuleContainer">
            <div className="MyList">
                <table>
                    <thead>
                        <tr>
                            <th>
                                RULE ENGINE
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <ItemList
                            handleSetRulePopUp={props.handleSetRulePopUp}
                            setNewRule={props.setNewRule}
                            rules={props.rules}
                            getRuleById={props.getRuleById}
                        />
                    </tbody>
                </table>
            </div>
        </div>
    );
}


function ItemList(props) {
    if (props.rules.length > 0) {
        const ruleIdList = props.rules.map(rule => { return rule.id })
        return (
            props.rules.map(rule => {
                var index = ruleIdList.indexOf(rule.id)
                return (
                    <tr key={index}>
                        <td>
                            <div>
                                <button variant="primary" onClick={() => {
                                    props.getRuleById(rule.id);
                                    props.setNewRule(rule.id, rule.name, index);
                                    props.handleSetRulePopUp();
                                }}>
                                    {rule.name}
                                </button>
                            </div >
                        </td>
                    </tr>
                )
            })
        );
    }
    else {
        return (
            <tr key={0}>
                <td>
                    
                </td>
            </tr>
        )
    }

}

