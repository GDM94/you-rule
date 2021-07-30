import React from 'react';
import Button from '@material-ui/core/Button';
import styled from "styled-components";
import AddIcon from '@material-ui/icons/Add';

export default function RuleBodyButton(props) {
    //var antecedents = props.ruleBody === process.env.REACT_APP_RULE_BODY_ANTECEDENTS || props.ruleBody === process.env.REACT_APP_RULE_BODY_ADD_ANTECEDENTS
    const consequents = props.ruleBody === process.env.REACT_APP_RULE_BODY_CONSEQUENTS || props.ruleBody === process.env.REACT_APP_RULE_BODY_ADD_CONSEQUENTS
    var antecedentButtonClass = "ClickedRuleBodyButton";
    var addAntecedentButtonDisplay = "";
    var consequentButtonClass = "UnclickedRuleBodyButton";
    var addConsequentButtonDisplay = "none";
    var addElementButtonClass = "AddRuleElementButtonUnclicked"
    if (consequents) {
        antecedentButtonClass = "UnclickedRuleBodyButton";
        addAntecedentButtonDisplay = "none";
        consequentButtonClass = "ClickedRuleBodyButton";
        addConsequentButtonDisplay = "";
    }
    const addConsequentElement = props.ruleBody === process.env.REACT_APP_RULE_BODY_ADD_CONSEQUENTS 
    if (addConsequentElement){
        consequentButtonClass = "CurrentRuleBodyElements"
        addElementButtonClass= "AddRuleElementButtonClicked"
    }
    const addAntecedentElement = props.ruleBody === process.env.REACT_APP_RULE_BODY_ADD_ANTECEDENTS
    if (addAntecedentElement){
        antecedentButtonClass = "CurrentRuleBodyElements"
        addElementButtonClass= "AddRuleElementButtonClicked"
    }
    return (
        <RuleHeaderButtons>
            <Button className={antecedentButtonClass} id="ruleAntecedentButton"
                onClick={() => {
                    props.handleRuleBody(process.env.REACT_APP_RULE_BODY_ANTECEDENTS);
                }}>
                {process.env.REACT_APP_RULE_BODY_ANTECEDENTS}
            </Button>
            <Button className={addElementButtonClass} style={{ display: addAntecedentButtonDisplay }} id="ruleAntecedentButton"
                onClick={() => {
                    props.getAntecedents();
                    props.getConsequents();
                    props.handleRuleBody(process.env.REACT_APP_RULE_BODY_ADD_ANTECEDENTS);
                }}>
                <AddIcon />
            </Button>

            <Button className={consequentButtonClass} id="ruleConsequentButton"
                onClick={() => {
                    props.handleRuleBody(process.env.REACT_APP_RULE_BODY_CONSEQUENTS);
                }}>
                {process.env.REACT_APP_RULE_BODY_CONSEQUENTS}
            </Button>
            <Button className={addElementButtonClass} style={{ display: addConsequentButtonDisplay }} id="ruleConsequentButton"
                onClick={() => {
                    props.getConsequents();
                    props.handleRuleBody(process.env.REACT_APP_RULE_BODY_ADD_CONSEQUENTS);
                }}>
                <AddIcon />
            </Button>
        </RuleHeaderButtons>
    )
}

const AddRuleElementButtonStyled = styled(Button)`
border: solid black 2px !important;
border-radius: 0px !important;
background-color: #f6ca88 !important;
border-bottom: none !important;
`;


const RuleHeaderButtons = styled.div`
width: 100%;
display: flex;
flex-direction: row;
justify-content: center;
margin-top: 1%;
`;
