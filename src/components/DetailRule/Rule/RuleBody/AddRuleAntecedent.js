import MuiListItem from "@material-ui/core/ListItem";
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import styled from "styled-components";
import List from '@material-ui/core/List';


export default function AddRuleAntecedent(props) {
    return (
        <List>
            <AddRuleAntecedentsDevice {...props} />
        </List>
    )
}

function AddRuleAntecedentsDevice(props) {
    var antecedentsId = props.element.device_antecedents;
    var idx = 500;
    return (
        props.antecedents.map(item => {
            idx++;
            if (!antecedentsId.some(c => c === item.id)) {
                return (
                    <RuleElementDiv key={idx}>
                        <MuiListItem key={item.id + "antecedentRuleElement"} style={{ color: "black" }}
                            onClick={() => {
                                props.setRuleElement(item.id);
                                props.addNewRuleAntecedentRequest(item.id);
                                props.handleSetRuleAntecedent(true);
                            }}>
                            <ListItemText primary={item.name} />
                        </MuiListItem>
                        <Divider />
                    </RuleElementDiv>
                )
            }
            else {
                return null;
            }
        })
    )
}

function AddRuleAntecedentSwitchLastTimeOn(props) {
    var antecedentsId = props.element.device_antecedents;
    var consequents = props.element.rule_consequents;
    var idx = 10000;
    if (consequents.length > 0) {
        idx++;
        return (
            consequents.map(item => {
                if (!item.device_id.includes("alert")) {
                    if (!antecedentsId.some(c => c === item.device_id)) {
                        return (
                            <RuleElementDiv key={idx}>
                                <MuiListItem key={item.id + "antecedentRuleElement"} style={{ color: "black" }}
                                    onClick={() => {
                                        props.setRuleElement(item.id);
                                        props.addNewRuleAntecedentRequest(item.id);
                                        props.handleSetRuleAntecedent(true);
                                    }}>
                                    <ListItemText primary={item.name} />
                                </MuiListItem>
                                <Divider />
                            </RuleElementDiv>
                        )
                    }
                    else {
                        return null
                    }
                } else {
                    return null
                }

            })
        )
    }
    else {
        return null
    }
}


const RuleElementDiv = styled.div`
&:hover {
    background: #d5d8d8;
}
`;