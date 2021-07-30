import React from 'react';
import styled from "styled-components";
import Button from '@material-ui/core/Button';


export default class AddRuleConsequent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }


    render() {
        return (
            <GridContainer>
                <AddRuleConsequentDevice
                    {...this.props}
                />
            </GridContainer>
        )
    }

}

const GridContainer = styled.div`
display: grid;
grid-template-columns: repeat(5, 1fr);
`;

const Element = styled(Button)`
border: solid black 1px !important;
border-radius: 0px !important;
`;


function AddRuleConsequentDevice(props) {
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
                console.log(item)
                return (
                    <Element onClick={() => {
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
                    </Element>
                )
            }
            else {
                return null;
            }
        })
    )
}