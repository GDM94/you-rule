import styled from "styled-components";
import Button from '@material-ui/core/Button';

export default function ConsequentRuleBody(props) {
    var idx = -1;
    return (
        props.element.rule_consequents.map(item => {
            idx++;
            return (
                <MyButton key={idx} onClick={() => {
                    props.handleSetRuleConsequent(true);
                    props.setRuleElement(item.device_id);
                    props.getRuleConsequentById(item.id);
                }}>
                    {item.device_name}
                </MyButton>
            )
        })
    )
}

const MyButton = styled(Button)`
border: solid black 1px !important;
border-radius: 0px !important;
`;