import React from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import styled from "styled-components";

export default function RuleElementTitle(props) {
    return (
        <ElementTitle>
            <h2> {props.setRuleAntecedent ? "antecedent" : "consequent"}| {props.ruleElementName} </h2>
            <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                <Button onClick={() => {
                    props.updateRuleElementRequest(props.newRuleId, props.ruleElementId);
                    props.handleRuleBody(process.env.REACT_APP_RULE_BODY_ANTECEDENTS);
                }}>
                    <DoneIcon fontSize="large" style={{ color: "black" }} />
                </Button>
                <Button onClick={() => {
                    props.deleteRuleElementRequest(props.newRuleId, props.ruleElementId)
                    props.handleRuleBody(process.env.REACT_APP_RULE_BODY_ANTECEDENTS);
                }}>
                    <DeleteIcon fontSize="large" style={{ color: "red" }} />
                </Button>
            </ButtonGroup>
        </ElementTitle>
    )
}

const ElementTitle = styled.div`
text-align: left;
margin-left: 2%;
margin-right: 2%;
margin-top: 2%;
display: flex;
flex-flow: row;
`;