import React from 'react';
import styled from "styled-components";
import RuleTitle from './RuleTitle';
import RuleBodyButton from './RuleBodyButton';
import CreateRuleProcess from './CreateRuleProcess';
import RuleDescription from './RuleDescription';
import ConsequentRuleBody from './ConsequentRuleBody';
import AntecedentRuleBody from './AntecedentRuleBody';


export default class DetailRule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ruleBody: false
        }
    }

    AntecedentRulePopUpBody = () => {
        this.setState({ ruleBody: false })
    }
    ConsequentRulePopUpBody = () => {
        this.setState({ ruleBody: true })
    }


    render() {
        if (this.props.elementId !== "" && this.props.elements.length > 0 && this.props.addNewElement === false) {
            return (
                <RuleContent
                    {...this.props}
                    {...this.state}
                    AntecedentRulePopUpBody={this.AntecedentRulePopUpBody}
                    ConsequentRulePopUpBody={this.ConsequentRulePopUpBody}
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
                <ElementContent>
                    <RuleBodyButton
                        {...props}
                    />
                    <RuleBody
                        {...props}
                    />
                </ElementContent>
            </RuleContentDiv>
        </ContentContainer>
    )
}


function RuleBody(props) {
    if (props.ruleBody) {
        return (
            <ConsequentRuleBody {...props} />
        )
    }
    else {
        return (
            <AntecedentRuleBody {...props} />
        )
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
padding: 2%;
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



