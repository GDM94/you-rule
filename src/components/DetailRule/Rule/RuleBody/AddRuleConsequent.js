import MuiListItem from "@material-ui/core/ListItem";
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import styled from "styled-components";
import List from '@material-ui/core/List';


export default function AddRuleConsequent(props) {
    var consequentsId = props.element.device_consequents;
    var idx = -1;
    return (
        <List>
            {props.consequents.map(item => {
                idx++;
                if (!consequentsId.some(c => c === item.id)) {
                    return (
                        <RuleElementDiv key={idx}>
                            <MuiListItem key={item.id + "antecedentRuleElement"}
                                onClick={() => {
                                    props.setRuleElement(item.id);
                                    props.addNewRuleAConsequentRequest(item.id);
                                    props.handleSetRuleConsequent(true);
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
            })}
        </List>
    )
}

const RuleElementDiv = styled.div`
&:hover {
    background: #d5d8d8;
}
`;