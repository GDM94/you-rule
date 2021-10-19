import React, { useState } from 'react';
import styled from "styled-components";

export default function RuleDescription(props) {
    const [checkRuleName, handleCheckRuleName] = useState(false);
    const rule = props.element;

    const checkRuleNameFunction = (ruleName) => {
        const rules = props.elements;
        var checkRuleName = false;
        if (rules.some(rule => rule.name === ruleName)) {
            checkRuleName = true;
        }
        handleCheckRuleName(checkRuleName)

    }

    return (
        <ElementDescription>
            <ul>
                <li style={{ color: "red", display: checkRuleName ? 'block' : 'none' }}> Error: rule name already exist! Choose another name.</li>
                <li>Name: {props.modify ?
                    <ModifyNameForm
                        {...props}
                        checkRuleNameFunction={checkRuleNameFunction}
                        checkRuleName={checkRuleName}
                    />
                    : props.elementName}
                </li>
                <li key={"last_true"}>Last time true: {rule.last_true}</li>
                <li key={"last_false"}>Last time false:  {rule.last_false}</li>
            </ul>
        </ElementDescription>
    )

}

function ModifyNameForm(props) {
    const submitFunction = (event) => {
        props.setRuleRequest(props.elementIdx);
        props.handleModify(false);
        event.preventDefault();
    }

    return (
        <form style={{ display: "inline" }} name="ItemName" onSubmit={submitFunction}>
            <input type="text" id="name" name="name"
                defaultValue={props.elementName}
                onChange={(e) => {
                    const NewName = e.target.value;
                    props.checkRuleNameFunction(NewName);
                    if (!props.checkDeviceName) {
                        props.modifyElementName(NewName)
                    }
                }}
            />
        </form>
    )
}

const ElementDescription = styled.div`
text-align: left;
margin-left: 2%;
margin-top: 5px;
display: flex;
flex-flow: row;
`;

