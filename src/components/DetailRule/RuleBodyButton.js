import Button from '@material-ui/core/Button';
import styled from "styled-components";
import AddIcon from '@material-ui/icons/Add';

export default function RuleBodyButton(props) {
    return (
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
    )
}

const AddRuleElementButtonStyled = styled(Button)`
border: solid black 2px !important;
border-radius: 0px !important;
background-color: #eead4c !important;
`;