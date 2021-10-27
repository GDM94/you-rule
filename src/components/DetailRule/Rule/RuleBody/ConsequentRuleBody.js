import EditIcon from '@material-ui/icons/Edit';
import styled from "styled-components";

export default function ConsequentRuleBody(props) {
    console.log(props.element.rule_consequents)
    return (
        <List>
            {props.element.rule_consequents.map(item => {
                return (ConsequentRuleElement(props, item));
            })}
        </List>
    )
}

function ConsequentRuleElement(props, item) {
    return (
        <RuleElement key={item.device_id}
            onClick={() => {
                props.handleSetRuleConsequent(true);
                props.setRuleElement(item.device_id);
                props.getRuleConsequentById(item.device_id);
            }}>
            <span> {item.order} (delay: {item.delay} s) {item.device_name} </span>
            <EditIcon fontSize="small" style={{ color: "black", float: "right", marginRight: "10px" }} />
        </RuleElement>
    )
}

const List = styled.ul`
list-style: none;
padding-left: 0%;
padding-top: 5px;
`;


const RuleElement = styled.li`
color: balck;
background-color: #cccccc;
border-radius: 25px;
margin: 2%;
margin-top: 0%;
padding: 1%;
padding-left: 5%;
text-align: left;
&:hover {
    background: #d5d8d8;
}
`;


