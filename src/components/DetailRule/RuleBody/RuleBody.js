import ConsequentRuleBody from './ConsequentRuleBody';
import AntecedentRuleBody from './AntecedentRuleBody';
import AddRuleAntecedent from './AddRuleAntecedent';
import AddRuleConsequent from './AddRuleConsequent';
import styled from "styled-components";


export default function RuleBody(props) {
    switch (props.ruleBody) {
        case process.env.REACT_APP_RULE_BODY_ANTECEDENTS:
            return (
                <GridContainer>
                    <AntecedentRuleBody {...props} />
                </GridContainer>);
        case process.env.REACT_APP_RULE_BODY_CONSEQUENTS:
            return (
                <GridContainer>
                    <ConsequentRuleBody {...props} />
                </GridContainer>);
        case process.env.REACT_APP_RULE_BODY_ADD_ANTECEDENTS:
            return (
                <GridContainer>
                    <AddRuleAntecedent {...props} />
                </GridContainer>);
        case process.env.REACT_APP_RULE_BODY_ADD_CONSEQUENTS:
            return (
                <GridContainer>
                    <AddRuleConsequent {...props} />
                </GridContainer>);
        default:
            return <></>;
    }
}


const GridContainer = styled.div`
display: grid;
grid-template-columns: repeat(5, 1fr);
margin: 5px;
`;