import React from 'react';
import styled from "styled-components";


export default class AddRuleConsequent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }


    render() {
        return (
            <AddContainer>
                <ContentContainer>
                    <AddRuleConsequentDevice
                        {...this.props}
                    />
                </ContentContainer>
                <ContentContainer>
                    <Element>
                        <button onClick={() => {
                            this.props.handleRuleBody(process.env.REACT_APP_RULE_BODY_CONSEQUENTS);
                        }}>
                            Close
                        </button>
                    </Element>
                </ContentContainer>
            </AddContainer>
        )
    }

}

const AddContainer = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-flow: column;
justify-content: center;
`;

const ContentContainer = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-flow: row;
justify-content: center;
`;

const Element = styled.div`
margin: 1%;
`;


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
                    <Element>
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
                    </Element>
                )
            }
            else {
                return null;
            }
        })
    )
}