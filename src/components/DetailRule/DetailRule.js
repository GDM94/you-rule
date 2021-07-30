import React from 'react';
import styled from "styled-components";
import RuleTitle from './RuleTitle';
import RuleBodyButton from './RuleBodyButton';
import CreateRuleProcess from './CreateRuleProcess';
import RuleDescription from './RuleDescription';
import ConsequentRuleBody from './ConsequentRuleBody';
import AntecedentRuleBody from './AntecedentRuleBody';
import AddRuleAntecedent from './AddRuleAntecedent';
import AddRuleConsequent from './AddRuleConsequent';


export default class DetailRule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }




    render() {
        if (this.props.elementId !== "" && this.props.elements.length > 0 && this.props.addNewElement === false) {
            return (
                <RuleContent
                    {...this.props}
                />

            )
        } else if (this.props.elementId === "" && this.props.addNewElement === true) {
            return (
                <CreateRuleProcess {...this.props} />
            )
        }
        else {
            return (
                <></>
            )
        }

    }
}


function RuleContent(props) {
    return (
        <ContentContainer>
            <RuleTitle
                {...props}
            />
            <RuleContentDiv>
                <RuleDescription {...props} />
                <RuleBodyButton
                    {...props}
                />
                <ElementContent>
                    <RuleBody
                        {...props}
                    />
                </ElementContent>
            </RuleContentDiv>
        </ContentContainer>
    )
}


function RuleBody(props) {
    var antecedents = props.ruleBody === process.env.REACT_APP_RULE_BODY_ANTECEDENTS
    var consequents = props.ruleBody === process.env.REACT_APP_RULE_BODY_CONSEQUENTS
    var add_antecedents = props.ruleBody === process.env.REACT_APP_RULE_BODY_ADD_ANTECEDENTS
    var add_consequents = props.ruleBody === process.env.REACT_APP_RULE_BODY_ADD_CONSEQUENTS
    if (antecedents) {
        return (<AntecedentRuleBody {...props} />)
    }
    else if (consequents) {
        return (<ConsequentRuleBody {...props} />)
    }
    else if (add_antecedents) {
        return (<AddRuleAntecedent {...props}/>)
    }
    else if (add_consequents) {
        return (<AddRuleConsequent {...props}/>)
    }
}

const ContentContainer = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-flow: column;
`;


const ElementContent = styled.div`
border: solid black 2px;
border-radius: 25px;
margint: 2%;
padding: 1%;
text-align: center;
background-color: #e6e6e6;
width: 100%;
height: 100%;
`;

const RuleContentDiv = styled.div`
border: solid #d9d9d9 1px;
height: 100%;
background-color: #cccccc;
border-radius: 25px;
margin-left: 2%;
margin-right: 2%;
margin-bottom: 2%;
text-align: left;
padding: 2%;
display: flex;
flex-flow: column;
`;



