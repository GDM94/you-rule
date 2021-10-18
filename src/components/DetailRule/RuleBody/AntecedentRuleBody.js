import styled from "styled-components";
import Button from '@material-ui/core/Button';


export default function AntecedentRuleBody(props) {
    var idx = -1;
    return (
        props.element.rule_antecedents.map(item => {
            idx++;
            return (
                <MyButton onClick={() => {
                    props.handleSetRuleAntecedent(true);
                    props.setRuleElement(item.device_id, item.device_name, idx);
                    props.getRuleAntecedentById(item.device_id);
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
font-size: 0.6rem !important;
`;
